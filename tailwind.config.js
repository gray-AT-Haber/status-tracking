// tailwind.config.js
module.exports = {
  // ✅ Add 'darkMode: class' to support manual toggle
  darkMode: 'class',

  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],

  theme: {
    extend: {
      scale: {
        '102': '1.02',
      },
      animation: {
        'pulse-fast': 'pulse-fast 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      colors: {
        'tss-green': '#10b981',
        'tss-orange': '#f97316',
      },
    },
  },

  plugins: [
    function ({ addUtilities, addComponents, theme }) {
      const newUtilities = {
        '.hover\\:scale-102': {
          transform: 'scale(1.02)',
          transition: 'transform 0.2s ease',
        },
      };

      addUtilities(newUtilities);

      addComponents([
        {
          '@keyframes pulse-fast': {
            '0%, 100%': { opacity: 1 },
            '50%': { opacity: 0.5 },
          },
        },
      ]);
    },
  ],
};