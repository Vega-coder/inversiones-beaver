import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FaWhatsapp } from 'react-icons/fa6';
import {
  HiArrowLongLeft,
  HiOutlineCheckCircle,
  HiOutlineClock,
  HiOutlineShieldCheck,
  HiOutlineMagnifyingGlassPlus,
  HiOutlineXMark,
} from 'react-icons/hi2';
import { COMPANY_INFO, useCases } from '@/infrastructure/container.js';

export default function SolutionDetail() {
  const { slug } = useParams();
  const [detail, setDetail] = useState(undefined);
  const [activeTab, setActiveTab] = useState('materials');
  const [zoomOpen, setZoomOpen] = useState(false);

  useEffect(() => {
    let active = true;
    useCases.getSolutionDetail(slug).then((res) => {
      if (active) setDetail(res);
    });
    return () => {
      active = false;
    };
  }, [slug]);

  if (detail === undefined) {
    return <div className="container-luxe py-24 text-center text-sm text-taupe">Cargando ficha técnica...</div>;
  }

  if (detail === null) {
    return (
      <div className="container-luxe py-24 text-center">
        <h1 className="font-display text-3xl text-ink">Proyecto no encontrado</h1>
        <p className="mt-3 text-sm text-taupe">La solución consultada no está disponible o cambió de ruta.</p>
        <Link to="/servicios" className="btn-mahogany mt-6">
          Volver al catálogo
        </Link>
      </div>
    );
  }

  const { solution, related } = detail;
  const quoteDispatch = useCases.prepareQuoteDispatch({
    name: 'Cliente interesado',
    phone: '0000000',
    projectType: solution.title,
    details: `Estoy interesado en cotizar una solución similar a "${solution.title}".`,
  });

  return (
    <div className="container-luxe py-10 sm:py-16">
      <Link
        to={`/servicios/${solution.categorySlug}`}
        className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-mahogany hover:text-ink"
      >
        <HiArrowLongLeft className="h-4 w-4" />
        Volver a {solution.categoryLabel}
      </Link>

      <div className="mt-6 grid items-start gap-8 lg:grid-cols-12 lg:gap-10">
        {/* Imagen con zoom interactivo */}
        <div className="lg:col-span-7">
          <button
            type="button"
            onClick={() => setZoomOpen(true)}
            aria-label="Ampliar fotografía del proyecto"
            className="group relative block w-full overflow-hidden rounded-sm border border-ink/15 bg-white shadow-luxe"
          >
            <img
              src={solution.image}
              alt={solution.title}
              className="aspect-[4/3] w-full object-cover transition duration-500 group-hover:scale-[1.02]"
            />
            <span className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-sm bg-ink/80 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-cream-light backdrop-blur-sm">
              <HiOutlineMagnifyingGlassPlus className="h-4 w-4" />
              Ampliar vista
            </span>
          </button>
        </div>

        <div className="lg:col-span-5">
          <p className="eyebrow text-mahogany">{solution.categoryLabel}</p>
          <h1 className="mt-2 font-display text-3xl font-semibold text-ink sm:text-4xl">
            {solution.title}
          </h1>
          <div className="brand-rule mt-4" />
          <p className="mt-4 text-sm leading-relaxed text-taupe sm:text-base">
            {solution.description}
          </p>

          <div className="mt-5 grid gap-3 border-y border-ink/10 py-4 text-xs text-ink">
            <div className="flex items-center gap-2.5">
              <HiOutlineClock className="h-4 w-4 shrink-0 text-mahogany" />
              <span>
                <strong>Tiempo estimado:</strong> {solution.leadTime}
              </span>
            </div>
            <div className="flex items-center gap-2.5">
              <HiOutlineShieldCheck className="h-4 w-4 shrink-0 text-mahogany" />
              <span>
                <strong>Respaldo:</strong> {solution.warranty}
              </span>
            </div>
          </div>

          {/* Pestañas interactivas de especificaciones */}
          <div className="mt-5">
            <div className="grid grid-cols-2 border-b border-ink/10">
              <button
                type="button"
                onClick={() => setActiveTab('materials')}
                className={`py-2.5 text-[11px] font-semibold uppercase tracking-[0.16em] transition ${
                  activeTab === 'materials'
                    ? 'border-b-2 border-mahogany text-mahogany'
                    : 'text-taupe hover:text-ink'
                }`}
              >
                Materiales
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('hardware')}
                className={`py-2.5 text-[11px] font-semibold uppercase tracking-[0.16em] transition ${
                  activeTab === 'hardware'
                    ? 'border-b-2 border-mahogany text-mahogany'
                    : 'text-taupe hover:text-ink'
                }`}
              >
                Herrajes &amp; Sistemas
              </button>
            </div>

            <ul className="mt-4 space-y-2.5 text-sm text-ink/85">
              {(activeTab === 'materials' ? solution.materials : solution.hardware).map((item) => (
                <li key={item} className="flex items-center gap-2.5">
                  <HiOutlineCheckCircle className="h-4 w-4 shrink-0 text-mahogany" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            {quoteDispatch.ok && (
              <a
                href={quoteDispatch.whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="btn-mahogany w-full justify-center sm:w-auto"
              >
                <FaWhatsapp className="h-4 w-4" />
                Cotizar por WhatsApp ({COMPANY_INFO.whatsappDisplay})
              </a>
            )}
            <a href="/#cotizar" className="btn-outline w-full justify-center sm:w-auto">
              Formulario de medidas
            </a>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-16 border-t border-ink/10 pt-12 sm:mt-20 sm:pt-14">
          <h2 className="font-display text-2xl font-medium text-ink">Otras soluciones en madera</h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-3 sm:gap-6">
            {related.map((item) => (
              <Link
                key={item.id}
                to={`/proyecto/${item.slug}`}
                className="group overflow-hidden rounded-sm border border-ink/10 bg-white shadow-card transition hover:-translate-y-1"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  className="aspect-[16/10] w-full object-cover transition duration-500 group-hover:scale-105 sm:aspect-[4/3]"
                />
                <div className="p-5">
                  <p className="eyebrow text-[10px] text-mahogany">{item.categoryLabel}</p>
                  <h3 className="mt-1.5 font-display text-lg text-ink group-hover:text-mahogany">
                    {item.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Modal lightbox para ampliar fotografía */}
      {zoomOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/90 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          onClick={() => setZoomOpen(false)}
        >
          <button
            type="button"
            onClick={() => setZoomOpen(false)}
            aria-label="Cerrar imagen"
            className="absolute right-4 top-4 rounded-sm bg-ink/80 p-2 text-cream-light hover:bg-mahogany"
          >
            <HiOutlineXMark className="h-6 w-6" />
          </button>
          <img
            src={solution.image}
            alt={solution.title}
            className="max-h-[85vh] w-auto max-w-full rounded-sm object-contain shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
}
