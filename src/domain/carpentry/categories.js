/**
 * Líneas principales de servicio de Inversiones Beaver & Asociados S.A.S.
 * Capa de dominio pura: sin dependencias de React ni de infraestructura.
 */
export const CARPENTRY_CATEGORIES = [
  {
    slug: 'closets',
    title: 'Closets & Vestieres',
    shortTitle: 'Closets',
    tagline: 'Organización arquitectónica hecha a la medida de cada espacio.',
    description:
      'Diseñamos e instalamos closets empotrados, walk-in closets y vestieres con iluminación LED cálida, módulos extraíbles, zapateras y herrajes de cierre suave.',
    specs: ['Tableros RH y chapillas naturales', 'Correderas telescópicas cierre suave', 'Iluminación LED integrada'],
    image: '/images/closets-vestieres.jpg',
  },
  {
    slug: 'puertas',
    title: 'Puertas en Madera',
    shortTitle: 'Puertas',
    tagline: 'Presencia arquitectónica, aislamiento y precisión en cada marco.',
    description:
      'Fabricación de puertas principales pivotantes, puertas interiores entamboradas o macizas, marcos graduables, chambranas y cerraduras de alta especificación.',
    specs: ['Madera maciza o núcleo sólido', 'Sellado en poliuretano de alta resistencia', 'Instalación nivelada a plomo'],
    image: '/images/puertas-madera.jpg',
  },
  {
    slug: 'cocinas',
    title: 'Cocinas Integrales',
    shortTitle: 'Cocinas',
    tagline: 'El corazón del hogar en maderas nobles y herrajes de precisión.',
    description:
      'Cocinas lineales, en L, en U y con isla central. Combinamos tableros resistentes a humedad y calor con torres de hornos, alacenas extraíbles y acabados mate o veta natural.',
    specs: ['Módulos RH antihumedad', 'Bisagras hidráulicas y torres extraíbles', 'Diseño funcional ergonómico'],
    image: '/images/hero-cocina.jpg',
  },
  {
    slug: 'muebles-de-bano',
    title: 'Muebles de Baño',
    shortTitle: 'Muebles de Baño',
    tagline: 'Elegancia protegida contra la humedad y el uso diario.',
    description:
      'Vanities flotantes y muebles auxiliares en maderas tratadas e hidrófugas, pensados para lavamanos sobreponer o bajo cubierta, con cajones optimizados alrededor de la tubería.',
    specs: ['Sustratos RH resistentes al vapor', 'Lacados impermeables de poro cerrado', 'Frentes acanalados o lisos'],
    image: '/images/muebles-bano.jpg',
  },
  {
    slug: 'mobiliario-especial',
    title: 'Mobiliario & Proyectos',
    shortTitle: 'Mobiliario',
    tagline: 'Centros de entretenimiento, bibliotecas, oficinas y revestimientos.',
    description:
      'Carpintería arquitectónica residencial y corporativa: paneles acústicos listonados, bibliotecas piso-techo, escritorios ejecutivos, recepciones y muebles auxiliares.',
    specs: ['Diseño 3D y toma de medidas en obra', 'Acabados homogéneos por proyecto', 'Atención residencial y constructora'],
    image: '/images/carpinteria-corporativa.jpg',
  },
];

export function findCategoryBySlug(slug) {
  if (!slug) return null;
  return CARPENTRY_CATEGORIES.find((cat) => cat.slug === slug) ?? null;
}
