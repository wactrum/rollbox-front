<script setup lang="ts">
import type { IColumn } from '~/components/table/types'
import type { IProduct } from '~/domain/product'
import { refDebounced } from '@vueuse/shared'
import ModalProductCreate from '~/components/modal/product/modal-product-create.vue'
import ModalConfirm from '~/components/modal/modal-confirm.vue'
import Checkbox from '~/checkbox/checkbox.vue'
import TableCellEdit from '~/components/table/cell/table-cell-edit.vue'

definePageMeta({
  layout: 'admin',
  middleware: ['auth', 'admin'],
})

const { showModal } = useModal()
const { getAdminProducts, getCategories, deleteProduct } = useProductsStore()

const columns: IColumn<IProduct>[] = [
  { name: 'image', title: 'Изображение', key: 'productImage' },
  { name: 'name', title: 'Название', key: 'name', sortable: true },
  { name: 'price', title: 'Цена', key: 'price', sortable: true },
  { name: 'category', title: 'Категория', key: 'categoryId' },
  { name: 'edit' },
]

const search = ref()
const page = ref(1)
const sort = ref<{ name: string; order: number } | null>(null)
const categoryId = ref()
const showDeleted = ref<boolean>(false)

const { data: paginatedProducts } = await getAdminProducts({
  options: {
    query: {
      page: page,
      search: refDebounced(search, 1000),
      categoryId: categoryId,
      showDeleted,
      sortBy: computed(() => sort.value?.name),
      sortOrder: computed(() => {
        if (sort.value) return sort.value.order === 1 ? 'asc' : 'desc'
      }),
    },
  },
})

const { data: categories } = await getCategories({ asyncDataOptions: { lazy: true } })

const onChangePage = (number: number) => {
  page.value = number
}

const onUpdateClick = (item: IProduct) => {
  showModal(ModalProductCreate, {
    props: {
      initialData: item,
    },
  }).onOk((data) => {
    Object.assign(item, data)
  })
}

const onCreateClick = () => {
  showModal(ModalProductCreate).onOk((data) => {
    paginatedProducts?.value?.data.push(data)
  })
}

const onDeleteClick = (item: any) => {
  showModal(ModalConfirm, {
    props: {
      title: 'Вы действительно хотите удалить товар?',
    },
  }).onOk(async () => {
    await deleteProduct(item.id)

    const index = paginatedProducts.value?.data.indexOf(item)
    if (index && index > -1) {
      paginatedProducts.value?.data?.splice(index, 1)
    }
  })
}
</script>

<template>
  <Table
    v-model:sort="sort"
    :columns="columns"
    :rows="paginatedProducts?.data ?? []"
    :meta="paginatedProducts?.meta"
    title="Продукты"
    description="Список всех продуктов в системе"
    @change-page="onChangePage"
    @update-click="onUpdateClick"
  >
    <template #header-actions>
      <div class="col-span-6 flex md:justify-end">
        <button
          type="button"
          class="inline-flex whitespace-nowrap items-center justify-center rounded-md border border-transparent bg-orange-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 sm:w-auto"
          @click="onCreateClick"
        >
          Добавить продукт
        </button>
      </div>
    </template>

    <template #header-filters>
      <div class="w-full grid grid-cols-12 items-end gap-4">
        <div class="col-span-12 sm:col-span-4 md:col-span-3">
          <InputSearch v-model="search" />
        </div>

        <div class="col-span-12 sm:col-span-4 md:col-span-3">
          <Select v-model="categoryId" label="Категория" :options="categories" map />
        </div>

        <div class="col-span-12 sm:col-span-4 md:col-span-3 pb-2">
          <Checkbox v-model="showDeleted" label="Показать удаленные" />
        </div>
      </div>
    </template>

    <template #cell-image="{ item }">
      <div class="aspect-square w-24 flex items-center justify-center">
        <nuxt-img :src="item.productImage.path" class="w-full" />
      </div>
    </template>

    <template #cell-price="{ item }">
      <span>{{ item.price }}₽</span>
    </template>

    <template #cell-category="{ item }">
      <span>{{ item.category.name }}</span>
    </template>

    <template #cell-edit="{ item }">
      <TableCellEdit
        v-if="!showDeleted"
        :item="item"
        @on-update-click="onUpdateClick"
        @on-delete-click="onDeleteClick"
      />
    </template>
  </Table>
</template>
