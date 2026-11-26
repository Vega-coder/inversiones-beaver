/**
 * Puertos de la capa de aplicación (contratos hacia infraestructura).
 */
export function createCarpentryPorts({ carpentryRepository, contactGateway }) {
  return { carpentryRepository, contactGateway };
}
