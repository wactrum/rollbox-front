<script setup lang="ts">
import { IColumn } from '~/components/table/types'
import ModalConfirm from '~/components/modal/modal-confirm.vue'
import ModalCategoryCreate from '~/components/modal/category/modal-category-create.vue'
import { CategoryModalProviderKey } from '~/components/modal/category/types'

definePageMeta({
  layout: 'admin',
})

const { showModal } = useModal()
const columns: IColumn[] = [{ name: 'name', title: 'Название', key: 'name' }, { name: 'edit' }]
const { getCategories, createCategory, updateCategory } = useProductsStore()
const { data: categories } = await getCategories()

provide(CategoryModalProviderKey, {
  onCreate: createCategory,
  onUpdate: updateCategory,
})

const onUpdateClick = (item: any) => {
  showModal(ModalCategoryCreate, {
    props: {
      initialData: item,
    },
  })
}

const onDeleteClick = (item: any) => {
  showModal(ModalConfirm, {
    props: {
      title:
        'Вы действительно хотите удалить категорию? Все товары привязанные к этой категории станут не доступны для просмотра пользователям',
    },
  }).onOk(() => {
    console.warn(item)
  })
}
</script>

<template>
  <div class="px-2 sm:px-6 lg:px-8">
    <Table
      :columns="columns"
      :rows="categories"
      @update-click="onUpdateClick"
      @delete-click="onDeleteClick"
    >
      <template #header>
        <div class="sm:flex sm:items-center">
          <div class="sm:flex-auto">
            <h1 class="text-xl font-semibold text-gray-900">Категории</h1>
            <p class="mt-2 text-sm text-gray-700">Список категорий для товаров.</p>
          </div>
          <div class="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
            <button
              type="button"
              class="inline-flex items-center justify-center rounded-md border border-transparent bg-orange-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 sm:w-auto"
            >
              Добавить категорию
            </button>
          </div>
        </div>
      </template>

      <template #table-head>
        <tr>
          <th
            scope="col"
            class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
          >
            Название
          </th>
          <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-6">
            <span class="sr-only">Edit</span>
          </th>
        </tr>
      </template>

      <template #cell-edit="{ item }">
        <td
          class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6"
        >
          <div
            class="opacity-0 flex gap-2 justify-end group-hover:opacity-100 duration-300 transition-all"
          >
            <button class="text-gray-500 hover:text-gray-900" @click="onUpdateClick(item)">
              Редактировать
            </button>

            <button class="text-red-500 hover:text-red-900" @click="onDeleteClick(item)">
              Удалить
            </button>
          </div>
        </td>
      </template>
    </Table>
  </div>
</template>
