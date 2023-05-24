import { operations } from '~/domain/schema'
import { IPaginatedResponse } from '~/domain'
import { IOnceOrder, IOrder, IUpdateOrder } from '~/domain/order'

type IGetOrdersParams = operations['OrdersController_findAll']['parameters']['query']

export const useOrdersStore = defineStore('orders', () => {
  const getOrders = makeAsyncApiFn<IPaginatedResponse<IOrder>, IGetOrdersParams>('/orders')
  const getOrder = makeAsyncApiFnWithParams<IOnceOrder, { id: number }>('/orders/{id}')

  const updateOrder = (id: number, body: IUpdateOrder) =>
    useApi<IOrder>(`/orders/${id}`, {
      body,
      method: 'PATCH',
    })

  return {
    getOrders,
    getOrder,
    updateOrder,
  }
})
