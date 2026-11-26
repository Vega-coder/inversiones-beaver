const TICKER_ITEMS = [
  'Closets & Vestieres a Medida',
  'Puertas en Madera Maciza & Pivotantes',
  'Cocinas Integrales Modernas',
  'Muebles de Baño RH Antihumedad',
  'Bibliotecas & Centros de TV',
  'Herrajes de Cierre Suave',
  'Visita Técnica & Instalación Garantizada',
];

export default function CarpentryTicker() {
  const repeated = [...TICKER_ITEMS, ...TICKER_ITEMS];

  return (
    <div className="overflow-hidden border-y border-ink/10 bg-ink py-3.5 text-cream-light">
      <div className="flex w-max animate-marquee items-center gap-10 whitespace-nowrap">
        {repeated.map((label, idx) => (
          <div key={`${label}-${idx}`} className="flex items-center gap-10">
            <span className="text-[11px] font-medium uppercase tracking-[0.24em] text-cream/90">
              {label}
            </span>
            <span className="h-1.5 w-1.5 rotate-45 bg-mahogany-light" />
          </div>
        ))}
      </div>
    </div>
  );
}
