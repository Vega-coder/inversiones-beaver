# Inversiones Beaver & Asociados S.A.S.

Sitio web corporativo y catálogo de carpintería arquitectónica en madera a medida (closets, puertas, cocinas integrales, muebles de baño y mobiliario especial).

## Stack Tecnológico
Basado en la arquitectura y stack de **Aroma Premium**:
- **React 19** + **Vite 8**
- **Tailwind CSS v3** (paleta extraída del logotipo oficial: Carbón `#262520`, Caoba `#6B2F26`, Crema Arquitectónica `#F7F4F0` y acento Latón `#B88E54`)
- **React Router DOM v7** con carga diferida (`lazy`)
- **Clean Architecture** (`domain` → `application` → `presentation` + `infrastructure`) protegida por reglas `eslint.config.js`
- **Vitest** para pruebas unitarias de dominio
- **Vercel** (`vercel.json` con rewrites SPA)

## Variables de entorno opcionales (Vercel)
Configúralas en **Vercel → Project Settings → Environment Variables** si deseas personalizar los datos de contacto en vivo:
- `VITE_WHATSAPP_NUMBER`: Número de WhatsApp con código de país sin `+` (ej. `573001234567`)
- `VITE_CONTACT_EMAIL`: Correo corporativo (ej. `proyectos@inversionesbeaver.com`)
- `VITE_COMPANY_CITY`: Ciudad o zona de cobertura

## Comandos
```bash
npm install
npm run dev
npm run lint
npm test
npm run build
```
