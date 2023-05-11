import { acceptHMRUpdate } from 'pinia'
import type { components } from '~/domain/schema'
import type { IUser } from '~/domain/user'
import { makeAsyncApiFn } from '~/composables/api/useApi'

export const useUserStore = defineStore('user', () => {
  const user = useSCookie<IUser | null>('user', { default: () => null })
  const accessToken = useSCookie<string | null>('accessToken', {
    default: () => null,
  })
  const refreshToken = useSCookie<null | string>('refreshToken', { default: () => null }, 30)
  const isAuthorized = computed(() => !!user?.value)

  const getPermissions = computed(() =>
    user.value?.roles.flatMap((role) => role.permissions?.map((el) => el.name))
  )

  const hasPermission = (permission: string) => !!getPermissions.value?.includes(permission)

  const hasPermissions = (permissions: Array<string>) => {
    return permissions.every((permission) => getPermissions.value?.includes(permission))
  }

  const hasAnyPermission = (permissions: Array<string>) => {
    return permissions.some((permission) => getPermissions.value?.includes(permission))
  }

  const signIn = async (email: string, password: string) => {
    const data = await useApi<ISignResponse>('/login', {
      body: {
        email,
        password,
      },
      method: 'POST',
      disableErrorHandling: true,
    })

    if (data) {
      accessToken.value = data.accessToken
      refreshToken.value = data.refreshToken
      user.value = data.user
    }

    return data
  }

  const logOut = () => {
    user.value = null
    accessToken.value = null
    refreshToken.value = null
  }

  const getCurrent = makeAsyncApiFn<IRolesResponse>('/users/me')

  return {
    user,
    accessToken,
    refreshToken,
    isAuthorized,
    hasPermission,
    hasPermissions,
    hasAnyPermission,
    signIn,
    logOut,
    getCurrent,
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
}

export type ISignForm = components['schemas']['AuthDto']
export type ISignResponse = components['schemas']['LoginResponseDto']
export type IRolesResponse = components['schemas']['RoleEntity'][]
