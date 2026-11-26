import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { HiArrowLongRight, HiOutlineShieldCheck } from 'react-icons/hi2';

const HERO_SHOWCASE = [
  {
    id: 'cocinas',
    chip: 'Cocinas Integrales',
    eyebrow: 'Cocinas Arquitectónicas',
    title: 'Cocinas en Madera & Tableros RH',
    subtitle: 'Islas centrales, torres de hornos y herrajes hidráulicos de cierre suave diseñados al milímetro.',
    slug: '/servicios/cocinas',
    image: '/images/hero-cocina.jpg',
    tag: 'Tableros RH + Nogal',
  },
  {
    id: 'closets',
    chip: 'Closets & Vestieres',
    eyebrow: 'Vestieres a Medida',
    title: 'Closets con Iluminación Integrada',
    subtitle: 'Organización inteligente de piso a techo con cajoneras, zapateras y acabados de alta gama.',
    slug: '/servicios/closets',
    image: '/images/closets-vestieres.jpg',
    tag: 'Iluminación LED 3000K',
  },
  {
    id: 'puertas',
    chip: 'Puertas en Madera',
    eyebrow: 'Puertas Macizas & Pivotantes',
    title: 'Presencia & Aislamiento Acústico',
    subtitle: 'Puertas principales y de alcoba en madera seleccionada con marcos graduables y sellado poliuretano.',
    slug: '/servicios/puertas',
    image: '/images/puertas-madera.jpg',
    tag: 'Madera Estufada',
  },
  {
    id: 'banos',
    chip: 'Muebles de Baño',
    eyebrow: 'Vanities Antihumedad',
    title: 'Muebles de Baño en Madera Tratada',
    subtitle: 'Diseños flotantes o a piso con lacados impermeables y cajones optimizados alrededor de tuberías.',
    slug: '/servicios/muebles-de-bano',
    image: '/images/muebles-bano.jpg',
    tag: 'Protección Antivapor',
  },
];

export default function Hero() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % HERO_SHOWCASE.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [activeIndex]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: px * 8, y: -py * 8 });
  };

  const handleMouseLeave = () => setTilt({ x: 0, y: 0 });

  const current = HERO_SHOWCASE[activeIndex];

  return (
    <section className="relative overflow-hidden border-b border-ink/10 bg-cream-light">
      {/* Textura arquitectónica sutil */}
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            'radial-gradient(circle at 82% 24%, rgba(107, 47, 38, 0.12), transparent 45%), radial-gradient(circle at 12% 80%, rgba(184, 142, 84, 0.12), transparent 40%)',
        }}
      />

      <div className="container-luxe relative grid items-center gap-10 py-12 sm:py-16 lg:grid-cols-12 lg:gap-12 lg:py-20">
        {/* Columna izquierda: Mensaje corporativo */}
        <div className="lg:col-span-6">
          <div className="inline-flex items-center gap-2 border border-mahogany/25 bg-white/80 px-3.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-mahogany">
            <HiOutlineShieldCheck className="h-4 w-4" />
            Inversiones Beaver &amp; Asociados S.A.S.
          </div>

          <h1 className="mt-6 font-display text-4xl font-semibold leading-[1.08] tracking-tight text-ink sm:text-5xl lg:text-[3.4rem]">
            Carpintería arquitectónica en madera{' '}
            <span className="text-mahogany italic font-normal">hecha a tu medida.</span>
          </h1>

          <p className="mt-5 max-w-xl text-sm leading-relaxed text-taupe sm:text-base">
            Diseñamos, fabricamos e instalamos <strong className="font-semibold text-ink">closets</strong>,{' '}
            <strong className="font-semibold text-ink">puertas en madera</strong>,{' '}
            <strong className="font-semibold text-ink">cocinas integrales</strong>,{' '}
            <strong className="font-semibold text-ink">muebles de baño</strong> y mobiliario especial con
            materiales hidrófugos, herrajes de cierre suave y terminación profesional.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a href="#cotizar" className="btn-mahogany">
              Solicitar Cotización
              <HiArrowLongRight className="h-4 w-4" />
            </a>
            <Link to="/servicios" className="btn-outline">
              Explorar Servicios
            </Link>
          </div>

          {/* Selector interactivo de especialidad */}
          <div className="mt-10 border-t border-ink/10 pt-6">
            <p className="eyebrow text-[10px] text-taupe">Líneas Destacadas</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {HERO_SHOWCASE.map((item, idx) => {
                const isSelected = idx === activeIndex;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setActiveIndex(idx)}
                    className={`rounded-sm border px-3.5 py-2 text-[11px] font-semibold uppercase tracking-[0.14em] transition ${
                      isSelected
                        ? 'border-mahogany bg-ink text-cream-light shadow-sm'
                        : 'border-ink/15 bg-white text-ink/75 hover:border-mahogany hover:text-mahogany'
                    }`}
                  >
                    {item.chip}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Columna derecha: Tarjeta visual interactiva */}
        <div
          className="lg:col-span-6"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <div
            className="relative overflow-hidden rounded-sm border border-ink/15 bg-ink shadow-luxe transition-transform duration-300 ease-out"
            style={{
              transform: `perspective(1100px) rotateY(${tilt.x}deg) rotateX(${tilt.y}deg)`,
            }}
          >
            <div className="relative aspect-[4/3] w-full overflow-hidden">
              <img
                key={current.image}
                src={current.image}
                alt={current.title}
                className="h-full w-full object-cover transition duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/25 to-transparent" />

              <span className="absolute left-5 top-5 bg-mahogany px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-cream-light">
                {current.tag}
              </span>

              <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8 text-cream-light">
                <p className="eyebrow text-brass-light">{current.eyebrow}</p>
                <h2 className="mt-1.5 font-display text-2xl font-medium sm:text-3xl">
                  {current.title}
                </h2>
                <p className="mt-2 max-w-lg text-xs leading-relaxed text-cream/80 sm:text-sm">
                  {current.subtitle}
                </p>
                <Link
                  to={current.slug}
                  className="mt-4 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-brass-light transition hover:text-white"
                >
                  Ver línea completa <HiArrowLongRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
