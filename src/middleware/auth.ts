export default defineNuxtRouteMiddleware(() => {
  const { isAuthorized } = useUserStore()
  if (!isAuthorized) {
    return navigateTo({ name: 'auth-sign-in' })
  }
})
