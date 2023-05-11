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
      animatedSettings: {
        animatedSpeed: 1000,
        classes: [...animatedClasses],
      },
    },
  },
  plugins: [require('tailwindcss-animatecss')],
  safelist: [...animatedClasses.map((el) => `animate__${el}`)],
}
