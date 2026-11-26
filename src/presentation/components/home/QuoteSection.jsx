import { useState } from 'react';
import { FaWhatsapp } from 'react-icons/fa6';
import { HiOutlineEnvelope, HiOutlineCheckCircle } from 'react-icons/hi2';
import SectionHeading from '@/presentation/components/ui/SectionHeading.jsx';
import ScrollReveal from '@/presentation/components/ui/ScrollReveal.jsx';
import { CARPENTRY_CATEGORIES } from '@/domain/carpentry/categories.js';
import { useCases } from '@/infrastructure/container.js';

export default function QuoteSection() {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    projectType: 'Cocinas Integrales',
    city: '',
    details: '',
  });
  const [errors, setErrors] = useState({});
  const [dispatchResult, setDispatchResult] = useState(null);

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const res = useCases.prepareQuoteDispatch(form);
    if (!res.ok) {
      setErrors(res.errors);
      return;
    }
    setErrors({});
    setDispatchResult(res);
  };

  return (
    <section id="cotizar" className="container-luxe py-16 sm:py-24">
      <div className="grid gap-10 rounded-sm border border-ink/15 bg-white p-6 shadow-luxe sm:p-10 lg:grid-cols-12 lg:p-14">
        <div className="lg:col-span-5">
          <ScrollReveal>
            <SectionHeading
              align="left"
              eyebrow="Asesoría Personalizada"
              title="Cotiza tu proyecto en madera"
              subtitle="Cuéntanos qué espacio deseas transformar (closet, puerta, cocina integral, mueble de baño o mobiliario especial) y agenda tu visita técnica."
            />

            <div className="space-y-4 border-t border-ink/10 pt-6 text-sm text-taupe">
              <div className="flex items-start gap-3">
                <HiOutlineCheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-mahogany" />
                <p>Toma de medidas en obra y asesoría en selección de maderas, tableros RH y herrajes.</p>
              </div>
              <div className="flex items-start gap-3">
                <HiOutlineCheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-mahogany" />
                <p>Atención a hogares, remodelaciones, diseñadores de interiores y constructoras.</p>
              </div>
              <div className="flex items-start gap-3">
                <HiOutlineCheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-mahogany" />
                <p>Fabricación directa en taller propio e instalación garantizada.</p>
              </div>
            </div>
          </ScrollReveal>
        </div>

        <div className="lg:col-span-7">
          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="quote-name" className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wider text-ink">
                  Nombre o Empresa *
                </label>
                <input
                  id="quote-name"
                  type="text"
                  value={form.name}
                  onChange={handleChange('name')}
                  placeholder="Ej. Carlos Mendoza"
                  className="input"
                />
                {errors.name && <p className="mt-1 text-xs text-mahogany">{errors.name}</p>}
              </div>

              <div>
                <label htmlFor="quote-phone" className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wider text-ink">
                  Teléfono / WhatsApp *
                </label>
                <input
                  id="quote-phone"
                  type="tel"
                  value={form.phone}
                  onChange={handleChange('phone')}
                  placeholder="Ej. 300 000 0000"
                  className="input"
                />
                {errors.phone && <p className="mt-1 text-xs text-mahogany">{errors.phone}</p>}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="quote-type" className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wider text-ink">
                  ¿Qué deseas fabricar? *
                </label>
                <select
                  id="quote-type"
                  value={form.projectType}
                  onChange={handleChange('projectType')}
                  className="input"
                >
                  {CARPENTRY_CATEGORIES.map((cat) => (
                    <option key={cat.slug} value={cat.title}>
                      {cat.title}
                    </option>
                  ))}
                  <option value="Proyecto Integral (Varios ambientes)">
                    Proyecto Integral (Varios ambientes)
                  </option>
                </select>
                {errors.projectType && <p className="mt-1 text-xs text-mahogany">{errors.projectType}</p>}
              </div>

              <div>
                <label htmlFor="quote-city" className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wider text-ink">
                  Ciudad / Barrio / Obra
                </label>
                <input
                  id="quote-city"
                  type="text"
                  value={form.city}
                  onChange={handleChange('city')}
                  placeholder="Ciudad o ubicación del proyecto"
                  className="input"
                />
              </div>
            </div>

            <div>
              <label htmlFor="quote-details" className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wider text-ink">
                Medidas aproximadas o detalles
              </label>
              <textarea
                id="quote-details"
                rows={4}
                value={form.details}
                onChange={handleChange('details')}
                placeholder="Cuéntanos cantidad de puertas, medidas aproximadas del closet o cocina, acabados de preferencia..."
                className="input resize-none"
              />
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button type="submit" className="btn-mahogany">
                Preparar Solicitud de Cotización
              </button>
            </div>
          </form>

          {dispatchResult && (
            <div className="mt-6 rounded-sm border border-mahogany/30 bg-cream-light p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-mahogany">
                Solicitud lista para enviar
              </p>
              <p className="mt-1 text-sm text-ink">
                Elige tu canal preferido para enviar inmediatamente los datos de tu proyecto a{' '}
                <strong>Inversiones Beaver &amp; Asociados S.A.S.</strong>:
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <a
                  href={dispatchResult.whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-mahogany px-5 py-2.5 text-[10px]"
                >
                  <FaWhatsapp className="h-4 w-4" />
                  Enviar por WhatsApp
                </a>
                <a
                  href={dispatchResult.mailtoUrl}
                  className="btn-outline px-5 py-2.5 text-[10px]"
                >
                  <HiOutlineEnvelope className="h-4 w-4" />
                  Enviar por Correo
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
