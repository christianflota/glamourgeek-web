// Analítica: carga GA4 y Meta Pixel solo si hay IDs en config.js.
// Expone window.ggTrack(evento, params) para conversiones.
(function () {
  var cfg = window.GG_CONFIG || {};
  var ga = cfg.ga4Id, px = cfg.metaPixelId;

  if (ga) {
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag("js", new Date());
    window.gtag("config", ga);
    var s = document.createElement("script");
    s.async = true;
    s.src = "https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(ga);
    document.head.appendChild(s);
  }

  if (px) {
    var fbq = (window.fbq = function () {
      fbq.callMethod ? fbq.callMethod.apply(fbq, arguments) : fbq.queue.push(arguments);
    });
    window._fbq = fbq; fbq.push = fbq; fbq.loaded = true; fbq.version = "2.0"; fbq.queue = [];
    var p = document.createElement("script");
    p.async = true;
    p.src = "https://connect.facebook.net/en_US/fbevents.js";
    document.head.appendChild(p);
    fbq("init", px);
    fbq("track", "PageView");
  }

  // Eventos: generate_lead (formulario), contact_whatsapp, contact_email, book_call
  var META_EVENTS = { generate_lead: "Lead", contact_whatsapp: "Contact", contact_email: "Contact", book_call: "Schedule" };
  window.ggTrack = function (name, params) {
    if (window.gtag) window.gtag("event", name, params || {});
    if (window.fbq && META_EVENTS[name]) window.fbq("track", META_EVENTS[name], params || {});
  };

  document.addEventListener("click", function (e) {
    var a = e.target.closest && e.target.closest("a[href]");
    if (!a) return;
    var href = a.getAttribute("href") || "";
    if (href.indexOf("wa.me/") !== -1) window.ggTrack("contact_whatsapp", { page: location.pathname });
    else if (href.indexOf("mailto:") === 0) window.ggTrack("contact_email", { page: location.pathname });
  });
})();
