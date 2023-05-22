import {
  ICategory,
  IProduct,
  ICreateCategory,
  ICreateProduct,
  IProductImage,
} from '~/domain/product'
import { components, operations } from '~/domain/schema'
import { IPaginatedResponse } from '~/domain'

type IGetProductsParams = operations['ProductsController_findAll']['parameters']['query']
type ICreateProductBody = ICreateProduct
type IUpdateProductBody = components['schemas']['UpdateProductDto']

type IGetCategoriesResponse = ICategory[]
type ICreateCategoryBody = ICreateCategory
type IUpdateCategoryBody = components['schemas']['UpdateCategoryDto']

export const useProductsStore = defineStore('products', () => {
  const getCategories = makeAsyncApiFn<IGetCategoriesResponse>('/categories')
  const getCategoriesWithProducts = makeAsyncApiFn<IGetCategoriesResponse>('/categories/products')
  const getProducts = makeAsyncApiFn<IPaginatedResponse<IProduct>, IGetProductsParams>('/products')
  const getAdminProducts = makeAsyncApiFn<IPaginatedResponse<IProduct>, IGetProductsParams>(
    '/products/admin'
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

  const createProduct = (data: ICreateProductBody) => {
    return useApi<IProduct>('/products', {
      method: 'POST',
      body: data,
    })
  }

  const uploadProductImage = (file: File) => {
    const formData = new FormData()
    formData.append('file', file)

    return useApi<IProductImage>('/products/image/upload', {
      method: 'POST',
      body: formData,
    })
  }

  const updateProduct = (id: number, data: IUpdateProductBody) => {
    return useApi<IProduct>(`/products/${id}`, {
      method: 'PATCH',
      body: data,
    })
  }

  const deleteProduct = (id: number) => {
    return useApi(`/products/${id}`, {
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
    getAdminProducts,
    createProduct,
    uploadProductImage,
    updateProduct,
    deleteProduct,
  }
})
