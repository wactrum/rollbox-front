<template>
  <Input v-model="value" :error="isError" :errors="errors" v-bind="$attrs" :is-number="isNumber">
    <template v-for="(_, slot) of $slots" :key="slot" #[slot]="data">
      <slot :name="slot" v-bind="data ?? {}" />
    </template>
  </Input>
</template>

<script setup lang="ts">
import type { FieldContext } from 'vee-validate'

const props = defineProps<{
  field: FieldContext<any>
  isNumber?: boolean
}>()

const { field } = toRefs(props)
const { value, errors, meta } = field.value

const isError = computed(() => meta.touched && !!errors.value?.length)
</script>
