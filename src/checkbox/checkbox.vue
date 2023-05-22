<script setup lang="ts">
defineProps<{
  label?: string
}>()

const model = defineModel()
</script>

<template>
  <label class="flex text-sm">
    <span class="flex items-center h-5">
      <input
        v-model="model"
        aria-describedby="comments-description"
        type="checkbox"
        class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded cursor-pointer"
      />
    </span>
    <span class="ml-3 font-medium text-gray-700 cursor-pointer" v-if="label">{{ label }}</span>
  </label>
</template>

<style scoped lang="scss"></style>
