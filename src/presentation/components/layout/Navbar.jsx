import { useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { FaWhatsapp } from 'react-icons/fa6';
import { HiOutlineBars3, HiOutlineXMark, HiArrowLongRight } from 'react-icons/hi2';
import BeaverLogo from '@/presentation/components/brand/BeaverLogo.jsx';
import { CARPENTRY_CATEGORIES } from '@/domain/carpentry/categories.js';
import { COMPANY_INFO, useCases } from '@/infrastructure/container.js';

const NAV_LINKS = [
  { to: '/', label: 'Inicio', end: true },
  { to: '/servicios', label: 'Portafolio' },
  ...CARPENTRY_CATEGORIES.map((cat) => ({
    to: `/servicios/${cat.slug}`,
    label: cat.shortTitle,
  })),
];

const linkClass = ({ isActive }) =>
  `relative py-1 text-[11px] font-semibold uppercase tracking-[0.18em] transition ${
    isActive
      ? 'text-mahogany after:absolute after:-bottom-1 after:left-0 after:h-[1.5px] after:w-full after:bg-mahogany'
      : 'text-ink/75 hover:text-mahogany'
  }`;

export default function Navbar() {
  const { pathname } = useLocation();
  const [openedAtPath, setOpenedAtPath] = useState(null);
  const menuOpen = openedAtPath === pathname;

  const closeMenu = useCallback(() => setOpenedAtPath(null), []);
  const openMenu = useCallback(() => setOpenedAtPath(pathname), [pathname]);

  const quickWhatsApp = useCases.prepareQuoteDispatch({
    name: 'Cliente Web',
    phone: '0000000',
    projectType: 'Carpintería en Madera',
    details: 'Hola Inversiones Beaver, quisiera información y cotización.',
  });

  useEffect(() => {
    if (!menuOpen) return undefined;
    const onKey = (e) => e.key === 'Escape' && closeMenu();
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [menuOpen, closeMenu]);

  const mobileDrawer =
    menuOpen && typeof document !== 'undefined'
      ? createPortal(
          <div className="fixed inset-0 z-[100] lg:hidden" role="dialog" aria-modal="true" aria-label="Menú principal">
            <div className="fixed inset-0 bg-ink/80 backdrop-blur-sm" onClick={closeMenu} />
            <aside className="fixed inset-y-0 left-0 z-10 flex w-[84%] max-w-xs flex-col border-r border-cream/15 bg-ink p-5 text-cream-light shadow-2xl">
              <div className="flex items-center justify-between border-b border-cream/15 pb-4">
                <BeaverLogo tone="light" compact />
                <button
                  type="button"
                  onClick={closeMenu}
                  aria-label="Cerrar menú"
                  className="rounded-sm p-1.5 text-cream-light transition hover:bg-ink-soft hover:text-brass-light"
                >
                  <HiOutlineXMark className="h-6 w-6" />
                </button>
              </div>

              <nav className="mt-5 flex-1 space-y-1 overflow-y-auto">
                {NAV_LINKS.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    end={item.end}
                    onClick={closeMenu}
                    className={({ isActive }) =>
                      `block rounded-sm px-3.5 py-3 text-xs font-semibold uppercase tracking-[0.18em] transition ${
                        isActive ? 'bg-mahogany text-cream-light' : 'text-cream/85 hover:bg-ink-soft hover:text-cream-light'
                      }`
                    }
                  >
                    {item.label}
                  </NavLink>
                ))}
              </nav>

              <div className="mt-5 space-y-2.5 border-t border-cream/15 pt-5">
                {quickWhatsApp.ok && (
                  <a
                    href={quickWhatsApp.whatsappUrl}
                    target="_blank"
                    rel="noreferrer"
                    onClick={closeMenu}
                    className="btn-outline-light w-full justify-center py-3 text-[11px]"
                  >
                    <FaWhatsapp className="h-4 w-4 text-brass-light" />
                    WhatsApp {COMPANY_INFO.whatsappDisplay}
                  </a>
                )}
                <a
                  href="/#cotizar"
                  onClick={closeMenu}
                  className="btn-mahogany w-full justify-center py-3 text-[11px]"
                >
                  Cotizar Proyecto
                  <HiArrowLongRight className="h-4 w-4" />
                </a>
              </div>
            </aside>
          </div>,
          document.body,
        )
      : null;

  return (
    <header className="sticky top-0 z-40 border-b border-ink/10 bg-cream-light/95 backdrop-blur-md">
      <div className="container-luxe flex h-16 items-center justify-between gap-2 sm:h-20 sm:gap-4">
        <div className="flex min-w-0 items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={openMenu}
            aria-label="Abrir menú"
            className="shrink-0 rounded-sm p-1.5 text-ink transition hover:bg-ink/5 hover:text-mahogany lg:hidden"
          >
            <HiOutlineBars3 className="h-6 w-6" />
          </button>

          <Link to="/" aria-label="Inversiones Beaver & Asociados S.A.S. Inicio" className="truncate">
            <BeaverLogo tone="dark" compact />
          </Link>
        </div>

        <nav className="hidden items-center gap-5 xl:gap-6 lg:flex" aria-label="Navegación principal">
          {NAV_LINKS.map((item) => (
            <NavLink key={item.to} to={item.to} end={item.end} className={linkClass}>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          {quickWhatsApp.ok && (
            <a
              href={quickWhatsApp.whatsappUrl}
              target="_blank"
              rel="noreferrer"
              aria-label={`WhatsApp ${COMPANY_INFO.whatsappDisplay}`}
              className="hidden sm:inline-flex items-center gap-1.5 rounded-sm border border-ink/15 bg-white px-3 py-2 text-[11px] font-semibold text-ink transition hover:border-mahogany hover:text-mahogany"
            >
              <FaWhatsapp className="h-4 w-4 text-mahogany" />
              <span className="hidden md:inline">{COMPANY_INFO.whatsappDisplay}</span>
            </a>
          )}
          <a href="/#cotizar" className="btn-mahogany px-3.5 py-2.5 text-[10px] sm:px-5 sm:py-3 sm:text-[11px]">
            Cotizar
          </a>
        </div>
      </div>

      {mobileDrawer}
    </header>
  );
}
