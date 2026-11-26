import { CARPENTRY_CATEGORIES, findCategoryBySlug } from '@/domain/carpentry/categories.js';
import { filterSolutions, WOOD_MATERIALS, WORKFLOW_STEPS } from '@/domain/carpentry/projects.js';
import { validateQuoteRequest, formatQuoteMessage } from '@/domain/carpentry/quote.js';

export function createCarpentryUseCases({ carpentryRepository, contactGateway }) {
  return {
    async getHomeShowcase() {
      const allSolutions = await carpentryRepository.findAll();
      return {
        categories: CARPENTRY_CATEGORIES,
        featuredSolutions: allSolutions.filter((item) => item.featured),
        allSolutions,
        materials: WOOD_MATERIALS,
        workflow: WORKFLOW_STEPS,
      };
    },

    async browseSolutions({ categorySlug = '', query = '' } = {}) {
      const allSolutions = await carpentryRepository.findAll();
      const filtered = filterSolutions(allSolutions, { categorySlug, query });
      const activeCategory = findCategoryBySlug(categorySlug);
      return {
        categories: CARPENTRY_CATEGORIES,
        activeCategory,
        solutions: filtered,
      };
    },

    async getSolutionDetail(slug) {
      const solution = await carpentryRepository.findBySlug(slug);
      if (!solution) return null;
      const all = await carpentryRepository.findAll();
      const related = all.filter((item) => item.slug !== slug).slice(0, 3);
      return { solution, related };
    },

    prepareQuoteDispatch(formInput) {
      const validation = validateQuoteRequest(formInput);
      if (!validation.valid) {
        return { ok: false, errors: validation.errors };
      }
      const message = formatQuoteMessage(validation.sanitized);
      const whatsappUrl = contactGateway.buildWhatsAppUrl(message);
      const mailtoUrl = contactGateway.buildMailtoUrl(
        `Cotización ${validation.sanitized.projectType} - ${validation.sanitized.name}`,
        message.replace(/\*/g, ''),
      );
      return {
        ok: true,
        sanitized: validation.sanitized,
        message,
        whatsappUrl,
        mailtoUrl,
      };
    },
  };
}
