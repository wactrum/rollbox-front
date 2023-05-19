<script setup lang="ts">
import { XMarkIcon } from '@heroicons/vue/20/solid'
import { ICategory, ICreateCategory } from '~/domain/product'
import * as yup from 'yup'
import { FetchError } from 'ofetch'

const props = defineProps<{
  initialData?: ICategory
}>()

const { createCategory, updateCategory } = useProductsStore()
const { initialData } = toRefs(props)
const id = initialData?.value?.id

const { onDismiss, onClose, onOk } = useModalActions()
const { onSubmit, useField } = useForm<ICreateCategory, ICategory>({
  formParams: {
    initialValues: initialData?.value ?? {
      name: null,
    },
    validationSchema: {
      name: yup.string().required(),
    },
  },
  params: {
    submitMethod: (data) => {
      if (id) return updateCategory(id, data)
      return createCategory(data)
    },
    onSuccess: (data) => onOk(data),
    pluckData: true,
  },
})

const usernameField = useField('name')
</script>

<template>
  <Modal>
    <template #title>
      <div class="flex relative justify-between">
        <p class="text-center text-base leading-normal text-black">
          {{ initialData?.id ? 'Обновить категорию' : 'Добавить категорию' }}
        </p>
        <button class="absolute flex items-start right-[-15px] top-[-15px]" @click="onClose">
          <XMarkIcon class="w-6 h-6" />
        </button>
      </div>
    </template>

    <form class="space-y-6">
      <div class="grid grid-cols-3 gap-6">
        <div class="col-span-3 sm:col-span-2">
          <InputField
            :field="usernameField"
            type="text"
            label="Название"
            class="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full sm:text-sm border border-gray-300"
            placeholder="Шаурма"
          />
        </div>
      </div>
    </form>

    <template #actions>
      <div class="flex w-full justify-between">
        <button class="text-gray-500 hover:text-gray-900" @click="onDismiss">Отмена</button>
        <button class="text-green-500 hover:text-green-900" @click="onSubmit">
          {{ initialData?.id ? 'Обновить' : 'Создать' }}
        </button>
      </div>
    </template>
  </Modal>
</template>
