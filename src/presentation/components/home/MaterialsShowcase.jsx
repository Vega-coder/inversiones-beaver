import SectionHeading from '@/presentation/components/ui/SectionHeading.jsx';
import ScrollReveal from '@/presentation/components/ui/ScrollReveal.jsx';

export default function MaterialsShowcase({ materials = [] }) {
  return (
    <section className="border-y border-ink/10 bg-cream py-16 sm:py-24">
      <div className="container-luxe">
        <ScrollReveal>
          <SectionHeading
            eyebrow="Especificaciones & Acabados"
            title="Maderas, Tableros & Herrajes"
            subtitle="Trabajamos exclusivamente con insumos certificados que garantizan estabilidad estructural, resistencia a la humedad y estética duradera."
          />
        </ScrollReveal>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {materials.map((mat, idx) => (
            <ScrollReveal key={mat.name} delay={idx * 75}>
              <div className="flex h-full flex-col rounded-sm border border-ink/10 bg-cream-light p-6 shadow-sm transition hover:border-mahogany/35">
                <div className="flex items-center justify-between">
                  <span
                    className="h-9 w-9 rounded-sm border border-ink/15 shadow-inner"
                    style={{ backgroundColor: mat.tone }}
                    aria-hidden="true"
                  />
                  <span className="font-mono text-[11px] font-semibold text-mahogany">
                    0{idx + 1}
                  </span>
                </div>

                <h3 className="mt-5 font-display text-xl font-medium text-ink">{mat.name}</h3>
                <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-mahogany">
                  {mat.subtitle}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-taupe">{mat.description}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
