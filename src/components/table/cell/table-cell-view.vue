<script setup lang="ts">
withDefaults(
  defineProps<{
    item: any
    isShow?: boolean
  }>(),
  {
    isShow: true,
  }
)

const emit = defineEmits<{
  (event: 'onViewClick', val: any): void
}>()
</script>

<template>
  <div class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
    <div
      class="opacity-0 flex gap-2 justify-end group-hover:opacity-100 duration-300 transition-all"
    >
      <button class="text-gray-500 hover:text-gray-900" @click="emit('onViewClick', item)">
        Просмотреть
      </button>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
