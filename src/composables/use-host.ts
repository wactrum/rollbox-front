export default function () {
  const nuxtApp = useNuxtApp()
  const host = nuxtApp.ssrContext?.event.node.req.headers.host
  return host ?? window.location.host
}
