export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Deep Navy Blue Palette
        'navy': {
          50: '#f0f4ff',
          100: '#e0e7ff',
          200: '#c7d2fe',
          300: '#a5b4fc',
          400: '#818cf8',
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
          800: '#022f78', // Deep Navy Blue
          900: '#011d4a',
        },
        // Royal Blue Palette
        'royal': {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#024abf', // Royal Blue
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
        // Medium Blue Palette
        'medium-blue': {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
        // Orange Accent
        'orange': {
          50: '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#f97316',
          600: '#ea580c',
          700: '#c2410c',
          800: '#9a3412',
          900: '#7c2d12',
        },
        // Neutral Greys
        'neutral': {
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
        },
      },
      fontFamily: {
        'hindi': ['Noto Sans Devanagari', 'Inter', 'system-ui', 'sans-serif'],
        'display': ['Inter', 'system-ui', 'sans-serif'],
        'body': ['Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1.1' }],
        '6xl': ['3.75rem', { lineHeight: '1.1' }],
        '7xl': ['4.5rem', { lineHeight: '1.1' }],
        '8xl': ['6rem', { lineHeight: '1.1' }],
        '9xl': ['8rem', { lineHeight: '1.1' }],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'slide-up': 'slideUp 0.5s ease-out',
        'fade-in': 'fadeIn 0.6s ease-out',
        'scale-in': 'scaleIn 0.4s ease-out',
        'fade-in-up': 'fadeInUp 0.6s ease-out',
        'slide-in-right': 'slideInRight 0.6s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-slow': 'bounce 2s infinite',
        'blue-glow': 'blueGlow 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(100px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        blueGlow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(2, 47, 120, 0.3)' },
          '50%': { boxShadow: '0 0 30px rgba(2, 74, 191, 0.5)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        'professional': '0 1px 3px 0 rgba(2, 47, 120, 0.1), 0 1px 2px 0 rgba(2, 74, 191, 0.06)',
        'professional-lg': '0 4px 6px -1px rgba(2, 47, 120, 0.1), 0 2px 4px -1px rgba(2, 74, 191, 0.06)',
        'professional-xl': '0 10px 15px -3px rgba(2, 47, 120, 0.1), 0 4px 6px -2px rgba(2, 74, 191, 0.05)',
        'blue-glow': '0 0 20px rgba(2, 47, 120, 0.3)',
        'royal-glow': '0 0 20px rgba(2, 74, 191, 0.3)',
      },
      backgroundImage: {
        'gradient-navy': 'linear-gradient(135deg, #022f78 0%, #024abf 100%)',
        'gradient-royal': 'linear-gradient(135deg, #024abf 0%, #3b82f6 100%)',
        'gradient-blue-depth': 'linear-gradient(135deg, #011d4a 0%, #022f78 25%, #024abf 75%, #0ea5e9 100%)',
        'texture-dots': 'radial-gradient(circle, rgba(2, 74, 191, 0.2) 1px, transparent 1px)',
        'texture-grid': 'linear-gradient(rgba(2, 74, 191, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(2, 74, 191, 0.1) 1px, transparent 1px)',
        'texture-diagonal': 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(2, 74, 191, 0.1) 10px, rgba(2, 74, 191, 0.1) 20px)',
      },
      backgroundSize: {
        'dots': '20px 20px',
        'grid': '20px 20px',
        'diagonal': '20px 20px',
      },
    },
  },
  plugins: [],
};