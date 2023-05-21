<script lang="ts" setup>
import { DialogPanel, DialogTitle } from '@headlessui/vue'

withDefaults(
  defineProps<{
    size?: 'sm' | 'md' | 'lg' | 'xl'
  }>(),
  {
    size: 'md',
  }
)

const sizes = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
}
</script>

<template>
  <DialogPanel
    :class="[sizes[size]]"
    class="w-full transform rounded-2xl bg-white dark:bg-slate-700 p-6 text-left align-middle shadow-xl transition-all"
  >
    <DialogTitle as="h3" class="text-gray-900 text-lg font-bold leading-6">
      <slot name="title" />
    </DialogTitle>

    <div class="mt-7">
      <slot />
    </div>

    <div class="mt-7">
      <slot name="actions" />
    </div>
  </DialogPanel>
</template>
