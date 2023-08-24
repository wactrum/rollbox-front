<script setup lang="ts">
import type { IColumn } from '~/components/table/types'
import type { IOrder } from '~/domain/order'
import { statusOptions, typeOptions } from '~/domain/order'
import { refDebounced } from '@vueuse/shared'
import { formatOrders } from '~/services/order-service'
import ModalOrder from '~/components/modal/order/modal-order.vue'

definePageMeta({
  layout: 'admin',
  middleware: ['auth', 'admin'],
})

// Composable
const { showModal } = useModal()
const { getOrders } = useOrdersStore()

const columns: IColumn<IOrder>[] = [
  { name: 'id', title: 'ID', key: 'id' },
  { name: 'price', title: 'Сумма', key: 'price', sortable: true },
  { name: 'status', title: 'Статус', key: 'status' },
  { name: 'type', title: 'Тип', key: 'type' },
  { name: 'createdAt', title: 'Дата создания', key: 'createdAt', sortable: true },
  { name: 'waiting', title: 'Время ожидания' },
  { name: 'edit' },
]

// Filters
const search = ref()
const status = ref()
const type = ref()
const createdAtFrom = ref<Date>()
const createdAtTo = ref<Date>()
const page = ref(1)
const sort = ref<{ name: string; order: number } | null>(null)

// Data
const { data: paginatedOrders } = await getOrders({
  options: {
    query: {
      page: page,
      search: refDebounced(search, 1000),
      status,
      type,
      createdAtFrom: computed(() => createdAtFrom.value?.toISOString()),
      createdAtTo: computed(() => createdAtTo.value?.toISOString()),
      sortBy: computed(() => sort.value?.name),
      sortOrder: computed(() => {
        if (sort.value) return sort.value.order === 1 ? 'asc' : 'desc'
      }),
    },
  },
})

const formattedOrders = computed(() => formatOrders(paginatedOrders?.value?.data ?? []))

// Actions
const onChangePage = (number: number) => {
  page.value = number
}

const showViewModal = (item: IOrder) => {
  showModal(ModalOrder, {
    props: {
      orderId: item.id,
    },
  }).onOk((data: IOrder) => {
    const initialEl = paginatedOrders.value?.data.find((el) => el.id === item.id)
    if (initialEl) {
      Object.assign(initialEl, data)
    }
  })
}
</script>

<template>
  <Table
    v-model:sort="sort"
    :columns="columns"
    :rows="formattedOrders"
    :meta="paginatedOrders?.meta"
    title="Заказы"
    description="Список всех заказов в системе"
    @change-page="onChangePage"
  >
    <template #header-filters>
      <div class="w-full grid grid-cols-12 items-end gap-4">
        <div class="col-span-12 sm:col-span-4">
          <InputSearch v-model="search" placeholder="Поиск по заказчику, адресу доставки" />
        </div>

        <div class="col-span-12 sm:col-span-2">
          <Select v-model="status" label="Статус" :options="statusOptions" map />
        </div>

        <div class="col-span-12 sm:col-span-2">
          <Select v-model="type" label="Тип" :options="typeOptions" map />
        </div>

        <div class="col-span-12 sm:col-span-2">
          <p class="block text-sm font-medium text-gray-700 dark:text-gray-200">Дата создания от</p>
          <ElDatePicker
            v-model="createdAtFrom"
            size="large"
            class="!w-full"
            placeholder="Например: 01.01.2023"
          />
        </div>

        <div class="col-span-12 sm:col-span-2">
          <p class="block text-sm font-medium text-gray-700 dark:text-gray-200">Дата создания до</p>
          <ElDatePicker
            v-model="createdAtTo"
            size="large"
            class="!w-full"
            placeholder="Например: 01.02.2023"
          />
        </div>
      </div>
    </template>

    <template #cell-waiting="{ item }">
      <span class="font-bold text-black">{{ item.waitTime.value }}</span>
    </template>

    <template #cell-edit="{ item }">
      <TableCellView :item="item" @on-view-click="showViewModal(item)" />
    </template>
  </Table>
</template>
