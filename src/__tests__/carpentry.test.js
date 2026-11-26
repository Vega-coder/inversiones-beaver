import { describe, it, expect } from 'vitest';
import { CARPENTRY_CATEGORIES, findCategoryBySlug } from '@/domain/carpentry/categories.js';
import { filterSolutions } from '@/domain/carpentry/projects.js';
import { validateQuoteRequest, formatQuoteMessage } from '@/domain/carpentry/quote.js';
import { SEED_SOLUTIONS } from '@/infrastructure/data/seedSolutions.js';

describe('Dominio Carpintería - Inversiones Beaver & Asociados S.A.S.', () => {
  it('incluye todas las líneas principales solicitadas', () => {
    const slugs = CARPENTRY_CATEGORIES.map((c) => c.slug);
    expect(slugs).toEqual([
      'closets',
      'puertas',
      'cocinas',
      'muebles-de-bano',
      'mobiliario-especial',
    ]);
    expect(findCategoryBySlug('cocinas')?.title).toBe('Cocinas Integrales');
  });

  it('filtra proyectos por categoría y texto', () => {
    const kitchens = filterSolutions(SEED_SOLUTIONS, { categorySlug: 'cocinas' });
    expect(kitchens.length).toBeGreaterThan(0);
    expect(kitchens.every((item) => item.categorySlug === 'cocinas')).toBe(true);

    const rhMatches = filterSolutions(SEED_SOLUTIONS, { query: 'hidrófugo' });
    expect(rhMatches.length).toBeGreaterThan(0);
  });

  it('valida solicitudes de cotización y genera mensaje estructurado', () => {
    const invalid = validateQuoteRequest({ name: 'A', phone: '123', projectType: '' });
    expect(invalid.valid).toBe(false);
    expect(invalid.errors.name).toBeDefined();
    expect(invalid.errors.phone).toBeDefined();
    expect(invalid.errors.projectType).toBeDefined();

    const valid = validateQuoteRequest({
      name: 'Juan Pérez',
      phone: '3105551234',
      projectType: 'Closets & Vestieres',
      city: 'Bogotá',
      details: 'Closet de 3m x 2.4m',
    });
    expect(valid.valid).toBe(true);

    const msg = formatQuoteMessage(valid.sanitized);
    expect(msg).toContain('Inversiones Beaver & Asociados S.A.S.');
    expect(msg).toContain('Juan Pérez');
    expect(msg).toContain('Closets & Vestieres');
  });
});
