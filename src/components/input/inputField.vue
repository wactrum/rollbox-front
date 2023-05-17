<template>
  <Input v-model="value" :error="isError" :error-message="errorMessage" v-bind="$attrs" />
</template>

<script setup lang="ts">
import type { FieldContext } from 'vee-validate'

const props = defineProps<{
  field: FieldContext<any>
}>()

const { field } = toRefs(props)
const { value, errorMessage, meta } = field.value

const isError = computed(() => meta.touched && !!errorMessage)
</script>
