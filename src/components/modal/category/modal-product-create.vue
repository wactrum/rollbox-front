<script setup lang="ts">
import { XMarkIcon } from '@heroicons/vue/20/solid'
import { ICreateProduct, IProduct } from '~/domain/product'
import * as yup from 'yup'

const props = defineProps<{
  initialData?: IProduct
}>()

const { createProduct, updateProduct } = useProductsStore()
const { initialData } = toRefs(props)
const id = initialData?.value?.id

const { onDismiss, onClose, onOk } = useModalActions()
const { onSubmit, useField } = useForm<ICreateProduct, IProduct>({
  formParams: {
    initialValues: initialData?.value,
    validationSchema: {
      name: yup.string().required(),
      price: yup.number().required(),
      description: yup.string().required(),
      discount: yup.number().required(),
      categoryId: yup.number().required(),
    },
  },
  params: {
    submitMethod: (data) => {
      if (id) return updateProduct(id, data)
      return createProduct(data)
    },
    onSuccess: (data) => onOk(data),
    pluckData: true,
    sendModifiedOnly: true,
  },
})

const nameField = useField('name')
const descriptionField = useField('description')
const priceField = useField('price')
const discountField = useField('discount')
const categoryField = useField('categoryId')
</script>

<template>
  <Modal>
    <template #title>
      <div class="flex relative justify-between">
        <p class="text-center text-base leading-normal text-black">
          {{ initialData?.id ? 'Обновить продукт' : 'Добавить продукт' }}
        </p>
        <button class="absolute flex items-start right-[-15px] top-[-15px]" @click="onClose">
          <XMarkIcon class="w-6 h-6" />
        </button>
      </div>
    </template>

    <form class="space-y-6">
      <div class="grid grid-cols-4 gap-6">
        <div class="col-span-4">
          <InputField
            :field="nameField"
            type="text"
            label="Название"
            class="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full sm:text-sm border border-gray-300"
            placeholder="Шаурма"
          />
        </div>

        <div class="col-span-3 sm:col-span-2">
          <InputField
            :field="priceField"
            label="Цена"
            class="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full sm:text-sm border border-gray-300"
            placeholder="100"
          >
            <template #after>
              <span>₽</span>
            </template>
          </InputField>
        </div>

        <div class="col-span-3 sm:col-span-2">
          <InputField
            :field="discountField"
            label="Скидка"
            class="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full sm:text-sm border border-gray-300"
            placeholder="100"
          >
            <template #after>
              <span>₽</span>
            </template>
          </InputField>
        </div>

        <div class="col-span-4">
          <TextareaField
            :field="descriptionField"
            label="Описание"
            class="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full sm:text-sm border border-gray-300"
            placeholder="Сет: 'Райский ужин' содержит в себе..."
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
