import { CookieOptions, CookieRef } from '#app/composables/cookie'
import { addDays } from 'date-fns'

/**
 * Cookie with secure and strict
 */
export default <T = string>(name: string, opts?: CookieOptions<T>, days = 7): CookieRef<T> => {
  return useCookie<T>(name, {
    ...opts,
    sameSite: 'strict',
    secure: true,
    expires: addDays(new Date(), days),
  })
}
