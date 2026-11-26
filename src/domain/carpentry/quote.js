/**
 * Reglas puras de validación y formato para solicitudes de cotización.
 */
export function validateQuoteRequest(input) {
  const errors = {};
  const name = String(input?.name || '').trim();
  const phone = String(input?.phone || '').trim();
  const projectType = String(input?.projectType || '').trim();
  const city = String(input?.city || '').trim();
  const details = String(input?.details || '').trim();

  if (name.length < 3) {
    errors.name = 'Ingresa tu nombre completo o razón social.';
  }
  if (phone.replace(/\D/g, '').length < 7) {
    errors.phone = 'Ingresa un número de contacto válido.';
  }
  if (!projectType) {
    errors.projectType = 'Selecciona la línea de carpintería que deseas cotizar.';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
    sanitized: { name, phone, projectType, city, details },
  };
}

export function formatQuoteMessage(data) {
  const lines = [
    'Hola *Inversiones Beaver & Asociados S.A.S.*, solicito asesoría y cotización para un proyecto en madera:',
    '',
    `*Cliente:* ${data.name}`,
    `*Teléfono:* ${data.phone}`,
    `*Servicio:* ${data.projectType}`,
  ];

  if (data.city) {
    lines.push(`*Ciudad / Sector:* ${data.city}`);
  }
  if (data.details) {
    lines.push(`*Detalles / Medidas aproximadas:* ${data.details}`);
  }

  lines.push('', 'Quedo atento para agendar visita técnica o recibir orientación.');
  return lines.join('\n');
}
