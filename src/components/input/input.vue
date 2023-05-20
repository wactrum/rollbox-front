<template>
  <div>
    <label class="flex flex-col gap-1 w-full shadow-sm">
      <slot name="label">
        <span v-if="label" class="text-black">{{ label }}</span>
      </slot>
      <span class="relative">
        <span v-if="$slots['before']" class="absolute left-0 bottom-0 flex items-center h-full">
          <slot name="after" />
        </span>
        <input
          v-bind="$attrs"
          v-model="modelValue"
          class="p-2 rounded-xl"
          @input="updateModelValue"
        />
        <span
          v-if="$slots['after']"
          class="absolute right-0 bottom-0 h-full pr-3 text-sm flex items-center"
        >
          <slot name="after" />
        </span>
      </span>
    </label>
    <Transition
      enter-active-class="animate__animated animate__faster animate__fadeIn"
      leave-active-class="animate__animated animate__faster animate__fadeOut"
      mode="out-in"
    >
      <div v-if="errors?.length && error" class="text-red-500 flex gap-1 text-xs flex-col p-1">
        <span v-for="item in errors" :key="item">
          {{ item }}
        </span>
      </div>
    </Transition>
  </div>
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
  errors?: string[]
  isNumber?: boolean
}>()

const emit = defineEmits<{
  (event: 'update:modelValue', val: any): void
}>()

const modelValue = ref(props.modelValue)

watchEffect(() => {
  modelValue.value = props.modelValue
})

const updateModelValue = (event: Event) => {
  let value: string | number | null = (event.target as HTMLInputElement).value

  if (props.isNumber) {
    if (!isNaN(Number(value))) {
      value = value === '' ? null : Number(value)
    }
  }

  emit('update:modelValue', value)
}
</script>
