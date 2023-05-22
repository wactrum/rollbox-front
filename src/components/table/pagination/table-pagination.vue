<script setup lang="ts">
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/vue/24/solid'
import { TableProviderKey } from '~/components/table/types'

const tableInjection = inject(TableProviderKey)

if (!tableInjection) throw new Error('Not found TableProviderKey')

const meta = tableInjection.meta

const { changePage } = tableInjection

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
  if (meta?.value?.page && meta.value.hasNextPage) {
    changePage(meta.value.page + 1)
  }
}
const prevPage = () => {
  if (meta?.value?.page && meta.value.page !== 1) {
    changePage(meta.value.page - 1)
  }
}
</script>

<template>
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
            @click="changePage(1)"
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
          @click="changePage(page)"
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
            @click="changePage(meta?.pageCount)"
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
</template>

<style scoped lang="scss"></style>
