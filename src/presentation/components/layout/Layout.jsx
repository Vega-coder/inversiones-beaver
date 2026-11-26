import { Outlet } from 'react-router-dom';
import { FaWhatsapp } from 'react-icons/fa6';
import { HiOutlineCalculator } from 'react-icons/hi2';
import Navbar from '@/presentation/components/layout/Navbar.jsx';
import Footer from '@/presentation/components/layout/Footer.jsx';
import { COMPANY_INFO, useCases } from '@/infrastructure/container.js';

export default function Layout() {
  const quickChat = useCases.prepareQuoteDispatch({
    name: 'Visitante Web',
    phone: '0000000',
    projectType: 'Carpintería en Madera',
    details: 'Hola Inversiones Beaver, quisiera asesoría y cotización para un proyecto a medida.',
  });

  return (
    <div className="flex min-h-screen flex-col bg-cream-light text-ink">
      {/* Cinta superior corporativa */}
      <div className="bg-ink px-3 py-2 text-center text-[10px] font-medium uppercase tracking-[0.16em] text-cream/90 sm:tracking-[0.22em] sm:text-[11px]">
        Inversiones Beaver &amp; Asociados S.A.S. · Fabricación a Medida
      </div>

      <Navbar />

      <main className="flex-1">
        <Outlet />
      </main>

      <Footer />

      {/* Botón flotante WhatsApp en tablet/escritorio */}
      {quickChat.ok && (
        <a
          href={quickChat.whatsappUrl}
          target="_blank"
          rel="noreferrer"
          aria-label={`Cotizar por WhatsApp ${COMPANY_INFO.whatsappDisplay}`}
          className="fixed bottom-5 right-5 z-40 hidden items-center gap-2 rounded-full bg-mahogany px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-cream-light shadow-luxe transition hover:scale-105 hover:bg-mahogany-dark sm:inline-flex"
        >
          <FaWhatsapp className="h-5 w-5" />
          <span>WhatsApp {COMPANY_INFO.whatsappDisplay}</span>
        </a>
      )}

      {/* Barra fija inferior táctil para celulares */}
      <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 border-t border-ink/15 bg-ink/95 p-2 backdrop-blur-md sm:hidden">
        {quickChat.ok && (
          <a
            href={quickChat.whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-2 rounded-sm bg-mahogany py-3 text-[11px] font-semibold uppercase tracking-wider text-cream-light active:scale-95"
          >
            <FaWhatsapp className="h-4 w-4" />
            <span>WhatsApp</span>
          </a>
        )}
        <a
          href="/#cotizar"
          className="flex items-center justify-center gap-2 py-3 text-[11px] font-semibold uppercase tracking-wider text-cream-light active:scale-95"
        >
          <HiOutlineCalculator className="h-4 w-4 text-brass-light" />
          <span>Cotizar</span>
        </a>
      </div>
    </div>
  );
}
