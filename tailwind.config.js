const colors = ['gray', 'red', 'yellow', 'green', 'blue', 'indigo', 'purple', 'pink']

let safelist = [
  ...colors.map((c) => `bg-${c}-100`),
  ...colors.map((c) => `bg-${c}-50`),
  ...colors.map((c) => `text-${c}-900`),
]

module.exports = {
  purge: {
    content: ['./index.html', './src/**/*.ts'],
    safelist: safelist,
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
