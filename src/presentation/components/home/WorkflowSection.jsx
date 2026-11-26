import SectionHeading from '@/presentation/components/ui/SectionHeading.jsx';
import ScrollReveal from '@/presentation/components/ui/ScrollReveal.jsx';

export default function WorkflowSection({ workflow = [] }) {
  return (
    <section className="bg-ink py-16 text-cream-light sm:py-24">
      <div className="container-luxe grid items-center gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <ScrollReveal>
            <SectionHeading
              align="left"
              tone="light"
              eyebrow="Método de Trabajo"
              title="Del plano en obra al último ajuste en madera"
              subtitle="Acompañamos cada proyecto residencial, remodelación o desarrollo constructivo con cronograma claro y mano de obra especializada."
            />
          </ScrollReveal>

          <ScrollReveal delay={120}>
            <div className="overflow-hidden rounded-sm border border-cream/15">
              <img
                src="/images/taller-artesanal.jpg"
                alt="Taller de carpintería y ebanistería de precisión Inversiones Beaver"
                loading="lazy"
                className="aspect-[4/3] w-full object-cover"
              />
            </div>
          </ScrollReveal>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:col-span-7">
          {workflow.map((item, idx) => (
            <ScrollReveal key={item.step} delay={idx * 80}>
              <div className="flex h-full flex-col rounded-sm border border-cream/15 bg-ink-soft p-6 transition hover:border-mahogany-light">
                <span className="font-display text-3xl font-semibold text-brass-light">
                  {item.step}
                </span>
                <h3 className="mt-4 font-display text-xl font-medium text-cream-light">
                  {item.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-cream/75">
                  {item.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
