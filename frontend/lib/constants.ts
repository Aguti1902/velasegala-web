// Información de la clínica (NAP - Name, Address, Phone)
export const CLINIC_INFO = {
  name: "Clínica Dental Vela-Segalà",
  legalName: "Dental Vela Segala S.C.P.",
  phone: "+34936588406",
  phoneDisplay: "93 658 84 06",
  email: "segala@velasegala.com",
  address: {
    street: "Carrer de la Mare de Déu de Sales, 67",
    city: "Viladecans",
    region: "Barcelona",
    postalCode: "08840",
    country: "España",
    countryCode: "ES",
  },
  geo: {
    latitude: 41.3143,
    longitude: 2.0152,
  },
  hours: {
    display: "Lunes a Jueves: 9:00 - 14:00 y 15:00 - 20:00 | Viernes: 9:00 - 15:00",
    weekdays: "Lunes a Jueves: 9:00 - 14:00 y 15:00 - 20:00",
    friday: "Viernes: 9:00 - 15:00",
    structured: [
      { day: "Monday", opens: "09:00", closes: "20:00", break: true, breakStart: "14:00", breakEnd: "15:00" },
      { day: "Tuesday", opens: "09:00", closes: "20:00", break: true, breakStart: "14:00", breakEnd: "15:00" },
      { day: "Wednesday", opens: "09:00", closes: "20:00", break: true, breakStart: "14:00", breakEnd: "15:00" },
      { day: "Thursday", opens: "09:00", closes: "20:00", break: true, breakStart: "14:00", breakEnd: "15:00" },
      { day: "Friday", opens: "09:00", closes: "15:00" },
    ],
  },
  social: {
    facebook: "https://facebook.com/clinicadentalviladecans",
    instagram: "https://instagram.com/clinicadentalviladecans",
    youtube: "",
  },
  founded: "2010",
  priceRange: "$$",
};

// Configuración del sitio
export const SITE_CONFIG = {
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  name: CLINIC_INFO.name,
  description:
    "Clínica dental en Viladecans especializada en implantes dentales, ortodoncia invisible, estética dental y más. Primera visita gratuita. Tu dentista de confianza.",
};

// Configuración de API
export const API_CONFIG = {
  baseUrl: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api",
  timeout: 10000,
};

// Servicios principales (para navegación y SEO)
export const MAIN_TREATMENTS = [
  {
    name: "Implantes Dentales",
    slug: "implantes-dentales-viladecans",
    excerpt: "Recupera tu sonrisa con implantes dentales de última generación en Viladecans. Más de 25 años de experiencia en implantología dental. Especialistas en implantes inmediatos y carga inmediata. Solución definitiva para reemplazar dientes perdidos con resultados naturales y duraderos. Pioneros en técnica BOPT.",
    keywords: ["implantes dentales viladecans", "implantología dental viladecans", "precio implantes viladecans", "implantes inmediatos viladecans"],
  },
  {
    name: "Ortodoncia Invisible",
    slug: "ortodoncia-invisible-viladecans",
    excerpt: "Alinea tus dientes de forma discreta con ortodoncia invisible en Viladecans. Sistema Invisalign certificado. Ortodoncistas especializados con certificación internacional. Corrige la posición de tus dientes sin brackets metálicos. Resultados visibles desde el primer mes de tratamiento. También ortodoncia convencional para todas las edades.",
    keywords: ["ortodoncia invisible viladecans", "invisalign viladecans", "ortodoncia adultos viladecans", "brackets viladecans"],
  },
  {
    name: "Estética Dental",
    slug: "estetica-dental-viladecans",
    excerpt: "Mejora tu sonrisa con tratamientos de estética dental en Viladecans. Carillas dentales de porcelana, diseño de sonrisa digital DSD y reconstrucciones estéticas con composite. Especialistas en rehabilitaciones estéticas complejas. Transforma tu sonrisa con técnicas avanzadas y materiales de alta calidad certificados.",
    keywords: ["estética dental viladecans", "carillas dentales viladecans", "diseño de sonrisa viladecans", "carillas porcelana viladecans"],
  },
  {
    name: "Blanqueamiento Dental",
    slug: "blanqueamiento-dental-viladecans",
    excerpt: "Consigue una sonrisa más blanca y brillante con blanqueamiento dental profesional en Viladecans. Tratamiento en clínica con lámparas LED de última generación. Seguro y efectivo. Resultados inmediatos que duran años. Elimina manchas y decoloración dental. También blanqueamiento ambulatorio personalizado.",
    keywords: ["blanqueamiento dental viladecans", "blanqueamiento dental precio viladecans", "blanqueamiento profesional viladecans"],
  },
  {
    name: "Odontopediatría",
    slug: "odontopediatria-viladecans",
    excerpt: "Cuidado dental especializado para niños y bebés en Viladecans. Odontopediatra titulado con experiencia en tratamiento de bebés, niños y adolescentes. Ambiente adaptado y técnicas específicas para los más pequeños. Creamos experiencias positivas para que tus hijos cuiden su salud dental desde pequeños. Prevención de caries infantil.",
    keywords: ["odontopediatría viladecans", "dentista infantil viladecans", "dentista para niños viladecans", "dentista bebés viladecans"],
  },
  {
    name: "Periodoncia",
    slug: "periodoncia-viladecans",
    excerpt: "Tratamiento de encías y periodoncia en Viladecans. Periodoncista especializado en prevención y tratamiento de enfermedades periodontales como gingivitis, periodontitis y piorrea. Salva tus dientes con limpieza profunda, raspado, alisado radicular y regeneración de tejidos. Cirugía periodontal mínimamente invasiva.",
    keywords: ["periodoncia viladecans", "tratamiento encías viladecans", "gingivitis viladecans", "periodontitis viladecans"],
  },
  {
    name: "Endodoncia",
    slug: "endodoncia-viladecans",
    excerpt: "Salva tus dientes con endodoncia en Viladecans. Tratamiento de conductos radiculares sin dolor con anestesia local efectiva. Eliminamos la infección y preservamos tu diente natural. Técnicas avanzadas con microscopio dental y sistema rotatorio para mayor precisión y éxito. Endodoncia en una sola sesión.",
    keywords: ["endodoncia viladecans", "tratamiento conductos viladecans", "matar nervio diente viladecans", "endodoncia precio"],
  },
  {
    name: "Prótesis Dentales",
    slug: "protesis-dentales-viladecans",
    excerpt: "Recupera funcionalidad y estética con prótesis dentales en Viladecans. Especialistas en prótesis fijas sobre implantes, prótesis removibles de precisión y prótesis híbridas. Soluciones personalizadas para reemplazar uno o varios dientes perdidos con resultados naturales. Laboratorio propio para mayor control de calidad.",
    keywords: ["prótesis dentales viladecans", "prótesis sobre implantes viladecans", "dentadura postiza viladecans", "coronas dentales"],
  },
  {
    name: "Cirugía Oral",
    slug: "cirugia-oral-viladecans",
    excerpt: "Cirugía oral y maxilofacial en Viladecans. Extracción de muelas del juicio, apicectomías, frenectomías, injertos de hueso y elevación de seno maxilar. Cirujano maxilofacial especializado. Cirugía mínimamente invasiva con tecnología piezoeléctrica. Regeneración ósea guiada para casos complejos.",
    keywords: ["cirugía oral viladecans", "extracción muelas juicio viladecans", "cirugía maxilofacial viladecans", "injerto hueso dental"],
  },
  {
    name: "Bruxismo",
    slug: "bruxismo-viladecans",
    excerpt: "Tratamiento del bruxismo en Viladecans. Férulas de descarga personalizadas fabricadas a medida con materiales de alta calidad. Protege tus dientes del desgaste por apretar o rechinar. Solución para dolor de mandíbula, dolores de cabeza y desgaste dental causado por bruxismo. Ajuste perfecto y cómodo para uso nocturno.",
    keywords: ["bruxismo viladecans", "férula descarga viladecans", "apretar dientes viladecans", "tratamiento bruxismo"],
  },
  {
    name: "Limpieza Dental",
    slug: "limpieza-dental-viladecans",
    excerpt: "Limpieza dental profesional en Viladecans. Higiene bucodental completa con eliminación de sarro, placa bacteriana y manchas superficiales. Profilaxis dental con ultrasonidos y pulido. Prevención de caries y enfermedades periodontales. Higienista dental titulado. Recomendable cada 6-12 meses para mantener tu salud oral óptima.",
    keywords: ["limpieza dental viladecans", "limpieza dental profesional viladecans", "higiene dental viladecans", "limpieza bucal"],
  },
  {
    name: "Urgencias Dentales",
    slug: "urgencias-dentales-viladecans",
    excerpt: "Atención dental de urgencia en Viladecans. Tratamos dolor de muelas intenso, dientes rotos o fracturados, infecciones dentales, abscesos, flemones y traumatismos dentales. Cita el mismo día para urgencias. Disponemos de servicio de urgencias dentales para resolver tu problema rápidamente y aliviar el dolor.",
    keywords: ["urgencias dentales viladecans", "dentista urgencias viladecans", "dolor muelas viladecans", "diente roto urgencia"],
  },
];

// Navegación principal
export const MAIN_NAV = [
  { name: "Inicio", href: "/" },
  { name: "La Clínica", href: "/clinica-dental-viladecans" },
  { name: "Tratamientos", href: "/tratamientos" },
  { name: "Blog", href: "/blog" },
  { name: "Contacto", href: "/contacto" },
];

// Por qué elegirnos (USPs)
export const WHY_CHOOSE_US = [
  {
    title: "Más de 15 Años de Experiencia en Viladecans",
    description:
      "Equipo de dentistas especializados con amplia trayectoria profesional en Viladecans y Barcelona. Formación continua en las últimas técnicas de odontología avanzada. Miles de pacientes satisfechos que confían en nuestra clínica dental para el cuidado de su salud bucodental.",
  },
  {
    title: "Tecnología Dental de Última Generación",
    description:
      "Equipamiento de vanguardia incluyendo escáner intraoral 3D, radiografía digital, microscopio dental y tecnología CAD/CAM para tratamientos más precisos, rápidos y cómodos. Invertimos constantemente en tecnología para ofrecer los mejores resultados a nuestros pacientes de Viladecans.",
  },
  {
    title: "Primera Visita Dental Gratuita",
    description:
      "Ofrecemos una primera visita completamente gratuita que incluye exploración completa, diagnóstico profesional y presupuesto detallado sin compromiso. Queremos que conozcas el estado de tu salud dental antes de tomar cualquier decisión sobre tu tratamiento.",
  },
  {
    title: "Financiación Flexible Sin Intereses",
    description:
      "Financia tu tratamiento dental hasta en 12 meses sin intereses ni comisiones. También disponemos de opciones de financiación a más largo plazo. Hacemos que cuidar de tu salud dental sea accesible para todos en Viladecans.",
  },
  {
    title: "Atención Personalizada y Cercana",
    description:
      "Trato humano y cercano en cada visita. Nos tomamos el tiempo necesario para escuchar tus necesidades, resolver todas tus dudas y explicarte cada paso del tratamiento. Tu comodidad y confianza son nuestra prioridad en nuestra clínica dental de Viladecans.",
  },
  {
    title: "Total Transparencia en Precios",
    description:
      "Presupuestos claros, detallados y por escrito. Sin sorpresas ni costes ocultos. Te explicamos el precio de cada tratamiento dental antes de empezar. Precios competitivos y honestos en todos nuestros servicios dentales en Viladecans.",
  },
];

// Reseñas (testimoniales)
export const TESTIMONIALS = [
  {
    name: "María González",
    rating: 5,
    text: "Después de perder varios dientes, el Dr. Vela me realizó una rehabilitación completa con implantes dentales. El resultado es espectacular, parecen dientes naturales. Todo el proceso fue indoloro y me explicaron cada paso. La mejor decisión que he tomado.",
    treatment: "Implantes Dentales",
    date: "Hace 2 meses",
  },
  {
    name: "Carlos Martínez",
    rating: 5,
    text: "Llevaba años sin ir al dentista por miedo, pero en Vela Segalà me han tratado con mucha paciencia y profesionalidad. Mi ortodoncia invisible con Invisalign ha sido todo un éxito. Nadie notaba que la llevaba y en 14 meses tengo la sonrisa que siempre quise. Totalmente recomendable.",
    treatment: "Ortodoncia Invisible",
    date: "Hace 1 mes",
  },
  {
    name: "Laura Pérez",
    rating: 5,
    text: "La Dra. Segalà me hizo un diseño de sonrisa completo con carillas de porcelana. El resultado ha superado todas mis expectativas. La atención es excelente, precios transparentes desde el principio y un equipo muy profesional. Sin duda, la mejor clínica dental de Viladecans.",
    treatment: "Estética Dental",
    date: "Hace 3 semanas",
  },
];

// FAQs generales
export const GENERAL_FAQS = [
  {
    question: "¿La primera visita es realmente gratuita?",
    answer:
      "Sí, la primera visita es completamente gratuita e incluye una revisión completa, diagnóstico y presupuesto sin compromiso. Queremos que conozcas el estado de tu salud dental antes de tomar cualquier decisión.",
  },
  {
    question: "¿Ofrecen financiación para los tratamientos?",
    answer:
      "Sí, ofrecemos financiación hasta en 12 meses sin intereses ni comisiones. Para tratamientos de mayor coste, también tenemos opciones de financiación a más largo plazo. Te explicamos todas las opciones en tu primera visita.",
  },
  {
    question: "¿Qué medidas de higiene y seguridad tienen?",
    answer:
      "Cumplimos rigurosamente con todos los protocolos de higiene y esterilización. Todo nuestro instrumental se esteriliza después de cada uso y trabajamos con material desechable siempre que es posible. Tu seguridad es nuestra prioridad.",
  },
  {
    question: "¿Atienden urgencias dentales?",
    answer:
      "Sí, atendemos urgencias dentales. Si tienes un dolor intenso, un diente roto o cualquier otra urgencia, llámanos y te daremos cita lo antes posible, normalmente el mismo día.",
  },
  {
    question: "¿Dónde están ubicados y cómo llegar?",
    answer: `Estamos en ${CLINIC_INFO.address.street}, en pleno centro de Viladecans. Disponemos de aparcamiento cercano y estamos muy bien comunicados por transporte público. Puedes venir en Renfe (parada Viladecans), autobús o en coche.`,
  },
];

