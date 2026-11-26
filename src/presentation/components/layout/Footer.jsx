import { Link } from 'react-router-dom';
import { FaWhatsapp } from 'react-icons/fa6';
import { HiOutlineEnvelope, HiOutlineMapPin, HiOutlineClock } from 'react-icons/hi2';
import BeaverLogo from '@/presentation/components/brand/BeaverLogo.jsx';
import { CARPENTRY_CATEGORIES } from '@/domain/carpentry/categories.js';
import { COMPANY_INFO, useCases } from '@/infrastructure/container.js';

export default function Footer() {
  const quickDispatch = useCases.prepareQuoteDispatch({
    name: 'Cliente Web',
    phone: '0000000',
    projectType: 'Asesoría de Carpintería en Madera',
    details: 'Hola, deseo información sobre sus servicios de carpintería a medida.',
  });

  const whatsappHref = quickDispatch.ok
    ? quickDispatch.whatsappUrl
    : 'https://api.whatsapp.com/send';

  return (
    <footer className="bg-ink text-cream/75">
      <div className="container-luxe grid gap-12 py-16 md:grid-cols-4">
        <div className="md:col-span-2">
          <BeaverLogo tone="light" />
          <p className="mt-6 max-w-md text-sm leading-relaxed text-cream/75">
            {COMPANY_INFO.description}
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <a
              href={whatsappHref}
              target="_blank"
              rel="noreferrer"
              className="btn-mahogany px-5 py-2.5 text-[10px]"
            >
              <FaWhatsapp className="h-4 w-4" />
              Hablar por WhatsApp
            </a>
            <a
              href="/#cotizar"
              className="btn-outline-light px-5 py-2.5 text-[10px]"
            >
              Agendar Visita Técnica
            </a>
          </div>
        </div>

        <div>
          <p className="eyebrow text-brass-light">Líneas de Fabricación</p>
          <ul className="mt-5 space-y-3 text-sm">
            <li>
              <Link to="/servicios" className="font-medium text-cream-light transition hover:text-brass-light">
                Catálogo Completo
              </Link>
            </li>
            {CARPENTRY_CATEGORIES.map((cat) => (
              <li key={cat.slug}>
                <Link to={`/servicios/${cat.slug}`} className="transition hover:text-brass-light">
                  {cat.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="eyebrow text-brass-light">Contacto &amp; Taller</p>
          <ul className="mt-5 space-y-3.5 text-sm">
            <li className="flex items-start gap-2.5">
              <HiOutlineMapPin className="mt-0.5 h-4 w-4 shrink-0 text-brass-light" />
              <span>{COMPANY_INFO.city}</span>
            </li>
            <li className="flex items-start gap-2.5">
              <HiOutlineClock className="mt-0.5 h-4 w-4 shrink-0 text-brass-light" />
              <span>{COMPANY_INFO.schedule}</span>
            </li>
            <li className="flex items-start gap-2.5">
              <HiOutlineEnvelope className="mt-0.5 h-4 w-4 shrink-0 text-brass-light" />
              <a href={`mailto:${COMPANY_INFO.email}`} className="transition hover:text-brass-light">
                {COMPANY_INFO.email}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-cream/10 bg-ink-muted py-5">
        <div className="container-luxe flex flex-col items-center justify-between gap-3 text-[11px] text-cream/60 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {COMPANY_INFO.legalName} Todos los derechos reservados.
          </p>
          <p className="uppercase tracking-[0.18em] text-brass-light/85">
            Carpintería Arquitectónica en Madera
          </p>
        </div>
      </div>
    </footer>
  );
}
