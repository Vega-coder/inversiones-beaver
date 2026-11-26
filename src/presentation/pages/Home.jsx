import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { HiArrowLongRight } from 'react-icons/hi2';
import { useCases } from '@/infrastructure/container.js';
import Hero from '@/presentation/components/home/Hero.jsx';
import CarpentryTicker from '@/presentation/components/home/CarpentryTicker.jsx';
import ServiceLinesGrid from '@/presentation/components/home/ServiceLinesGrid.jsx';
import WoodStudioInteractive from '@/presentation/components/home/WoodStudioInteractive.jsx';
import MaterialsShowcase from '@/presentation/components/home/MaterialsShowcase.jsx';
import WorkflowSection from '@/presentation/components/home/WorkflowSection.jsx';
import FAQAccordion from '@/presentation/components/home/FAQAccordion.jsx';
import QuoteSection from '@/presentation/components/home/QuoteSection.jsx';
import SectionHeading from '@/presentation/components/ui/SectionHeading.jsx';
import ScrollReveal from '@/presentation/components/ui/ScrollReveal.jsx';

export default function Home() {
  const [showcase, setShowcase] = useState(null);
  const [selectedService, setSelectedService] = useState('');
  const [selectedFinish, setSelectedFinish] = useState('');

  useEffect(() => {
    let active = true;
    useCases.getHomeShowcase().then((data) => {
      if (active) setShowcase(data);
    });
    return () => {
      active = false;
    };
  }, []);

  if (!showcase) {
    return (
      <div className="container-luxe py-24 text-center text-sm text-taupe">
        Cargando portafolio de Inversiones Beaver...
      </div>
    );
  }

  return (
    <>
      <Hero />
      <CarpentryTicker />
      <ServiceLinesGrid
        categories={showcase.categories}
        onSelectService={(serviceTitle) => setSelectedService(serviceTitle)}
      />

      <WoodStudioInteractive
        finishes={showcase.finishes}
        onSelectFinish={(finishName) => setSelectedFinish(finishName)}
      />

      {/* Proyectos destacados */}
      <section className="border-t border-ink/10 bg-cream-light py-14 sm:py-22">
        <div className="container-luxe">
          <ScrollReveal>
            <SectionHeading
              eyebrow="Portafolio Seleccionado"
              title="Proyectos ejecutados a medida"
              subtitle="Cada instalación combina carpintería estructural de precisión con acabados sobrios pensados para durar décadas."
            />
          </ScrollReveal>

          <div className="grid gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {showcase.featuredSolutions.slice(0, 3).map((item, idx) => (
              <ScrollReveal key={item.id} delay={idx * 70}>
                <Link
                  to={`/proyecto/${item.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-sm border border-ink/10 bg-white shadow-card transition duration-300 hover:-translate-y-1 hover:border-mahogany/40"
                >
                  <div className="aspect-[16/10] overflow-hidden bg-cream sm:aspect-[4/3]">
                    <img
                      src={item.image}
                      alt={item.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-5 sm:p-6">
                    <p className="eyebrow text-[10px] text-mahogany">{item.categoryLabel}</p>
                    <h3 className="mt-2 font-display text-xl font-medium text-ink transition group-hover:text-mahogany">
                      {item.title}
                    </h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-taupe">{item.summary}</p>
                    <div className="mt-5 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-ink">
                      Ver ficha técnica <HiArrowLongRight className="h-4 w-4" />
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>

          <div className="mt-10 text-center sm:mt-12">
            <Link to="/servicios" className="btn-outline w-full justify-center sm:w-auto">
              Ver todo el catálogo de carpintería
            </Link>
          </div>
        </div>
      </section>

      <MaterialsShowcase materials={showcase.materials} />
      <WorkflowSection workflow={showcase.workflow} />
      <FAQAccordion faqs={showcase.faqs} />
      <QuoteSection
        preselectedService={selectedService}
        preselectedFinish={selectedFinish}
      />
    </>
  );
}
