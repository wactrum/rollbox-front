<script setup lang="ts">
import { IColumn } from '~/components/table/types'
import ModalConfirm from '~/components/modal/modal-confirm.vue'
import ModalCategoryCreate from '~/components/modal/category/modal-category-create.vue'
import { ICategory } from '~/domain/product'
import TableCellEdit from '~/components/table/cell/table-cell-edit.vue'

definePageMeta({
  layout: 'admin',
})

const { showModal } = useModal()
const columns: IColumn[] = [{ name: 'name', title: 'Название', key: 'name' }, { name: 'edit' }]
const { getCategories, deleteCategory } = useProductsStore()
const { data: categories } = await getCategories()

const onCreateClick = () => {
  showModal(ModalCategoryCreate).onOk((data: ICategory) => {
    categories.value?.push(data)
  })
}

const onUpdateClick = (item?: any) => {
  showModal(ModalCategoryCreate, {
    props: {
      initialData: item,
    },
  }).onOk((data: ICategory) => {
    Object.assign(item, data)
  })
}

const onDeleteClick = (item: any) => {
  showModal(ModalConfirm, {
    props: {
      title:
        'Вы действительно хотите удалить категорию? Все товары привязанные к этой категории станут не доступны для просмотра пользователям',
    },
  }).onOk(async () => {
    await deleteCategory(item.id)

    const index = categories.value?.indexOf(item)
    if (index && index > -1) {
      categories.value?.splice(index, 1)
    }
  })
}
</script>

<template>
  <div class="px-2 sm:px-4 lg:px-6">
    <Table
      :columns="columns"
      :rows="categories ?? []"
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
              @click="onCreateClick"
            >
              Добавить категорию
            </button>
          </div>
        </div>
      </template>

      <template #cell-edit="{ item }">
        <TableCellEdit
          :item="item"
          @on-update-click="onUpdateClick"
          @on-delete-click="onDeleteClick"
        />
      </template>
    </Table>
  </div>
</template>
