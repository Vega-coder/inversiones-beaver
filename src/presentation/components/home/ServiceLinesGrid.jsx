import { Link } from 'react-router-dom';
import { HiArrowLongRight, HiOutlineCheck, HiOutlineCalculator } from 'react-icons/hi2';
import SectionHeading from '@/presentation/components/ui/SectionHeading.jsx';
import ScrollReveal from '@/presentation/components/ui/ScrollReveal.jsx';

export default function ServiceLinesGrid({ categories = [], onSelectService }) {
  const handleQuoteService = (title) => {
    onSelectService?.(title);
    const quoteEl = document.getElementById('cotizar');
    quoteEl?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="container-luxe py-14 sm:py-22">
      <ScrollReveal>
        <SectionHeading
          eyebrow="Especialidades en Madera"
          title="Qué fabricamos en Inversiones Beaver"
          subtitle="Cada pieza es fabricada bajo medida exacta, combinando maderas seleccionadas, tableros resistentes a humedad y herrajes de precisión."
        />
      </ScrollReveal>

      <div className="grid gap-5 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
        {categories.map((cat, index) => (
          <ScrollReveal key={cat.slug} delay={index * 60}>
            <article className="group flex h-full flex-col overflow-hidden rounded-sm border border-ink/10 bg-white shadow-card transition duration-300 hover:-translate-y-1 hover:border-mahogany/40 hover:shadow-luxe">
              <Link to={`/servicios/${cat.slug}`} className="relative aspect-[16/10] overflow-hidden bg-cream sm:aspect-[4/3]">
                <img
                  src={cat.image}
                  alt={cat.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-transparent to-transparent opacity-85" />
                <span className="absolute bottom-3 left-3 bg-cream-light/95 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-mahogany sm:bottom-4 sm:left-4">
                  {cat.shortTitle}
                </span>
              </Link>

              <div className="flex flex-1 flex-col p-5 sm:p-6">
                <Link to={`/servicios/${cat.slug}`}>
                  <h3 className="font-display text-xl font-medium text-ink transition group-hover:text-mahogany sm:text-2xl">
                    {cat.title}
                  </h3>
                </Link>
                <p className="mt-1.5 text-xs font-medium text-mahogany/90">{cat.tagline}</p>
                <p className="mt-2.5 flex-1 text-sm leading-relaxed text-taupe">{cat.description}</p>

                <ul className="mt-4 space-y-1.5 border-t border-ink/10 pt-4">
                  {cat.specs.map((spec) => (
                    <li key={spec} className="flex items-center gap-2 text-xs text-ink/80">
                      <HiOutlineCheck className="h-3.5 w-3.5 shrink-0 text-mahogany" />
                      <span>{spec}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-ink/10 pt-4">
                  <Link
                    to={`/servicios/${cat.slug}`}
                    className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-ink transition hover:text-mahogany"
                  >
                    Ver diseños
                    <HiArrowLongRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>

                  <button
                    type="button"
                    onClick={() => handleQuoteService(cat.title)}
                    className="inline-flex items-center gap-1.5 rounded-sm border border-mahogany/30 bg-cream-light px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.15em] text-mahogany transition hover:bg-mahogany hover:text-cream-light active:scale-95"
                  >
                    <HiOutlineCalculator className="h-3.5 w-3.5" />
                    Cotizar
                  </button>
                </div>
              </div>
            </article>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
