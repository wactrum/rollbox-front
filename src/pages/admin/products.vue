<script setup lang="ts">
import { IColumn } from '~/components/table/types'
import { IProduct } from '~/domain/product'
import ModalProductCreate from '~/components/modal/category/modal-product-create.vue'
import { MagnifyingGlassIcon } from '@heroicons/vue/24/solid'
import { refDebounced } from '@vueuse/shared'

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

const search = ref()
const page = ref(1)
const { data: paginatedProducts, pending } = await getProducts({
  options: {
    query: {
      page: page,
      search: refDebounced(search, 1000),
    },
  },
})

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
</script>

<template>
  <Table
    :columns="columns"
    :rows="paginatedProducts?.data ?? []"
    :meta="paginatedProducts?.meta"
    @change-page="onChangePage"
    @update-click="onUpdateClick"
  >
    <template #header>
      <div class="sm:flex sm:items-center justify-between">
        <div class="">
          <h1 class="text-xl font-semibold text-gray-900 dark:text-gray-200">Продукты</h1>
          <p class="mt-2 text-sm text-gray-700 dark:text-gray-400">
            Список всех продуктов в системе.
          </p>
        </div>
        <div class="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <div class="flex gap-4 items-center">
            <div class="max-w-lg w-full lg:max-w-xs">
              <label for="search" class="sr-only">Поиск по товарам</label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MagnifyingGlassIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
                <input
                  id="search"
                  v-model="search"
                  name="sushi-search"
                  class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                  placeholder="Поиск"
                  type="search"
                  autocomplete="sushi-search"
                />
              </div>
            </div>

            <button
              type="button"
              class="inline-flex whitespace-nowrap items-center justify-center rounded-md border border-transparent bg-orange-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 sm:w-auto"
              @click="onCreateClick"
            >
              Добавить продукт
            </button>
          </div>
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
          <button
            class="text-gray-500 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100"
            @click="onUpdateClick(item)"
          >
            Редактировать
          </button>

          <button class="text-red-500 hover:text-red-900 dark:hover:text-red-300">Удалить</button>
        </div>
      </td>
    </template>
  </Table>
</template>
