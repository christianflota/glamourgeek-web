/* global React, GGNav, GGHero, GGServices, GGProcess, GGPortfolio, GGFAQ, GGMarquee, GGContact, GGFooter, useTweaks, TweaksPanel, TweakSection, TweakRadio, TweakColor, TweakSelect, TweakToggle */

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "variant": "neon",
  "accent": "#4DD8FF",
  "fontPair": "grotesk",
  "theme": "dark",
  "customCursor": false
}/*EDITMODE-END*/;

function GGApp() {
  const [tweaks, setTweak] = useTweaks(TWEAK_DEFAULTS);

  // Apply theme
  React.useEffect(() => {
    document.documentElement.setAttribute("data-theme", tweaks.theme);
  }, [tweaks.theme]);

  // Apply accent
  React.useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--accent", tweaks.accent);
    // derive glow
    const hex = tweaks.accent.replace("#", "");
    const r = parseInt(hex.slice(0, 2), 16);
    const g = parseInt(hex.slice(2, 4), 16);
    const b = parseInt(hex.slice(4, 6), 16);
    root.style.setProperty("--accent-glow", `rgba(${r},${g},${b},0.55)`);
    root.style.setProperty("--accent-glow-soft", `rgba(${r},${g},${b},0.18)`);
  }, [tweaks.accent]);

  // Apply font pair
  React.useEffect(() => {
    const root = document.documentElement;
    const pairs = {
      grotesk: { display: '"Space Grotesk", "Inter", sans-serif', body: '"Inter", sans-serif' },
      editorial: { display: '"Fraunces", Georgia, serif', body: '"Inter", sans-serif' },
      mono: { display: '"JetBrains Mono", monospace', body: '"Inter", sans-serif' },
      bold: { display: '"Archivo Black", "Inter", sans-serif', body: '"Inter", sans-serif' },
    };
    const p = pairs[tweaks.fontPair] || pairs.grotesk;
    root.style.setProperty("--font-display", p.display);
    root.style.setProperty("--font-body", p.body);
  }, [tweaks.fontPair]);

  // Custom cursor
  const dotRef = React.useRef(null);
  const ringRef = React.useRef(null);
  React.useEffect(() => {
    if (!tweaks.customCursor) {
      document.body.classList.remove("has-custom-cursor");
      return;
    }
    document.body.classList.add("has-custom-cursor");
    let dx = 0, dy = 0, rx = 0, ry = 0, mx = 0, my = 0;
    const onMove = (e) => { mx = e.clientX; my = e.clientY; };
    const tick = () => {
      dx += (mx - dx) * 0.6;
      dy += (my - dy) * 0.6;
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      if (dotRef.current) dotRef.current.style.transform = `translate3d(${dx-3}px, ${dy-3}px, 0)`;
      if (ringRef.current) ringRef.current.style.transform = `translate3d(${rx}px, ${ry}px, 0)`;
      raf = requestAnimationFrame(tick);
    };
    let raf = requestAnimationFrame(tick);
    window.addEventListener("mousemove", onMove);
    // hover effect on interactive
    const onOver = (e) => {
      if (e.target.closest("a, button")) ringRef.current?.classList.add("hover");
    };
    const onOut = (e) => {
      if (e.target.closest("a, button")) ringRef.current?.classList.remove("hover");
    };
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
      document.body.classList.remove("has-custom-cursor");
    };
  }, [tweaks.customCursor]);

  // Reveal on scroll
  React.useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("in"); });
    }, { threshold: 0.1 });
    document.querySelectorAll(".reveal").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  });

  return (
    <>
      {tweaks.customCursor && (
        <>
          <div ref={dotRef} className="cursor-dot" />
          <div ref={ringRef} className="cursor-ring" />
        </>
      )}
      <div className="noise" />
      <GGNav variant={tweaks.variant} />
      <main>
        <GGHero variant={tweaks.variant} />
        <GGMarquee />
        <GGServices variant={tweaks.variant} />
        <GGAIServices />
        <GGProcess />
        <GGPortfolio />
        <GGFAQ />
        <GGContact />
      </main>
      <GGFooter />

      <TweaksPanel label="Tweaks · GlamourGeek">
        <TweakSection label="Dirección visual">
          <TweakRadio
            label="Variante"
            value={tweaks.variant}
            options={[
              { value: "neon", label: "Neon" },
              { value: "editorial", label: "Editorial" },
              { value: "bento", label: "Bento" },
            ]}
            onChange={(v) => setTweak("variant", v)}
          />
        </TweakSection>

        <TweakSection label="Color de acento">
          <TweakColor
            label="Acento"
            value={tweaks.accent}
            options={["#4DD8FF", "#FF6B7E", "#9AFF3C", "#FFD93D", "#B388FF"]}
            onChange={(v) => setTweak("accent", v)}
          />
        </TweakSection>

        <TweakSection label="Tipografía">
          <TweakSelect
            label="Pareja"
            value={tweaks.fontPair}
            options={[
              { value: "grotesk", label: "Space Grotesk + Inter" },
              { value: "editorial", label: "Fraunces (serif) + Inter" },
              { value: "mono", label: "JetBrains Mono + Inter" },
              { value: "bold", label: "Archivo Black + Inter" },
            ]}
            onChange={(v) => setTweak("fontPair", v)}
          />
        </TweakSection>

        <TweakSection label="Modo">
          <TweakRadio
            label="Tema"
            value={tweaks.theme}
            options={[
              { value: "dark", label: "Oscuro" },
              { value: "light", label: "Claro" },
            ]}
            onChange={(v) => setTweak("theme", v)}
          />
          <TweakToggle
            label="Cursor custom"
            value={tweaks.customCursor}
            onChange={(v) => setTweak("customCursor", v)}
          />
        </TweakSection>
      </TweaksPanel>
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<GGApp />);
