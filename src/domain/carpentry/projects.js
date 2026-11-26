/**
 * Entidades y utilidades puras para proyectos, materiales, acabados interactivos y FAQ.
 */
export function normalizeSolution(raw) {
  return {
    id: String(raw.id),
    slug: String(raw.slug),
    title: String(raw.title),
    categorySlug: String(raw.categorySlug),
    categoryLabel: String(raw.categoryLabel),
    summary: String(raw.summary),
    description: String(raw.description),
    materials: Array.isArray(raw.materials) ? raw.materials : [],
    hardware: Array.isArray(raw.hardware) ? raw.hardware : [],
    leadTime: String(raw.leadTime || '15 a 25 días hábiles'),
    warranty: String(raw.warranty || 'Garantía en estructura, herrajes e instalación'),
    image: String(raw.image),
    featured: Boolean(raw.featured),
  };
}

export function filterSolutions(solutions, { categorySlug = '', query = '' } = {}) {
  const normalizedQuery = query.trim().toLowerCase();
  return solutions.filter((item) => {
    if (categorySlug && item.categorySlug !== categorySlug) {
      return false;
    }
    if (!normalizedQuery) return true;
    const haystack = [
      item.title,
      item.categoryLabel,
      item.summary,
      item.description,
      ...item.materials,
      ...item.hardware,
    ]
      .join(' ')
      .toLowerCase();
    return haystack.includes(normalizedQuery);
  });
}

export const WOOD_MATERIALS = [
  {
    name: 'Maderas Macizas Selectas',
    subtitle: 'Roble, Cedro, Teka & Nogal',
    description:
      'Piezas estructurales, puertas macizas, listones y detalles de ebanistería clásica con secado técnico y veta continua.',
    tone: '#6B2F26',
  },
  {
    name: 'Tableros RH Hidrófugos',
    subtitle: 'Alta resistencia a humedad',
    description:
      'Esenciales para cocinas integrales y muebles de baño; núcleo sellado con cantos en PVC termofusionado de 2 mm.',
    tone: '#3D352E',
  },
  {
    name: 'Chapillas & Texturas Sincrónicas',
    subtitle: 'Acabado natural arquitectónico',
    description:
      'Superficies con relieve táctil tipo poro abierto, tonos nogal, roble europeo, ceniza y carbón mate para closets y mobiliario.',
    tone: '#8B5E3C',
  },
  {
    name: 'Herrajes & Lacado Poliuretano',
    subtitle: 'Cierre suave y sellado superior',
    description:
      'Bisagras ocultas, correderas telescópicas de extracción total y barnices de poliuretano resistentes a rayones y humedad.',
    tone: '#262520',
  },
];

export const WOOD_FINISHES = [
  {
    id: 'caoba-beaver',
    name: 'Caoba Beaver',
    code: 'Poliuretano / Chapa Natural',
    hex: '#6B2F26',
    grainHex: '#4D1F18',
    recommendedFor: 'Puertas principales, bibliotecas y detalles arquitectónicos',
    humidityLevel: 90,
    durabilityLevel: 95,
    description:
      'Tono cálido profundo inspirado en nuestra firma. Resalta la veta natural con sellado en poliuretano semi-mate.',
  },
  {
    id: 'nogal-americano',
    name: 'Nogal Americano',
    code: 'Textura Sincrónica RH',
    hex: '#5C4033',
    grainHex: '#3B271E',
    recommendedFor: 'Cocinas integrales, vestieres y centros de entretenimiento',
    humidityLevel: 92,
    durabilityLevel: 94,
    description:
      'Equilibrio elegante entre calidez y sobriedad contemporánea. Ideal para combinar con piedra clara o negro mate.',
  },
  {
    id: 'roble-arena',
    name: 'Roble Natural Arena',
    code: 'Poro Abierto RH',
    hex: '#B8966E',
    grainHex: '#93734E',
    recommendedFor: 'Closets amplios, muebles de baño y espacios luminosos',
    humidityLevel: 94,
    durabilityLevel: 92,
    description:
      'Aporta amplitud visual y luminosidad a habitaciones y baños manteniendo la textura táctil de la madera.',
  },
  {
    id: 'carbon-mate',
    name: 'Carbón Mate Antihuella',
    code: 'Supermate Hidrófugo RH',
    hex: '#262520',
    grainHex: '#181714',
    recommendedFor: 'Cocinas modernas, alacenas altas y paneles de contraste',
    humidityLevel: 95,
    durabilityLevel: 96,
    description:
      'Acabado aterciopelado de baja reflectividad con resistencia superior al uso diario y manchas.',
  },
];

export const WORKFLOW_STEPS = [
  {
    step: '01',
    title: 'Visita Técnica & Medición',
    deliverable: 'Levantamiento milimétrico en obra',
    description:
      'Levantamos medidas milimétricas en obra o planos arquitectónicos y evaluamos puntos eléctricos, hidráulicos e iluminación.',
  },
  {
    step: '02',
    title: 'Diseño & Selección de Materiales',
    deliverable: 'Propuesta funcional y presupuesto cerrado',
    description:
      'Definimos distribución funcional, paleta de maderas, tableros RH, herrajes y presupuesto detallado sin sorpresas.',
  },
  {
    step: '03',
    title: 'Fabricación en Taller',
    deliverable: 'Corte, enchape PVC y control de calidad',
    description:
      'Corte de precisión, enchape profesional de cantos, ensamblaje estructural y control de calidad antes de salir a obra.',
  },
  {
    step: '04',
    title: 'Instalación & Entrega Garantizada',
    deliverable: 'Montaje limpio y ajuste de herrajes',
    description:
      'Montaje limpio por maestros carpinteros propios, ajuste de puertas y cajones, y entrega final lista para usar.',
  },
];

export const CARPENTRY_FAQS = [
  {
    question: '¿Trabajan 100% a la medida de mi espacio o apartamento?',
    answer:
      'Sí. Todos nuestros closets, puertas, cocinas y muebles de baño se fabrican sobre medidas exactas tomadas en obra o sobre planos arquitectónicos para aprovechar cada rincón de piso a techo.',
  },
  {
    question: '¿Qué material recomiendan para cocinas y muebles de baño?',
    answer:
      'Para zonas húmedas fabricamos en tableros RH (Resistentes a la Humedad) con enchape termofusionado de 2 mm y maderas tratadas con laca poliuretano impermeable de poro cerrado.',
  },
  {
    question: '¿Cómo es el proceso para cotizar y agendar una visita técnica?',
    answer:
      'Puedes enviarnos medidas aproximadas o una foto del espacio por nuestro WhatsApp (320 297 7883) o desde el formulario web. Con eso te damos una orientación inicial y coordinamos la visita técnica.',
  },
  {
    question: '¿Qué garantía ofrecen en sus trabajos en madera?',
    answer:
      'Entregamos garantía de 2 años en estabilidad estructural, herrajes de cierre suave e instalación realizada por nuestro equipo de carpinteros.',
  },
];
