import { Outlet } from 'react-router-dom';
import { FaWhatsapp } from 'react-icons/fa6';
import Navbar from '@/presentation/components/layout/Navbar.jsx';
import Footer from '@/presentation/components/layout/Footer.jsx';
import { useCases } from '@/infrastructure/container.js';

export default function Layout() {
  const quickChat = useCases.prepareQuoteDispatch({
    name: 'Visitante Web',
    phone: '0000000',
    projectType: 'Carpintería en Madera',
    details: 'Hola Inversiones Beaver, quisiera asesoría para un proyecto a medida.',
  });

  return (
    <div className="flex min-h-screen flex-col bg-cream-light text-ink">
      {/* Cinta superior corporativa */}
      <div className="bg-ink py-2 text-center text-[10px] font-medium uppercase tracking-[0.22em] text-cream/90 sm:text-[11px]">
        Inversiones Beaver &amp; Asociados S.A.S. · Diseño, Fabricación e Instalación a Medida
      </div>

      <Navbar />

      <main className="flex-1">
        <Outlet />
      </main>

      <Footer />

      {quickChat.ok && (
        <a
          href={quickChat.whatsappUrl}
          target="_blank"
          rel="noreferrer"
          aria-label="Cotizar por WhatsApp"
          className="fixed bottom-5 right-5 z-40 inline-flex items-center gap-2 rounded-full bg-mahogany px-4 py-3 text-xs font-semibold uppercase tracking-wider text-cream-light shadow-luxe transition hover:scale-105 hover:bg-mahogany-dark"
        >
          <FaWhatsapp className="h-5 w-5" />
          <span className="hidden sm:inline">Cotizar por WhatsApp</span>
        </a>
      )}
    </div>
  );
}
