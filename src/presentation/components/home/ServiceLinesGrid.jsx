import { Link } from 'react-router-dom';
import { HiArrowLongRight, HiOutlineCheck } from 'react-icons/hi2';
import SectionHeading from '@/presentation/components/ui/SectionHeading.jsx';
import ScrollReveal from '@/presentation/components/ui/ScrollReveal.jsx';

export default function ServiceLinesGrid({ categories = [] }) {
  return (
    <section className="container-luxe py-16 sm:py-24">
      <ScrollReveal>
        <SectionHeading
          eyebrow="Especialidades en Madera"
          title="Qué fabricamos en Inversiones Beaver"
          subtitle="Cada pieza es fabricada bajo medida exacta, combinando maderas seleccionadas, tableros resistentes a humedad y herrajes de precisión."
        />
      </ScrollReveal>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {categories.map((cat, index) => (
          <ScrollReveal key={cat.slug} delay={index * 70}>
            <Link
              to={`/servicios/${cat.slug}`}
              className={`group flex h-full flex-col overflow-hidden rounded-sm border border-ink/10 bg-white shadow-card transition duration-300 hover:-translate-y-1 hover:border-mahogany/40 hover:shadow-luxe ${
                index === 0 ? 'md:col-span-2 lg:col-span-1' : ''
              }`}
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-cream">
                <img
                  src={cat.image}
                  alt={cat.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent opacity-80" />
                <span className="absolute bottom-4 left-4 bg-cream-light/95 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-mahogany">
                  {cat.shortTitle}
                </span>
              </div>

              <div className="flex flex-1 flex-col p-6">
                <h3 className="font-display text-2xl font-medium text-ink transition group-hover:text-mahogany">
                  {cat.title}
                </h3>
                <p className="mt-2 text-xs font-medium text-mahogany/90">{cat.tagline}</p>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-taupe">{cat.description}</p>

                <ul className="mt-5 space-y-1.5 border-t border-ink/10 pt-4">
                  {cat.specs.map((spec) => (
                    <li key={spec} className="flex items-center gap-2 text-xs text-ink/80">
                      <HiOutlineCheck className="h-3.5 w-3.5 shrink-0 text-mahogany" />
                      <span>{spec}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-5 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-ink transition group-hover:text-mahogany">
                  Ver proyectos y detalles
                  <HiArrowLongRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
