import { Permission } from '~/domain/permissions'

export default defineNuxtRouteMiddleware(() => {
  const { isAuthorized, hasPermission } = useUserStore()
  if (!isAuthorized) {
    return navigateTo({ name: 'auth-sign-in' })
  }

  if (!hasPermission(Permission.VIEW_ADMIN_PAGE)) {
    return navigateTo({ name: 'index' })
  }
})
