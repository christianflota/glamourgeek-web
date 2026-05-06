/* global React */
const { useState, useEffect, useRef, useMemo } = React;

// ============================================================
// SHARED DATA
// ============================================================

window.GG_DATA = {
  services: [
    {
      id: "marketing",
      num: "01",
      icon: "rocket",
      title: "Marketing Digital",
      tagline: "Estrategias que conectan",
      desc: "Servicios integrales para crear una estrategia digital exitosa, impulsando tu marca, proyecto o negocio. Mejoramos tu presencia online y maximizamos tu impacto.",
      bullets: ["Estrategia de marca", "Audiencia ideal", "Reportes mensuales"],
      color: "cyan",
      slug: "marketing-digital",
      metaTitle: "Marketing Digital en México | GlamourGeek",
      metaDesc: "Agencia de marketing digital en México. Estrategia de marca, gestión de redes, email marketing y reportes mensuales. +120 proyectos entregados.",
      heroTagline: "Estrategia digital 360° para hacer crecer tu negocio",
      longDesc: "En GlamourGeek diseñamos estrategias de marketing digital integrales que conectan tu marca con la audiencia correcta en el momento correcto. No seguimos tendencias — construimos sistemas de crecimiento medibles y sostenibles para tu negocio en México y Latinoamérica.",
      features: [
        { title: "Estrategia de marca", desc: "Definimos tu propuesta de valor, tono de comunicación y presencia visual para diferenciarte de la competencia." },
        { title: "Gestión de redes sociales", desc: "Creación de contenido, calendario editorial y atención al cliente en Instagram, Facebook, TikTok y LinkedIn." },
        { title: "Email marketing", desc: "Campañas segmentadas y automatizadas para nutrir leads, recuperar clientes y generar ventas recurrentes." },
        { title: "Análisis de competencia", desc: "Benchmarking continuo para identificar oportunidades y ajustar tu estrategia antes que la competencia." },
        { title: "Reportes mensuales", desc: "Dashboard con métricas clave, KPIs y recomendaciones accionables cada mes." },
      ],
      benefits: ["Aumenta tu visibilidad online", "Genera leads calificados", "Reduce el costo por adquisición", "Datos y métricas en tiempo real"],
      faq: [
        { q: "¿Cuánto tarda en verse resultados?", a: "Los primeros indicadores de mejora (engagement, alcance, tráfico) se ven en 30 días. Resultados consolidados en 60–90 días." },
        { q: "¿Manejan todas las redes sociales?", a: "Sí. Instagram, Facebook, TikTok, LinkedIn y YouTube. Priorizamos las plataformas donde está tu audiencia." },
        { q: "¿Incluyen creación de contenido?", a: "Sí. Copy, diseño gráfico y video corto están incluidos en el plan mensual." },
      ],
    },
    {
      id: "software",
      num: "02",
      icon: "code",
      title: "Desarrollo de Software",
      tagline: "A la medida, sin atajos",
      desc: "Soluciones estratégicas basadas en tecnología avanzada para agilizar, optimizar y potenciar el crecimiento de tu empresa.",
      bullets: ["Soluciones a la medida", "UI/UX enfocado al usuario", "Mantenimiento y soporte"],
      color: "coral",
      slug: "desarrollo-software",
      metaTitle: "Desarrollo de Software a la Medida en México | GlamourGeek",
      metaDesc: "Desarrollamos software personalizado, plataformas SaaS y sistemas empresariales en México. UI/UX, backend y soporte continuo. Solicita tu cotización.",
      heroTagline: "Software que se adapta a tu negocio, no al revés",
      longDesc: "Construimos software personalizado que resuelve los problemas reales de tu empresa. Desde sistemas internos hasta plataformas SaaS escalables, nuestro equipo diseña, desarrolla y mantiene soluciones que crecen contigo. Tecnología avanzada + enfoque en el usuario final.",
      features: [
        { title: "Análisis y arquitectura", desc: "Levantamos requerimientos, definimos la arquitectura técnica y el stack ideal para tu caso de uso." },
        { title: "UI/UX enfocado al usuario", desc: "Diseñamos interfaces intuitivas con alta fidelidad antes de escribir una línea de código." },
        { title: "Desarrollo full-stack", desc: "Frontend, backend, bases de datos e integraciones con APIs de terceros bajo un mismo techo." },
        { title: "QA y pruebas", desc: "Testing manual y automatizado en cada release para garantizar estabilidad y performance." },
        { title: "Mantenimiento y soporte", desc: "Soporte técnico continuo, actualizaciones de seguridad y mejoras iterativas post-lanzamiento." },
      ],
      benefits: ["Automatiza procesos internos", "Reduce errores operativos", "Escala sin reescribir desde cero", "Integración con tus herramientas actuales"],
      faq: [
        { q: "¿Cuánto tarda un proyecto de software?", a: "Un sistema interno o MVP: 8–16 semanas. Una plataforma SaaS completa: 20–32 semanas. Depende del alcance definido en el Discovery." },
        { q: "¿Trabajan con tecnologías específicas?", a: "Sí. React, Next.js, Node.js, Python, Swift, Kotlin y más. Elegimos el stack más adecuado para cada proyecto." },
        { q: "¿Qué pasa después del lanzamiento?", a: "Ofrecemos planes de mantenimiento mensual con SLA definido, actualizaciones y hasta 4 horas de cambios menores incluidas." },
      ],
    },
    {
      id: "web",
      num: "03",
      icon: "globe",
      title: "Páginas Web",
      tagline: "Tu vendedor 24/7",
      desc: "Sitios que destacan, atraen y retienen clientes potenciales. Transforma visitantes en clientes con una página optimizada y profesional.",
      bullets: ["Diseño responsivo", "Dominio + hosting incluidos", "SEO friendly + SSL"],
      color: "cyan",
      slug: "paginas-web",
      metaTitle: "Diseño y Desarrollo de Páginas Web en México | GlamourGeek",
      metaDesc: "Creamos páginas web profesionales, responsivas y optimizadas para SEO en México. Dominio, hosting y SSL incluidos. Tu sitio listo en 4–8 semanas.",
      heroTagline: "Páginas web que convierten visitantes en clientes",
      longDesc: "Tu página web es tu mejor vendedor: trabaja 24/7, llega a todo México y nunca pide vacaciones. En GlamourGeek desarrollamos sitios profesionales, rápidos y optimizados que generan confianza desde el primer clic y convierten visitantes en prospectos reales.",
      features: [
        { title: "Diseño responsivo", desc: "Tu sitio se ve perfecto en desktop, tablet y móvil. Más del 70% del tráfico en México es mobile." },
        { title: "Dominio + hosting incluidos", desc: "Gestionamos tu dominio y tu servidor para que no tengas que preocuparte por la infraestructura." },
        { title: "SEO técnico + SSL", desc: "Estructura optimizada para Google desde el primer día: velocidad, etiquetas, certificado de seguridad incluido." },
        { title: "CMS fácil de usar", desc: "Actualiza textos, imágenes y productos tú mismo sin conocimientos técnicos." },
        { title: "Integración con WhatsApp y formularios", desc: "Captura leads directamente desde tu sitio con integraciones listas para usar." },
      ],
      benefits: ["Genera confianza profesional", "Captura leads automáticamente", "Aparece en Google desde el día 1", "Sin costos técnicos ocultos"],
      faq: [
        { q: "¿Cuánto tarda en estar lista mi página?", a: "Entre 4 y 8 semanas dependiendo de la complejidad. Una landing page sencilla puede estar en 2 semanas." },
        { q: "¿Puedo editar mi contenido después?", a: "Sí. Instalamos un CMS intuitivo para que puedas actualizar tu sitio cuando quieras." },
        { q: "¿El dominio y hosting son de por vida?", a: "Incluimos el primer año. A partir del segundo año el costo de hosting y dominio se cobra por separado." },
      ],
    },
    {
      id: "seo",
      num: "04",
      icon: "search",
      title: "Posicionamiento SEO",
      tagline: "Arriba de la competencia",
      desc: "Estrategias efectivas para posicionar tu página por encima de tus competidores en los motores de búsqueda.",
      bullets: ["Mayor exposición de marca", "Visitantes de calidad", "ROI medible"],
      color: "coral",
      slug: "posicionamiento-seo",
      metaTitle: "Posicionamiento SEO en México | Agencia SEO | GlamourGeek",
      metaDesc: "Posicionamos tu negocio en los primeros resultados de Google en México. Auditoría, estrategia de keywords, link building y reportes mensuales.",
      heroTagline: "Más visibilidad en Google, más clientes sin pagar por clic",
      longDesc: "El SEO es la inversión digital con mayor ROI a largo plazo. En GlamourGeek construimos estrategias de posicionamiento orgánico que llevan a tu empresa a los primeros resultados de Google, generando tráfico calificado de forma constante y predecible.",
      features: [
        { title: "Auditoría SEO completa", desc: "Analizamos tu sitio actual: velocidad, estructura, keywords, backlinks y competencia para identificar oportunidades." },
        { title: "Investigación de keywords", desc: "Identificamos las palabras clave con mayor intención de compra para tu industria y ubicación." },
        { title: "SEO on-page", desc: "Optimizamos títulos, meta descriptions, estructura de encabezados, imágenes y contenido interno." },
        { title: "Link building", desc: "Construimos un perfil de backlinks de calidad para aumentar la autoridad de tu dominio." },
        { title: "SEO local", desc: "Optimizamos tu presencia en Google Maps y búsquedas locales para captar clientes en tu zona." },
      ],
      benefits: ["Tráfico orgánico constante", "Leads sin costo por clic", "Mayor credibilidad en Google", "Ventaja sobre competidores locales"],
      faq: [
        { q: "¿Cuánto tiempo tarda en dar resultados el SEO?", a: "Los primeros movimientos en posiciones se ven entre 60–90 días. Resultados sólidos a partir del mes 4–6." },
        { q: "¿El SEO local es diferente?", a: "Sí. Trabajamos tu ficha de Google Business Profile, reviews y menciones locales para captar clientes en tu ciudad." },
        { q: "¿Garantizan el #1 en Google?", a: "Nadie puede garantizar el #1 de forma ética. Sí garantizamos mejoras medibles en posicionamiento y tráfico orgánico." },
      ],
    },
    {
      id: "ecommerce",
      num: "05",
      icon: "cart",
      title: "E-Commerce",
      tagline: "Vende mientras duermes",
      desc: "Adaptamos tu negocio a los nuevos hábitos de compra en línea. Plataformas optimizadas para captar nuevas oportunidades.",
      bullets: ["Catálogo + carrito", "Procesadores de pago", "Auditoría e-commerce"],
      color: "cyan",
      slug: "ecommerce",
      metaTitle: "Desarrollo de Tienda Online y E-Commerce en México | GlamourGeek",
      metaDesc: "Creamos tiendas en línea profesionales con carrito de compras, pagos seguros y gestión de inventario. E-commerce listo para vender en México.",
      heroTagline: "Tu tienda en línea lista para vender en todo México",
      longDesc: "El e-commerce en México crece año con año. En GlamourGeek construimos plataformas de venta online robustas, seguras y fáciles de administrar que te permiten llegar a más clientes, reducir costos operativos y vender las 24 horas los 7 días de la semana.",
      features: [
        { title: "Catálogo y carrito optimizado", desc: "Fichas de producto con SEO, filtros avanzados y proceso de compra en mínimos pasos para maximizar conversión." },
        { title: "Procesadores de pago", desc: "Integración con Stripe, MercadoPago, PayPal, OXXO Pay y tarjetas de crédito/débito." },
        { title: "Gestión de inventario", desc: "Panel de administración para controlar stock, variantes de producto y alertas de bajo inventario." },
        { title: "Diseño orientado a ventas", desc: "Landing pages de producto, upsells, cross-sells y recuperación de carritos abandonados." },
        { title: "Auditoría e-commerce", desc: "Para tiendas existentes: análisis de conversión, velocidad y checkout para identificar dónde pierdes ventas." },
      ],
      benefits: ["Vende sin horarios ni límites", "Reduce costos de operación", "Expande a todo México y LATAM", "Datos de comportamiento de compra"],
      faq: [
        { q: "¿Cuánto tarda en estar lista mi tienda?", a: "Una tienda estándar con hasta 100 productos: 6–10 semanas. Proyectos más grandes se evalúan en el Discovery." },
        { q: "¿Puedo agregar productos yo mismo?", a: "Sí. Te entregamos acceso al panel de administración con capacitación incluida." },
        { q: "¿Qué porcentaje cobran por transacción?", a: "Nosotros no cobramos comisión por venta. Solo pagas los fees del procesador de pago que elijas (ej. MercadoPago ~3.5%)." },
      ],
    },
    {
      id: "apps",
      num: "06",
      icon: "phone",
      title: "Diseño y Apps",
      tagline: "iOS + Android, end-to-end",
      desc: "Transformamos tu idea en una aplicación de alto rendimiento. Desde el diseño hasta la publicación en marketplaces.",
      bullets: ["Diseño y maquetación", "Programación multilenguaje", "Publicación + actualizaciones"],
      color: "coral",
      slug: "apps-moviles",
      metaTitle: "Desarrollo de Apps iOS y Android en México | GlamourGeek",
      metaDesc: "Desarrollamos aplicaciones móviles para iOS y Android en México. Diseño UX, programación nativa o multiplataforma, publicación en App Store y Google Play.",
      heroTagline: "De la idea a los marketplaces, end-to-end",
      longDesc: "Desarrollamos aplicaciones móviles que los usuarios realmente quieren usar. Desde la arquitectura UX hasta la publicación en App Store y Google Play, manejamos todo el ciclo de vida de tu app con un equipo especializado en iOS y Android.",
      features: [
        { title: "Diseño UX/UI nativo", desc: "Wireframes, prototipos interactivos y diseño de alta fidelidad siguiendo las guías de Apple y Google." },
        { title: "Desarrollo iOS y Android", desc: "Apps nativas o multiplataforma (React Native, Flutter) según el presupuesto y requerimientos de performance." },
        { title: "Backend y APIs", desc: "Infraestructura de servidor, base de datos y APIs REST para soportar tu app." },
        { title: "Publicación en marketplaces", desc: "Gestionamos el proceso de aprobación en App Store y Google Play, incluyendo capturas y copy." },
        { title: "Actualizaciones y soporte", desc: "Mantenemos tu app actualizada con los cambios del sistema operativo y mejoras continuas." },
      ],
      benefits: ["Presencia directa en el celular del usuario", "Notificaciones push para retención", "Experiencia superior a una web móvil", "Canal de ventas y fidelización propio"],
      faq: [
        { q: "¿Cuánto tarda el desarrollo de una app?", a: "Un MVP con funcionalidades core: 12–16 semanas. Una app completa con backend: 20–28 semanas." },
        { q: "¿Desarrollan en iOS y Android a la vez?", a: "Sí. Usamos React Native o Flutter para desarrollar una sola base de código que funciona en ambos sistemas." },
        { q: "¿Qué pasa si Apple rechaza mi app?", a: "Manejamos el proceso completo de revisión. Si hay rechazo, lo resolvemos sin costo adicional." },
      ],
    },
    {
      id: "ppc",
      num: "07",
      icon: "chart",
      title: "Campañas PPC",
      tagline: "Cada peso, medido",
      desc: "Gestionamos campañas de publicidad digital para maximizar tu retorno de inversión en las plataformas que importan.",
      bullets: ["Google Ads", "Meta + Facebook Ads", "Remarketing"],
      color: "cyan",
      slug: "campanas-ppc",
      metaTitle: "Campañas PPC Google Ads y Facebook Ads en México | GlamourGeek",
      metaDesc: "Agencia de Google Ads y Facebook Ads en México. Gestionamos campañas PPC con foco en ROI: búsqueda, display, shopping, remarketing y Meta Ads.",
      heroTagline: "Publicidad digital que genera ventas, no solo clics",
      longDesc: "Las campañas PPC bien gestionadas son el canal de adquisición de clientes más predecible y escalable. En GlamourGeek gestionamos tu inversión publicitaria en Google, Meta y Bing con un enfoque obsesivo en el retorno, optimizando cada peso para maximizar conversiones.",
      features: [
        { title: "Google Ads", desc: "Campañas de búsqueda, display, shopping y Performance Max orientadas a conversión, no a clics vacíos." },
        { title: "Meta Ads (Facebook e Instagram)", desc: "Segmentación por intereses, comportamientos y lookalike audiences para llegar a tu cliente ideal." },
        { title: "Remarketing", desc: "Recuperamos visitantes que no convirtieron con anuncios personalizados basados en su comportamiento." },
        { title: "Bing / Microsoft Ads", desc: "Captura el tráfico de Bing con CPCs menores y audiencia B2B de alto valor." },
        { title: "Optimización continua", desc: "A/B testing de anuncios, ajuste de pujas, segmentación negativa y reportes semanales de performance." },
      ],
      benefits: ["Resultados desde el día 1", "Control total del presupuesto", "Audiencias hipersegmentadas", "ROAS medible y optimizable"],
      faq: [
        { q: "¿Cuánto presupuesto mínimo necesito?", a: "Recomendamos mínimo $5,000 MXN/mes en pauta para campañas de búsqueda en Google. Meta Ads desde $3,000 MXN/mes." },
        { q: "¿Su fee está incluido en el presupuesto?", a: "No. El presupuesto de pauta va directo a Google/Meta. Nuestro fee de gestión es independiente y fijo." },
        { q: "¿Con qué frecuencia reportan?", a: "Reporte semanal de métricas clave y reporte mensual completo con análisis y recomendaciones." },
      ],
    },
    {
      id: "social",
      num: "08",
      icon: "social",
      title: "Redes Sociales",
      tagline: "Comunidad real, no bots",
      desc: "Gestión integral para maximizar tu presencia en redes y conectar con tu audiencia. Atención al cliente, contenido y análisis.",
      bullets: ["Gestión y atención al cliente", "Investigación de mercado", "Informes mensuales"],
      color: "coral",
      slug: "redes-sociales",
      metaTitle: "Manejo de Redes Sociales para Empresas en México | GlamourGeek",
      metaDesc: "Gestión profesional de redes sociales en México. Instagram, Facebook, TikTok y LinkedIn. Contenido, comunidad y reportes mensuales para tu negocio.",
      heroTagline: "Presencia activa en redes que genera comunidad y ventas",
      longDesc: "Las redes sociales no son sobre publicar fotos bonitas — son un canal de ventas, atención al cliente y construcción de marca. En GlamourGeek gestionamos tu presencia con estrategia, contenido de calidad y análisis continuo para convertir seguidores en clientes.",
      features: [
        { title: "Estrategia y calendario editorial", desc: "Plan mensual de contenidos alineado a tus objetivos de negocio, fechas clave y campañas." },
        { title: "Creación de contenido", desc: "Diseño gráfico, copywriting y edición de video corto (Reels, TikTok, Stories) con voz de tu marca." },
        { title: "Gestión de comunidad", desc: "Respuesta a comentarios y mensajes directos en horario laboral para no dejar ningún lead sin atender." },
        { title: "Investigación de mercado", desc: "Análisis de competencia, tendencias del sector y escucha activa de lo que dice tu audiencia." },
        { title: "Informes mensuales", desc: "Reporte de alcance, engagement, crecimiento de seguidores y leads generados por canal." },
      ],
      benefits: ["Construye comunidad leal", "Genera ventas directas", "Humaniza tu marca", "Detecta oportunidades de mercado"],
      faq: [
        { q: "¿Cuántas publicaciones por semana?", a: "Depende del plan. Desde 3 posts/semana en el plan básico hasta contenido diario en planes premium." },
        { q: "¿Manejan TikTok?", a: "Sí. TikTok, Instagram, Facebook, LinkedIn y YouTube. Priorizamos las plataformas donde está tu audiencia." },
        { q: "¿Responden los mensajes directos?", a: "Sí, en horario laboral (L–V 9am–7pm). Opcionalmente integramos un chatbot para respuesta 24/7." },
      ],
    },
    {
      id: "video",
      num: "09",
      icon: "camera",
      title: "Foto y Video",
      tagline: "Equipos de última generación",
      desc: "Convertimos tus ideas en contenido visual de alta calidad. Producto, inmobiliaria, dron, eventos y postproducción profesional.",
      bullets: ["Fotografía profesional", "Cobertura de eventos", "Postproducción 4K"],
      color: "cyan",
      slug: "foto-video",
      metaTitle: "Fotografía y Video Profesional para Empresas en México | GlamourGeek",
      metaDesc: "Producción de foto y video profesional en México: producto, inmobiliaria, dron, eventos y postproducción 4K. Contenido visual de alto impacto para tu marca.",
      heroTagline: "Contenido visual de alto impacto para tu marca",
      longDesc: "El contenido visual es el corazón de toda estrategia digital. En GlamourGeek producimos fotos y videos de alta calidad que comunican el valor de tu marca, producto o propiedad de forma impactante. Desde fotografía de producto hasta cobertura aérea con dron.",
      features: [
        { title: "Fotografía de producto y marca", desc: "Sesiones profesionales con iluminación de estudio para e-commerce, catálogos y redes sociales." },
        { title: "Video corporativo y publicitario", desc: "Producción audiovisual completa: guión, filmación, edición y postproducción para anuncios y presencia digital." },
        { title: "Fotografía y video inmobiliario", desc: "Captura de propiedades con técnica HDR, tours virtuales y video recorrido para venta o renta." },
        { title: "Cobertura con dron", desc: "Tomas aéreas certificadas para turismo, construcción, eventos y bienes raíces. Permiso SCT incluido." },
        { title: "Postproducción 4K", desc: "Edición profesional, corrección de color, motion graphics y entrega en formatos optimizados para cada plataforma." },
      ],
      benefits: ["Diferénciate visualmente", "Contenido reutilizable en múltiples canales", "Mayor tasa de conversión en anuncios", "Imagen de marca premium"],
      faq: [
        { q: "¿Cuánto tarda una sesión fotográfica?", a: "Una sesión de producto de 20–30 items: medio día. Video corporativo de 2–3 minutos: 1–2 días de producción + 1 semana de edición." },
        { q: "¿Trabajan fuera de Cancún?", a: "Sí. Tenemos equipo en CDMX, Monterrey y viajamos a cualquier destino en México según el proyecto." },
        { q: "¿Los archivos son de mi propiedad?", a: "Sí. Al finalizar el proyecto te entregamos todos los archivos originales y editados con derechos completos." },
      ],
    },
  ],

  process: [
    { step: "01", title: "Descubrimiento", desc: "Entendemos tu negocio, tu audiencia y tus métricas. Sin esto, lo demás es ruido." },
    { step: "02", title: "Estrategia", desc: "Definimos el plan, los entregables y los KPIs. Todo por escrito, todo medible." },
    { step: "03", title: "Diseño", desc: "Iteramos en alta fidelidad hasta que cada pixel hable tu idioma de marca." },
    { step: "04", title: "Desarrollo", desc: "Construimos con código limpio, performance real y QA en cada release." },
    { step: "05", title: "Lanzamiento", desc: "Salimos al aire con un plan de medición y ajuste para los primeros 90 días." },
    { step: "06", title: "Optimización", desc: "Iteramos con datos. Lo que funciona se escala, lo que no, se corta." },
  ],

  aiServices: [
    {
      id: "automation",
      num: "AI-01",
      icon: "spark",
      title: "Automatización con IA",
      tagline: "El servicio más vendido · ROI claro",
      desc: "Automatiza atención al cliente y procesos internos con flujos en n8n, Zapier, Make y APIs. WhatsApp, web, redes — todo conectado.",
      bullets: ["Respuesta automática a leads", "Calificación de prospectos", "Recordatorios de pago + post-venta"],
      featured: true,
    },
    {
      id: "chatbots",
      num: "AI-02",
      icon: "social",
      title: "Chatbots inteligentes",
      tagline: "IA + ventas, 24/7",
      desc: "Chatbots con GPT en WhatsApp, Instagram y web. Flujos de venta, cotización, reserva y seguimiento integrados con tu CRM (Kommo, HubSpot).",
      bullets: ["Reduce tiempos de respuesta", "Incrementa conversiones", "Atiende sin descanso"],
    },
    {
      id: "crm-ai",
      num: "AI-03",
      icon: "chart",
      title: "CRM inteligente con IA",
      tagline: "Pipelines que se mueven solos",
      desc: "IA dentro de tu CRM. Clasifica leads, prioriza cierres, genera respuestas inteligentes y resúmenes de conversaciones automáticos.",
      bullets: ["“Este lead está listo para cerrar”", "Respuestas automáticas", "Resúmenes de conversación"],
    },
    {
      id: "content-ai",
      num: "AI-04",
      icon: "rocket",
      title: "Generación de contenido con IA",
      tagline: "Escala tu producción",
      desc: "Copy para redes, blogs SEO, anuncios y correos automáticos. Calidad consistente, en una fracción del tiempo.",
      bullets: ["Ahorro de tiempo", "Contenido a escala", "Voz de marca consistente"],
    },
    {
      id: "consulting-ai",
      num: "AI-05",
      icon: "search",
      title: "Consultoría e implementación de IA",
      tagline: "Roadmap a la medida",
      desc: "Diagnóstico de tu negocio, identificación de procesos automatizables y plan de implementación con KPIs claros.",
      bullets: ["Estrategia clara", "Reducción de costos operativos", "Plan por fases"],
    },
    {
      id: "api-ai",
      num: "AI-06",
      icon: "code",
      title: "Integraciones con APIs de IA",
      tagline: "OpenAI, Whisper, Vision",
      desc: "Sistemas personalizados sobre OpenAI, Whisper y Vision. Transcripción, análisis de imágenes, reportes generados — todo dentro de tu stack.",
      bullets: ["Transcripción automática", "Análisis de imágenes", "Reportes inteligentes"],
    },
  ],

  portfolio: [
    {
      id: "daypass",
      tag: "Marketplace · Turismo",
      client: "DayPass / SuperPass",
      url: "https://www.daypass.mx/",
      result: "Plataforma escalable tipo marketplace",
      desc: "Plataforma para reservar Day Pass en hoteles y beach clubs en México. Catálogo dinámico, comparador y flujo de compra optimizado.",
      color: "cyan",
      emoji: "🌴",
      industry: "Turismo",
      services: ["Desarrollo Web", "E-Commerce", "Integraciones"],
      longDesc: "Plataforma digital especializada en la comercialización de Day Pass en hoteles y beach clubs, permitiendo a los usuarios reservar experiencias sin necesidad de hospedarse. Desarrollamos una solución enfocada en la experiencia del usuario, automatización de reservas y escalabilidad del negocio, integrando funcionalidades clave como catálogo dinámico de destinos, comparador de opciones y flujo de compra optimizado. El sistema permite a los usuarios acceder a hoteles en múltiples destinos turísticos de México.",
      value: ["Plataforma escalable tipo marketplace", "Automatización del proceso de reserva", "Incremento en conversión digital", "Integración con proveedores turísticos"],
    },
    {
      id: "agenciashub",
      tag: "SaaS · CRM",
      client: "AgenciasHub",
      url: "https://www.agenciashub.com/",
      result: "Producto SaaS escalable",
      desc: "CRM especializado para agencias de viajes. Centraliza reservaciones, comisiones, clientes, pagos y comunicación automatizada.",
      color: "coral",
      emoji: "🚀",
      industry: "SaaS / Turismo",
      services: ["Producto SaaS", "CRM", "Automatización"],
      longDesc: "Plataforma SaaS CRM especializada para agencias de viajes, diseñada para centralizar operaciones, automatizar procesos y mejorar la gestión comercial. El sistema permite administrar reservaciones, comisiones, clientes, pagos y comunicación automatizada en un solo lugar.",
      value: ["Desarrollo de producto SaaS escalable", "Automatización de procesos operativos", "Mejora en control financiero y comercial", "Plataforma especializada en sector turismo"],
    },
    {
      id: "travel-design",
      tag: "Web · Travel",
      client: "Travel Design by Ana Rivera",
      url: "https://www.tdbyanarivera.com/",
      result: "Plataforma generadora de leads",
      desc: "Sitio para agencia de viajes especializada en experiencias personalizadas, bodas destino y grupos. Estructura orientada a conversión.",
      color: "cyan",
      emoji: "✈️",
      industry: "Turismo / Bodas Destino",
      services: ["Desarrollo Web", "UX/UI", "SEO"],
      longDesc: "Desarrollo de plataforma web para agencia de viajes enfocada en la venta de experiencias personalizadas, desde viajes individuales hasta bodas destino y grupos. El sitio fue diseñado para transmitir confianza y facilitar la conversión, integrando módulos de contacto, contenido dinámico y estructura orientada a ventas.",
      value: ["Plataforma enfocada en generación de leads", "Optimización de experiencia de usuario", "Estructura para venta de servicios turísticos", "Base para automatización comercial"],
    },
    {
      id: "1app-referee",
      tag: "Sports-Tech · App",
      client: "1App Referee",
      url: "https://1appreferee.com/",
      result: "Digitalización de procesos deportivos",
      desc: "App para gestión y operación de árbitros de fútbol americano. Control de partidos, asignaciones, reportes y seguimiento en tiempo real.",
      color: "coral",
      emoji: "🏈",
      industry: "Sports-Tech",
      services: ["App Móvil", "Backend", "Tiempo Real"],
      longDesc: "Aplicación enfocada en la gestión y operación de árbitros deportivos, principalmente en fútbol americano. La plataforma permite el control de partidos, asignaciones, reportes y seguimiento en tiempo real, mejorando la organización y profesionalización de ligas deportivas.",
      value: ["Digitalización de procesos deportivos", "Gestión centralizada de árbitros", "Optimización operativa para ligas", "Plataforma especializada en sports-tech"],
    },
    {
      id: "dron-film",
      tag: "Web · Audiovisual",
      client: "Dron Film Studio",
      url: "https://www.dronfilmstudio.com/",
      result: "Canal de captación con portafolio integrado",
      desc: "Plataforma para servicios de producción audiovisual con drones. Turismo, bienes raíces, eventos y marcas — orientada a conversión.",
      color: "cyan",
      emoji: "🚁",
      industry: "Audiovisual",
      services: ["Desarrollo Web", "Branding", "Portafolio Multimedia"],
      longDesc: "Plataforma enfocada en servicios de producción audiovisual con drones y contenido profesional, dirigida a sectores como turismo, bienes raíces, eventos y marcas. El sitio fue desarrollado para comunicar servicios de alto impacto visual, integrando portafolio, contacto y enfoque comercial.",
      value: ["Plataforma visual orientada a conversión", "Posicionamiento de marca en producción audiovisual", "Canal de captación de clientes", "Integración de portafolio multimedia"],
    },
    {
      id: "soem",
      tag: "Web · Corporativo",
      client: "SOEM Partners Group",
      url: "https://soempg.com/",
      result: "Presencia corporativa profesional",
      desc: "Sitio corporativo para empresa de servicios empresariales y consultoría. Posicionamiento institucional y canal de contacto directo.",
      color: "coral",
      emoji: "🏢",
      industry: "Consultoría Corporativa",
      services: ["Desarrollo Web", "Branding", "SEO"],
      longDesc: "Desarrollo de sitio corporativo para empresa enfocada en servicios empresariales y consultoría. Se diseñó una presencia digital clara, profesional y estructurada, alineada a una comunicación corporativa sólida, con enfoque en posicionamiento institucional y contacto directo. Actualmente el sitio funciona como punto de contacto y validación digital de la empresa.",
      value: ["Presencia corporativa profesional", "Canal digital de contacto", "Base para crecimiento digital futuro"],
    },
    {
      id: "tubarber",
      tag: "SaaS · Belleza",
      client: "TuBarber Pro",
      url: "https://tubarber.pro/",
      result: "Digitalización de barberías",
      desc: "Plataforma para gestión de barberías. Citas, clientes y servicios desde un solo lugar.",
      color: "cyan",
      emoji: "💈",
      industry: "Belleza y Servicios",
      services: ["SaaS", "Agenda Digital", "CRM"],
      longDesc: "Plataforma digital enfocada en la gestión y operación de barberías, permitiendo a los negocios administrar citas, clientes y servicios desde un solo lugar. El sistema está diseñado para optimizar la operación diaria del negocio, mejorar la experiencia del cliente y digitalizar procesos que tradicionalmente se realizan de forma manual.",
      value: ["Automatización de citas y agenda", "Mejora en la organización operativa", "Digitalización del negocio", "Incremento en la retención de clientes"],
    },
    {
      id: "model-manager",
      tag: "Marketplace · Talento",
      client: "Model Manager",
      url: "https://www.modelmanager.mx/",
      result: "Marketplace de talento centralizado",
      desc: "Plataforma para gestión y contratación de talento — edecanes, modelos y personal para activaciones.",
      color: "coral",
      emoji: "🎭",
      industry: "Marketplace / Eventos",
      services: ["Marketplace", "Gestión de Talento", "Match"],
      longDesc: "Plataforma digital para la gestión y contratación de talento, enfocada en agencias, eventos y marcas que requieren edecanes, modelos y personal para activaciones. El sistema permite centralizar perfiles, facilitar procesos de selección y agilizar la contratación de talento.",
      value: ["Centralización de talento y perfiles", "Optimización del proceso de contratación", "Plataforma tipo marketplace", "Mayor eficiencia operativa para agencias"],
    },
    {
      id: "adminfy",
      tag: "SaaS · Admin",
      client: "Adminfy",
      url: "https://www.adminfy.mx/",
      result: "Control administrativo digital",
      desc: "Sistema para administración y control de procesos empresariales. Información clave, control y decisiones.",
      color: "cyan",
      emoji: "📊",
      industry: "Productividad / Empresarial",
      services: ["SaaS", "ERP Light", "Reportes"],
      longDesc: "Sistema digital enfocado en la administración y control de procesos empresariales, diseñado para optimizar la gestión interna de negocios. La plataforma permite organizar información clave, mejorar el control administrativo y facilitar la toma de decisiones.",
      value: ["Digitalización de procesos administrativos", "Mayor control y visibilidad del negocio", "Optimización de recursos", "Plataforma adaptable a diferentes industrias"],
    },
    {
      id: "hielo-aspe",
      tag: "Web · Industrial",
      client: "Hielo Aspe",
      url: "https://www.hieloaspe.mx/",
      result: "Captación digital local",
      desc: "Sitio corporativo para empresa de producción y distribución de hielo. Posicionamiento y captación de clientes.",
      color: "coral",
      emoji: "🧊",
      industry: "Industrial / Distribución",
      services: ["Desarrollo Web", "SEO Local", "Branding"],
      longDesc: "Desarrollo de sitio web corporativo para empresa dedicada a la producción y distribución de hielo, con enfoque en posicionamiento digital y generación de clientes. El sitio fue diseñado para comunicar confianza, mostrar servicios y facilitar el contacto directo con clientes potenciales.",
      value: ["Presencia digital profesional", "Canal de captación de clientes", "Mejora en imagen de marca", "Optimización para búsquedas locales"],
    },
    {
      id: "gvi",
      tag: "Web · Seguridad",
      client: "Seguridad Privada GVI",
      url: "https://www.seguridadprivadagvi.com/",
      result: "Generación de leads en sector seguridad",
      desc: "Plataforma web para empresa de servicios de seguridad privada. Servicios, experiencia y confiabilidad.",
      color: "cyan",
      emoji: "🛡️",
      industry: "Seguridad",
      services: ["Desarrollo Web", "SEO", "Lead Gen"],
      longDesc: "Desarrollo de plataforma web para empresa de servicios de seguridad privada, enfocada en fortalecer su presencia digital y facilitar la generación de prospectos. El sitio comunica servicios, experiencia y confiabilidad, elementos clave en este sector.",
      value: ["Posicionamiento digital en sector corporativo", "Generación de leads", "Comunicación clara de servicios", "Refuerzo de credibilidad y confianza"],
    },
  ],

  faqs: [
    {
      q: "¿Cuánto tarda un proyecto típico?",
      a: "Una página web profesional toma de 4 a 8 semanas. Una app móvil entre 12 y 20 semanas. Un proyecto de marketing digital arranca con resultados medibles en 60–90 días.",
    },
    {
      q: "¿Trabajan con clientes fuera de México?",
      a: "Sí. Nuestro equipo es 100% remoto y trabajamos en español o inglés. Tenemos clientes activos en México, Estados Unidos, Colombia y España.",
    },
    {
      q: "¿Qué incluye el mantenimiento?",
      a: "Actualizaciones de seguridad, respaldos semanales, monitoreo 24/7, y hasta 4 horas mensuales de cambios menores. Reportamos cada mes.",
    },
    {
      q: "¿Puedo contratar solo un servicio?",
      a: "Por supuesto. Cada servicio se cotiza por separado. Si combinas varios, aplicamos descuentos por paquete.",
    },
    {
      q: "¿Cómo cobran sus servicios?",
      a: "Proyectos puntuales: 50% al iniciar, 50% al entregar. Servicios recurrentes (SEO, redes, mantenimiento): mensualidad fija con contrato a 6 o 12 meses.",
    },
    {
      q: "¿Tienen un proceso de iteración?",
      a: "Sí. Cada proyecto incluye dos rondas de revisión por entregable. Iteraciones adicionales se cotizan por hora o por sprint.",
    },
  ],

  stats: [
    { value: "120+", label: "Proyectos entregados" },
    { value: "11 años", label: "En el mercado" },
    { value: "94%", label: "Clientes recurrentes" },
    { value: "20×", label: "Crece tu marca" },
  ],
};

// ============================================================
// ICON SET — minimal stroke icons, on-brand
// ============================================================

window.GGIcon = function GGIcon({ name, size = 24, stroke = 1.6 }) {
  const props = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: stroke,
    strokeLinecap: "round",
    strokeLinejoin: "round",
  };
  switch (name) {
    case "rocket":
      return (
        <svg {...props}>
          <path d="M4.5 16.5c-1.5 1.5-2 5-2 5s3.5-.5 5-2c.85-.85.85-2.15 0-3-.85-.85-2.15-.85-3 0Z" />
          <path d="M12 15l-3-3a22 22 0 0 1 8-11 9 9 0 0 1 4 4 22 22 0 0 1-11 8l3-3" />
          <path d="M9 12L4 13l3-7 5 1" />
          <path d="M15 12l-1 5 7-3-1-5" />
        </svg>
      );
    case "code":
      return (
        <svg {...props}>
          <path d="M16 18l6-6-6-6" />
          <path d="M8 6l-6 6 6 6" />
        </svg>
      );
    case "globe":
      return (
        <svg {...props}>
          <circle cx="12" cy="12" r="10" />
          <path d="M2 12h20" />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
      );
    case "search":
      return (
        <svg {...props}>
          <circle cx="11" cy="11" r="7" />
          <path d="M21 21l-4.3-4.3" />
        </svg>
      );
    case "cart":
      return (
        <svg {...props}>
          <circle cx="9" cy="21" r="1.5" />
          <circle cx="18" cy="21" r="1.5" />
          <path d="M3 3h2l2.7 13.4a2 2 0 0 0 2 1.6h8.6a2 2 0 0 0 2-1.6L23 7H6" />
        </svg>
      );
    case "phone":
      return (
        <svg {...props}>
          <rect x="6" y="2" width="12" height="20" rx="2.5" />
          <path d="M11 18h2" />
        </svg>
      );
    case "chart":
      return (
        <svg {...props}>
          <path d="M3 3v18h18" />
          <path d="M7 14l4-4 4 4 5-6" />
        </svg>
      );
    case "social":
      return (
        <svg {...props}>
          <circle cx="18" cy="5" r="3" />
          <circle cx="6" cy="12" r="3" />
          <circle cx="18" cy="19" r="3" />
          <path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4" />
        </svg>
      );
    case "camera":
      return (
        <svg {...props}>
          <path d="M3 7h3l2-3h8l2 3h3a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1z" />
          <circle cx="12" cy="13" r="4" />
        </svg>
      );
    case "arrow-right":
      return (
        <svg {...props}>
          <path d="M5 12h14M13 5l7 7-7 7" />
        </svg>
      );
    case "arrow-up-right":
      return (
        <svg {...props}>
          <path d="M7 17L17 7M8 7h9v9" />
        </svg>
      );
    case "plus":
      return (
        <svg {...props}>
          <path d="M12 5v14M5 12h14" />
        </svg>
      );
    case "minus":
      return (
        <svg {...props}>
          <path d="M5 12h14" />
        </svg>
      );
    case "spark":
      return (
        <svg {...props}>
          <path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M5.6 18.4l2.8-2.8M15.6 8.4l2.8-2.8" />
        </svg>
      );
    case "menu":
      return (
        <svg {...props}>
          <path d="M3 6h18M3 12h18M3 18h18" />
        </svg>
      );
    case "instagram":
      return (
        <svg {...props}>
          <rect x="3" y="3" width="18" height="18" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
        </svg>
      );
    case "facebook":
      return (
        <svg {...props}>
          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
        </svg>
      );
    case "whatsapp":
      return (
        <svg {...props}>
          <path d="M21 12a9 9 0 1 1-3.7-7.3L21 4l-1.3 3.7A9 9 0 0 1 21 12z" />
          <path d="M8 10c.5 3 3 5.5 6 6l1.5-1.5-2-1L12 14a4 4 0 0 1-2-2l.5-1.5-1-2z" />
        </svg>
      );
    case "linkedin":
      return (
        <svg {...props}>
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <path d="M8 10v7M8 7v.01M12 17v-4a2 2 0 0 1 4 0v4M12 13v-3" />
        </svg>
      );
    case "x":
      return (
        <svg {...props}>
          <path d="M4 4l16 16M20 4L4 20" />
        </svg>
      );
    case "check":
      return (
        <svg {...props}>
          <path d="M5 12l5 5L20 7" />
        </svg>
      );
    default:
      return null;
  }
};
