import { components } from '~/domain/schema'

export interface IPaginatedResponse<T = any> {
  data: T[]
  meta: components['schemas']['PageMetaDto']
}
