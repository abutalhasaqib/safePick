/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      container: { center: true, padding: '1rem' },
      fontFamily: {
        heading: ['"Plus Jakarta Sans"', 'Poppins', 'ui-sans-serif', 'system-ui'],
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
      },
      colors: {
        primary: { DEFAULT: '#FBBF24', foreground: '#0F172A', dark: '#F59E0B' },
        secondary: { DEFAULT: '#7DD3FC', dark: '#0EA5E9' },
        accent: '#FEF3C7',
        danger: { DEFAULT: '#FCA5A5', strong: '#EF4444' },
        success: '#34D399',
        info: '#BFDBFE',
        warning: '#FDE68A',
        golden: '#F59E0B',
        pastelYellow: '#FEFCE8',
        skyBlue: '#E0F2FE',
        slate: {
          900: '#0F172A', 800: '#1E293B', 600: '#475569', 300: '#CBD5E1', 50: '#F8FAFC'
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
      boxShadow: {
        soft: '0 2px 10px rgba(0,0,0,0.06)',
      },
      keyframes: {
        in: { '0%': { opacity: 0, transform: 'translateY(4px)' }, '100%': { opacity: 1, transform: 'translateY(0)' } },
        out: { '0%': { opacity: 1, transform: 'translateY(0)' }, '100%': { opacity: 0, transform: 'translateY(4px)' } },
      },
      animation: {
        'fade-in': 'in 200ms ease-out',
        'fade-out': 'out 150ms ease-in',
      },
      scale: {
        '102': '1.02',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
