/**
 * Logotipo corporativo fiel a la identidad visual de Inversiones Beaver & Asociados S.A.S.:
 * Emblema geométrico bipartito (carbón + caoba) + INVERSIONES en sans-serif caoba +
 * filete divisorio + BEAVER & asociados S.A.S. en serif editorial.
 */
export default function BeaverLogo({ tone = 'dark', compact = false, useFullImage = false }) {
  if (useFullImage && tone === 'dark') {
    return (
      <img
        src="/brand/logo-beaver-transparent.png"
        alt="Inversiones Beaver & Asociados S.A.S."
        className={compact ? 'h-10 w-auto object-contain' : 'h-12 w-auto object-contain sm:h-14'}
      />
    );
  }

  const beaverColor = tone === 'light' ? 'text-cream-light' : 'text-ink';
  const inversionesColor = tone === 'light' ? 'text-brass-light' : 'text-mahogany';
  const ruleColor = tone === 'light' ? 'bg-cream/40' : 'bg-ink';
  const sasColor = tone === 'light' ? 'text-brass-light' : 'text-mahogany';

  return (
    <div className="inline-flex items-center gap-3 select-none">
      <div
        className={`flex shrink-0 items-center justify-center rounded-sm ${
          tone === 'light' ? 'bg-cream-light/95 p-1' : 'p-0.5'
        }`}
      >
        <img
          src="/brand/beaver-crest.png"
          alt="Emblema Beaver"
          className={compact ? 'h-8 w-8 object-contain' : 'h-10 w-10 object-contain sm:h-11 sm:w-11'}
        />
      </div>

      <div className="flex flex-col leading-none">
        <span
          className={`font-sans font-bold tracking-[0.16em] uppercase ${
            compact ? 'text-[10px]' : 'text-[11px] sm:text-xs'
          } ${inversionesColor}`}
        >
          Inversiones
        </span>
        <span className={`my-1 h-[1.5px] w-full ${ruleColor}`} />
        <div className="flex items-baseline gap-1.5">
          <span
            className={`font-display font-semibold tracking-[0.06em] ${
              compact ? 'text-base' : 'text-lg sm:text-xl'
            } ${beaverColor}`}
          >
            BEAVER
          </span>
          <span className={`hidden sm:inline font-display text-[10px] leading-tight ${beaverColor}`}>
            &amp; asociados{' '}
            <strong className={`font-bold ${sasColor}`}>S.A.S.</strong>
          </span>
        </div>
      </div>
    </div>
  );
}
