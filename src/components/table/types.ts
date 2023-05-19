export interface IColumn<T extends Record<any, any> = any> {
  name: string
  key?: keyof T
  title?: string
  sortable?: boolean
}
