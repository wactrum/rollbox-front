<template>
  <div>
    <div class="fixed bg-white w-screen shadow-bottom z-10">
      <!-- Верхнее меню -->
      <div
        ref="navRef"
        class="max-w-7xl mx-auto flex gap-4 px-4 lg:pt-6 overflow-x-auto mt-16 w-full no-scrollbar whitespace-nowrap py-2"
      >
        <AnimateTransition enter-name="slideInRight" out-name="fadeOut" speed="faster" group>
          <button
            v-for="(category, index) in categoriesMenuItems"
            :ref="(el: any) => setCategoryButtonsRef(el, category)"
            :key="index"
            type="button"
            :class="[
              'inline-flex items-center duration-300 transition px-4 py-2 border border-transparent text-sm font-medium rounded-md text-amber-700 bg-amber-100 hover:bg-amber-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500',
              { 'bg-amber-200': activeCategory === category.id },
            ]"
            @click="onHeaderCategoryClick(category)"
          >
            {{ category.name }}
          </button>
        </AnimateTransition>
      </div>
    </div>
    <div class="bg-white">
      <div class="max-w-2xl mx-auto py-32 sm:pt-36 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 class="sr-only">Каталог</h2>

        <!-- Категории -->
        <AnimateTransition enter-name="fadeIn" out-name="fadeOut" speed="faster" group>
          <div
            v-for="category in notEmptyCategories"
            :ref="(el: any) => setCategoryRef(el, category)"
            :key="category.id"
            class="flex flex-col gap-2 py-4 scroll-mt-32"
            @mouseenter="onHover(category)"
          >
            <span class="text-2xl">
              {{ category.name }}
            </span>

            <div
              class="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-3 lg:gap-x-8"
            >
              <!-- Товары категории -->
              <AnimateTransition enter-name="fadeIn" out-name="fadeOut" speed="faster" group>
                <ProductCard
                  v-for="product in category.products"
                  :key="product.id"
                  :product="product"
                />
              </AnimateTransition>
            </div>
          </div>
        </AnimateTransition>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { refDebounced } from '@vueuse/shared'

// Ref
const navRef = ref<HTMLElement>()

// Composable
const { getCategoriesWithProducts } = useProductsStore()
const { activeCategory, setCategoryRef, setCategoryButtonsRef, onHeaderCategoryClick, onHover } =
  useCategoryInteractive(navRef)

// Data
const search = refDebounced(useState('search'), 500)
const { data: categories } = await getCategoriesWithProducts({
  options: {
    query: {
      search,
    },
  },
})

activeCategory.value = categories?.value?.at(0)?.id ?? null

const notEmptyCategories = computed(() => categories?.value?.filter((el) => el.products?.length))

const categoriesMenuItems = computed<{ id: number; name: string }[]>(
  () => notEmptyCategories.value?.map((el) => ({ id: el.id, name: el.name })) ?? []
)

useProductsSchema(categories)
</script>
