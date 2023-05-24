<script setup lang="ts">
import { XMarkIcon } from '@heroicons/vue/20/solid'
import { formatOrder } from '~/services/order-service'
import { OrderStatusesOptions } from '~/services/order-service'
import { IOrder, IOnceOrder, IUpdateOrder } from '~/domain/order'
import * as yup from 'yup'

const props = defineProps<{
  orderId: number
}>()

const { getOrder, updateOrder } = useOrdersStore()
const { onDismiss, onOk, onClose } = useModalActions()

const id = toRef(props.orderId)
const { data: order } = await getOrder({ id: id.value })
const formattedOrder = computed(() => order?.value && formatOrder<IOnceOrder>(order.value))

const { onSubmit, useField } = useForm<IUpdateOrder, IOrder>({
  params: {
    submitMethod: (data) => updateOrder(id.value, data),
    onSuccess: (data) => onOk(data),
    sendModifiedOnly: true,
  },
  formParams: {
    initialValues: order.value,
    validationSchema: {
      status: yup.string().required(),
    },
  },
})

const statusField = useField('status')
</script>

<template>
  <Modal size="2xl">
    <template #title>
      <div class="flex relative justify-between">
        <p class="text-center text-base leading-normal text-black dark:text-gray-200">
          {{ 'Заказ #' }}{{ formattedOrder?.id }}
        </p>
        <button class="absolute flex items-start right-[-15px] top-[-15px]" @click="onClose">
          <XMarkIcon class="w-6 h-6" />
        </button>
      </div>
    </template>

    <form class="space-y-6">
      <div>
        <h3 class="text-lg leading-6 font-medium text-gray-900">Информация о заказе</h3>
        <p class="mt-1 max-w-2xl text-sm text-gray-500">
          Заказ от {{ formattedOrder?.createdAt }}.
        </p>
      </div>
      <div class="grid grid-cols-3">
        <div class="mt-5 col-span-3 border-t border-gray-200">
          <dl class="divide-y divide-gray-200">
            <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
              <dt class="text-sm font-medium text-gray-500">Покупатель</dt>
              <dd class="mt-1 flex text-sm text-gray-я900 sm:mt-0 sm:col-span-2">
                <span class="flex-grow">{{ formattedOrder?.user?.name }}</span>
                <span class="ml-4 flex-shrink-0"> </span>
              </dd>
            </div>
            <div class="py-4 sm:grid sm:py-5 sm:grid-cols-3 sm:gap-4">
              <dt class="text-sm font-medium text-gray-500">Номер телефона</dt>
              <dd class="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                <a
                  :href="`tel:+${formattedOrder?.user?.phone}`"
                  class="flex-grow font-bold hover:underline"
                  >+{{ formattedOrder?.user?.phone }}</a
                >
              </dd>
            </div>
            <div class="py-4 sm:grid sm:py-5 sm:grid-cols-3 sm:gap-4">
              <dt class="text-sm font-medium text-gray-500">Итоговая цена</dt>
              <dd class="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                <span class="flex-grow"> {{ formattedOrder?.price }}</span>
              </dd>
            </div>
            <div class="py-4 sm:grid sm:py-5 sm:grid-cols-3 sm:gap-4">
              <dt class="text-sm font-medium text-gray-500">Статус заказа</dt>
              <dd class="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                <SelectField
                  :field="statusField"
                  class="w-52"
                  :options="OrderStatusesOptions"
                  map
                  options-value="value"
                />
              </dd>
            </div>
            <div class="py-4 sm:grid sm:py-5 sm:grid-cols-3 sm:gap-4">
              <dt class="text-sm font-medium text-gray-500">Тип доставки</dt>
              <dd class="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {{ formattedOrder?.type }}
              </dd>
            </div>
            <div class="py-4 sm:grid sm:py-5 sm:grid-cols-3 sm:gap-4">
              <dt class="text-sm font-medium text-gray-500">Тип оплаты</dt>
              <dd class="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {{ formattedOrder?.paymentType }}
              </dd>
            </div>
          </dl>
        </div>
        <dt class="flex text-lg col-span-3 pt-3 font-bold text-black border-t w-full">
          Состав заказа
        </dt>
        <ul role="list" class="flex-auto col-span-3 overflow-y-auto divide-y divide-gray-200 px-2">
          <li
            v-for="item in [...formattedOrder?.products]"
            :key="item.id"
            class="flex py-6 space-x-2"
          >
            <nuxt-img
              :src="item.product.productImage?.path"
              class="flex-none w-16 h-16 object-center object-cover bg-gray-200 rounded-md"
            />
            <div class="flex flex-col justify-between space-y-4">
              <div class="text-sm font-medium space-y-1">
                <h3 class="text-gray-900">{{ item.product.name }}</h3>
                <p class="text-gray-900">Цена: {{ item.price }} ₽</p>
                <p class="text-gray-900">Кол-во: {{ item.quantity }} шт.</p>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </form>

    <template #actions>
      <div class="flex w-full justify-between">
        <button class="text-gray-500 hover:text-gray-900" @click="onDismiss">Закрыть</button>
        <button class="text-green-500 hover:text-green-900" @click="onSubmit">Сохранить</button>
      </div>
    </template>
  </Modal>
</template>
