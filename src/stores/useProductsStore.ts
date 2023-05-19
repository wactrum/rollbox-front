import { ICategory, IProduct } from '~/domain/product'
import { components, operations } from '~/domain/schema'
import { IPaginatedResponse } from '~/domain'

type IGetProductsParams = operations['ProductsController_findAll']['parameters']
type IGetCategoriesResponse = ICategory[]
type ICreateCategoryBody = components['schemas']['CreateCategoryDto']
type IUpdateCategoryBody = components['schemas']['UpdateCategoryDto']

export const useProductsStore = defineStore('products', () => {
  const getCategories = makeAsyncApiFn<IGetCategoriesResponse>('/categories')
  const getCategoriesWithProducts = makeAsyncApiFn<IGetCategoriesResponse>('/categories/products')
  const getProducts = makeAsyncApiFn<IPaginatedResponse<IProduct>, IGetProductsParams>(
    '/products'
  )

  const createCategory = (data: ICreateCategoryBody) => {
    return useApi<ICategory>('/categories', {
      method: 'POST',
      body: data,
    })
  }

  const updateCategory = (id: number, data: IUpdateCategoryBody) => {
    return useApi<ICategory>(`/categories/${id}`, {
      method: 'PATCH',
      body: data,
    })
  }

  const deleteCategory = (id: number) => {
    return useApi(`/categories/${id}`, {
      method: 'DELETE',
    })
  }

  return {
    getCategories,
    createCategory,
    updateCategory,
    deleteCategory,
    getCategoriesWithProducts,
    getProducts,
  }
})
