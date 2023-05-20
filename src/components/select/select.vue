<script setup lang="ts">
import {
  Listbox,
  ListboxButton,
  ListboxLabel,
  ListboxOption,
  ListboxOptions,
} from '@headlessui/vue'
import { ChevronUpDownIcon, CheckIcon } from '@heroicons/vue/24/solid'
import { ref, watchEffect } from 'vue'

defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(
  defineProps<{
    label?: string
    modelValue?: any
    options?: any[]
    optionsValue?: string
    optionsLabel?: string
    map?: boolean
    error?: boolean
    errors?: string[]
  }>(),
  {
    optionsValue: 'id',
    optionsLabel: 'name',
  }
)

const emit = defineEmits<{
  (event: 'update:modelValue', value: any): void
}>()

const { map, options, optionsValue } = toRefs(props)

const modelValue = ref(props.modelValue)

watchEffect(() => {
  modelValue.value = props.modelValue
})

const selected = computed<any>({
  get: () => {
    if (map) {
      const item = options?.value?.find((el: any) => el[optionsValue.value] === modelValue.value)
      return item ?? null
    }
    return modelValue.value
  },
  set: (val) => emit('update:modelValue', val),
})
</script>

<template>
  <Listbox v-model="selected" as="div">
    <ListboxLabel v-if="label" class="block text-sm font-medium text-gray-700">
      {{ label }}
    </ListboxLabel>
    <div class="mt-1 relative">
      <ListboxButton
        class="bg-white relative w-full border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
      >
        <slot name="selectedValue" :value="selected">
          <span v-if="selected" class="block truncate">{{ selected[optionsLabel ?? 'name'] }}</span>
          <span v-else class="block truncate">-</span>
          <span class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
            <ChevronUpDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
          </span>
        </slot>
      </ListboxButton>

      <transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="transform -translate-y-[50px] scale-95 opacity-0"
        enter-to-class="transform scale-100 opacity-100"
        leave-active-class="transition duration-75 ease-out"
        leave-from-class="transform scale-100 opacity-100"
        leave-to-class="transform scale-95 opacity-0"
      >
        <ListboxOptions
          class="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm"
        >
          <ListboxOption
            v-for="option in options"
            :key="option[optionsValue]"
            v-slot="{ active, selected }"
            as="template"
            :value="map ? option[optionsValue] : option"
          >
            <li
              :class="[
                active ? 'text-white bg-orange-600' : 'text-gray-900',
                'cursor-default select-none relative py-2 pl-3 pr-9',
              ]"
            >
              <slot name="option" :value="option">
                <span :class="[selected ? 'font-semibold' : 'font-normal', 'block truncate']">
                  {{ option[optionsLabel] }}
                </span>
              </slot>
              <span
                v-if="selected"
                :class="[
                  active ? 'text-white' : 'text-orange-600',
                  'absolute inset-y-0 right-0 flex items-center pr-4',
                ]"
              >
                <CheckIcon class="h-5 w-5" aria-hidden="true" />
              </span>
            </li>
          </ListboxOption>
        </ListboxOptions>
      </transition>
    </div>
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
  </Listbox>
</template>