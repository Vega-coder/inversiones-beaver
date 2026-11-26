import { describe, it, expect } from 'vitest';
import { CARPENTRY_CATEGORIES, findCategoryBySlug } from '@/domain/carpentry/categories.js';
import { filterSolutions, WOOD_FINISHES, CARPENTRY_FAQS } from '@/domain/carpentry/projects.js';
import { validateQuoteRequest, formatQuoteMessage } from '@/domain/carpentry/quote.js';
import { SEED_SOLUTIONS } from '@/infrastructure/data/seedSolutions.js';

describe('Dominio Carpintería - Inversiones Beaver & Asociados S.A.S.', () => {
  it('incluye todas las líneas principales y acabados interactivos', () => {
    const slugs = CARPENTRY_CATEGORIES.map((c) => c.slug);
    expect(slugs).toEqual([
      'closets',
      'puertas',
      'cocinas',
      'muebles-de-bano',
      'mobiliario-especial',
    ]);
    expect(findCategoryBySlug('cocinas')?.title).toBe('Cocinas Integrales');
    expect(WOOD_FINISHES.length).toBeGreaterThanOrEqual(4);
    expect(CARPENTRY_FAQS.length).toBeGreaterThanOrEqual(3);
  });

  it('filtra proyectos por categoría y texto', () => {
    const kitchens = filterSolutions(SEED_SOLUTIONS, { categorySlug: 'cocinas' });
    expect(kitchens.length).toBeGreaterThan(0);
    expect(kitchens.every((item) => item.categorySlug === 'cocinas')).toBe(true);

    const rhMatches = filterSolutions(SEED_SOLUTIONS, { query: 'hidrófugo' });
    expect(rhMatches.length).toBeGreaterThan(0);
  });

  it('valida solicitudes de cotización con acabado y dimensión', () => {
    const invalid = validateQuoteRequest({ name: 'A', phone: '123', projectType: '' });
    expect(invalid.valid).toBe(false);
    expect(invalid.errors.name).toBeDefined();
    expect(invalid.errors.phone).toBeDefined();
    expect(invalid.errors.projectType).toBeDefined();

    const valid = validateQuoteRequest({
      name: 'Juan Pérez',
      phone: '3202977883',
      projectType: 'Closets & Vestieres',
      finish: 'Nogal Americano',
      scale: '2 a 4 metros',
      city: 'Bogotá',
      details: 'Closet de 3m x 2.4m',
    });
    expect(valid.valid).toBe(true);

    const msg = formatQuoteMessage(valid.sanitized);
    expect(msg).toContain('Inversiones Beaver & Asociados S.A.S.');
    expect(msg).toContain('Nogal Americano');
    expect(msg).toContain('2 a 4 metros');
  });
});
