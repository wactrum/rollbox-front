import { joinURL } from 'ufo'

export function getImage(src: string, params: any) {
  const config = useRuntimeConfig()

  return {
    url: joinURL(config.public.apiServer, src),
  }
}
