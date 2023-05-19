import { components } from '~/domain/schema'

export type IMeta = components['schemas']['PageMetaDto']
export interface IPaginatedResponse<T = any> {
  data: T[]
  meta: components['schemas']['PageMetaDto']
}
