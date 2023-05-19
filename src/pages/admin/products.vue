<script setup lang="ts">
import { IColumn } from '~/components/table/types'
import ModalConfirm from '~/components/modal/modal-confirm.vue'
import ModalCategoryCreate from '~/components/modal/category/modal-category-create.vue'
import { IProduct } from '~/domain/product'
import ModalProductCreate from '~/components/modal/category/modal-product-create.vue'

definePageMeta({
  layout: 'admin',
})

const { showModal } = useModal()
const columns: IColumn<IProduct>[] = [
  { name: 'image', title: 'Изображение', key: 'productImage' },
  { name: 'name', title: 'Название', key: 'name', sortable: true },
  { name: 'price', title: 'Цена', key: 'price', sortable: true },
  { name: 'category', title: 'Категория', key: 'categoryId' },
  { name: 'edit' },
]

const { getProducts, getCategories } = useProductsStore()

const page = ref(1)
const { data: paginatedProducts } = await getProducts({
  options: {
    query: {
      page: page,
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
</script>

<template>
  <div class="px-2 sm:px-4 lg:px-6">
    <Table
      :columns="columns"
      :rows="paginatedProducts?.data ?? []"
      :meta="paginatedProducts?.meta"
      @change-page="onChangePage"
      @update-click="onUpdateClick"
    >
      <template #header>
        <div class="sm:flex sm:items-center">
          <div class="sm:flex-auto">
            <h1 class="text-xl font-semibold text-gray-900">Продукты</h1>
            <p class="mt-2 text-sm text-gray-700">Список всех продуктов в системе.</p>
          </div>
          <div class="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
            <button
              type="button"
              class="inline-flex items-center justify-center rounded-md border border-transparent bg-orange-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 sm:w-auto"
            >
              Добавить продукт
            </button>
          </div>
        </div>
      </template>

      <template #cell-image="{ item }">
        <td class="flex px-4">
          <div class="aspect-square w-24 flex items-center justify-center">
            <nuxt-img :src="item.productImage.path" class="w-full" />
          </div>
        </td>
      </template>

      <template #cell-price="{ item }">
        <td>{{ item.price }}₽</td>
      </template>

      <template #cell-category="{ item }">
        <td>
          {{ item.category.name }}
        </td>
      </template>

      <template #cell-edit="{ item }">
        <td class="py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
          <div
            class="opacity-0 flex gap-2 justify-end group-hover:opacity-100 duration-300 transition-all"
          >
            <button class="text-gray-500 hover:text-gray-900" @click="onUpdateClick(item)">
              Редактировать
            </button>

            <button class="text-red-500 hover:text-red-900">Удалить</button>
          </div>
        </td>
      </template>
    </Table>
  </div>
</template>
