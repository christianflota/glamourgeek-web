/* global React, GGIcon */
const { useState: useStateNav, useEffect: useEffectNav } = React;

window.GGNav = function GGNav({ variant }) {
  const [scrolled, setScrolled] = useStateNav(false);
  const [open, setOpen] = useStateNav(false);
  useEffectNav(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        padding: scrolled ? "10px 0" : "20px 0",
        transition: "padding 240ms ease",
      }}
    >
      <div
        className="container"
        style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: scrolled ? "10px 24px" : "12px 28px",
          margin: "0 auto",
          maxWidth: 1320,
          background: scrolled ? "rgba(12, 14, 20, 0.72)" : "transparent",
          backdropFilter: scrolled ? "blur(18px) saturate(140%)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(18px) saturate(140%)" : "none",
          border: scrolled ? "1px solid var(--line)" : "1px solid transparent",
          borderRadius: 999,
          transition: "all 240ms ease",
        }}
      >
        <a href="#top" style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <img
            src="assets/glamourgeek-isotipo.png"
            alt="GlamourGeek"
            style={{ height: 32, width: "auto" }}
          />
          <span
            className="font-display"
            style={{
              fontSize: 17, fontWeight: 700, letterSpacing: "-0.02em",
              display: "flex", gap: 4,
            }}
          >
            <span style={{ color: "var(--brand-cyan-bright)" }}>Glamour</span>
            <span style={{ color: "var(--brand-coral-bright)" }}>Geek</span>
          </span>
        </a>

        <nav style={{ display: "flex", gap: 28, fontSize: 14 }} className="gg-nav-links">
          {[
            ["Servicios", "#servicios"],
            ["IA", "#ia"],
            ["Proceso", "#proceso"],
            ["Trabajo", "#portafolio"],
            ["FAQ", "#faq"],
          ].map(([label, href]) => (
            <a key={href} href={href} className="nav-link"
              style={{ color: "var(--fg-1)", fontWeight: 500, transition: "color 200ms" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--fg-1)")}
            >
              {label}
            </a>
          ))}
        </nav>

        <a href="#contacto" className="btn btn-primary" style={{ padding: "10px 18px", fontSize: 14 }}>
          Cotiza tu proyecto
          <GGIcon name="arrow-right" size={16} stroke={2} />
        </a>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .gg-nav-links { display: none !important; }
        }
      `}</style>
    </header>
  );
};

// ============================================================
// HERO — variant A: neon glow with floating hexagon
// ============================================================

window.GGHero = function GGHero({ variant }) {
  const [mouse, setMouse] = useStateNav({ x: 0, y: 0 });
  const ref = React.useRef(null);

  useEffectNav(() => {
    const onMove = (e) => {
      if (!ref.current) return;
      const r = ref.current.getBoundingClientRect();
      setMouse({
        x: ((e.clientX - r.left) / r.width - 0.5) * 2,
        y: ((e.clientY - r.top) / r.height - 0.5) * 2,
      });
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  if (variant === "editorial") return <GGHeroEditorial />;
  if (variant === "bento") return <GGHeroBento />;

  // Variant A: NEON
  return (
    <section
      id="top"
      ref={ref}
      className="scanlines"
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        paddingTop: 140,
        paddingBottom: 80,
        overflow: "hidden",
      }}
    >
      {/* radial bg glow */}
      <div style={{
        position: "absolute", inset: "-20%",
        background: `
          radial-gradient(circle at 30% 40%, var(--accent-glow-soft), transparent 45%),
          radial-gradient(circle at 70% 70%, rgba(255,107,126,0.15), transparent 50%)
        `,
        filter: "blur(40px)",
        zIndex: 0,
        transform: `translate(${mouse.x * 20}px, ${mouse.y * 20}px)`,
        transition: "transform 200ms ease-out",
      }} />

      {/* grid floor */}
      <div style={{
        position: "absolute", left: 0, right: 0, bottom: 0, height: "55%",
        backgroundImage: `
          linear-gradient(var(--line) 1px, transparent 1px),
          linear-gradient(90deg, var(--line) 1px, transparent 1px)
        `,
        backgroundSize: "60px 60px",
        maskImage: "linear-gradient(to top, black, transparent 90%)",
        WebkitMaskImage: "linear-gradient(to top, black, transparent 90%)",
        transform: `perspective(800px) rotateX(60deg)`,
        transformOrigin: "bottom",
        opacity: 0.5,
        zIndex: 0,
      }} />

      <div className="container" style={{ position: "relative", zIndex: 2, width: "100%" }}>
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 32 }}>
          <span className="pill">
            <span className="dot"></span>
            Servicios 2025 · Disponible para nuevos proyectos
          </span>
        </div>

        <h1 style={{ textAlign: "center", maxWidth: 1100, margin: "0 auto" }}>
          <span style={{ color: "var(--fg-0)" }}>Marketing digital</span>{" "}
          <span style={{ color: "var(--fg-2)" }}>+</span>{" "}
          <span
            style={{
              background: "linear-gradient(135deg, var(--brand-cyan-bright), var(--brand-coral-bright))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              filter: "drop-shadow(0 0 32px var(--accent-glow))",
            }}
          >
            código que vende.
          </span>
        </h1>

        <p
          className="body-lg"
          style={{
            textAlign: "center", maxWidth: 640, margin: "32px auto 0",
            color: "var(--fg-1)",
          }}
        >
          Somos la agencia que une estrategia de marca con desarrollo serio.
          Apps, e-commerce, SEO, contenido — todo bajo un solo techo.
        </p>

        <div style={{
          display: "flex", gap: 14, justifyContent: "center", marginTop: 40, flexWrap: "wrap",
        }}>
          <a href="#contacto" className="btn btn-primary">
            Cotiza tu proyecto
            <GGIcon name="arrow-right" size={16} stroke={2} />
          </a>
          <a href="#servicios" className="btn btn-ghost">Ver servicios</a>
        </div>

        {/* stats strip */}
        <div className="stats-grid" style={{
          marginTop: 100,
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 0,
          borderTop: "1px solid var(--line)",
          borderBottom: "1px solid var(--line)",
        }}>
          {window.GG_DATA.stats.map((s, i) => (
            <div key={s.label} className={`stat-cell stat-cell-${i}`} style={{
              padding: "28px 24px",
              borderRight: i < 3 ? "1px solid var(--line)" : "none",
              textAlign: "center",
            }}>
              <div className="font-display" style={{
                fontSize: "clamp(28px, 3.4vw, 44px)",
                fontWeight: 700,
                letterSpacing: "-0.03em",
                color: "var(--fg-0)",
                lineHeight: 1,
              }}>{s.value}</div>
              <div className="caption" style={{ marginTop: 10, color: "var(--fg-2)" }}>{s.label}</div>
            </div>
          ))}
        </div>
        <style>{`
          @media (max-width: 600px) {
            .stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
            .stat-cell-1 { border-right: none !important; }
            .stat-cell-2 { border-top: 1px solid var(--line); border-right: 1px solid var(--line) !important; }
            .stat-cell-3 { border-top: 1px solid var(--line); border-right: none !important; }
          }
        `}</style>
      </div>

      <style>{`
        @media (max-width: 720px) {
          #top .body-lg { font-size: 16px; }
        }
      `}</style>
    </section>
  );
};

// Editorial variant — big type, asymmetric
window.GGHeroEditorial = function GGHeroEditorial() {
  return (
    <section id="top" style={{
      position: "relative",
      minHeight: "100vh",
      paddingTop: 140,
      paddingBottom: 80,
      display: "flex",
      alignItems: "center",
      overflow: "hidden",
    }}>
      <div className="container" style={{ position: "relative", zIndex: 2, width: "100%" }}>
        <div style={{ marginBottom: 40 }}>
          <span className="pill">
            <span className="dot"></span> Servicios 2025
          </span>
        </div>
        <h1 style={{
          fontSize: "clamp(56px, 11vw, 180px)",
          lineHeight: 0.88,
          letterSpacing: "-0.045em",
          maxWidth: "100%",
        }}>
          <span style={{ display: "block" }}>
            Hacemos que tu marca
          </span>
          <span style={{ display: "block", color: "var(--brand-cyan-bright)", fontStyle: "italic" }}>
            destaque
          </span>
          <span style={{ display: "block" }}>
            en un mundo digital
          </span>
          <span style={{ display: "block", color: "var(--brand-coral-bright)" }}>
            saturado.
          </span>
        </h1>

        <div style={{
          marginTop: 60,
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 60,
          alignItems: "end",
        }} className="hero-ed-grid">
          <p className="body-lg" style={{ maxWidth: 480 }}>
            Somos GlamourGeek. Marketing digital + desarrollo de software.
            Una agencia que entiende tanto Excel como TypeScript.
          </p>
          <div style={{ display: "flex", gap: 14, justifyContent: "flex-end", flexWrap: "wrap" }}>
            <a href="#contacto" className="btn btn-primary">
              Cotiza tu proyecto
              <GGIcon name="arrow-right" size={16} stroke={2} />
            </a>
            <a href="#servicios" className="btn btn-ghost">Ver servicios</a>
          </div>
        </div>
      </div>
      <style>{`
        @media (max-width: 720px) {
          .hero-ed-grid { grid-template-columns: 1fr !important; gap: 28px !important; }
        }
      `}</style>
    </section>
  );
};

// Bento variant
window.GGHeroBento = function GGHeroBento() {
  return (
    <section id="top" style={{
      position: "relative",
      minHeight: "100vh",
      paddingTop: 130,
      paddingBottom: 60,
      overflow: "hidden",
    }}>
      <div className="container" style={{ position: "relative", zIndex: 2 }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(6, 1fr)",
          gridAutoRows: "minmax(140px, auto)",
          gap: 16,
        }} className="hero-bento">
          {/* big title */}
          <div style={{
            gridColumn: "span 4", gridRow: "span 2",
            background: "linear-gradient(135deg, var(--brand-cyan), var(--brand-cyan-bright))",
            color: "#07080C",
            padding: 36,
            borderRadius: "var(--r-lg)",
            display: "flex", flexDirection: "column", justifyContent: "space-between",
            position: "relative", overflow: "hidden",
          }}>
            <span className="pill" style={{ alignSelf: "flex-start", color: "#07080C", borderColor: "rgba(0,0,0,0.2)", background: "rgba(255,255,255,0.2)" }}>
              <span className="dot" style={{ background: "#07080C", boxShadow: "none" }}></span>
              GlamourGeek · 2025
            </span>
            <h1 style={{ fontSize: "clamp(44px, 6vw, 80px)", lineHeight: 0.95, color: "#07080C" }}>
              Marketing digital + código que vende.
            </h1>
            {/* hexagon decoration */}
            <svg style={{ position: "absolute", right: -40, bottom: -40, opacity: 0.18 }} width="280" height="280" viewBox="0 0 100 100">
              <polygon points="50,5 90,28 90,72 50,95 10,72 10,28" fill="none" stroke="#07080C" strokeWidth="2"/>
              <polygon points="50,15 80,32 80,68 50,85 20,68 20,32" fill="none" stroke="#07080C" strokeWidth="2"/>
              <polygon points="50,25 70,36 70,64 50,75 30,64 30,36" fill="none" stroke="#07080C" strokeWidth="2"/>
            </svg>
          </div>

          {/* stat 1 */}
          <div style={{
            gridColumn: "span 2",
            background: "var(--bg-1)",
            border: "1px solid var(--line)",
            padding: 24,
            borderRadius: "var(--r-lg)",
            display: "flex", flexDirection: "column", justifyContent: "space-between",
          }}>
            <div className="caption" style={{ color: "var(--fg-2)" }}>Proyectos entregados</div>
            <div className="font-display" style={{ fontSize: 56, lineHeight: 1, color: "var(--brand-cyan-bright)" }}>120+</div>
          </div>

          {/* stat 2 */}
          <div style={{
            gridColumn: "span 2",
            background: "var(--brand-coral)",
            color: "#fff",
            padding: 24,
            borderRadius: "var(--r-lg)",
            display: "flex", flexDirection: "column", justifyContent: "space-between",
          }}>
            <div className="caption" style={{ color: "rgba(255,255,255,0.8)" }}>Clientes recurrentes</div>
            <div className="font-display" style={{ fontSize: 56, lineHeight: 1 }}>94%</div>
          </div>

          {/* CTA card */}
          <div style={{
            gridColumn: "span 4",
            background: "var(--bg-1)",
            border: "1px solid var(--line)",
            padding: 28,
            borderRadius: "var(--r-lg)",
            display: "flex", alignItems: "center", justifyContent: "space-between", gap: 20,
            flexWrap: "wrap",
          }}>
            <p className="body-lg" style={{ color: "var(--fg-1)", maxWidth: 420 }}>
              Apps, e-commerce, SEO, contenido — todo bajo un solo techo. Pregunta lo que necesitas.
            </p>
            <a href="#contacto" className="btn btn-primary">
              Cotiza tu proyecto
              <GGIcon name="arrow-right" size={16} stroke={2} />
            </a>
          </div>
        </div>
      </div>
      <style>{`
        @media (max-width: 860px) {
          .hero-bento { grid-template-columns: 1fr 1fr !important; }
          .hero-bento > div:nth-child(1) { grid-column: span 2 !important; }
          .hero-bento > div:nth-child(4) { grid-column: span 2 !important; }
        }
      `}</style>
    </section>
  );
};
