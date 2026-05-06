/* global React, GGIcon */

window.GGServices = function GGServices({ variant }) {
  const services = window.GG_DATA.services;
  const [active, setActive] = React.useState(0);

  if (variant === "bento") return <GGServicesBento />;

  return (
    <section id="servicios" style={{ padding: "140px 0 100px", position: "relative" }}>
      <div className="container">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 24, marginBottom: 64 }}>
          <div>
            <span className="eyebrow">/ 01 — Servicios</span>
            <h2 style={{ marginTop: 16, maxWidth: 720 }}>
              Nueve formas de hacer que tu marca <span style={{ color: "var(--accent)" }}>destaque</span>.
            </h2>
          </div>
          <p className="body" style={{ maxWidth: 360 }}>
            Cada servicio se cotiza por separado. Combina varios y aplicamos descuentos por paquete.
          </p>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 0,
          border: "1px solid var(--line)",
          borderRadius: "var(--r-lg)",
          overflow: "hidden",
          background: "var(--bg-1)",
        }} className="services-grid">
          {services.map((s, i) => (
            <ServiceCell key={s.id} service={s} idx={i} active={active === i} onHover={() => setActive(i)} />
          ))}

        </div>
      </div>
      <style>{`
        @media (max-width: 980px) { .services-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 640px) { .services-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
};

function ServiceCell({ service, idx, active, onHover }) {
  const accentVar = service.color === "coral" ? "var(--brand-coral-bright)" : "var(--brand-cyan-bright)";
  const glowVar = service.color === "coral" ? "rgba(255,107,126,0.35)" : "rgba(77,216,255,0.35)";
  const col = idx % 3;
  const row = Math.floor(idx / 3);
  return (
    <a
      href={`/servicios/${service.id}`}
      onMouseEnter={onHover}
      style={{
        position: "relative",
        padding: "44px 36px 36px",
        borderRight: col < 2 ? "1px solid var(--line)" : "none",
        borderBottom: row < 2 ? "1px solid var(--line)" : "none",
        minHeight: 320,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        gap: 32,
        transition: "background 320ms ease",
        background: active ? "rgba(255,255,255,0.02)" : "transparent",
        cursor: "pointer",
        overflow: "hidden",
        textDecoration: "none", color: "inherit",
      }}
    >
      {/* hover glow */}
      <div style={{
        position: "absolute", inset: 0,
        background: `radial-gradient(circle at 30% 20%, ${glowVar}, transparent 60%)`,
        opacity: active ? 1 : 0,
        transition: "opacity 320ms ease",
        pointerEvents: "none",
      }} />

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", position: "relative", zIndex: 1 }}>
        <span className="font-mono caption" style={{ color: "var(--fg-3)" }}>{service.num}</span>
        <div style={{
          width: 56, height: 56,
          borderRadius: 14,
          border: "1px solid var(--line-strong)",
          display: "flex", alignItems: "center", justifyContent: "center",
          color: accentVar,
          background: active ? `linear-gradient(135deg, ${glowVar}, transparent)` : "transparent",
          transition: "all 320ms",
        }}>
          <GGIcon name={service.icon} size={26} />
        </div>
      </div>

      <div style={{ position: "relative", zIndex: 1 }}>
        <h3 style={{ marginBottom: 6 }}>{service.title}</h3>
        <p className="caption" style={{ color: accentVar, marginBottom: 16, fontStyle: "italic" }}>{service.tagline}</p>
        <p className="body-sm" style={{ marginBottom: 20 }}>{service.desc}</p>
        <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 8 }}>
          {service.bullets.map((b) => (
            <li key={b} className="caption" style={{ display: "flex", gap: 10, alignItems: "center", color: "var(--fg-1)", textTransform: "none", letterSpacing: 0, fontFamily: "var(--font-body)", fontSize: 13 }}>
              <span style={{ color: accentVar }}><GGIcon name="check" size={14} stroke={2.4} /></span>
              {b}
            </li>
          ))}
        </ul>
        <div style={{ marginTop: 24, display: "flex", alignItems: "center", gap: 6, color: accentVar, fontFamily: "var(--font-mono)", fontSize: 11 }}>
          Ver servicio
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17L17 7M8 7h9v9"/></svg>
        </div>
      </div>
    </a>
  );
}

function GGServicesBento() {
  const services = window.GG_DATA.services;
  return (
    <section id="servicios" style={{ padding: "140px 0 100px" }}>
      <div className="container">
        <div style={{ marginBottom: 64 }}>
          <span className="eyebrow">/ 01 — Servicios</span>
          <h2 style={{ marginTop: 16, maxWidth: 720 }}>
            Nueve servicios. Un solo equipo.
          </h2>
        </div>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 14,
        }} className="services-bento">
          {services.map((s, i) => {
            const accentColor = s.color === "coral" ? "var(--brand-coral)" : "var(--brand-cyan)";
            const span = i === 0 || i === 5 ? "span 2" : "span 1";
            return (
              <div key={s.id} style={{
                gridColumn: span,
                background: "var(--bg-1)",
                border: "1px solid var(--line)",
                borderRadius: "var(--r-lg)",
                padding: 24,
                minHeight: 240,
                display: "flex", flexDirection: "column", justifyContent: "space-between",
                transition: "all 240ms ease",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = accentColor; e.currentTarget.style.color = "#07080C"; e.currentTarget.style.borderColor = accentColor; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "var(--bg-1)"; e.currentTarget.style.color = ""; e.currentTarget.style.borderColor = "var(--line)"; }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <span className="caption">{s.num}</span>
                  <GGIcon name={s.icon} size={28} />
                </div>
                <div>
                  <h3 style={{ marginBottom: 6 }}>{s.title}</h3>
                  <p className="body-sm" style={{ color: "inherit", opacity: 0.7 }}>{s.tagline}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <style>{`
        @media (max-width: 980px) { .services-bento { grid-template-columns: repeat(2,1fr) !important; } .services-bento > div { grid-column: span 1 !important; } }
      `}</style>
    </section>
  );
}

// ============================================================
// PROCESO
// ============================================================
window.GGProcess = function GGProcess() {
  const [active, setActive] = React.useState(0);
  const steps = window.GG_DATA.process;
  return (
    <section id="proceso" style={{ padding: "120px 0", borderTop: "1px solid var(--line)" }}>
      <div className="container">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "start" }} className="process-grid">
          <div style={{ position: "sticky", top: 120 }}>
            <span className="eyebrow">/ 02 — Proceso</span>
            <h2 style={{ marginTop: 16 }}>
              Cómo trabajamos.
            </h2>
            <p className="body-lg" style={{ marginTop: 24, color: "var(--fg-1)", maxWidth: 420 }}>
              Sin sorpresas, sin sobrecostos. Cada fase tiene entregables, fechas y criterios de aceptación claros.
            </p>
            <div style={{ marginTop: 40, display: "flex", gap: 12, flexWrap: "wrap" }}>
              {steps.map((s, i) => (
                <button key={s.step} onClick={() => setActive(i)} style={{
                  padding: "8px 14px", borderRadius: 999,
                  border: `1px solid ${active === i ? "var(--accent)" : "var(--line-strong)"}`,
                  color: active === i ? "var(--accent)" : "var(--fg-1)",
                  background: active === i ? "var(--accent-glow-soft)" : "transparent",
                  fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.1em",
                  transition: "all 200ms",
                }}>
                  {s.step}
                </button>
              ))}
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            {steps.map((s, i) => (
              <div
                key={s.step}
                onMouseEnter={() => setActive(i)}
                style={{
                  padding: "32px 28px",
                  borderTop: "1px solid var(--line)",
                  borderBottom: i === steps.length - 1 ? "1px solid var(--line)" : "none",
                  display: "grid",
                  gridTemplateColumns: "60px 1fr auto",
                  gap: 24,
                  alignItems: "start",
                  background: active === i ? "rgba(255,255,255,0.02)" : "transparent",
                  transition: "all 240ms",
                  cursor: "pointer",
                  position: "relative",
                }}
              >
                <span className="font-mono" style={{ color: active === i ? "var(--accent)" : "var(--fg-3)", fontSize: 14 }}>{s.step}</span>
                <div>
                  <h3 style={{ fontSize: 22, marginBottom: 8 }}>{s.title}</h3>
                  <p className="body-sm" style={{
                    maxHeight: active === i ? 200 : 0,
                    overflow: "hidden",
                    opacity: active === i ? 1 : 0,
                    transition: "all 320ms ease",
                  }}>{s.desc}</p>
                </div>
                <div style={{ color: active === i ? "var(--accent)" : "var(--fg-3)", transition: "color 200ms" }}>
                  <GGIcon name="arrow-up-right" size={20} stroke={1.8} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <style>{`
        @media (max-width: 900px) {
          .process-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
          .process-grid > div:first-child { position: static !important; }
        }
      `}</style>
    </section>
  );
};
