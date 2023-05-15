const animatedClasses = [
  'animated',
  'fast',
  'faster',
  'slow',
  'slower',
  'fadeIn',
  'fadeOut',
  'fadeInUp',
  'fadeInLeft',
  'fadeInRight',
  'fadeInDown',
  'fadeOutDown',
  'fadeOutLeft',
  'fadeOutUp',
  'fadeOutRight',
  'slideInDown',
  'zoomIn',
  'zoomOut',
  'slideInRight',
  'slideInLeft',
]

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,vue,ts}'],
  theme: {
    extend: {
      boxShadow: {
        bottom: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      },
      animatedSettings: {
        animatedSpeed: 1000,
        classes: [...animatedClasses],
      },
    },
  },
  plugins: [require('tailwindcss-animatecss')],
  safelist: [...animatedClasses.map((el) => `animate__${el}`)],
}
