module.exports = {
  purge: {
    content: ['./src/**/*.{js,ts,jsx,tsx}'],
  },
  theme: {
    extend: {
      gridTemplateColumns: {
        '1/5': '1fr 5fr',
      },
    },
  },
  plugins: [],
};
