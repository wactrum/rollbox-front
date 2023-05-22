import { operations } from '~/domain/schema'
import { IPaginatedResponse } from '~/domain'
import { IOrder } from '~/domain/order'

type IGetOrdersParams = operations['OrdersController_findAll']['parameters']['query']

export const useOrdersStore = defineStore('orders', () => {
  const getOrders = makeAsyncApiFn<IPaginatedResponse<IOrder>, IGetOrdersParams>('/orders')

  return {
    getOrders,
  }
})
