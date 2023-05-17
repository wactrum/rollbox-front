// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  srcDir: './src',
  imports: {
    dirs: ['composables/**', 'components/**', 'utils/**', 'stores/**'],
  },
  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    '@nuxt/image-edge',
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
  image: {
    provider: 'customProvider',
    providers: {
      customProvider: {
        name: 'customProvider',
        provider: '~/utils/image-provider',
        options: {
          baseURL: 'http://localhost:3000',
        },
      },
    },
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
  routeRules: {
    '/admin/**': { ssr: false },
  },
  experimental: {
    typedPages: true
  },
  // devtools: {
  //   enabled: true,
  // },
})
