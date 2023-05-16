<template>
  <div>
    <div class="fixed bg-white w-screen shadow-bottom z-10">
      <div
        ref="categoriesNamesRef"
        class="max-w-7xl mx-auto flex gap-4 px-4 lg:pt-6 overflow-x-auto mt-16 w-full no-scrollbar whitespace-nowrap py-2"
      >
        <button
          v-for="(category, index) in categoriesNames"
          :key="index"
          type="button"
          :class="[
            'inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-amber-700 bg-amber-100 hover:bg-amber-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500',
            { 'bg-amber-200': activeCategory === category },
          ]"
        >
          {{ category }}
        </button>
      </div>
    </div>
    <div class="bg-white">
      <div class="max-w-2xl mx-auto py-32 lg:pt-36 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 class="sr-only">Каталог</h2>

        <div
          v-for="category in categories"
          :ref="(el) => setCategoryRef(el, category)"
          :key="category.id"
          class="flex flex-col gap-2 py-4"
        >
          <span class="text-2xl">
            {{ category.name }}
          </span>

          <div
            class="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-3 lg:gap-x-8"
          >
            <div
              v-for="product in category.products"
              :key="product.id"
              class="cursor-pointer relative bg-white border border-gray-200 rounded-lg flex flex-col overflow-hidden transition-all duration-300 hover:shadow-md"
            >
              <div class="aspect-square max-h-[150px] bg-gray-200 sm:aspect-none sm:h-96">
                <nuxt-img
                  :src="product.productImage?.path"
                  :alt="product.name"
                  class="w-full h-full object-center object-cover sm:w-full sm:h-full"
                />
              </div>
              <div class="flex-1 p-4 space-y-2 flex flex-col">
                <h3 class="text-sm font-medium text-gray-900">
                  <a>
                    <span aria-hidden="true" class="absolute inset-0" />
                    {{ product.name }}
                  </a>
                </h3>
                <p class="text-sm text-gray-500">{{ product.description }}</p>
                <div class="flex-1 flex flex-col justify-end items-end">
                  <button
                    type="button"
                    class="inline-flex items-center px-4 py-2 rounded-xl border border-black text-sm font-medium text-black bg-transparent hover:bg-orange-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                  >
                    {{ product.price }} ₽
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useProductsStore } from '~/stores/useProductsStore'
const { getCategoriesWithProducts } = useProductsStore()
const { data: categories } = await getCategoriesWithProducts()
import { useIntersectionObserver } from '@vueuse/core'
import { ICategory } from '~/domain/product'

const categoriesNames = computed<string[]>(() => categories.value?.map((el) => el.name))
const categoriesNamesRef = ref<HTMLElement>()
const categoriesRef = ref<{ category: ICategory; el: HTMLElement }[]>([])
const setCategoryRef = (el: HTMLElement, category: ICategory) => {
  categoriesRef.value.push({
    el,
    category: category.name,
    intersection: useIntersectionObserver(el, ([{ isIntersecting, target }], observerElement) => {
      console.warn(isIntersecting, category.name)
    }),
  })
}
</script>
