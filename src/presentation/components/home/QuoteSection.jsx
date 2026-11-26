import { useState } from 'react';
import { FaWhatsapp } from 'react-icons/fa6';
import { HiOutlineEnvelope, HiOutlineCheckCircle } from 'react-icons/hi2';
import SectionHeading from '@/presentation/components/ui/SectionHeading.jsx';
import ScrollReveal from '@/presentation/components/ui/ScrollReveal.jsx';
import { CARPENTRY_CATEGORIES } from '@/domain/carpentry/categories.js';
import { WOOD_FINISHES } from '@/domain/carpentry/projects.js';
import { COMPANY_INFO, useCases } from '@/infrastructure/container.js';

const SCALE_OPTIONS = [
  '1 a 2 metros / 1 puerta',
  '2 a 4 metros / 2 a 4 puertas',
  'Más de 4 metros / Proyecto completo',
  'Requiere visita de medición',
];

export default function QuoteSection({
  selectedService = '',
  onServiceChange,
  selectedFinish = '',
  onFinishChange,
}) {
  const [localService, setLocalService] = useState('Cocinas Integrales');
  const [localFinish, setLocalFinish] = useState(WOOD_FINISHES[0].name);
  const [form, setForm] = useState({
    name: '',
    phone: '',
    scale: SCALE_OPTIONS[1],
    city: '',
    details: '',
  });
  const [errors, setErrors] = useState({});
  const [dispatchResult, setDispatchResult] = useState(null);

  const projectType = selectedService || localService;
  const finish = selectedFinish || localFinish;

  const setField = (field, value) => {
    if (field === 'projectType') {
      setLocalService(value);
      onServiceChange?.(value);
    } else if (field === 'finish') {
      setLocalFinish(value);
      onFinishChange?.(value);
    } else {
      setForm((prev) => ({ ...prev, [field]: value }));
    }
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const res = useCases.prepareQuoteDispatch({
      ...form,
      projectType,
      finish,
    });
    if (!res.ok) {
      setErrors(res.errors);
      return;
    }
    setErrors({});
    setDispatchResult(res);
  };

  const serviceOptions = [
    ...CARPENTRY_CATEGORIES.map((c) => c.title),
    'Proyecto Integral',
  ];

  return (
    <section id="cotizar" className="container-luxe py-14 sm:py-22">
      <div className="grid gap-8 rounded-sm border border-ink/15 bg-white p-5 shadow-luxe sm:p-10 lg:grid-cols-12 lg:gap-10 lg:p-14">
        <div className="lg:col-span-5">
          <ScrollReveal>
            <SectionHeading
              align="left"
              eyebrow="Asesoría & Visita Técnica"
              title="Cotiza tu proyecto en madera"
              subtitle="Configura el tipo de mueble, acabado y medida aproximada para enviarnos tu solicitud directa a nuestro WhatsApp."
            />

            <div className="space-y-3.5 border-t border-ink/10 pt-5 text-sm text-taupe">
              <div className="flex items-start gap-3">
                <HiOutlineCheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-mahogany" />
                <p>Atención directa al WhatsApp <strong className="text-ink">{COMPANY_INFO.whatsappDisplay}</strong>.</p>
              </div>
              <div className="flex items-start gap-3">
                <HiOutlineCheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-mahogany" />
                <p>Toma de medidas en obra y recomendación de tableros RH y maderas macizas.</p>
              </div>
              <div className="flex items-start gap-3">
                <HiOutlineCheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-mahogany" />
                <p>Fabricación en taller propio e instalación con garantía.</p>
              </div>
            </div>

            {/* Resumen interactivo en vivo */}
            <div className="mt-6 rounded-sm border border-ink/10 bg-cream-light p-4 text-xs">
              <p className="eyebrow text-[10px] text-mahogany">Tu selección actual</p>
              <dl className="mt-2.5 space-y-1.5 text-ink">
                <div className="flex justify-between gap-2">
                  <dt className="text-taupe">Línea:</dt>
                  <dd className="font-semibold text-right">{projectType}</dd>
                </div>
                <div className="flex justify-between gap-2">
                  <dt className="text-taupe">Acabado:</dt>
                  <dd className="font-semibold text-right">{finish}</dd>
                </div>
                <div className="flex justify-between gap-2">
                  <dt className="text-taupe">Escala:</dt>
                  <dd className="font-semibold text-right">{form.scale}</dd>
                </div>
              </dl>
            </div>
          </ScrollReveal>
        </div>

        <div className="lg:col-span-7">
          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            {/* Paso 1: Selector táctil de servicio */}
            <div>
              <span className="mb-2 block text-[11px] font-semibold uppercase tracking-wider text-ink">
                1. ¿Qué deseas fabricar? *
              </span>
              <div className="no-scrollbar flex gap-2 overflow-x-auto pb-1 sm:flex-wrap">
                {serviceOptions.map((option) => {
                  const active = projectType === option;
                  return (
                    <button
                      key={option}
                      type="button"
                      onClick={() => setField('projectType', option)}
                      className={`shrink-0 rounded-sm border px-3 py-2 text-[11px] font-semibold uppercase tracking-wider transition active:scale-95 ${
                        active
                          ? 'border-mahogany bg-mahogany text-cream-light'
                          : 'border-ink/15 bg-cream-light text-ink/80 hover:border-mahogany'
                      }`}
                    >
                      {option}
                    </button>
                  );
                })}
              </div>
              {errors.projectType && <p className="mt-1 text-xs text-mahogany">{errors.projectType}</p>}
            </div>

            {/* Paso 2: Acabado y Escala */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="quote-finish" className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wider text-ink">
                  2. Tono o acabado preferido
                </label>
                <select
                  id="quote-finish"
                  value={finish}
                  onChange={(e) => setField('finish', e.target.value)}
                  className="input"
                >
                  {WOOD_FINISHES.map((fin) => (
                    <option key={fin.id} value={fin.name}>
                      {fin.name} ({fin.code})
                    </option>
                  ))}
                  <option value="Asesoría en visita técnica">Asesoría en visita técnica</option>
                </select>
              </div>

              <div>
                <label htmlFor="quote-scale" className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wider text-ink">
                  3. Tamaño aproximado
                </label>
                <select
                  id="quote-scale"
                  value={form.scale}
                  onChange={(e) => setField('scale', e.target.value)}
                  className="input"
                >
                  {SCALE_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Datos de contacto */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="quote-name" className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wider text-ink">
                  Nombre o Empresa *
                </label>
                <input
                  id="quote-name"
                  type="text"
                  value={form.name}
                  onChange={(e) => setField('name', e.target.value)}
                  placeholder="Ej. Carlos Mendoza"
                  className="input"
                />
                {errors.name && <p className="mt-1 text-xs text-mahogany">{errors.name}</p>}
              </div>

              <div>
                <label htmlFor="quote-phone" className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wider text-ink">
                  Tu Celular / WhatsApp *
                </label>
                <input
                  id="quote-phone"
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setField('phone', e.target.value)}
                  placeholder="Ej. 320 000 0000"
                  className="input"
                />
                {errors.phone && <p className="mt-1 text-xs text-mahogany">{errors.phone}</p>}
              </div>
            </div>

            <div>
              <label htmlFor="quote-city" className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wider text-ink">
                Ciudad / Barrio / Obra
              </label>
              <input
                id="quote-city"
                type="text"
                value={form.city}
                onChange={(e) => setField('city', e.target.value)}
                placeholder="Ciudad o ubicación del proyecto"
                className="input"
              />
            </div>

            <div>
              <label htmlFor="quote-details" className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wider text-ink">
                Detalles adicionales
              </label>
              <textarea
                id="quote-details"
                rows={3}
                value={form.details}
                onChange={(e) => setField('details', e.target.value)}
                placeholder="Cantidad de puertas, distribución deseada o fecha estimada..."
                className="input resize-none"
              />
            </div>

            <button type="submit" className="btn-mahogany w-full justify-center sm:w-auto">
              <FaWhatsapp className="h-4 w-4" />
              Generar Solicitud para WhatsApp
            </button>
          </form>

          {dispatchResult && (
            <div className="mt-6 rounded-sm border border-mahogany/35 bg-cream-light p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-mahogany">
                Solicitud lista para enviar
              </p>
              <p className="mt-1 text-sm text-ink">
                Toca el botón para abrir el chat con <strong>Inversiones Beaver ({COMPANY_INFO.whatsappDisplay})</strong> con toda tu ficha ya redactada:
              </p>
              <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <a
                  href={dispatchResult.whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-mahogany justify-center px-5 py-3 text-[11px]"
                >
                  <FaWhatsapp className="h-4 w-4" />
                  Enviar por WhatsApp ({COMPANY_INFO.whatsappDisplay})
                </a>
                <a
                  href={dispatchResult.mailtoUrl}
                  className="btn-outline justify-center px-5 py-3 text-[11px]"
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
