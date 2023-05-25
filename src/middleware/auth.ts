export default defineNuxtRouteMiddleware((to) => {
  const { isAuthorized } = useUserStore()
  if (!isAuthorized) {
    useState('redirectTo', () => to)
    return navigateTo({ name: 'auth-sign-in' })
  }
})
