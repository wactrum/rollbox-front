import { joinURL } from 'ufo'
// import {} from '#image'

export function getImage(src: string, params: any) {
  const config = useRuntimeConfig()

  return {
    url: joinURL(config.public.apiServer, src),
  }
}
