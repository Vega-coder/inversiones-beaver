/** @type {import('tailwindcss').Config} */
export default {
  future: {
    hoverOnlyWhenSupported: true,
  },
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      // Paleta oficial extraída del logo Inversiones Beaver & Asociados S.A.S.
      colors: {
        ink: {
          DEFAULT: '#262520', // Carbón / espresso oscuro (lado izquierdo del emblema y BEAVER)
          soft: '#35342E',
          muted: '#1A1916',
        },
        mahogany: {
          light: '#8E4438',
          DEFAULT: '#6B2F26', // Caoba / marrón rojizo del logo (INVERSIONES / S.A.S.)
          dark: '#4D1F18',
        },
        brass: {
          light: '#DEC293',
          DEFAULT: '#B88E54', // Acento arquitectónico madera / latón cálido
          dark: '#8C6735',
        },
        cream: {
          DEFAULT: '#EFEAE3', // Crema arquitectónica cálida
          light: '#F7F4F0',   // Fondo base del logotipo
          warm: '#E5DDD2',    // Tono madera clara / lino
        },
        taupe: {
          DEFAULT: '#736860',
          light: '#A3978E',
        },
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['Montserrat', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        luxe: '0.26em',
      },
      backgroundImage: {
        'beaver-gradient': 'linear-gradient(135deg, #4D1F18 0%, #6B2F26 48%, #8E4438 100%)',
        'brass-gradient': 'linear-gradient(135deg, #8C6735 0%, #DEC293 50%, #B88E54 100%)',
      },
      boxShadow: {
        luxe: '0 24px 60px -24px rgba(38, 37, 32, 0.35)',
        card: '0 12px 32px -16px rgba(38, 37, 32, 0.16)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(14px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.65s ease-out both',
        marquee: 'marquee 32s linear infinite',
      },
    },
  },
  plugins: [],
};
