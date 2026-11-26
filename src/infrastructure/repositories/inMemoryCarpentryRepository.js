import { normalizeSolution } from '@/domain/carpentry/projects.js';
import { SEED_SOLUTIONS } from '@/infrastructure/data/seedSolutions.js';

export function createInMemoryCarpentryRepository() {
  const items = SEED_SOLUTIONS.map(normalizeSolution);

  return {
    async findAll() {
      return [...items];
    },
    async findBySlug(slug) {
      return items.find((item) => item.slug === slug) ?? null;
    },
  };
}
