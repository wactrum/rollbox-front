<script lang="ts" setup>
import { PlusIcon, MinusIcon } from '@heroicons/vue/24/outline'
import type { IProduct } from '~/domain/product'
const props = defineProps<{
  product: IProduct
}>()

// Composable
const cartStore = useCartStore()

// Data
const { product } = toRefs(props)
const quantity = computed(() => cartStore.getQuantityInCart(product.value.id))
const inCart = computed(() => !!quantity.value)
const isVisibleButtons = ref<boolean>(false)
const hideTimeout = ref<NodeJS.Timeout>()

// Actions
const continuationTimeout = () => {
  clearTimeout(hideTimeout.value)
  isVisibleButtons.value = true
  hideTimeout.value = setTimeout(() => (isVisibleButtons.value = false), 3000)
}

const addToCart = async () => {
  await cartStore.addToCart(product.value.id)
  continuationTimeout()
}
const deleteFromCart = async () => {
  await cartStore.deleteFromCart(product.value.id)
  continuationTimeout()
}

const onPriceBtnClick = () => {
  if (!inCart.value) addToCart()
  isVisibleButtons.value = true
  hideTimeout.value = setTimeout(() => (isVisibleButtons.value = false), 3000)
}
</script>

<template>
  <div
    class="cursor-pointer relative bg-white border border-gray-200 rounded-lg flex flex-col overflow-hidden transition-all duration-300 md:hover:shadow-md"
  >
    <div class="aspect-square max-h-[150px] bg-gray-200 sm:aspect-none sm:h-96">
      <nuxt-img
        :src="product.productImage?.path ?? '-'"
        :alt="product.name"
        class="w-full h-full object-center object-cover sm:w-full sm:h-full"
      />
    </div>
    <div class="flex-1 p-4 space-y-2 flex flex-col">
      <h3 class="text-sm font-medium text-gray-900">
        <span>
          {{ product.name }}
        </span>
      </h3>
      <p class="text-sm text-gray-500 line-clamp-4">{{ product.description }}</p>
      <div class="flex-1 flex flex-col justify-end items-end mt-1">
        <AnimateTransition>
          <div v-if="isVisibleButtons" class="flex flex-nowrap gap-2.5 items-center h-10">
            <button
              class="flex items-center justify-center w-8 h-8 border-2 rounded-full font-bold"
              @click="deleteFromCart"
            >
              <MinusIcon class="w-4" />
            </button>
            <p>{{ quantity }}</p>
            <button
              class="flex items-center justify-center w-8 h-8 border-2 rounded-full font-bold"
              @click="addToCart"
            >
              <PlusIcon class="w-4" />
            </button>
          </div>
          <button
            v-else
            type="button"
            class="inline-flex items-center px-4 py-2 h-10 rounded-xl border border-black text-sm font-medium text-black bg-transparent duration-200 hover:bg-amber-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
            @click="onPriceBtnClick"
          >
            {{ product.price }} ₽
          </button>
        </AnimateTransition>
      </div>
    </div>
  </div>
</template>
