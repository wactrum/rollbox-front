import { InjectionKey } from 'vue'
import { ICategory, ICreateCategory } from '~/domain/product'

export interface ICategoryModalProvider {
  onCreate(data: ICreateCategory): Promise<ICategory | void>
  onUpdate(id: number, data: ICreateCategory): Promise<ICategory | void>
}

export const CategoryModalProviderKey = Symbol() as InjectionKey<ICategoryModalProvider>
