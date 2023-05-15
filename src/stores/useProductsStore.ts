import { operations } from '~/domain/schema'
import { IPaginatedResponse } from '~/domain'
import { ICategory, IProduct } from '~/domain/product'

type getCategoriesResponse = ICategory[]

export const useProductsStore = defineStore('products', () => {
  const getCategories = makeAsyncApiFn<getCategoriesResponse>('/categories/products')

  return {
    getCategories,
  }
})
