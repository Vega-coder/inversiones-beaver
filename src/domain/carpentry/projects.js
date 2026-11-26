/**
 * Entidades y utilidades puras para proyectos, materiales y proceso de trabajo.
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

export const WORKFLOW_STEPS = [
  {
    step: '01',
    title: 'Visita Técnica & Medición',
    description:
      'Levantamos medidas milimétricas en obra o planos arquitectónicos y evaluamos puntos eléctricos, hidráulicos e iluminación.',
  },
  {
    step: '02',
    title: 'Diseño & Selección de Materiales',
    description:
      'Definimos distribución funcional, paleta de maderas, tableros RH, herrajes y presupuesto detallado sin sorpresas.',
  },
  {
    step: '03',
    title: 'Fabricación en Taller',
    description:
      'Corte de precisión, enchape profesional de cantos, ensamblaje estructural y control de calidad antes de salir a obra.',
  },
  {
    step: '04',
    title: 'Instalación & Entrega Garantizada',
    description:
      'Montaje limpio por maestros carpinteros propios, ajuste de puertas y cajones, y entrega final lista para usar.',
  },
];
