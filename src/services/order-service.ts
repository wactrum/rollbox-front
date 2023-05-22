import { IOrder, OrderStatusesEnum, OrderStatusesMap, OrderTypesMap } from '~/domain/order'
import { format, intervalToDuration } from 'date-fns'

export const formatOrders = (orders: IOrder[]) => {
  return orders.map((el) => formatOrder(el))
}

export const formatOrder = (order: IOrder) => {
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
