import { components } from '~/domain/schema'

export type IOrder = components['schemas']['OrderEntity']
export type IOnceOrder = components['schemas']['RetriveOrderEntity']
export type IUpdateOrder = components['schemas']['UpdateOrderDto']

// "CREATED" | "IN_PROGRESS" | "DELIVERED" | "CANCELED" | "COMPLETED"

export enum OrderStatusesEnum {
  CREATED = 'CREATED',
  IN_PROGRESS = 'IN_PROGRESS',
  DELIVERED = 'DELIVERED',
  CANCELED = 'CANCELED',
  COMPLETED = 'COMPLETED',
}

export enum OrderTypesEnum {
  PICKUP = 'PICKUP',
  DELIVERY = 'DELIVERY',
}

export const OrderStatusesMap = new Map<IOrder['status'], string>([
  ['CREATED', 'Создан'],
  ['IN_PROGRESS', 'Готовится'],
  ['DELIVERED', 'Доставляется'],
  ['CANCELED', 'Отменен'],
  ['COMPLETED', 'Выполнен'],
])

export const OrderTypesMap = new Map<IOrder['type'], string>([
  ['PICKUP', 'Самовывоз'],
  ['DELIVERY', 'Доставка'],
])

export const OrderPaymentTypesMap = new Map<IOrder['paymentType'], string>([
  ['UPON_RECEIPT_BY_CARD', 'Картой при получении'],
  ['UPON_RECEIPT_IN_CASH', 'Наличными при получении'],
])
