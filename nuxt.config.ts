// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  srcDir: './src',
  imports: {
    dirs: ['composables/**', 'components/**', 'utils/**', 'stores/**'],
  },
  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    [
      '@nuxtjs/robots',
      {
        UserAgent: '*',
        Disallow: '/',
      },
    ],
  ],
  css: ['@/assets/css/main.css'],
  pinia: {
    autoImports: ['defineStore', 'storeToRefs', ['defineStore', 'definePiniaStore']],
  },
  /**
   * Переопределяется через .env
   */
  runtimeConfig: {
    public: {
      apiUrl: 'http://localhost:3050',
      apiServer: 'http://localhost:3050',
    },
  },
  // devtools: {
  //   enabled: true,
  // },
})
