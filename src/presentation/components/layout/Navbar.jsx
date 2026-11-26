import { useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { HiOutlineBars3, HiOutlineXMark, HiArrowLongRight } from 'react-icons/hi2';
import BeaverLogo from '@/presentation/components/brand/BeaverLogo.jsx';
import { CARPENTRY_CATEGORIES } from '@/domain/carpentry/categories.js';

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
            <aside className="fixed inset-y-0 left-0 z-10 flex w-80 max-w-[85%] flex-col border-r border-cream/15 bg-ink p-6 text-cream-light shadow-2xl">
              <div className="flex items-center justify-between border-b border-cream/15 pb-5">
                <BeaverLogo tone="light" compact />
                <button
                  type="button"
                  onClick={closeMenu}
                  aria-label="Cerrar menú"
                  className="p-1 text-cream-light transition hover:text-brass-light"
                >
                  <HiOutlineXMark className="h-6 w-6" />
                </button>
              </div>

              <nav className="mt-6 flex-1 space-y-1 overflow-y-auto">
                {NAV_LINKS.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    end={item.end}
                    onClick={closeMenu}
                    className={({ isActive }) =>
                      `block rounded-sm px-3 py-3 text-xs font-semibold uppercase tracking-[0.2em] transition ${
                        isActive ? 'bg-mahogany text-cream-light' : 'text-cream/80 hover:bg-ink-soft hover:text-cream-light'
                      }`
                    }
                  >
                    {item.label}
                  </NavLink>
                ))}
              </nav>

              <div className="mt-6 border-t border-cream/15 pt-5">
                <a
                  href="/#cotizar"
                  onClick={closeMenu}
                  className="btn-mahogany w-full justify-center text-[11px]"
                >
                  Solicitar Cotización
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
      <div className="container-luxe flex h-20 items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={openMenu}
            aria-label="Abrir menú"
            className="p-1.5 text-ink transition hover:text-mahogany lg:hidden"
          >
            <HiOutlineBars3 className="h-6 w-6" />
          </button>

          <Link to="/" aria-label="Inversiones Beaver & Asociados S.A.S. Inicio">
            <BeaverLogo tone="dark" />
          </Link>
        </div>

        <nav className="hidden items-center gap-6 lg:flex" aria-label="Navegación principal">
          {NAV_LINKS.map((item) => (
            <NavLink key={item.to} to={item.to} end={item.end} className={linkClass}>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a href="/#cotizar" className="btn-mahogany px-4 py-2.5 text-[10px] sm:px-5 sm:py-3 sm:text-[11px]">
            Cotizar
          </a>
        </div>
      </div>

      {mobileDrawer}
    </header>
  );
}
