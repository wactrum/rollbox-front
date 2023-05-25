import { Permission } from '~/domain/permissions'

export default defineNuxtRouteMiddleware(() => {
  const { hasPermission } = useUserStore()

  if (!hasPermission(Permission.VIEW_ADMIN_PAGE)) {
    return navigateTo({ name: 'index' })
  }
})
