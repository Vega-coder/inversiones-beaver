import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaWhatsapp } from 'react-icons/fa6';
import {
  HiArrowLongRight,
  HiChevronLeft,
  HiChevronRight,
  HiOutlineShieldCheck,
} from 'react-icons/hi2';
import { COMPANY_INFO, useCases } from '@/infrastructure/container.js';

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
  const [paused, setPaused] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (paused) return undefined;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % HERO_SHOWCASE.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [activeIndex, paused]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: px * 7, y: -py * 7 });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setPaused(false);
  };

  const prevSlide = () =>
    setActiveIndex((prev) => (prev - 1 + HERO_SHOWCASE.length) % HERO_SHOWCASE.length);
  const nextSlide = () => setActiveIndex((prev) => (prev + 1) % HERO_SHOWCASE.length);

  const current = HERO_SHOWCASE[activeIndex];
  const directWhatsapp = useCases.prepareQuoteDispatch({
    name: 'Cliente Web',
    phone: '0000000',
    projectType: current.chip,
    details: `Hola Inversiones Beaver, quiero cotizar ${current.chip}.`,
  });

  return (
    <section className="relative overflow-hidden border-b border-ink/10 bg-cream-light">
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            'radial-gradient(circle at 82% 24%, rgba(107, 47, 38, 0.12), transparent 45%), radial-gradient(circle at 12% 80%, rgba(184, 142, 84, 0.12), transparent 40%)',
        }}
      />

      <div className="container-luxe relative grid items-center gap-8 py-8 sm:gap-10 sm:py-14 lg:grid-cols-12 lg:gap-12 lg:py-20">
        {/* Columna izquierda */}
        <div className="lg:col-span-6">
          <div className="inline-flex items-center gap-2 border border-mahogany/25 bg-white/85 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-mahogany sm:tracking-[0.2em]">
            <HiOutlineShieldCheck className="h-4 w-4 shrink-0" />
            <span>Inversiones Beaver &amp; Asociados S.A.S.</span>
          </div>

          <h1 className="mt-4 font-display text-[2rem] font-semibold leading-[1.12] tracking-tight text-ink sm:mt-6 sm:text-5xl lg:text-[3.35rem]">
            Carpintería arquitectónica en madera{' '}
            <span className="font-normal italic text-mahogany">hecha a tu medida.</span>
          </h1>

          <p className="mt-4 max-w-xl text-sm leading-relaxed text-taupe sm:mt-5 sm:text-base">
            Diseñamos, fabricamos e instalamos <strong className="font-semibold text-ink">closets</strong>,{' '}
            <strong className="font-semibold text-ink">puertas</strong>,{' '}
            <strong className="font-semibold text-ink">cocinas integrales</strong> y{' '}
            <strong className="font-semibold text-ink">muebles de baño</strong> con tableros RH hidrófugos,
            herrajes de cierre suave y acabado profesional.
          </p>

          <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
            <a href="#cotizar" className="btn-mahogany w-full justify-center sm:w-auto">
              Solicitar Cotización
              <HiArrowLongRight className="h-4 w-4" />
            </a>
            {directWhatsapp.ok && (
              <a
                href={directWhatsapp.whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="btn-outline w-full justify-center sm:w-auto"
              >
                <FaWhatsapp className="h-4 w-4 text-mahogany" />
                WhatsApp {COMPANY_INFO.whatsappDisplay}
              </a>
            )}
          </div>

          {/* Selector horizontal desplazable en móvil */}
          <div className="mt-8 border-t border-ink/10 pt-5 sm:mt-10 sm:pt-6">
            <p className="eyebrow text-[10px] text-taupe">Toca para explorar nuestras líneas</p>
            <div className="no-scrollbar mt-3 flex gap-2 overflow-x-auto pb-1 sm:flex-wrap">
              {HERO_SHOWCASE.map((item, idx) => {
                const isSelected = idx === activeIndex;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setActiveIndex(idx)}
                    className={`shrink-0 rounded-sm border px-3.5 py-2 text-[11px] font-semibold uppercase tracking-[0.14em] transition active:scale-95 ${
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
          onMouseEnter={() => setPaused(true)}
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
              <div className="absolute inset-0 bg-gradient-to-t from-ink/95 via-ink/35 to-transparent" />

              {/* Etiqueta superior y flechas */}
              <div className="absolute inset-x-4 top-4 flex items-center justify-between gap-2 sm:inset-x-5 sm:top-5">
                <span className="bg-mahogany px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-cream-light">
                  {current.tag}
                </span>

                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={prevSlide}
                    aria-label="Anterior especialidad"
                    className="flex h-8 w-8 items-center justify-center rounded-sm bg-ink/70 text-cream-light backdrop-blur-sm transition hover:bg-mahogany active:scale-95"
                  >
                    <HiChevronLeft className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={nextSlide}
                    aria-label="Siguiente especialidad"
                    className="flex h-8 w-8 items-center justify-center rounded-sm bg-ink/70 text-cream-light backdrop-blur-sm transition hover:bg-mahogany active:scale-95"
                  >
                    <HiChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="absolute inset-x-0 bottom-0 p-4 text-cream-light sm:p-8">
                <p className="eyebrow text-[10px] text-brass-light">{current.eyebrow}</p>
                <h2 className="mt-1 font-display text-xl font-medium sm:text-3xl">
                  {current.title}
                </h2>
                <p className="mt-1.5 line-clamp-2 max-w-lg text-xs leading-relaxed text-cream/85 sm:line-clamp-none sm:text-sm">
                  {current.subtitle}
                </p>

                <div className="mt-3 flex flex-wrap items-center justify-between gap-3 sm:mt-4">
                  <Link
                    to={current.slug}
                    className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-brass-light transition hover:text-white"
                  >
                    Ver línea completa <HiArrowLongRight className="h-4 w-4" />
                  </Link>

                  <div className="flex items-center gap-1.5">
                    {HERO_SHOWCASE.map((item, idx) => (
                      <button
                        key={item.id}
                        type="button"
                        aria-label={`Ir a ${item.chip}`}
                        onClick={() => setActiveIndex(idx)}
                        className={`h-1.5 rounded-full transition-all ${
                          idx === activeIndex ? 'w-6 bg-brass-light' : 'w-2 bg-cream/40 hover:bg-cream/70'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
