// build.mjs — genera el sitio de producción en dist/
//
// Qué hace:
//   1. Compila el JSX una sola vez (sin Babel en el navegador).
//   2. Prerenderiza cada página a HTML estático con su propio <head>
//      (title, description, canonical, Open Graph, JSON-LD).
//   3. Genera sitemap.xml, llms.txt y 404.html.
//
// Las plantillas .html de la raíz siguen sirviendo para desarrollo
// (`npx serve .`): el build solo toma de ellas los bloques <script type="text/babel">.
// El <head> de producción se arma aquí, en headFor().

import { transform } from "esbuild";
import { createHash } from "node:crypto";
import { cp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import vm from "node:vm";
import React from "react";
import { renderToString } from "react-dom/server";

const ROOT = dirname(fileURLToPath(import.meta.url));
const DIST = join(ROOT, "dist");
const BASE = "https://glamourgeek.com.mx";
const TODAY = new Date().toISOString().slice(0, 10);
const FOUNDED = 2015;

const TEMPLATES = {
  home: "index.html",
  servicio: "servicios/detalle.html",
  ia: "servicios/ia.html",
  proyecto: "proyectos/detalle.html",
  proyectos: "proyectos/index.html",
  nosotros: "nosotros/index.html",
};

const read = (p) => readFile(join(ROOT, p), "utf8");
const hash = (s) => createHash("sha256").update(s).digest("hex").slice(0, 10);
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const trimTo = (s, n) => (s.length <= n ? s : s.slice(0, s.lastIndexOf(" ", n - 1)).replace(/[\s,.;:—–-]+$/, "") + "…");

// Las plantillas dependen de que cada <script> comparta el ámbito global.
// Al concatenarlas, los const/let de nivel superior chocarían entre sí.
const globalize = (code) => code.replace(/^(const|let)\s/gm, "var ");

async function compile(code, minify = true) {
  const out = await transform(globalize(code), {
    loader: "jsx",
    jsx: "transform",
    target: "es2019",
    charset: "utf8",
    minify,
    legalComments: "none",
  });
  return out.code;
}

// ── 1. Extraer los scripts de cada plantilla ────────────────────────────────
async function parseTemplate(file) {
  const html = await read(file);
  const body = html.slice(html.indexOf("</head>"));
  const dir = dirname(file);
  const chunks = [];
  const extras = [];
  for (const m of body.matchAll(/<script([^>]*)>([\s\S]*?)<\/script>/g)) {
    const [, attrs, inline] = m;
    const src = (attrs.match(/src="([^"]+)"/) || [])[1];
    if (/type="text\/babel"/.test(attrs)) {
      if (src) {
        const path = src.startsWith("/") ? src.slice(1) : join(dir, src);
        chunks.push({ file: path.replace(/^\.\//, "") });
      } else chunks.push({ code: inline });
    } else if (src) {
      // React, ReactDOM, Babel y config.js los aporta el build.
    } else if (inline.trim()) {
      extras.push(inline.trim());
    }
  }
  return { chunks, extras };
}

// tweaks-panel.jsx es una herramienta de diseño: en producción se sustituye
// por un stub que devuelve siempre los valores por defecto.
const TWEAKS_STUB = `
function useTweaks(defaults) { return [defaults, function () {}]; }
function TweaksPanel() { return null; }
var TweakSection = TweaksPanel, TweakRadio = TweaksPanel, TweakColor = TweaksPanel,
    TweakSelect = TweaksPanel, TweakToggle = TweaksPanel;
`;

// En producción el HTML ya viene renderizado: hidratar en vez de volver a pintar.
const MOUNT_SHIM = `
(function () {
  var create = ReactDOM.createRoot, hydrate = ReactDOM.hydrateRoot;
  window.ReactDOM = Object.assign({}, ReactDOM, {
    createRoot: function (el) {
      return { render: function (node) {
        if (el.firstChild) hydrate(el, node, { onRecoverableError: function (e) { console.warn("[hydrate]", e && e.message); } });
        else create(el).render(node);
      } };
    },
  });
})();
`;

// ── 2. Prerender ────────────────────────────────────────────────────────────
function makeContext(pathname) {
  let captured = null;
  const noop = () => {};
  const ctx = {
    React,
    ReactDOM: { createRoot: () => ({ render: (node) => { captured = node; } }) },
    console, URL, URLSearchParams, setTimeout, clearTimeout,
    location: { pathname, search: "", hash: "", href: BASE + pathname, origin: BASE },
    navigator: { userAgent: "prerender" },
    document: {
      getElementById: () => ({}),
      querySelector: () => null,
      querySelectorAll: () => [],
      addEventListener: noop,
      documentElement: { style: { setProperty: noop }, setAttribute: noop, hasAttribute: () => true },
      body: { classList: { add: noop, remove: noop }, style: {} },
    },
    addEventListener: noop,
    removeEventListener: noop,
  };
  ctx.window = ctx.self = ctx.globalThis = ctx;
  vm.createContext(ctx);
  return { ctx, render: () => renderToString(captured) };
}

// React escapa el texto dentro de <style>, lo que rompe selectores con ">".
const fixStyles = (html) =>
  html.replace(/<style>([\s\S]*?)<\/style>/g, (_, css) =>
    "<style>" + css.replace(/&gt;/g, ">").replace(/&lt;/g, "<").replace(/&quot;/g, '"').replace(/&#x27;/g, "'").replace(/&amp;/g, "&") + "</style>");

// ── 3. <head> por página ────────────────────────────────────────────────────
const ORG_ID = `${BASE}/#organization`;
const SOCIAL = ["https://www.instagram.com/glamourgeekmx/", "https://www.facebook.com/GlamourGeekMX/"];

const organization = {
  "@type": "Organization",
  "@id": ORG_ID,
  name: "GlamourGeek",
  url: BASE,
  logo: { "@type": "ImageObject", url: `${BASE}/assets/glamourgeek-logo-800.png`, width: 800, height: 403 },
  description: "Agencia de marketing digital y desarrollo de software en México",
  foundingDate: String(FOUNDED),
  email: "hola@glamourgeek.com.mx",
  telephone: "+52 998 241 6655",
  address: { "@type": "PostalAddress", addressLocality: "Cancún", addressRegion: "Quintana Roo", addressCountry: "MX" },
  areaServed: { "@type": "Country", name: "México" },
  sameAs: SOCIAL,
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "sales",
    telephone: "+52 998 241 6655",
    email: "hola@glamourgeek.com.mx",
    availableLanguage: ["Spanish", "English"],
  },
};
const orgRef = { "@type": "Organization", "@id": ORG_ID, name: "GlamourGeek", url: BASE };

const breadcrumb = (items) => ({
  "@type": "BreadcrumbList",
  itemListElement: items.map(([name, path], i) => ({ "@type": "ListItem", position: i + 1, name, item: BASE + path })),
});
const faqPage = (faqs) => ({
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
});
const graph = (...nodes) => ({ "@context": "https://schema.org", "@graph": nodes });

function headFor(route, data) {
  const { kind, item } = route;
  const url = BASE + route.path;
  const ogDefault = `${BASE}/assets/og-glamourgeek.jpg`;

  if (kind === "home") {
    return {
      title: "GlamourGeek: Agencia de Marketing Digital y Software, México",
      description: "Agencia de marketing digital y desarrollo de software en Cancún, México. SEO, Google Ads, desarrollo web, apps y automatización con IA. +120 proyectos.",
      ogType: "website", ogImage: ogDefault,
      jsonld: graph(
        organization,
        {
          "@type": "ProfessionalService",
          "@id": `${BASE}/#business`,
          name: "GlamourGeek",
          url: BASE,
          image: ogDefault,
          description: "Agencia especializada en marketing digital, desarrollo web, apps móviles y automatización con inteligencia artificial en México",
          priceRange: "$$",
          telephone: organization.telephone,
          email: organization.email,
          address: organization.address,
          areaServed: organization.areaServed,
          sameAs: SOCIAL,
          parentOrganization: { "@id": ORG_ID },
          hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: "Servicios digitales",
            itemListElement: [
              ...data.services.map((s) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: s.title, url: `${BASE}/servicios/${s.id}` } })),
              ...data.aiServices.map((s) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: s.title, url: `${BASE}/servicios/ia/${s.id}` } })),
            ],
          },
        },
        { "@type": "WebSite", "@id": `${BASE}/#website`, url: BASE, name: "GlamourGeek", publisher: { "@id": ORG_ID }, inLanguage: "es-MX" },
        faqPage(data.faqs),
      ),
    };
  }

  if (kind === "servicio" || kind === "ia") {
    const isIA = kind === "ia";
    return {
      title: item.metaTitle,
      description: item.metaDesc,
      ogType: "website", ogImage: ogDefault,
      jsonld: graph(
        {
          "@type": "Service",
          "@id": url,
          name: item.title,
          serviceType: item.title,
          description: item.metaDesc,
          url,
          provider: orgRef,
          areaServed: { "@type": "Country", name: "México" },
          inLanguage: "es-MX",
          ...(item.features ? {
            hasOfferCatalog: {
              "@type": "OfferCatalog",
              name: item.title,
              itemListElement: item.features.map((f) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: f.title, description: f.desc } })),
            },
          } : {}),
        },
        breadcrumb([["Inicio", "/"], [isIA ? "Agencia de IA" : "Servicios", isIA ? "/#ia" : "/#servicios"], [item.title, route.path]]),
        ...(item.faq && item.faq.length ? [faqPage(item.faq)] : []),
      ),
    };
  }

  if (kind === "proyecto") {
    return {
      title: `${item.client} — Caso de éxito | GlamourGeek`,
      description: trimTo(`${item.client} · ${item.tag} — ${item.desc} Caso de éxito de GlamourGeek, agencia digital en México.`, 158),
      ogType: "article", ogImage: `${BASE}/assets/screenshots/${item.id}.jpg`,
      jsonld: graph(
        {
          "@type": "CreativeWork",
          "@id": url,
          name: item.client,
          headline: `${item.client}: ${item.result}`,
          description: item.longDesc,
          url,
          image: `${BASE}/assets/screenshots/${item.id}.jpg`,
          about: item.industry,
          keywords: item.services.join(", "),
          creator: orgRef,
          ...(item.url ? { sameAs: item.url } : {}),
          inLanguage: "es-MX",
        },
        breadcrumb([["Inicio", "/"], ["Portafolio", "/proyectos"], [item.client, route.path]]),
      ),
    };
  }

  if (kind === "proyectos") {
    const n = data.portfolio.length;
    return {
      title: "Portafolio de Proyectos y Casos de Éxito | GlamourGeek",
      description: `${n} casos de éxito y ${data.apps.length} apps en App Store y Google Play: marketplaces, SaaS y sitios corporativos de GlamourGeek, agencia digital en México.`,
      ogType: "website", ogImage: ogDefault,
      jsonld: graph(
        {
          "@type": "CollectionPage",
          "@id": url,
          name: "Portafolio de proyectos — GlamourGeek",
          url,
          publisher: orgRef,
          inLanguage: "es-MX",
          mainEntity: {
            "@type": "ItemList",
            itemListElement: data.portfolio.map((p, i) => ({ "@type": "ListItem", position: i + 1, name: p.client, url: `${BASE}/proyectos/${p.id}` })),
          },
        },
        ...data.apps.map((app) => ({
          "@type": "MobileApplication",
          "@id": `${url}#app-${app.id}`,
          name: app.name,
          description: app.desc,
          applicationCategory: app.category,
          operatingSystem: app.googlePlay ? "iOS, Android" : "iOS",
          image: `${BASE}/assets/apps/${app.id}-icon.webp`,
          installUrl: app.appStore,
          sameAs: [app.appStore, app.googlePlay].filter(Boolean),
          offers: { "@type": "Offer", price: "0", priceCurrency: "MXN" },
          creator: orgRef,
        })),
        breadcrumb([["Inicio", "/"], ["Portafolio", "/proyectos"]]),
      ),
    };
  }

  if (kind === "nosotros") {
    return {
      title: "Nosotros | GlamourGeek, Agencia Digital en Cancún, México",
      description: "Conoce a GlamourGeek: agencia de marketing digital, desarrollo de software e inteligencia artificial con sede en Cancún, México. +120 proyectos desde 2015.",
      ogType: "website", ogImage: ogDefault,
      jsonld: graph(
        { "@type": "AboutPage", "@id": url, name: "Nosotros — GlamourGeek", url, about: { "@id": ORG_ID }, inLanguage: "es-MX" },
        organization,
        breadcrumb([["Inicio", "/"], ["Nosotros", "/nosotros"]]),
      ),
    };
  }
  throw new Error("Ruta sin head: " + route.path);
}

const FONTS = "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap";

function page({ head, path, bodyHtml, scripts = [], extras = [], assets, noindex = false }) {
  const url = BASE + path;
  const ld = head.jsonld ? `<script type="application/ld+json">${JSON.stringify(head.jsonld).replace(/</g, "\\u003c")}</script>` : "";
  return `<!DOCTYPE html>
<html lang="es-MX" data-prerendered="1">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${esc(head.title)}</title>
<meta name="description" content="${esc(head.description)}">
${noindex ? '<meta name="robots" content="noindex">' : `<link rel="canonical" href="${url}">`}
<meta name="theme-color" content="#07080C">
<meta property="og:type" content="${head.ogType || "website"}">
<meta property="og:url" content="${url}">
<meta property="og:site_name" content="GlamourGeek">
<meta property="og:locale" content="es_MX">
<meta property="og:title" content="${esc(head.title)}">
<meta property="og:description" content="${esc(head.description)}">
<meta property="og:image" content="${head.ogImage}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(head.title)}">
<meta name="twitter:description" content="${esc(head.description)}">
<meta name="twitter:image" content="${head.ogImage}">
${ld}
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="${FONTS}" rel="stylesheet">
<link rel="stylesheet" href="${assets.css}">
<link rel="icon" type="image/png" sizes="32x32" href="/assets/favicon-32.png">
<link rel="apple-touch-icon" href="/assets/apple-touch-icon.png">
</head>
<body>
<div id="root">${bodyHtml}</div>
${scripts.map((s) => `<script defer src="${s}"></script>`).join("\n")}
${extras.map((s) => `<script>\n${s}\n</script>`).join("\n")}
</body>
</html>
`;
}

// ── Build ───────────────────────────────────────────────────────────────────
async function main() {
  const t0 = Date.now();
  await rm(DIST, { recursive: true, force: true });
  await mkdir(join(DIST, "static"), { recursive: true });

  const assets = {};
  const emit = async (name, ext, content) => {
    const file = `/static/${name}.${hash(content)}.${ext}`;
    await writeFile(join(DIST, file), content);
    return file;
  };

  // CSS
  const css = await transform(await read("styles.css"), { loader: "css", minify: true });
  assets.css = await emit("styles", "css", css.code);

  // Vendor: React + ReactDOM servidos desde el propio dominio
  const vendor =
    (await read("node_modules/react/umd/react.production.min.js")) + "\n" +
    (await read("node_modules/react-dom/umd/react-dom.production.min.js"));
  assets.vendor = await emit("vendor", "js", vendor);

  // Compartido: config + hidratación + datos + analítica
  const configSrc = await read("config.js");
  const dataSrc = await read("data.jsx");
  const shared = await compile([configSrc, MOUNT_SHIM, dataSrc, await read("analytics.js")].join("\n;\n"));
  assets.shared = await emit("shared", "js", shared);
  const sharedSSR = await compile([configSrc, dataSrc].join("\n;\n"), false);

  // Datos para armar rutas y <head>
  const dataCtx = makeContext("/");
  vm.runInContext(sharedSSR, dataCtx.ctx);
  const data = dataCtx.ctx.GG_DATA;

  // Bundles por plantilla
  const tpl = {};
  for (const [name, file] of Object.entries(TEMPLATES)) {
    const { chunks, extras } = await parseTemplate(file);
    const parts = [];
    for (const c of chunks) {
      if (c.file === "data.jsx") continue; // ya va en shared
      if (c.file === "tweaks-panel.jsx") { parts.push(TWEAKS_STUB); continue; }
      parts.push(c.file ? await read(c.file) : c.code);
    }
    const src = parts.join("\n;\n");
    tpl[name] = {
      js: await emit(name, "js", await compile(src)),
      ssr: new vm.Script(await compile(src, false), { filename: file }),
      extras,
    };
  }
  const sharedScript = new vm.Script(sharedSSR, { filename: "shared" });

  // Rutas
  const routes = [
    { path: "/", out: "index.html", kind: "home", tpl: "home" },
    ...data.services.map((s) => ({ path: `/servicios/${s.id}`, out: `servicios/${s.id}.html`, kind: "servicio", tpl: "servicio", item: s })),
    ...data.aiServices.map((s) => ({ path: `/servicios/ia/${s.id}`, out: `servicios/ia/${s.id}.html`, kind: "ia", tpl: "ia", item: s })),
    { path: "/proyectos", out: "proyectos/index.html", kind: "proyectos", tpl: "proyectos" },
    ...data.portfolio.map((p) => ({ path: `/proyectos/${p.id}`, out: `proyectos/${p.id}.html`, kind: "proyecto", tpl: "proyecto", item: p })),
    { path: "/nosotros", out: "nosotros.html", kind: "nosotros", tpl: "nosotros" },
  ];

  const warnings = [];
  for (const r of routes) {
    const { ctx, render } = makeContext(r.path);
    sharedScript.runInContext(ctx);
    tpl[r.tpl].ssr.runInContext(ctx);
    const bodyHtml = fixStyles(render());
    const head = headFor(r, data);
    if (head.title.length > 60) warnings.push(`title > 60 (${head.title.length}): ${r.path}`);
    if (head.description.length > 160) warnings.push(`description > 160 (${head.description.length}): ${r.path}`);
    const html = page({
      head, path: r.path, bodyHtml, assets,
      scripts: [assets.vendor, assets.shared, tpl[r.tpl].js],
      extras: tpl[r.tpl].extras,
    });
    await mkdir(dirname(join(DIST, r.out)), { recursive: true });
    await writeFile(join(DIST, r.out), html);
  }

  // 404
  await writeFile(join(DIST, "404.html"), page({
    head: { title: "Página no encontrada | GlamourGeek", description: "La página que buscas no existe o cambió de dirección.", ogImage: `${BASE}/assets/og-glamourgeek.jpg` },
    path: "/404", noindex: true, assets,
    bodyHtml: `<div class="noise"></div><main style="min-height:100vh;display:flex;align-items:center;justify-content:center;text-align:center;padding:40px 24px"><div>
<span class="eyebrow">/ Error 404</span>
<h1 style="margin-top:16px">Esta página no existe.</h1>
<p class="body-lg" style="margin:24px auto 0;max-width:520px;color:var(--fg-1)">Puede que el enlace esté roto o que la página haya cambiado de dirección.</p>
<div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap;margin-top:36px">
<a class="btn btn-primary" href="/">Ir al inicio</a>
<a class="btn btn-ghost" href="/#servicios">Ver servicios</a>
<a class="btn btn-ghost" href="/proyectos">Ver portafolio</a>
</div></div></main>`,
  }));

  // sitemap.xml
  const prio = { home: "1.0", servicio: "0.9", ia: "0.9", proyectos: "0.8", nosotros: "0.7", proyecto: "0.6" };
  await writeFile(join(DIST, "sitemap.xml"),
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    routes.map((r) => `  <url><loc>${BASE}${r.path}</loc><lastmod>${TODAY}</lastmod><priority>${prio[r.kind]}</priority></url>`).join("\n") +
    `\n</urlset>\n`);

  // llms.txt
  const line = (title, path, desc) => `- [${title}](${BASE}${path}): ${desc}`;
  await writeFile(join(DIST, "llms.txt"), [
    "# GlamourGeek",
    "",
    `> Agencia de marketing digital, desarrollo de software e inteligencia artificial con sede en Cancún, México. Fundada en ${FOUNDED}, con más de 120 proyectos entregados para clientes en México y Latinoamérica. Atiende en español e inglés.`,
    "",
    "Contacto: hola@glamourgeek.com.mx · WhatsApp +52 998 241 6655 · " + BASE + "/#contacto",
    "",
    "## Servicios",
    ...data.services.map((s) => line(s.title, `/servicios/${s.id}`, s.desc)),
    "",
    "## Servicios de inteligencia artificial",
    ...data.aiServices.map((s) => line(s.title, `/servicios/ia/${s.id}`, s.desc)),
    "",
    "## Casos de éxito",
    ...data.portfolio.map((p) => line(p.client, `/proyectos/${p.id}`, `${p.tag}. ${p.desc}`)),
    "",
    "## Apps móviles publicadas",
    ...data.apps.map((a) => `- [${a.name}](${a.appStore}): ${a.category}. ${a.desc}${a.googlePlay ? ` También en Google Play: ${a.googlePlay}` : ""}`),
    "",
    "## Empresa",
    line("Nosotros", "/nosotros", "Historia, valores y forma de trabajo de la agencia."),
    line("Portafolio", "/proyectos", "Listado completo de proyectos."),
    "",
    "## Preguntas frecuentes",
    ...data.faqs.map((f) => `- **${f.q}** ${f.a}`),
    "",
  ].join("\n"));

  // Estáticos
  await cp(join(ROOT, "assets"), join(DIST, "assets"), {
    recursive: true,
    filter: (src) => !/\.(py|DS_Store)$/.test(src),
  });
  await cp(join(ROOT, "robots.txt"), join(DIST, "robots.txt"));

  console.log(`✓ ${routes.length} páginas + 404 en dist/ (${Date.now() - t0} ms)`);
  for (const [k, v] of Object.entries(assets)) console.log(`  ${k.padEnd(7)} ${v}`);
  if (warnings.length) console.log("Avisos:\n  " + warnings.join("\n  "));
}

main().catch((e) => { console.error(e); process.exit(1); });
