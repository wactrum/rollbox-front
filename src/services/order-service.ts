import {
  IOrder,
  OrderPaymentTypesMap,
  OrderStatusesEnum,
  OrderStatusesMap,
  OrderTypesEnum,
  OrderTypesMap,
} from '~/domain/order'
import { format, intervalToDuration } from 'date-fns'

export const formatOrders = (orders: IOrder[]) => {
  return orders.map((el) => formatOrder(el))
}

export const formatOrder = <T extends IOrder>(order: T) => {
  const el = order
  const isWaiting = [
    OrderStatusesEnum.CREATED,
    OrderStatusesEnum.IN_PROGRESS,
    OrderStatusesEnum.DELIVERED,
  ].includes(el.status as OrderStatusesEnum)

  return {
    ...el,
    price: `${el.price}₽`,
    status: OrderStatusesMap.get(el.status),
    type: OrderTypesMap.get(el.type),
    paymentType: OrderPaymentTypesMap.get(el.paymentType),
    createdAt: format(new Date(el.createdAt), 'dd.MM.yyyy HH:mm:ss'),
    waitTime: computed(() => {
      const current = ref()
      current.value = new Date().getTime()

      if (isWaiting) {
        setTimeout(() => current.value++, 1000)
      } else if (el.updatedAt) {
        current.value = new Date(el.updatedAt).getTime()
      }
      const zeroPad = (num: any) => String(num).padStart(2, '0')
      const interval = intervalToDuration({
        start: new Date(el.createdAt).getTime(),
        end: current.value,
      })

      return [interval.hours, interval.minutes, interval.seconds]
        .filter(Boolean)
        .map(zeroPad)
        .join(':')
    }),
  }
}

export const OrderStatusesOptions = [
  { name: OrderStatusesMap.get(OrderStatusesEnum.CREATED), value: OrderStatusesEnum.CREATED },
  {
    name: OrderStatusesMap.get(OrderStatusesEnum.IN_PROGRESS),
    value: OrderStatusesEnum.IN_PROGRESS,
  },
  { name: OrderStatusesMap.get(OrderStatusesEnum.DELIVERED), value: OrderStatusesEnum.DELIVERED },
  { name: OrderStatusesMap.get(OrderStatusesEnum.COMPLETED), value: OrderStatusesEnum.COMPLETED },
]

export const OrderTypesOptions = [
  { name: OrderTypesMap.get(OrderTypesEnum.DELIVERY), value: OrderTypesEnum.DELIVERY },
  { name: OrderTypesMap.get(OrderTypesEnum.PICKUP), value: OrderTypesEnum.PICKUP },
]
