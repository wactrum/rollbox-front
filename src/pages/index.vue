<template>
  <div>
    <div class="bg-white">
      <div class="max-w-2xl mx-auto py-24 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 class="sr-only">Products</h2>

        <div
          class="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-3 lg:gap-x-8"
        >
          <div
            v-for="product in products?.data"
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
</template>

<script setup lang="ts">
import { useProductsStore } from '~/stores/useProductsStore'

const { getProducts } = useProductsStore()
const { data: products } = await getProducts()

console.warn(products.value)
</script>
