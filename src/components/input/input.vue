<template>
  <label class="flex flex-col gap-1 w-full">
    <span class="dark:text-white">{{ label }}</span>
    <input v-bind="$attrs" v-model="modelValue" class="p-2 rounded-xl" @input="updateModelValue" />
    <Transition
      enter-active-class="animate__animated animate__faster animate__fadeIn"
      leave-active-class="animate__animated animate__faster animate__fadeOut"
      mode="out-in"
    >
      <span v-if="errorMessage && error" :key="errorMessage" class="text-red-500 text-sm">{{
        errorMessage
      }}</span>
    </Transition>
  </label>
</template>

<script setup lang="ts">
import { ref, watchEffect } from 'vue'

defineOptions({
  inheritAttrs: false,
})

const props = defineProps<{
  label?: string
  modelValue?: string
  error?: boolean
  errorMessage?: string
}>()

const emit = defineEmits<{
  (event: 'update:modelValue', val: any): void
}>()

const modelValue = ref(props.modelValue)

watchEffect(() => {
  modelValue.value = props.modelValue
})

const updateModelValue = (event: Event) => {
  emit('update:modelValue', (event.target as HTMLInputElement).value)
}
</script>
