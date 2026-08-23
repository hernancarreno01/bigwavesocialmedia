/* ═══════════════════════════════════════════════════════════
   BigWave — Centralized Content Data (content.js)
   All text, services, and configuration in one place
   ═══════════════════════════════════════════════════════════ */

const BIGWAVE = {
  /* ── Brand ── */
  brand: {
    name: 'BigWave',
    email: 'bigwavesocialmedia@gmail.com',
    phone: '11 3478-9007',
    whatsapp: '5491134789007',
    whatsappMessage: 'Hola BigWave! Me interesa hablar sobre un proyecto.',
    instagram: '#',
    facebook: '#',
    linkedin: '#',
  },

  /* ── Problems Section ── */
  problems: [
    {
      icon: '⚙️',
      title: '"Hacemos demasiado a mano."',
      text: 'Automatizamos procesos repetitivos para que tu equipo se enfoque en lo importante.',
    },
    {
      icon: '🔗',
      title: '"Tenemos información en todas partes."',
      text: 'Conectamos tus sistemas y centralizamos la información en un solo lugar.',
    },
    {
      icon: '📉',
      title: '"Nuestra web no genera consultas."',
      text: 'Diseñamos experiencias digitales orientadas a convertir visitantes en clientes.',
    },
    {
      icon: '📱',
      title: '"Las redes no están dando resultados."',
      text: 'Creamos estrategia, contenido y campañas orientadas a objetivos reales.',
    },
    {
      icon: '📊',
      title: '"Nuestro sistema ya quedó chico."',
      text: 'Desarrollamos herramientas que acompañan el crecimiento de tu empresa.',
    },
    {
      icon: '🛠️',
      title: '"Necesitamos algo que no existe."',
      text: 'Lo diseñamos y desarrollamos a medida de tu operación.',
    },
    {
      icon: '💬',
      title: '"Perdemos tiempo respondiendo siempre lo mismo."',
      text: 'Automatizamos comunicaciones y atención con tecnología e IA.',
    },
    {
      icon: '🏫',
      title: '"Queremos digitalizar nuestra institución."',
      text: 'Diseñamos plataformas y procesos digitales para instituciones educativas.',
    },
  ],

  /* ── Social Media Services ── */
  socialMediaServices: [
    { icon: '📸', name: 'Contenido', desc: 'Comunicamos lo que hace diferente a tu negocio.' },
    { icon: '📣', name: 'Meta Ads', desc: 'Llevamos tu propuesta frente a las personas correctas.' },
    { icon: '🎯', name: 'Google Ads', desc: 'Aparecé cuando te buscan. Capturá la demanda real.' },
    { icon: '📱', name: 'Social Media', desc: 'Construimos una presencia digital coherente y activa.' },
    { icon: '📊', name: 'Performance', desc: 'Medimos qué funciona y optimizamos la inversión.' },
    { icon: '✍️', name: 'Community Management', desc: 'Gestionamos la conversación con tu comunidad.' },
    { icon: '🎬', name: 'Reels & Video', desc: 'Contenido audiovisual que conecta y se comparte.' },
    { icon: '🎨', name: 'Branding Digital', desc: 'Tu marca con identidad clara en cada punto de contacto.' },
    { icon: '🔍', name: 'Analítica', desc: 'Datos claros para tomar decisiones inteligentes.' },
    { icon: '📈', name: 'Generación de leads', desc: 'Convertimos visibilidad en oportunidades concretas.' },
    { icon: '📝', name: 'Estrategia', desc: 'Un plan con objetivos, no publicaciones al azar.' },
    { icon: '📋', name: 'Reportes', desc: 'Sabés exactamente qué está pasando y qué mejorar.' },
  ],

  /* ── Development Services ── */
  devServices: [
    { title: 'Desarrollo web', text: 'Sitios institucionales, landing pages y webs comerciales que generan resultados.', highlighted: true },
    { title: 'E-commerce', text: 'Tiendas online, catálogos, pagos integrados y gestión de productos.' , highlighted: true },
    { title: 'Aplicaciones web', text: 'Herramientas accesibles desde navegador para tu equipo y tus clientes.', highlighted: true },
    { title: 'Sistemas de gestión', text: 'Sistemas adaptados al funcionamiento real de tu organización.', highlighted: true },
    { title: 'Automatización', text: 'Eliminamos tareas repetitivas y reducimos errores humanos.', highlighted: true },
    { title: 'Integraciones', text: 'Conectamos sistemas que actualmente funcionan por separado.' },
    { title: 'APIs', text: 'Comunicación entre plataformas y servicios de forma segura.' },
    { title: 'Portales', text: 'Portales de clientes, empleados, alumnos, familias, proveedores.' },
    { title: 'Dashboards', text: 'Información clara y centralizada para tomar decisiones.' },
    { title: 'Digitalización', text: 'Transformamos circuitos manuales en procesos digitales eficientes.' },
    { title: 'IA aplicada', text: 'Inteligencia artificial cuando realmente resuelve un problema.' },
    { title: 'Apps móviles', text: 'Aplicaciones móviles o PWA cuando el proyecto lo requiere.' },
  ],

  /* ── Automation Before/After ── */
  automation: [
    {
      before: 'Copiar información de un sistema a otro.',
      after: 'La información viaja automáticamente.',
    },
    {
      before: 'Generar reportes manualmente.',
      after: 'El reporte se genera solo y llega por email.',
    },
    {
      before: 'Responder consultas repetitivas una por una.',
      after: 'Automatización + WhatsApp + IA.',
    },
    {
      before: 'Crear documentos uno por uno.',
      after: 'Generación automática con los datos del sistema.',
    },
    {
      before: 'Buscar información en diferentes lugares.',
      after: 'Dashboard centralizado con todo en un lugar.',
    },
    {
      before: 'Controlar procesos con planillas de Excel.',
      after: 'Sistema personalizado que acompaña tu operación.',
    },
  ],

  /* ── Institution Solutions ── */
  institutionSolutions: [
    'Portal de familias',
    'Portal de alumnos',
    'Portal de docentes',
    'Sistemas administrativos',
    'Gestión de cuotas',
    'Comunicaciones',
    'Calificaciones',
    'Inasistencias',
    'Documentación',
    'Formularios',
    'Automatización administrativa',
    'Integraciones',
    'Dashboards',
    'Sistemas internos',
  ],

  /* ── Process Steps ── */
  processSteps: [
    { number: '01', title: 'Escuchamos', text: 'Entendemos tu problema, tu operación y tus objetivos.' },
    { number: '02', title: 'Analizamos', text: 'Estudiamos cómo funciona actualmente y qué se puede mejorar.' },
    { number: '03', title: 'Proponemos', text: 'Definimos una solución concreta, viable y medible.' },
    { number: '04', title: 'Diseñamos', text: 'Pensamos experiencia de usuario y funcionamiento.' },
    { number: '05', title: 'Construimos', text: 'Desarrollamos y ejecutamos la solución.' },
    { number: '06', title: 'Implementamos', text: 'Ponemos todo en funcionamiento en tu operación real.' },
    { number: '07', title: 'Medimos', text: 'Analizamos resultados con datos concretos.' },
    { number: '08', title: 'Evolucionamos', text: 'Mejoramos continuamente en base a lo que medimos.' },
  ],

  /* ── Two Disciplines Flow ── */
  disciplines: [
    { label: 'Social Media', desc: 'atrae' },
    { label: 'Ads', desc: 'genera oportunidades' },
    { label: 'Web', desc: 'convierte' },
    { label: 'Development', desc: 'automatiza' },
    { label: 'Data', desc: 'permite entender' },
    { label: 'IA', desc: 'acelera' },
    { label: 'Optimización', desc: 'mejora' },
    { label: 'Resultado', desc: 'crecimiento' },
  ],

  /* ── Use Cases ── */
  useCases: [
    {
      type: 'Comercio',
      problem: 'Necesita más ventas y presencia online.',
      tags: ['Social Media', 'Ads', 'E-commerce', 'Automatización'],
    },
    {
      type: 'Institución',
      problem: 'Demasiadas tareas administrativas manuales.',
      tags: ['Digitalización', 'Sistema', 'Portal', 'Automatización'],
    },
    {
      type: 'Profesional',
      problem: 'Necesita generar más consultas.',
      tags: ['Web', 'SEO', 'Social Media', 'Ads', 'WhatsApp'],
    },
    {
      type: 'PyME',
      problem: 'Tiene información dispersa y procesos desordenados.',
      tags: ['Integraciones', 'Dashboard', 'Automatización', 'Sistema'],
    },
  ],

  /* ── Technology Stack ── */
  tech: {
    'Frontend': ['HTML5', 'CSS3', 'JavaScript', 'React', 'Next.js', 'TypeScript'],
    'Backend': ['Node.js', 'Python', 'Express', 'REST APIs', 'GraphQL'],
    'Bases de datos': ['PostgreSQL', 'MongoDB', 'Firebase', 'MySQL'],
    'Cloud': ['Google Cloud', 'Vercel', 'AWS', 'Docker'],
    'Automatización': ['n8n', 'Zapier', 'Scripts custom', 'Webhooks'],
    'IA': ['OpenAI', 'Google AI', 'NLP', 'Asistentes inteligentes'],
    'Analytics': ['Google Analytics', 'Meta Pixel', 'GTM', 'Dashboards custom'],
    'Integraciones': ['WhatsApp API', 'MercadoPago', 'APIs REST', 'OAuth'],
  },

  /* ── AI Examples ── */
  aiExamples: [
    'Asistentes internos',
    'Automatización de atención',
    'Análisis de información',
    'Clasificación de datos',
    'Generación de documentos',
    'Atención al cliente por WhatsApp',
    'Procesamiento de consultas',
    'Generación de contenido',
    'Integración con sistemas existentes',
  ],

  /* ── Form Options ── */
  formOptions: [
    'Quiero mejorar mis redes',
    'Necesito publicidad',
    'Necesito una web',
    'Quiero vender online',
    'Necesito automatizar un proceso',
    'Necesito un sistema',
    'Necesito una aplicación',
    'Quiero digitalizar mi empresa',
    'Necesito integrar sistemas',
    'Necesito una solución para mi institución',
    'Tengo una idea',
    'No sé exactamente qué necesito',
  ],
};
