// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  srcDir: './src',
  /**
   * Автоматические импорты
   */
  imports: {
    dirs: ['composables/**', 'components/**', 'utils/**', 'stores/**', 'plugins/**'],
  },
  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    '@nuxt/image-edge',
    'nuxt-schema-org',
    '@element-plus/nuxt', // admin ui only
    [
      '@nuxtjs/robots',
      {
        UserAgent: '*',
        Disallow: '/',
      },
    ],
  ],

  elementPlus: {
    importStyle: false,
    icon: false,
  },

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
      sentryDns: '',
    },
  },
  routeRules: {
    '/admin/**': { ssr: false },
    '/auth/**': { ssr: false },
  },
  experimental: {
    typedPages: true,
    renderJsonPayloads: false,
  },
  vite: {
    vue: {
      script: {
        defineModel: true,
      },
    },
  },
  // devtools: {
  //   enabled: true,
  // },
})
