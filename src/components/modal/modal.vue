<script lang="ts" setup>
import { DialogPanel, DialogTitle } from '@headlessui/vue'
</script>

<template>
  <DialogPanel
    class="w-full max-w-md transform rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
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
