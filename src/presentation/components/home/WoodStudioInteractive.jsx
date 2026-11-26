import { useState } from 'react';
import { HiArrowLongRight, HiOutlineSwatch } from 'react-icons/hi2';
import SectionHeading from '@/presentation/components/ui/SectionHeading.jsx';
import ScrollReveal from '@/presentation/components/ui/ScrollReveal.jsx';

export default function WoodStudioInteractive({ finishes = [], onSelectFinish }) {
  const [selectedId, setSelectedId] = useState(finishes[0]?.id || '');
  const active = finishes.find((f) => f.id === selectedId) || finishes[0];

  if (!active) return null;

  const handleChooseFinish = () => {
    onSelectFinish?.(active.name);
    const quoteEl = document.getElementById('cotizar');
    quoteEl?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="border-b border-ink/10 bg-cream-light py-14 sm:py-20">
      <div className="container-luxe">
        <ScrollReveal>
          <SectionHeading
            eyebrow="Estudio de Acabados Interactivo"
            title="Explora tonos de madera y tableros RH"
            subtitle="Toca cada muestra para comparar su resistencia a la humedad, textura y aplicaciones recomendadas antes de cotizar."
          />
        </ScrollReveal>

        <div className="grid gap-6 rounded-sm border border-ink/15 bg-white p-4 shadow-card sm:p-8 lg:grid-cols-12 lg:items-center lg:gap-10">
          {/* Selector táctil de muestras (horizontal en móvil, grilla en escritorio) */}
          <div className="min-w-0 lg:col-span-5">
            <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-mahogany">
              <HiOutlineSwatch className="h-4 w-4" />
              <span>Selecciona un acabado</span>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3">
              {finishes.map((finish) => {
                const isSelected = finish.id === active.id;
                return (
                  <button
                    key={finish.id}
                    type="button"
                    onClick={() => setSelectedId(finish.id)}
                    className={`flex flex-col items-start rounded-sm border p-3.5 text-left transition active:scale-[0.98] ${
                      isSelected
                        ? 'border-mahogany bg-cream-light ring-1 ring-mahogany shadow-sm'
                        : 'border-ink/15 bg-white hover:border-mahogany/50'
                    }`}
                  >
                    <div
                      className="h-10 w-full rounded-sm border border-ink/15 shadow-inner"
                      style={{
                        background: `repeating-linear-gradient(92deg, ${finish.hex} 0px, ${finish.hex} 14px, ${finish.grainHex} 16px, ${finish.hex} 26px)`,
                      }}
                    />
                    <span className="mt-2.5 font-display text-sm font-semibold text-ink sm:text-base">
                      {finish.name}
                    </span>
                    <span className="mt-0.5 text-[10px] font-medium uppercase tracking-wider text-taupe">
                      {finish.code}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Ficha interactiva del acabado seleccionado */}
          <div className="min-w-0 lg:col-span-7">
            <div className="rounded-sm border border-ink/10 bg-cream-light p-5 sm:p-7">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="eyebrow text-[10px] text-mahogany">{active.code}</p>
                  <h3 className="mt-1 font-display text-2xl font-semibold text-ink sm:text-3xl">
                    {active.name}
                  </h3>
                </div>
                <span
                  className="h-12 w-12 shrink-0 rounded-sm border border-ink/20 shadow-md"
                  style={{
                    background: `repeating-linear-gradient(95deg, ${active.hex} 0px, ${active.hex} 12px, ${active.grainHex} 14px, ${active.hex} 22px)`,
                  }}
                />
              </div>

              <p className="mt-3 text-sm leading-relaxed text-taupe">{active.description}</p>

              <p className="mt-4 text-xs text-ink">
                <strong className="uppercase tracking-wider text-mahogany">Ideal para: </strong>
                {active.recommendedFor}
              </p>

              {/* Medidores visuales */}
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <div>
                  <div className="flex justify-between text-[11px] font-semibold uppercase tracking-wider text-ink">
                    <span>Resistencia a humedad</span>
                    <span className="text-mahogany">{active.humidityLevel}%</span>
                  </div>
                  <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-ink/10">
                    <div
                      className="h-full rounded-full bg-mahogany transition-all duration-500"
                      style={{ width: `${active.humidityLevel}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-[11px] font-semibold uppercase tracking-wider text-ink">
                    <span>Durabilidad al rayado</span>
                    <span className="text-mahogany">{active.durabilityLevel}%</span>
                  </div>
                  <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-ink/10">
                    <div
                      className="h-full rounded-full bg-ink transition-all duration-500"
                      style={{ width: `${active.durabilityLevel}%` }}
                    />
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <button
                  type="button"
                  onClick={handleChooseFinish}
                  className="btn-mahogany w-full sm:w-auto"
                >
                  Cotizar con {active.name}
                  <HiArrowLongRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
