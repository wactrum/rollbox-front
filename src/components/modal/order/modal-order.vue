<script setup lang="ts">
import { XMarkIcon } from '@heroicons/vue/20/solid'
import { IOrder } from '~/domain/order'
import { formatOrder } from '~/services/order-service'

const props = defineProps<{
  order: IOrder
}>()

const { order } = toRefs(props)
const id = order.value.id

const formattedOrder = computed(() => formatOrder(order.value))

const { onDismiss, onClose } = useModalActions()
</script>

<template>
  <Modal size="xl">
    <template #title>
      <div class="flex relative justify-between">
        <p class="text-center text-base leading-normal text-black dark:text-gray-200">
          {{ 'Заказ #' }}{{ order.id }}
        </p>
        <button class="absolute flex items-start right-[-15px] top-[-15px]" @click="onClose">
          <XMarkIcon class="w-6 h-6" />
        </button>
      </div>
    </template>

    <form class="space-y-6">
      <div>
        <h3 class="text-lg leading-6 font-medium text-gray-900">Информация о заказе</h3>
        <p class="mt-1 max-w-2xl text-sm text-gray-500">Заказ от {{ formattedOrder.createdAt }}.</p>
      </div>
      <div class="mt-5 border-t border-gray-200">
        <dl class="divide-y divide-gray-200">
          <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
            <dt class="text-sm font-medium text-gray-500">Покупатель</dt>
            <dd class="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              <span class="flex-grow">{{ order.userId }}</span>
              <span class="ml-4 flex-shrink-0"> </span>
            </dd>
          </div>
          <div class="py-4 sm:grid sm:py-5 sm:grid-cols-3 sm:gap-4">
            <dt class="text-sm font-medium text-gray-500">Номер телефона</dt>
            <dd class="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              <span class="flex-grow">+79965046432</span>
              <span class="ml-4 flex-shrink-0">
                <button
                  type="button"
                  class="bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Update
                </button>
              </span>
            </dd>
          </div>
          <div class="py-4 sm:grid sm:py-5 sm:grid-cols-3 sm:gap-4">
            <dt class="text-sm font-medium text-gray-500">Application for</dt>
            <dd class="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              <span class="flex-grow">Backend Developer</span>
              <span class="ml-4 flex-shrink-0">
                <button
                  type="button"
                  class="bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Update
                </button>
              </span>
            </dd>
          </div>
          <div class="py-4 sm:grid sm:py-5 sm:grid-cols-3 sm:gap-4">
            <dt class="text-sm font-medium text-gray-500">Итоговая цена</dt>
            <dd class="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              <span class="flex-grow"> 3,200₽</span>
              <span class="ml-4 flex-shrink-0">
                <button
                  type="button"
                  class="bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Update
                </button>
              </span>
            </dd>
          </div>
          <div class="py-4 sm:grid sm:py-5 sm:grid-cols-3 sm:gap-4">
            <dt class="text-sm font-medium text-gray-500">About</dt>
            <dd class="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              <span class="flex-grow">
                Fugiat ipsum ipsum deserunt culpa aute sint do nostrud anim incididunt cillum culpa
                consequat. Excepteur qui ipsum aliquip consequat sint. Sit id mollit nulla mollit
                nostrud in ea officia proident. Irure nostrud pariatur mollit ad adipisicing
                reprehenderit deserunt qui eu.
              </span>
              <span class="ml-4 flex-shrink-0">
                <button
                  type="button"
                  class="bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Update
                </button>
              </span>
            </dd>
          </div>
        </dl>
      </div>
    </form>

    <template #actions>
      <div class="flex w-full justify-end">
        <button class="text-gray-500 hover:text-gray-900" @click="onDismiss">Закрыть</button>
      </div>
    </template>
  </Modal>
</template>