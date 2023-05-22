import { IMeta } from '~/domain'
import { InjectionKey } from 'vue'

export interface IColumn<T extends Record<any, any> = any> {
  name: string
  key?: keyof T
  title?: string
  sortable?: boolean
}

export interface ITableProvider {
  meta?: Ref<IMeta | null | undefined>
  changePage: (page: number) => void
}

export const TableProviderKey = Symbol() as InjectionKey<ITableProvider>
