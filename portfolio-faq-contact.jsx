/* global React, GGIcon */

window.GGPortfolio = function GGPortfolio() {
  const items = window.GG_DATA.portfolio.slice(0, 6);
  return (
    <section id="portafolio" style={{ padding: "120px 0", borderTop: "1px solid var(--line)" }}>
      <div className="container">
        <div style={{ marginBottom: 64 }}>
          <span className="eyebrow">/ 03 — Trabajo seleccionado</span>
          <h2 style={{ marginTop: 16 }}>Resultados, no slides.</h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 20 }} className="portfolio-grid">
          {items.map((p, i) => {
            const accent = p.color === "coral" ? "var(--brand-coral-bright)" : "var(--brand-cyan-bright)";
            const glow = p.color === "coral" ? "rgba(255,107,126,0.4)" : "rgba(77,216,255,0.4)";
            return (
              <a key={p.client} href={`proyectos/detalle.html?id=${p.id}`}
                style={{
                  background: "var(--bg-1)",
                  border: "1px solid var(--line)",
                  borderRadius: "var(--r-lg)",
                  padding: 32,
                  display: "flex", flexDirection: "column", justifyContent: "space-between",
                  minHeight: 360,
                  position: "relative",
                  overflow: "hidden",
                  transition: "border-color 260ms, transform 260ms",
                }}
                className="portfolio-card"
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = accent;
                  e.currentTarget.style.transform = "translateY(-3px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "var(--line)";
                  e.currentTarget.style.transform = "";
                }}
              >
                {/* glow bg */}
                <div style={{
                  position: "absolute", top: 0, right: 0, width: "55%", height: "100%",
                  background: `radial-gradient(circle at 60% 50%, ${glow}, transparent 60%)`,
                  pointerEvents: "none",
                }} />
                {/* screenshot thumbnail */}
                <div style={{
                  position: "absolute", top: 20, right: 20, width: 160, height: 108,
                  borderRadius: 8, overflow: "hidden",
                  border: `1px solid ${accent}44`,
                  boxShadow: `0 8px 32px ${glow}`,
                  opacity: 0.85,
                }}>
                  <div style={{
                    height: 18, background: "var(--bg-2)",
                    display: "flex", alignItems: "center", gap: 4, padding: "0 8px",
                    borderBottom: "1px solid var(--line)",
                  }}>
                    {["#FF5F56","#FFBD2E","#27C93F"].map(c => (
                      <span key={c} style={{ width: 5, height: 5, borderRadius: "50%", background: c }} />
                    ))}
                  </div>
                  <img
                    src={`assets/screenshots/${p.id}.jpg`}
                    alt={p.client}
                    style={{ width: "100%", height: "calc(100% - 18px)", objectFit: "cover", objectPosition: "top", display: "block" }}
                    onError={(e) => { e.target.parentElement.style.display = "none"; }}
                  />
                </div>

                <div style={{ position: "relative", zIndex: 1 }}>
                  <span className="pill" style={{ borderColor: accent, color: accent }}>{p.tag}</span>
                </div>
                <div style={{ position: "relative", zIndex: 1 }}>
                  <h3 style={{ fontSize: 32, marginBottom: 6 }}>{p.client}</h3>
                  <p className="body-sm" style={{ marginBottom: 20, maxWidth: 360 }}>{p.desc}</p>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16 }}>
                    <div className="font-display" style={{ color: accent, fontSize: 18, fontWeight: 600, letterSpacing: "-0.02em" }}>
                      {p.result}
                    </div>
                    {p.url && (
                      <span style={{ color: accent, opacity: 0.8, display: "flex", alignItems: "center", gap: 6, fontSize: 12, fontFamily: "var(--font-mono)" }}>
                        Ver caso
                        <GGIcon name="arrow-up-right" size={14} stroke={2} />
                      </span>
                    )}
                  </div>
                </div>
              </a>
            );
          })}
        </div>
        <div style={{ display: "flex", justifyContent: "center", marginTop: 48 }}>
          <a href="proyectos/" className="btn btn-ghost">
            Ver todos los proyectos
            <GGIcon name="arrow-up-right" size={16} stroke={2} />
          </a>
        </div>
      </div>
      <style>{`
        @media (max-width: 760px) { .portfolio-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
};

// ============================================================
// FAQ
// ============================================================
window.GGFAQ = function GGFAQ() {
  const [open, setOpen] = React.useState(0);
  const faqs = window.GG_DATA.faqs;
  return (
    <section id="faq" style={{ padding: "120px 0", borderTop: "1px solid var(--line)" }}>
      <div className="container">
        <div style={{ display: "grid", gridTemplateColumns: "0.8fr 1.2fr", gap: 80 }} className="faq-grid">
          <div>
            <span className="eyebrow">/ 04 — Preguntas</span>
            <h2 style={{ marginTop: 16 }}>Las dudas frecuentes.</h2>
            <p className="body" style={{ marginTop: 20, maxWidth: 320 }}>
              ¿No encuentras lo que buscas? <a href="#contacto" style={{ color: "var(--accent)", borderBottom: "1px solid var(--accent)" }}>Escríbenos.</a>
            </p>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {faqs.map((f, i) => {
              const isOpen = open === i;
              return (
                <div key={f.q} style={{ borderBottom: "1px solid var(--line)" }}>
                  <button onClick={() => setOpen(isOpen ? -1 : i)} style={{
                    width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center",
                    padding: "24px 0", textAlign: "left", gap: 24,
                  }}>
                    <h3 style={{ fontSize: 20, color: isOpen ? "var(--accent)" : "var(--fg-0)", transition: "color 200ms" }}>{f.q}</h3>
                    <span style={{
                      width: 36, height: 36, borderRadius: "50%",
                      border: "1px solid var(--line-strong)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      color: isOpen ? "var(--accent)" : "var(--fg-1)",
                      transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
                      transition: "all 240ms",
                      flexShrink: 0,
                    }}>
                      <GGIcon name="plus" size={16} stroke={2} />
                    </span>
                  </button>
                  <div style={{
                    maxHeight: isOpen ? 200 : 0,
                    overflow: "hidden",
                    transition: "all 360ms cubic-bezier(0.2, 0.7, 0.2, 1)",
                  }}>
                    <p className="body" style={{ paddingBottom: 24, maxWidth: 600 }}>{f.a}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <style>{`
        @media (max-width: 900px) { .faq-grid { grid-template-columns: 1fr !important; gap: 40px !important; } }
      `}</style>
    </section>
  );
};

// ============================================================
// MARQUEE STRIP
// ============================================================
window.GGMarquee = function GGMarquee() {
  const items = ["Marketing Digital", "Desarrollo Web", "Apps iOS + Android", "E-Commerce", "SEO", "Campañas PPC", "Foto y Video", "Redes Sociales"];
  return (
    <section style={{ padding: "60px 0", borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)", overflow: "hidden" }}>
      <div style={{ display: "flex", whiteSpace: "nowrap", gap: 48, animation: "marquee 18s linear infinite" }}>
        {[...items, ...items, ...items].map((it, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 48, flexShrink: 0 }}>
            <span className="font-display" style={{
              fontSize: "clamp(36px, 5vw, 72px)",
              fontWeight: 700,
              letterSpacing: "-0.03em",
              color: i % 2 ? "var(--fg-0)" : "transparent",
              WebkitTextStroke: i % 2 ? "0" : "1px var(--fg-2)",
            }}>{it}</span>
            <span style={{ color: "var(--accent)", fontSize: 32 }}>✦</span>
          </div>
        ))}
      </div>
    </section>
  );
};

// ============================================================
// CONTACT + FOOTER
// ============================================================
window.GGContact = function GGContact() {
  const EMPTY = { name: "", email: "", phone: "", service: "", msg: "" };
  const [form, setForm] = React.useState(EMPTY);
  const [status, setStatus] = React.useState("idle"); // idle | sending | sent | error

  return (
    <section id="contacto" style={{ padding: "140px 0 100px", borderTop: "1px solid var(--line)", position: "relative", overflow: "hidden" }}>
      {/* glow bg */}
      <div style={{
        position: "absolute", inset: 0,
        background: `radial-gradient(circle at 50% 100%, var(--accent-glow-soft), transparent 60%)`,
        pointerEvents: "none",
      }} />
      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: 80 }} className="contact-grid">
          <div>
            <span className="eyebrow">/ 05 — Contacto</span>
            <h2 style={{ marginTop: 16, fontSize: "clamp(40px, 6vw, 88px)" }}>
              Cotiza tu <span style={{
                background: "linear-gradient(135deg, var(--brand-cyan-bright), var(--brand-coral-bright))",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              }}>proyecto.</span>
            </h2>
            <p className="body-lg" style={{ marginTop: 24, maxWidth: 460 }}>
              Cuéntanos qué necesitas y te respondemos en menos de 24 horas con un primer estimado.
            </p>
            <div style={{ marginTop: 48, display: "flex", flexDirection: "column", gap: 20 }}>
              <a href="tel:9982416655" style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <span style={{
                  width: 44, height: 44, borderRadius: "50%",
                  border: "1px solid var(--line-strong)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: "var(--accent)",
                }}>
                  <GGIcon name="whatsapp" size={20} />
                </span>
                <div>
                  <div className="caption">Llámanos / WhatsApp</div>
                  <div className="font-display" style={{ fontSize: 20 }}>(998) 241 6655</div>
                </div>
              </a>
              <a href="https://www.glamourgeek.com.mx" style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <span style={{
                  width: 44, height: 44, borderRadius: "50%",
                  border: "1px solid var(--line-strong)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: "var(--accent-2)",
                }}>
                  <GGIcon name="globe" size={20} />
                </span>
                <div>
                  <div className="caption">Visítanos</div>
                  <div className="font-display" style={{ fontSize: 20 }}>www.glamourgeek.com.mx</div>
                </div>
              </a>
            </div>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              setStatus("sending");
              window.emailjs.send(
                "SERVICE_ID",
                "TEMPLATE_ID",
                {
                  from_name: form.name,
                  from_email: form.email,
                  whatsapp: form.phone,
                  service: form.service || "No especificado",
                  message: form.msg,
                }
              ).then(() => {
                setStatus("sent");
                setForm(EMPTY);
              }).catch(() => {
                setStatus("error");
              });
            }}
            style={{
              background: "var(--bg-1)",
              border: "1px solid var(--line)",
              borderRadius: "var(--r-lg)",
              padding: 36,
              display: "flex", flexDirection: "column", gap: 18,
            }}
          >
            <Field label="Nombre" value={form.name} onChange={(v) => setForm({ ...form, name: v })} placeholder="Tu nombre" />
            <Field label="Email" type="email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} placeholder="hola@empresa.mx" />
            <Field label="WhatsApp" type="tel" value={form.phone} onChange={(v) => setForm({ ...form, phone: v })} placeholder="+52 998 241 6655" />
            <div>
              <label className="caption" style={{ display: "block", marginBottom: 8 }}>Servicio de interés</label>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {["Web", "App", "Marketing", "SEO", "E-Commerce", "IA", "Otro"].map((s) => (
                  <button type="button" key={s}
                    onClick={() => setForm({ ...form, service: s })}
                    style={{
                      padding: "8px 14px", borderRadius: 999,
                      border: `1px solid ${form.service === s ? "var(--accent)" : "var(--line-strong)"}`,
                      color: form.service === s ? "var(--accent)" : "var(--fg-1)",
                      background: form.service === s ? "var(--accent-glow-soft)" : "transparent",
                      fontSize: 13, transition: "all 200ms",
                    }}>{s}</button>
                ))}
              </div>
            </div>
            <div>
              <label className="caption" style={{ display: "block", marginBottom: 8 }}>Mensaje</label>
              <textarea value={form.msg} onChange={(e) => setForm({ ...form, msg: e.target.value })}
                rows={4} placeholder="Cuéntanos sobre tu proyecto…"
                style={{
                  width: "100%", padding: "14px 16px",
                  background: "var(--bg-2)", color: "var(--fg-0)",
                  border: "1px solid var(--line-strong)",
                  borderRadius: "var(--r-md)",
                  fontFamily: "var(--font-body)", fontSize: 15, resize: "vertical",
                  outline: "none",
                }}
                onFocus={(e) => e.target.style.borderColor = "var(--accent)"}
                onBlur={(e) => e.target.style.borderColor = "var(--line-strong)"}
              />
            </div>
            <button type="submit" className="btn btn-primary" disabled={status === "sending"} style={{ justifyContent: "center", marginTop: 4, opacity: status === "sending" ? 0.7 : 1 }}>
              {status === "idle" && <>Enviar cotización <GGIcon name="arrow-right" size={16} stroke={2} /></>}
              {status === "sending" && "Enviando…"}
              {status === "sent" && "✓ Enviado, te contactamos pronto"}
              {status === "error" && "Error al enviar. Intenta de nuevo."}
            </button>
            {status === "error" && (
              <button type="button" className="btn btn-ghost" style={{ justifyContent: "center", fontSize: 13 }}
                onClick={() => setStatus("idle")}>
                Reintentar
              </button>
            )}
          </form>
        </div>
      </div>
      <style>{`
        @media (max-width: 900px) { .contact-grid { grid-template-columns: 1fr !important; gap: 60px !important; } }
      `}</style>
    </section>
  );
};

function Field({ label, type = "text", value, onChange, placeholder }) {
  return (
    <div>
      <label className="caption" style={{ display: "block", marginBottom: 8 }}>{label}</label>
      <input type={type} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder}
        style={{
          width: "100%", padding: "14px 16px",
          background: "var(--bg-2)", color: "var(--fg-0)",
          border: "1px solid var(--line-strong)",
          borderRadius: "var(--r-md)",
          fontFamily: "var(--font-body)", fontSize: 15,
          outline: "none",
        }}
        onFocus={(e) => e.target.style.borderColor = "var(--accent)"}
        onBlur={(e) => e.target.style.borderColor = "var(--line-strong)"}
      />
    </div>
  );
}

window.GGFooter = function GGFooter() {
  return (
    <footer style={{ padding: "60px 0 40px", borderTop: "1px solid var(--line)" }}>
      <div className="container">
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 40, marginBottom: 60 }} className="footer-grid">
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <img src="assets/glamourgeek-isotipo.png" alt="GG" style={{ height: 36 }} />
              <span className="font-display" style={{ fontSize: 18, fontWeight: 700 }}>
                <span style={{ color: "var(--brand-cyan-bright)" }}>Glamour</span>
                <span style={{ color: "var(--brand-coral-bright)" }}>Geek</span>
              </span>
            </div>
            <p className="body-sm" style={{ maxWidth: 320 }}>
              Marketing digital + desarrollo de software. Cancún, México · Trabajamos remoto.
            </p>
          </div>
          <FooterCol title="Servicios" items={["Marketing Digital", "Desarrollo Web", "Apps", "E-Commerce", "SEO", "PPC"]} />
          <FooterCol title="Empresa" items={["Sobre nosotros", "Proceso", "Trabajo", "Contacto"]} />
          <FooterCol title="Síguenos" items={["Instagram", "Facebook", "LinkedIn", "WhatsApp"]} />
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: 24, borderTop: "1px solid var(--line)", flexWrap: "wrap", gap: 16 }}>
          <p className="caption">© 2026 GlamourGeek. Todos los derechos reservados.</p>
          <div style={{ display: "flex", gap: 14 }}>
            {["instagram", "facebook", "linkedin", "whatsapp"].map((n) => (
              <a key={n} href="#" style={{
                width: 36, height: 36, borderRadius: "50%",
                border: "1px solid var(--line-strong)",
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "var(--fg-1)", transition: "all 200ms",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--accent)"; e.currentTarget.style.color = "var(--accent)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--line-strong)"; e.currentTarget.style.color = "var(--fg-1)"; }}
              >
                <GGIcon name={n} size={16} />
              </a>
            ))}
          </div>
        </div>
      </div>
      <style>{`
        @media (max-width: 760px) { .footer-grid { grid-template-columns: 1fr 1fr !important; } }
      `}</style>
    </footer>
  );
};

function FooterCol({ title, items }) {
  return (
    <div>
      <h4 className="caption" style={{ marginBottom: 16 }}>{title}</h4>
      <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
        {items.map((i) => (
          <li key={i}><a href="#" className="body-sm" style={{ color: "var(--fg-1)", transition: "color 200ms" }}
            onMouseEnter={(e) => e.currentTarget.style.color = "var(--accent)"}
            onMouseLeave={(e) => e.currentTarget.style.color = "var(--fg-1)"}
          >{i}</a></li>
        ))}
      </ul>
    </div>
  );
}
