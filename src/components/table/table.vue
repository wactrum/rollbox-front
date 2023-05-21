<script setup lang="ts">
import {
  PencilSquareIcon,
  TrashIcon,
  ChevronDownIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
} from '@heroicons/vue/24/solid'
import { IColumn } from '~/components/table/types'
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

const pagination = computed(() => {
  const value = meta?.value
  if (!value) return null
  const totalPages = [...Array(value.pageCount)].map((el, idx) => idx + 1)

  const to = value.page > 3 ? value.page - 3 : 0
  const from = value.page + 2

  return {
    showFirst: to,
    showLast: value.page + 2 < value.pageCount,
    pages: totalPages.slice(to, from),
  }
})

const nextPage = () => {
  if (props?.meta?.page && props.meta.hasNextPage) {
    emit('changePage', props.meta.page + 1)
  }
}
const prevPage = () => {
  if (props?.meta?.page && props.meta.page !== 1) {
    emit('changePage', props.meta.page - 1)
  }
}

const onSortClick = (col: IColumn) => {
  const current = sort.value
  let order: number | null = 1
  console.warn(current)

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
</script>

<template>
  <div class="table">
    <slot name="header">
      <div class="sm:flex sm:items-center">
        <div class="sm:flex-auto">
          <h1 class="text-xl font-semibold text-gray-900">{{ title }}</h1>
          <p v-if="description" class="mt-2 text-sm text-gray-700">
            {{ description }}
          </p>
        </div>
      </div>
    </slot>
    <div class="flex-col hidden md:flex w-full h-full">
      <div class="mt-8 flex overflow-auto">
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
                      <div v-if="column.title" class="flex" @click="onSortClick(column)">
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
                <slot :name="`cell-${column.name}`" :item="row" :column="column">
                  <td v-if="column.key" class="px-4 py-4 text-sm">
                    {{ row[column.key] }}
                  </td>
                </slot>
              </template>
            </tr>
          </tbody>

          <div
            v-if="!rows?.length"
            class="absolute pt-8 flex left-[50%] -translate-x-[50%] dark:text-white border-none divide-none"
          >
            Нет данных
          </div>
        </table>
      </div>
      <div class="flex w-full">
        <nav
          class="h-[100px] w-full border-t dark:border-stone-500 border-gray-200 px-4 flex items-start justify-between sm:px-0"
        >
          <template v-if="pagination && meta && meta?.pageCount > 1">
            <div class="-mt-px w-0 flex-1 flex">
              <button
                class="border-t-2 border-transparent pt-4 pr-1 inline-flex items-center text-sm font-medium text-gray-500 dark:text-gray-400 dark:hover:text-gray-100 hover:text-gray-700"
                @click="prevPage"
              >
                <ArrowLeftIcon class="mr-3 h-5 w-5 text-gray-400" aria-hidden="true" />
                Предыдущая
              </button>
            </div>
            <div class="hidden md:-mt-px md:flex">
              <template v-if="pagination.showFirst">
                <button
                  class="border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium"
                  :class="[
                    meta?.page === 0
                      ? 'border-orange-500 text-orange-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                  ]"
                  @click="emit('changePage', 1)"
                >
                  1
                </button>
                <span
                  v-if="meta.page > 4"
                  class="border-transparent text-gray-500 border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium"
                >
                  ...
                </span>
              </template>
              <button
                v-for="page in pagination.pages"
                :key="page"
                class="border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium"
                :class="[
                  page === meta?.page
                    ? 'border-orange-500 text-orange-600'
                    : 'border-transparent text-gray-500 dark:text-gray-300 dark:hover:text-gray-100 hover:text-gray-700 hover:border-gray-300 dark:hover:border-gray-100',
                ]"
                @click="emit('changePage', page)"
              >
                {{ page }}
              </button>
              <template v-if="pagination.showLast">
                <span
                  v-if="meta.pageCount > meta.page + 3"
                  class="border-transparent text-gray-500 border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium"
                >
                  ...
                </span>
                <button
                  class="border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium"
                  :class="[
                    meta?.page === 0
                      ? 'border-orange-500 text-orange-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                  ]"
                  @click="emit('changePage', meta.pageCount)"
                >
                  {{ meta?.pageCount }}
                </button>
              </template>
            </div>
            <div class="-mt-px w-0 flex-1 flex justify-end">
              <button
                class="border-t-2 border-transparent pt-4 pl-1 inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-100"
                @click="nextPage"
              >
                Следующая
                <ArrowRightIcon class="ml-3 h-5 w-5 text-gray-400" aria-hidden="true" />
              </button>
            </div>
          </template>
        </nav>
      </div>
    </div>
    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:hidden py-6 w-full">
      <div
        v-for="row in rows"
        :key="row.id"
        class="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400"
      >
        <div class="flex-1 min-w-0">
          <slot name="grid-item" :item="row">
            <div class="flex justify-between">
              <div class="flex items-center justify-center flex-col">
                <p
                  v-for="column in columns"
                  :key="column.name"
                  class="text-sm font-medium text-gray-900"
                >
                  {{ row[column.key] }}
                </p>
              </div>

              <div class="flex gap-2">
                <button
                  type="button"
                  class="bg-gray-100 p-2 rounded-lg hover:bg-gray-200"
                  @click="emit('updateClick', row)"
                >
                  <PencilSquareIcon class="text-gray-500 w-4 h-4" />
                </button>

                <button
                  type="button"
                  class="bg-red-100 p-2 rounded-lg hover:bg-red-200"
                  @click="emit('deleteClick', row)"
                >
                  <TrashIcon class="text-red-500 w-4 h-4" />
                </button>
              </div>
            </div>
          </slot>
        </div>
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
