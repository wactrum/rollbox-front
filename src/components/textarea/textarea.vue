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

const textareaRows = ref(1)
const textareaRef = ref<HTMLElement>()

onMounted(() => {
  nextTick(() => {
    const textarea = textareaRef.value
    textareaRows.value = textarea ? textarea.scrollHeight / 20 : 1
  })
})

watch(
  () => props.modelValue,
  () => {
    nextTick(() => {
      const textarea = textareaRef.value
      textareaRows.value = textarea ? textarea.scrollHeight / 20 : 1
    })
  }
)
</script>

<template>
  <div>
    <label class="relative flex flex-col gap-1 w-full shadow-sm">
      <slot name="label">
        <span v-if="label" class="text-black">{{ label }}</span>
      </slot>
      <textarea
        ref="textareaRef"
        v-bind="$attrs"
        v-model="modelValue"
        class="p-2 rounded-xl overflow-hidden overscroll-none resize-none"
        :rows="textareaRows"
        @input="updateModelValue"
      />
    </label>
  </div>
</template>

<style scoped lang="scss"></style>
