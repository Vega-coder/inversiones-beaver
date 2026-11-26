import { useState } from 'react';
import { HiOutlineChevronDown } from 'react-icons/hi2';
import SectionHeading from '@/presentation/components/ui/SectionHeading.jsx';
import ScrollReveal from '@/presentation/components/ui/ScrollReveal.jsx';

export default function FAQAccordion({ faqs = [] }) {
  const [openIndex, setOpenIndex] = useState(0);

  if (!faqs.length) return null;

  return (
    <section className="border-t border-ink/10 bg-cream py-14 sm:py-20">
      <div className="container-luxe max-w-4xl">
        <ScrollReveal>
          <SectionHeading
            eyebrow="Preguntas Frecuentes"
            title="Resolvemos tus dudas antes de iniciar"
            subtitle="Información clara sobre fabricación a medida, tableros antihumedad, tiempos y garantía."
          />
        </ScrollReveal>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={faq.question}
                className={`overflow-hidden rounded-sm border transition ${
                  isOpen ? 'border-mahogany/40 bg-white shadow-sm' : 'border-ink/10 bg-cream-light'
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? -1 : idx)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left sm:px-6 sm:py-5"
                >
                  <span className="font-display text-base font-medium text-ink sm:text-lg">
                    {faq.question}
                  </span>
                  <HiOutlineChevronDown
                    className={`h-5 w-5 shrink-0 text-mahogany transition-transform duration-300 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="border-t border-ink/10 px-5 py-4 text-sm leading-relaxed text-taupe sm:px-6">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
