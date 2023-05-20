<template>
  <Select v-model="value" :error="isError" :errors="errors" v-bind="$attrs">
    <template v-for="(_, slot) of $slots" :key="slot" #[slot]="data">
      <slot :name="slot" v-bind="data ?? {}" />
    </template>
  </Select>
</template>

<script setup lang="ts">
import type { FieldContext } from 'vee-validate'

const props = defineProps<{
  field: FieldContext<any>
}>()

const { field } = toRefs(props)
const { value, errors, meta } = field.value

const isError = computed(() => meta.touched && !!errors.value?.length)
</script>
