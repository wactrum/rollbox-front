<script setup lang="ts">
withDefaults(
  defineProps<{
    placeholder?: string
  }>(),
  {
    placeholder: 'Поиск',
  }
)

import { MagnifyingGlassIcon } from '@heroicons/vue/24/solid'
const modelValue = defineModel()
</script>

<template>
  <label for="search">
    <span class="relative">
      <span class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <MagnifyingGlassIcon class="h-5 w-5 text-gray-400 dark:text-gray-200" aria-hidden="true" />
      </span>
      <input
        v-model="modelValue"
        name="search"
        class="block w-full pl-10 pr-3 py-2 border dark:placeholder-gray-400 border-gray-300 rounded-md leading-5 bg-white dark:bg-slate-600 dark:border-slate-500 dark:text-gray-200 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
        :placeholder="placeholder"
        type="search"
        autocomplete="search"
      />
    </span>
  </label>
</template>

<style scoped lang="scss"></style>
