import { operations } from '~/domain/schema'
import { IPaginatedResponse } from '~/domain'
import { IProduct } from '~/domain/product'

type getProductsParams = operations['ProductsController_findAll']['parameters']['query']
type getProductsResponse = IPaginatedResponse<IProduct>

export const useProductsStore = defineStore('products', () => {
  const getProducts = makeAsyncApiFn<getProductsResponse, getProductsParams>('/products')


  return {
    getProducts,
  }
})
