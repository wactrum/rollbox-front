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
    <div class="flex w-full">
      <div class="hidden md:flex w-full">
        <div class="mt-8 flex flex-col w-full">
          <div class="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                <table class="min-w-full divide-y divide-gray-300">
                  <thead class="bg-gray-50">
                    <slot name="table-head">
                      <tr>
                        <template v-for="(column, index) in columns" :key="index">
                          <slot :name="`header-${column.name}`" :column="column">
                            <th
                              scope="col"
                              class="group py-4 px-4 text-left text-sm font-semibold text-gray-900"
                              :class="[{ 'cursor-pointer': column.sortable }]"
                            >
                              <div v-if="column.title" class="flex">
                                <span>{{ column.title }}</span>
                                <span
                                  v-if="column.sortable"
                                  class="invisible ml-2 flex-none rounded text-gray-400 group-hover:visible group-focus:visible"
                                >
                                  <ChevronDownIcon class="h-5 w-5" aria-hidden="true" />
                                </span>
                              </div>
                            </th>
                          </slot>
                        </template>
                      </tr>
                    </slot>
                  </thead>
                  <tbody class="divide-y divide-gray-200 bg-white">
                    <tr v-for="(row, rowIndex) in rows" :key="rowIndex" class="group">
                      <template v-for="(column, columnIndex) in columns" :key="columnIndex">
                        <slot :name="`cell-${column.name}`" :item="row" :column="column">
                          <td v-if="column.key" class="px-4 py-4 text-sm text-gray-500">
                            {{ row[column.key] }}
                          </td>
                        </slot>
                      </template>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <nav
            v-if="pagination && meta && meta?.pageCount > 1"
            class="border-t border-gray-200 px-4 flex items-center justify-between sm:px-0"
          >
            <div class="-mt-px w-0 flex-1 flex">
              <button
                class="border-t-2 border-transparent pt-4 pr-1 inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700"
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
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
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
                class="border-t-2 border-transparent pt-4 pl-1 inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700"
                @click="nextPage"
              >
                Следующая
                <ArrowRightIcon class="ml-3 h-5 w-5 text-gray-400" aria-hidden="true" />
              </button>
            </div>
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
  </div>
</template>

<style lang="scss">
.table {
  @apply w-full;

  td {
    @apply pl-4 text-sm text-gray-500 break-words whitespace-break-spaces;
  }
}
</style>
