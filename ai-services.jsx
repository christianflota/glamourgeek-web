/* global React, GGIcon */

window.GGAIServices = function GGAIServices() {
  const items = window.GG_DATA.aiServices;
  const [active, setActive] = React.useState(0);

  return (
    <section id="ia" style={{ padding: "140px 0 100px", borderTop: "1px solid var(--line)", position: "relative", overflow: "hidden" }}>
      {/* aurora bg */}
      <div style={{
        position: "absolute", inset: 0,
        background: `
          radial-gradient(ellipse at 20% 30%, rgba(77,216,255,0.10), transparent 50%),
          radial-gradient(ellipse at 80% 70%, rgba(255,107,126,0.10), transparent 50%)
        `,
        pointerEvents: "none",
      }} />

      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 24, marginBottom: 48 }}>
          <div>
            <span className="eyebrow" style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
              <span style={{
                background: "linear-gradient(135deg, var(--brand-cyan-bright), var(--brand-coral-bright))",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                fontWeight: 700,
              }}>★ NUEVO</span>
              <span style={{ color: "var(--fg-3)" }}>/</span>
              <span>Agencia de IA</span>
            </span>
            <h2 style={{ marginTop: 16, maxWidth: 880 }}>
              Tu negocio,{" "}
              <span style={{
                background: "linear-gradient(135deg, var(--brand-cyan-bright), var(--brand-coral-bright))",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                filter: "drop-shadow(0 0 24px var(--accent-glow))",
              }}>
                en piloto automático
              </span>.
            </h2>
            <p className="body-lg" style={{ marginTop: 20, maxWidth: 560 }}>
              Implementamos inteligencia artificial donde más impacta — atención al cliente, ventas, contenido y operaciones. ROI medible, en semanas.
            </p>
          </div>

          {/* AI status pill */}
          <div style={{
            display: "flex", alignItems: "center", gap: 12,
            padding: "12px 18px",
            border: "1px solid var(--line-strong)",
            borderRadius: 999,
            background: "rgba(255,255,255,0.02)",
          }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <span className="caption" style={{ color: "var(--fg-3)" }}>Powered by</span>
              <span className="font-mono" style={{ fontSize: 13, color: "var(--fg-0)", letterSpacing: 0 }}>
                OpenAI · Anthropic · n8n · Make · APIs · GPT
              </span>
            </div>
          </div>
        </div>

        {/* Featured + grid layout */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1.4fr 1fr",
          gap: 16,
          marginBottom: 16,
        }} className="ai-hero-grid">
          {/* Featured: Automatización */}
          <FeaturedAICard service={items[0]} />

          {/* Side card: chatbots */}
          <AICard service={items[1]} active={active === 1} onHover={() => setActive(1)} large />
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 16,
        }} className="ai-grid">
          {items.slice(2).map((s, i) => (
            <AICard key={s.id} service={s} active={active === i+2} onHover={() => setActive(i+2)} />
          ))}
        </div>

        {/* CTA */}
        <div style={{
          marginTop: 48,
          padding: "32px 36px",
          border: "1px solid var(--line)",
          borderRadius: "var(--r-lg)",
          background: "linear-gradient(135deg, rgba(77,216,255,0.06), rgba(255,107,126,0.06))",
          display: "flex", justifyContent: "space-between", alignItems: "center", gap: 24, flexWrap: "wrap",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            <div style={{
              width: 56, height: 56, borderRadius: 16,
              background: "linear-gradient(135deg, var(--brand-cyan-bright), var(--brand-coral-bright))",
              display: "flex", alignItems: "center", justifyContent: "center",
              color: "#07080C",
              boxShadow: "0 0 40px var(--accent-glow)",
            }}>
              <GGIcon name="spark" size={28} stroke={2} />
            </div>
            <div>
              <h3 style={{ marginBottom: 4 }}>¿No sabes por dónde empezar?</h3>
              <p className="body-sm">Diagnóstico desde $999 MXN por 30 min. Identificamos los 3 procesos con mayor potencial de IA en tu negocio.</p>
            </div>
          </div>
          <button className="btn btn-primary" onClick={() => window.Cal && window.Cal("modal", { calLink: "christian-flota-idnkej" })}>
            Agendar diagnóstico
            <GGIcon name="arrow-right" size={16} stroke={2} />
          </button>
        </div>
      </div>

      <style>{`
        @media (max-width: 980px) {
          .ai-hero-grid { grid-template-columns: 1fr !important; }
          .ai-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 560px) {
          .ai-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
};

function FeaturedAICard({ service }) {
  const [hover, setHover] = React.useState(false);
  return (
    <a
      href={`servicios/ia.html?id=${service.id}`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        position: "relative",
        background: "var(--bg-1)",
        border: "1px solid var(--line)",
        borderRadius: "var(--r-lg)",
        padding: 36,
        minHeight: 360,
        display: "flex", flexDirection: "column", justifyContent: "space-between",
        overflow: "hidden",
        transition: "border-color 240ms",
        borderColor: hover ? "var(--brand-cyan-bright)" : "var(--line)",
        textDecoration: "none", color: "inherit",
      }}
    >
      {/* animated grid bg */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: `
          linear-gradient(var(--line) 1px, transparent 1px),
          linear-gradient(90deg, var(--line) 1px, transparent 1px)
        `,
        backgroundSize: "40px 40px",
        maskImage: "radial-gradient(ellipse at 80% 20%, black, transparent 70%)",
        WebkitMaskImage: "radial-gradient(ellipse at 80% 20%, black, transparent 70%)",
        opacity: 0.6,
      }} />

      {/* glow */}
      <div style={{
        position: "absolute", top: -100, right: -100, width: 400, height: 400,
        background: "radial-gradient(circle, rgba(77,216,255,0.25), transparent 60%)",
        filter: "blur(40px)",
        pointerEvents: "none",
        transition: "opacity 320ms",
        opacity: hover ? 1 : 0.6,
      }} />

      <div style={{ position: "relative", zIndex: 1, display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <span className="pill" style={{
          background: "linear-gradient(135deg, var(--brand-cyan-bright), var(--brand-coral-bright))",
          color: "#07080C", borderColor: "transparent", fontWeight: 700,
        }}>
          ★ Más vendido
        </span>
        <span className="font-mono caption" style={{ color: "var(--fg-3)" }}>{service.num}</span>
      </div>

      <div style={{ position: "relative", zIndex: 1 }}>
        {/* nodes diagram */}
        <svg width="100%" height="100" viewBox="0 0 400 100" style={{ marginBottom: 24, opacity: 0.7 }}>
          <g stroke="var(--brand-cyan-bright)" strokeWidth="1" fill="none" strokeDasharray="3 3">
            <path d="M40,50 Q120,20 200,50 T360,50" />
            <path d="M40,50 Q120,80 200,50 T360,50" />
          </g>
          {[40, 120, 200, 280, 360].map((x, i) => (
            <g key={x}>
              <circle cx={x} cy="50" r="6" fill={i === 2 ? "var(--brand-coral-bright)" : "var(--brand-cyan-bright)"}>
                {hover && <animate attributeName="r" values="6;9;6" dur="1.6s" begin={`${i*0.2}s`} repeatCount="indefinite" />}
              </circle>
              <circle cx={x} cy="50" r="14" fill="none" stroke={i === 2 ? "var(--brand-coral-bright)" : "var(--brand-cyan-bright)"} opacity="0.3" />
            </g>
          ))}
          <text x="40" y="85" fill="var(--fg-2)" fontSize="9" fontFamily="monospace" textAnchor="middle">LEAD</text>
          <text x="120" y="85" fill="var(--fg-2)" fontSize="9" fontFamily="monospace" textAnchor="middle">FILTER</text>
          <text x="200" y="85" fill="var(--brand-coral-bright)" fontSize="9" fontFamily="monospace" textAnchor="middle">GPT</text>
          <text x="280" y="85" fill="var(--fg-2)" fontSize="9" fontFamily="monospace" textAnchor="middle">CRM</text>
          <text x="360" y="85" fill="var(--fg-2)" fontSize="9" fontFamily="monospace" textAnchor="middle">CIERRE</text>
        </svg>

        <h3 style={{ fontSize: 32, marginBottom: 8, letterSpacing: "-0.02em" }}>{service.title}</h3>
        <p className="body" style={{ marginBottom: 24, maxWidth: 480, color: "var(--fg-1)" }}>{service.desc}</p>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {service.bullets.map((b) => (
            <span key={b} style={{
              padding: "6px 12px",
              border: "1px solid var(--line-strong)",
              borderRadius: 999,
              fontSize: 12,
              fontFamily: "var(--font-mono)",
              color: "var(--fg-1)",
              background: "rgba(255,255,255,0.02)",
            }}>{b}</span>
          ))}
        </div>
        <div style={{ marginTop: 20, display: "flex", alignItems: "center", gap: 6, color: "var(--brand-cyan-bright)", fontFamily: "var(--font-mono)", fontSize: 11 }}>
          Ver servicio
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17L17 7M8 7h9v9"/></svg>
        </div>
      </div>
    </a>
  );
}

function AICard({ service, active, onHover, large }) {
  return (
    <a
      href={`servicios/ia.html?id=${service.id}`}
      onMouseEnter={onHover}
      style={{
        position: "relative",
        background: "var(--bg-1)",
        border: "1px solid var(--line)",
        borderRadius: "var(--r-lg)",
        padding: large ? 32 : 24,
        minHeight: large ? 360 : 240,
        display: "flex", flexDirection: "column", justifyContent: "space-between",
        gap: 20,
        overflow: "hidden",
        transition: "all 240ms",
        cursor: "pointer",
        textDecoration: "none", color: "inherit",
      }}
      className="ai-card"
      onMouseOver={(e) => {
        e.currentTarget.style.borderColor = "var(--brand-cyan-bright)";
        e.currentTarget.style.transform = "translateY(-2px)";
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.borderColor = "var(--line)";
        e.currentTarget.style.transform = "";
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div style={{
          width: large ? 56 : 44, height: large ? 56 : 44,
          borderRadius: 12,
          background: "linear-gradient(135deg, rgba(77,216,255,0.18), rgba(255,107,126,0.18))",
          border: "1px solid var(--line-strong)",
          display: "flex", alignItems: "center", justifyContent: "center",
          color: "var(--brand-cyan-bright)",
        }}>
          <GGIcon name={service.icon} size={large ? 26 : 22} />
        </div>
        <span className="font-mono caption" style={{ color: "var(--fg-3)" }}>{service.num}</span>
      </div>

      {large && service.id === "chatbots" && (
        <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", gap: 8, padding: "8px 0" }}>
          {/* user message */}
          <div style={{ alignSelf: "flex-end", maxWidth: "78%" }}>
            <div style={{
              background: "rgba(255,107,126,0.14)",
              border: "1px solid rgba(255,107,126,0.3)",
              color: "var(--fg-0)",
              borderRadius: "14px 14px 4px 14px",
              padding: "8px 12px",
              fontSize: 12.5,
              lineHeight: 1.4,
            }}>¿Tienen disponibilidad para 4 personas el 12 de mayo?</div>
            <div className="caption" style={{ textAlign: "right", marginTop: 4, fontSize: 9, color: "var(--fg-3)" }}>Cliente · 14:02</div>
          </div>
          {/* bot reply */}
          <div style={{ alignSelf: "flex-start", maxWidth: "82%" }}>
            <div style={{
              background: "rgba(77,216,255,0.10)",
              border: "1px solid rgba(77,216,255,0.3)",
              color: "var(--fg-0)",
              borderRadius: "14px 14px 14px 4px",
              padding: "8px 12px",
              fontSize: 12.5,
              lineHeight: 1.4,
            }}>¡Sí! Tenemos 3 opciones para esa fecha. Te paso el link de reserva 🔗</div>
            <div className="caption" style={{ marginTop: 4, fontSize: 9, color: "var(--brand-cyan-bright)", display: "flex", alignItems: "center", gap: 4 }}>
              <span style={{ width: 5, height: 5, borderRadius: "50%", background: "var(--brand-cyan-bright)", display: "inline-block", boxShadow: "0 0 8px var(--brand-cyan-bright)" }}></span>
              GG Bot · responde en 2s
            </div>
          </div>
        </div>
      )}

      <div>
        <h3 style={{ fontSize: large ? 24 : 19, marginBottom: 6, letterSpacing: "-0.02em" }}>{service.title}</h3>
        <p className="caption" style={{ color: "var(--brand-coral-bright)", marginBottom: 12, fontStyle: "italic", letterSpacing: 0, textTransform: "none", fontFamily: "var(--font-body)", fontSize: 12 }}>{service.tagline}</p>
        <p className="body-sm" style={{ fontSize: large ? 14 : 13, lineHeight: 1.5 }}>{service.desc}</p>
        <div style={{ marginTop: 16, display: "flex", alignItems: "center", gap: 6, color: "var(--brand-cyan-bright)", fontFamily: "var(--font-mono)", fontSize: 11 }}>
          Ver servicio
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17L17 7M8 7h9v9"/></svg>
        </div>
      </div>
    </a>
  );
}
