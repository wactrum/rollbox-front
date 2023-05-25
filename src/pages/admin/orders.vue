<script setup lang="ts">
import type { IColumn } from '~/components/table/types'
import type { IOrder } from '~/domain/order'
import { refDebounced } from '@vueuse/shared'
import Checkbox from '~/checkbox/checkbox.vue'
import { formatOrders } from '~/services/order-service'
import ModalOrder from '~/components/modal/order/modal-order.vue'

definePageMeta({
  layout: 'admin',
  middleware: ['auth', 'admin'],
})

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

const search = ref()
const page = ref(1)
const sort = ref<{ name: string; order: number } | null>(null)

const { data: paginatedOrders } = await getOrders({
  options: {
    query: {
      page: page,
      search: refDebounced(search, 1000),
      sortBy: computed(() => sort.value?.name),
      sortOrder: computed(() => {
        if (sort.value) return sort.value.order === 1 ? 'asc' : 'desc'
      }),
    },
  },
})

const formattedOrders = computed(() => formatOrders(paginatedOrders?.value?.data ?? []))

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
        <div class="col-span-12 sm:col-span-5 md:col-span-4">
          <InputSearch v-model="search" placeholder="Поиск по заказчику, адресу доставки" />
        </div>

        <!--        <div class="col-span-12 sm:col-span-4 md:col-span-3">-->
        <!--          <Select v-model="categoryId" label="Категория" :options="categories" map />-->
        <!--        </div>-->
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
