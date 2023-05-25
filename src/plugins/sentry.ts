import * as Sentry from '@sentry/vue'

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig()
  const dns = config.public.sentryDns

  if (dns) {
    Sentry.init({
      app: nuxtApp.vueApp,
      dsn: dns,
      integrations: [
        new Sentry.BrowserTracing({
          routingInstrumentation: Sentry.vueRouterInstrumentation(useRouter()),
        }),
        new Sentry.Replay(),
      ],

      tracesSampleRate: 1.0,
      replaysSessionSampleRate: 0.1,
      replaysOnErrorSampleRate: 1.0,
    })
  }
})
