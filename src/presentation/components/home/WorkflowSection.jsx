import { useState } from 'react';
import { HiOutlineCheckCircle } from 'react-icons/hi2';
import SectionHeading from '@/presentation/components/ui/SectionHeading.jsx';
import ScrollReveal from '@/presentation/components/ui/ScrollReveal.jsx';

export default function WorkflowSection({ workflow = [] }) {
  const [activeIdx, setActiveIdx] = useState(0);
  const currentStep = workflow[activeIdx] || workflow[0];

  return (
    <section className="bg-ink py-14 text-cream-light sm:py-22">
      <div className="container-luxe grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
        <div className="min-w-0 lg:col-span-5">
          <ScrollReveal>
            <SectionHeading
              align="left"
              tone="light"
              eyebrow="Método de Trabajo"
              title="Del plano en obra al último ajuste en madera"
              subtitle="Toca cada etapa para ver cómo garantizamos precisión milimétrica y entrega puntual."
            />
          </ScrollReveal>

          {currentStep && (
            <div className="mb-6 rounded-sm border border-brass-light/30 bg-ink-soft p-4">
              <p className="eyebrow text-[10px] text-brass-light">
                Etapa seleccionada · {currentStep.step}
              </p>
              <p className="mt-1 flex items-center gap-2 text-sm font-medium text-cream-light">
                <HiOutlineCheckCircle className="h-4 w-4 shrink-0 text-brass-light" />
                <span>{currentStep.deliverable}</span>
              </p>
            </div>
          )}

          <ScrollReveal delay={100}>
            <div className="overflow-hidden rounded-sm border border-cream/15">
              <img
                src="/images/taller-artesanal.jpg"
                alt="Taller de carpintería y ebanistería de precisión Inversiones Beaver"
                loading="lazy"
                className="aspect-[16/10] w-full object-cover sm:aspect-[4/3]"
              />
            </div>
          </ScrollReveal>
        </div>

        <div className="grid min-w-0 gap-4 sm:grid-cols-2 lg:col-span-7">
          {workflow.map((item, idx) => {
            const isActive = idx === activeIdx;
            return (
              <ScrollReveal key={item.step} delay={idx * 70}>
                <button
                  type="button"
                  onClick={() => setActiveIdx(idx)}
                  className={`flex h-full w-full flex-col rounded-sm border p-5 text-left transition active:scale-[0.99] sm:p-6 ${
                    isActive
                      ? 'border-brass-light bg-ink-muted ring-1 ring-brass-light/60 shadow-lg'
                      : 'border-cream/15 bg-ink-soft hover:border-mahogany-light'
                  }`}
                >
                  <div className="flex w-full items-center justify-between">
                    <span className="font-display text-3xl font-semibold text-brass-light">
                      {item.step}
                    </span>
                    <span
                      className={`rounded-sm px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider ${
                        isActive ? 'bg-mahogany text-cream-light' : 'bg-cream/10 text-cream/70'
                      }`}
                    >
                      {isActive ? 'Activa' : 'Ver detalle'}
                    </span>
                  </div>

                  <h3 className="mt-4 font-display text-xl font-medium text-cream-light">
                    {item.title}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-cream/75">
                    {item.description}
                  </p>
                </button>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
