import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FaWhatsapp } from 'react-icons/fa6';
import { HiArrowLongLeft, HiOutlineCheckCircle, HiOutlineClock, HiOutlineShieldCheck } from 'react-icons/hi2';
import { useCases } from '@/infrastructure/container.js';

export default function SolutionDetail() {
  const { slug } = useParams();
  const [detail, setDetail] = useState(undefined);

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
    <div className="container-luxe py-12 sm:py-16">
      <Link
        to={`/servicios/${solution.categorySlug}`}
        className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-mahogany hover:text-ink"
      >
        <HiArrowLongLeft className="h-4 w-4" />
        Volver a {solution.categoryLabel}
      </Link>

      <div className="mt-8 grid items-start gap-10 lg:grid-cols-12">
        <div className="overflow-hidden rounded-sm border border-ink/15 bg-white shadow-luxe lg:col-span-7">
          <img
            src={solution.image}
            alt={solution.title}
            className="aspect-[4/3] w-full object-cover"
          />
        </div>

        <div className="lg:col-span-5">
          <p className="eyebrow text-mahogany">{solution.categoryLabel}</p>
          <h1 className="mt-2 font-display text-3xl font-semibold text-ink sm:text-4xl">
            {solution.title}
          </h1>
          <div className="brand-rule mt-4" />
          <p className="mt-5 text-sm leading-relaxed text-taupe sm:text-base">
            {solution.description}
          </p>

          <div className="mt-6 grid gap-3 border-y border-ink/10 py-5 text-xs text-ink">
            <div className="flex items-center gap-2.5">
              <HiOutlineClock className="h-4 w-4 text-mahogany" />
              <span>
                <strong>Tiempo estimado:</strong> {solution.leadTime}
              </span>
            </div>
            <div className="flex items-center gap-2.5">
              <HiOutlineShieldCheck className="h-4 w-4 text-mahogany" />
              <span>
                <strong>Respaldo:</strong> {solution.warranty}
              </span>
            </div>
          </div>

          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            <div>
              <h2 className="font-sans text-[11px] font-semibold uppercase tracking-[0.18em] text-ink">
                Materiales
              </h2>
              <ul className="mt-3 space-y-2 text-xs text-taupe">
                {solution.materials.map((mat) => (
                  <li key={mat} className="flex items-center gap-2">
                    <HiOutlineCheckCircle className="h-4 w-4 shrink-0 text-mahogany" />
                    <span>{mat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="font-sans text-[11px] font-semibold uppercase tracking-[0.18em] text-ink">
                Herrajes &amp; Sistemas
              </h2>
              <ul className="mt-3 space-y-2 text-xs text-taupe">
                {solution.hardware.map((hw) => (
                  <li key={hw} className="flex items-center gap-2">
                    <HiOutlineCheckCircle className="h-4 w-4 shrink-0 text-mahogany" />
                    <span>{hw}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            {quoteDispatch.ok && (
              <a
                href={quoteDispatch.whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="btn-mahogany"
              >
                <FaWhatsapp className="h-4 w-4" />
                Cotizar este diseño
              </a>
            )}
            <a href="/#cotizar" className="btn-outline">
              Formulario de medidas
            </a>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-20 border-t border-ink/10 pt-14">
          <h2 className="font-display text-2xl font-medium text-ink">Otras soluciones en madera</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-3">
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
                  className="aspect-[4/3] w-full object-cover transition duration-500 group-hover:scale-105"
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
    </div>
  );
}
