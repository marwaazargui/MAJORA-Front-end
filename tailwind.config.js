/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: { sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'] },
      colors: {
        brand: { DEFAULT: '#6D3BE6', 600: '#5B2BD1', 100: '#EAE2FF', 50: '#F3EEFF' },
        ink: '#1B1B3A',
        muted: '#6B7280',
        surface: '#F7F7FC',
        line: '#ECEBF5',
        success: '#16A34A',
        danger: '#E5484D',
      },
      boxShadow: {
        card: '0 1px 2px rgba(60,40,140,0.04), 0 4px 16px rgba(60,40,140,0.05)',
        btn: '0 4px 12px rgba(109,59,230,0.28)',
      },
    },
  },
  plugins: [],
};
