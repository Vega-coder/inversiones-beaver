export function createContactGateway({ whatsappPhone = '', email = '' } = {}) {
  const cleanPhone = String(whatsappPhone).replace(/\D/g, '');

  return {
    buildWhatsAppUrl(message) {
      const encoded = encodeURIComponent(message);
      if (cleanPhone) {
        return `https://wa.me/${cleanPhone}?text=${encoded}`;
      }
      return `https://api.whatsapp.com/send?text=${encoded}`;
    },
    buildMailtoUrl(subject, body) {
      const target = email || '';
      return `mailto:${target}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    },
  };
}
