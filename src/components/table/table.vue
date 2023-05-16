<script setup lang="ts">
import { PencilSquareIcon, TrashIcon } from '@heroicons/vue/24/solid'
import { IColumn } from '~/components/table/types'

const props = defineProps<{
  title?: string
  description?: string
  columns: IColumn[]
  rows: any[]
}>()

const emit = defineEmits<{
  (event: 'updateClick', item: any): void
  (event: 'deleteClick', item: any): void
}>()
</script>

<template>
  <div>
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
                        <th v-for="(column, index) in columns" :key="index">
                          <slot :name="`header-${column.name}`" :column="column">
                            <th
                              v-if="column.title"
                              scope="col"
                              class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                            >
                              {{ column.title }}
                            </th>
                          </slot>
                        </th>
                      </tr>
                    </slot>
                  </thead>
                  <tbody class="divide-y divide-gray-200 bg-white">
                    <tr v-for="(row, rowIndex) in rows" :key="rowIndex" class="group">
                      <template v-for="(column, columnIndex) in columns" :key="columnIndex">
                        <slot :name="`cell-${column.name}`" :item="row" :column="column">
                          <td
                            v-if="column.key"
                            class="whitespace-nowrap px-3 py-4 text-sm text-gray-500"
                          >
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
