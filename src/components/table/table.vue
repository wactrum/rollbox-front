<script setup lang="ts">
import { ChevronDownIcon } from '@heroicons/vue/24/solid'
import { IColumn, TableProviderKey } from '~/components/table/types'
import { IMeta } from '~/domain'

const props = defineProps<{
  title?: string
  description?: string
  columns: IColumn[]
  rows: any[]
  meta?: IMeta
}>()

const emit = defineEmits<{
  (event: 'updateClick', item: any): void
  (event: 'deleteClick', item: any): void
  (event: 'changePage', page: number): void
}>()

const sort = defineModel<{
  name: string
  order: number | null
} | null>('sort')

const { meta } = toRefs(props)

const onSortClick = (col: IColumn) => {
  const current = sort.value
  let order: number | null = 1

  if (current && current.name === col.name) {
    if (current.order === 0) {
      sort.value = null
      return
    } else order = 0
  }

  sort.value = {
    name: col.name,
    order,
  }
}

provide(TableProviderKey, {
  meta: meta,
  changePage: (page) => emit('changePage', page),
})
</script>

<template>
  <div class="table">
    <slot name="header">
      <div class="flex flex-col sm:items-center justify-between gap-4 sm:flex-row">
        <div class="flex flex-col">
          <h1 class="text-xl font-semibold text-gray-900 dark:text-gray-200">{{ title }}</h1>
          <p class="mt-2 text-sm text-gray-700 dark:text-gray-400">
            {{ description }}
          </p>
        </div>
        <slot name="header-actions" />
      </div>
      <div class="pt-4 sm:pt-6 flex flex-col gap-4 items-end">
        <slot name="header-filters" />
      </div>
    </slot>
    <div class="flex-col hidden md:flex">
      <div class="mt-4 flex-col flex max-h-[700px] overflow-auto">
        <table
          class="min-w-full divide-y dark:divide-stone-500 divide-gray-300 dark:bg-neutral-800"
        >
          <thead>
            <slot name="table-head">
              <tr>
                <template v-for="(column, index) in columns" :key="index">
                  <slot :name="`header-${column.name}`" :column="column">
                    <th
                      scope="col"
                      class="sticky bg-gray-50 dark:bg-stone-900 dark:text-gray-300 top-0 group py-4 px-4 text-left text-sm font-semibold text-gray-900"
                      :class="[{ 'cursor-pointer': column.sortable }]"
                    >
                      <div
                        v-if="column.title"
                        class="flex"
                        @click="column.sortable && onSortClick(column)"
                      >
                        <span>{{ column.title }}</span>
                        <span
                          v-if="column.sortable"
                          :class="[column.name === sort?.name ? 'visible' : 'invisible']"
                          class="ml-2 flex-none rounded text-gray-400 group-hover:visible group-focus:visible"
                        >
                          <ChevronDownIcon
                            class="h-5 w-5 transition duration-300"
                            aria-hidden="true"
                            :class="[
                              { 'rotate-180': column.name === sort?.name && sort.order === 1 },
                            ]"
                          />
                        </span>
                      </div>
                    </th>
                  </slot>
                </template>
              </tr>
            </slot>
          </thead>
          <tbody
            class="divide-y divide-gray-200 dark:divide-stone-500 text-gray-500 dark:text-gray-300"
          >
            <tr v-for="(row, rowIndex) in rows" :key="rowIndex" class="group">
              <template v-for="(column, columnIndex) in columns" :key="columnIndex">
                <td v-if="column.key" class="px-4 py-4 text-sm">
                  <slot :name="`cell-${column.name}`" :item="row" :column="column">
                    {{ row[column.key] }}
                  </slot>
                </td>
                <td v-else-if="column.name" class="px-4 py-4 text-sm">
                  <slot :name="`cell-${column.name}`" :item="row" :column="column"></slot>
                </td>
              </template>
            </tr>
          </tbody>
        </table>
        <div
          v-if="!rows?.length"
          class="py-8 w-full items-center justify-center flex dark:text-white border-none divide-none"
        >
          Нет данных
        </div>
      </div>
      <div class="flex w-full">
        <TablePagination />
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.table {
  @apply w-full h-full flex flex-col;

  tr {
    @apply max-h-16;
  }

  td {
    @apply pl-4 text-sm text-gray-500 dark:text-gray-200 break-words whitespace-break-spaces;
  }
}
</style>
