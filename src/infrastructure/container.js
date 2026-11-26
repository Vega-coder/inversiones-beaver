import { createCarpentryPorts } from '@/application/ports.js';
import { createCarpentryUseCases } from '@/application/carpentryUseCases.js';
import { createInMemoryCarpentryRepository } from '@/infrastructure/repositories/inMemoryCarpentryRepository.js';
import { createContactGateway } from '@/infrastructure/gateways/contactGateway.js';

/**
 * Datos corporativos centralizados de Inversiones Beaver & Asociados S.A.S.
 * Actualiza VITE_WHATSAPP_NUMBER / VITE_CONTACT_EMAIL en Vercel o aquí cuando lo desees.
 */
export const COMPANY_INFO = {
  legalName: 'Inversiones Beaver & Asociados S.A.S.',
  shortName: 'Inversiones Beaver',
  tagline: 'Carpintería Arquitectónica en Madera a Medida',
  description:
    'Diseño, fabricación e instalación de closets, puertas en madera, cocinas integrales, muebles de baño y mobiliario arquitectónico residencial y comercial.',
  whatsappNumber: import.meta.env.VITE_WHATSAPP_NUMBER || '',
  email: import.meta.env.VITE_CONTACT_EMAIL || 'proyectos@inversionesbeaver.com',
  city: import.meta.env.VITE_COMPANY_CITY || 'Colombia · Proyectos Residenciales y Comerciales',
  schedule: 'Lunes a Sábado · Atención y visitas técnicas con cita previa',
};

const carpentryRepository = createInMemoryCarpentryRepository();
const contactGateway = createContactGateway({
  whatsappPhone: COMPANY_INFO.whatsappNumber,
  email: COMPANY_INFO.email,
});

const ports = createCarpentryPorts({ carpentryRepository, contactGateway });

export const useCases = createCarpentryUseCases(ports);
