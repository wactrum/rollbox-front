import type { FetchContext, FetchError } from 'ofetch'
import type { AsyncDataOptions } from '#app'
import type { NitroFetchOptions } from 'nitropack'
import type { RuntimeConfig } from 'nuxt/schema'
import { _AsyncData, AsyncData, KeysOf, PickFrom } from '#app/composables/asyncData'

/**
 * useApi wrapper in useAsyncData
 */
export const useAsyncApi = async <T, PT extends SearchParameters = any>(
  url: string,
  options?: useApiOptions<PT>,
  asyncOptions?: AsyncDataOptions<T | null>
) => {
  const key = `${url}_${options?.method ?? 'get'}` // can change or handle in params
  return useAsyncData<T | null>(key, async () => useApi(url, options), asyncOptions)
}

export const useApi = async <T>(url: string, options?: useApiOptions) => {
  const context: Context = {
    config: useRuntimeConfig(),
  }

  return apiRequest<T>(url, context, options)
}

/**
 * Using $fetch with error handlers
 */
const apiRequest = async <T, PT extends SearchParameters = any>(
  url: string,
  context: Context,
  options?: useApiOptions<PT>
): Promise<T> => {
  const reqOptions: Options = createOptions(url, context, options)
  try {
    return await $fetch(url, reqOptions)
  } catch (e) {
    if (options?.disableErrorHandling) {
      throw e
    }

    const err = e as FetchError
    const newResponse = await handleResponseError<T>(err, context, reqOptions)
    if (!newResponse) throw e

    return newResponse
  }
}

const createOptions = (
  url: string,
  context: Context,
  options?: NitroFetchOptions<any>
): Options => {
  const baseURL = options?.baseURL ?? context.config.public.apiUrl

  return {
    url,
    baseURL,
    onRequest,
    ...options,
  }
}

const onRequest = async (context: FetchContext) => {
  const { accessToken } = useUserStore()

  if (accessToken) {
    context.options.headers = {
      ...context.options.headers,
      Authorization: `Bearer ${accessToken}`,
    }
  }
}

/**
 * handleResponseError handles request errors and invokes appropriate handlers for different error statuses
 */
const handleResponseError = async <T>(
  error: FetchError,
  context: Context,
  reqOptions: Options
): Promise<T | null> => {
  const status = error.response?.status ?? null

  const handlers = new Map<
    StatusesEnum,
    (error: FetchError, reqOptions: Options, context: Context) => Promise<T | null>
  >([[StatusesEnum.AUTH, handleAuthError]])

  if (status) {
    const handler = handlers.get(status)
    return handler ? (await handler(error, reqOptions, context)) ?? null : null
  }

  return null
}

let isRefreshing = false
let refreshQueue: RefreshQueueItem[] = []
const startRefreshQueue = (isSuccess: boolean) => {
  refreshQueue.forEach((prom) => {
    prom.resolve({ isSuccess })
  })

  refreshQueue = []
}

/**
 * handleAuthError handles the 401 (authorization) error, refreshes the tokens, and retries the request
 */
const handleAuthError = async <T>(
  error: FetchError,
  reqOptions: Options,
  context: Context
): Promise<T | null> => {
  const { refreshToken, logOut } = useUserStore()

  const endHandle = async () => {
    logOut()
    completeRefreshQueue(false)
    await navigateTo({ name: 'auth-sign-in' })
  }

  if (!refreshToken) {
    await endHandle()
    return null
  }

  if (!isRefreshing) {
    isRefreshing = true

    try {
      const response = await requestRefreshToken(refreshToken, context)

      if (response) {
        updateTokens(response.accessToken, response.refreshToken)
        completeRefreshQueue(true)
        return retryRequest(reqOptions, context)
      }
    } catch (e) {
      await endHandle()
    }
  } else {
    const response = await waitForRefreshQueue()

    if (response.isSuccess) {
      return retryRequest(reqOptions, context)
    }
  }

  completeRefreshQueue(false)
  return null
}

const requestRefreshToken = (
  refreshToken: string,
  context: Context
): Promise<{ accessToken: string; refreshToken: string }> => {
  return $fetch('/refresh-token', {
    baseURL: context.config.public.apiUrl,
    method: 'POST',
    body: {
      token: refreshToken,
    },
  })
}

const updateTokens = (accessToken: string, refreshToken: string) => {
  const { accessToken: ac, refreshToken: rt } = storeToRefs(useUserStore())
  ac.value = accessToken
  rt.value = refreshToken
}

const retryRequest = (reqOptions: Options, context: Context): Promise<any> => {
  isRefreshing = false
  return apiRequest(reqOptions.url, context, reqOptions)
}

const completeRefreshQueue = (isSuccess: boolean) => {
  startRefreshQueue(isSuccess)
  isRefreshing = false
}

const waitForRefreshQueue = (): Promise<{ isSuccess?: boolean }> => {
  return new Promise<{ isSuccess?: boolean }>((resolve) => {
    refreshQueue.push({ resolve })
  })
}

/**
 * Generators
 *
 * Example:
 * // store.ts
 * const getRole = makeAsyncApiFnWithParams<any, {id: number | string}>('/roles/{id}')
 * const getUsers = makeAsyncApiFn<any>('/roles/{id}')
 *
 * // component.vue
 * ...
 * const {data, pending} = getRole({id: 1}, {
 *     asyncDataOptions: {
 *       server: false,
 *     },
 *   })
 *
 * const {data, pending} = getUsers({
 *   asyncDataOptions: {
 *     lazy: true,
 *    },
 * })
 */
export const makeAsyncApiFnWithParams =
  <T, RouteParams extends Record<string, any>, OptionsParams extends SearchParameters = any>(
    pathTemplate: string
  ) =>
  (pathParams?: RouteParams, args?: ApiFnArguments) => {
    let path = pathTemplate

    if (pathParams) {
      Object.keys(pathParams).forEach((key) => {
        path = path.replace(`{${key}}`, pathParams[key].toString())
      })
    }

    return useAsyncApi<T, OptionsParams>(path, args?.options, args?.asyncDataOptions)
  }

export type makeAsyncApiFnType<T, OptionsParams extends SearchParameters = any> = (
  args?: ApiFnArguments<OptionsParams>
) => ReturnType<typeof useAsyncApi<T, OptionsParams>>

export const makeAsyncApiFn =
  <T, OptionsParams extends SearchParameters = any>(path: string) =>
  (args?: ApiFnArguments<OptionsParams>): ReturnType<typeof useAsyncApi<T>> =>
    useAsyncApi<T, OptionsParams>(path, args?.options, args?.asyncDataOptions)

interface RefreshQueueItem {
  resolve: (
    value: { isSuccess?: boolean | undefined } | PromiseLike<{ isSuccess?: boolean | undefined }>
  ) => void
}

interface SearchParameters {
  [key: string]: any
}

export interface useApiOptions<PT extends SearchParameters = any> extends NitroFetchOptions<any> {
  disableErrorHandling?: boolean
  params?: PT
}

export interface Options extends NitroFetchOptions<any> {
  url: string
}

enum StatusesEnum {
  AUTH = 401,
  FORBIDDEN = 403,
}

interface ApiFnArguments<PT extends SearchParameters = any> {
  options?: useApiOptions<PT>
  asyncDataOptions?: AsyncDataOptions<any>
}

interface Context {
  config: RuntimeConfig
}
