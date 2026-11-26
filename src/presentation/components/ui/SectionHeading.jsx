export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = 'center',
  tone = 'dark',
}) {
  const isCentered = align === 'center';
  const titleColor = tone === 'light' ? 'text-cream-light' : 'text-ink';
  const subColor = tone === 'light' ? 'text-cream/75' : 'text-taupe';
  const eyebrowColor = tone === 'light' ? 'text-brass-light' : 'text-mahogany';

  return (
    <div className={isCentered ? 'mx-auto mb-12 max-w-2xl text-center' : 'mb-10 max-w-2xl'}>
      {eyebrow && <p className={`eyebrow ${eyebrowColor}`}>{eyebrow}</p>}
      <h2 className={`mt-2 font-display text-3xl font-medium tracking-tight sm:text-4xl ${titleColor}`}>
        {title}
      </h2>
      <div className={`brand-rule mt-4 ${isCentered ? 'mx-auto' : ''}`} />
      {subtitle && <p className={`mt-4 text-sm leading-relaxed sm:text-base ${subColor}`}>{subtitle}</p>}
    </div>
  );
}
