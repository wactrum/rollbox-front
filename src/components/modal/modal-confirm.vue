<script setup lang="ts">
import { XMarkIcon } from '@heroicons/vue/20/solid'

defineProps<{
  title?: string
}>()

const { onDismiss, onClose, onOk } = useModalActions()
</script>

<template>
  <Modal>
    <template #title>
      <div class="flex relative justify-between">
        <p class="text-center text-base leading-normal text-black">
          {{ title ?? 'Подтвердите действие' }}
        </p>
        <button class="absolute flex items-start right-[-15px] top-[-15px]" @click="onClose">
          <XMarkIcon clickable name="icon-close" class="w-6 h-6" />
        </button>
      </div>
    </template>

    <slot />

    <template #actions>
      <div class="flex w-full justify-between">
        <button class="text-gray-500 hover:text-gray-900" @click="onDismiss">Отмена</button>
        <button class="text-red-500 hover:text-red-900" @click="onOk">Подтвердить</button>
      </div>
    </template>
  </Modal>
</template>
