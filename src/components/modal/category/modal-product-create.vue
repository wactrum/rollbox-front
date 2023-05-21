<script setup lang="ts">
import { XMarkIcon } from '@heroicons/vue/20/solid'
import { ICreateProduct, IProduct, IUpdateProduct } from '~/domain/product'
import * as yup from 'yup'
import SelectField from '~/components/select/selectField.vue'

const props = defineProps<{
  initialData?: IProduct
}>()

const { createProduct, uploadProductImage, updateProduct, getCategories } = useProductsStore()
const { data: categories } = await getCategories()
const { initialData } = toRefs(props)
const id = initialData?.value?.id

const { onDismiss, onClose, onOk } = useModalActions()
const { onSubmit, useField } = useForm<IProduct>({
  formParams: {
    initialValues: initialData?.value,
    validationSchema: {
      name: yup.string().required(),
      price: yup.number().integer().positive().min(1).required(),
      description: yup.string().required(),
      discount: yup.number().integer().positive().nullable(),
      categoryId: yup.number().required(),
      productImage: yup.mixed().required(),
    },
  },
  params: {
    submitMethod: (data) => {
      const { productImage, ...other } = data
      const form: IUpdateProduct | ICreateProduct = {
        ...other,
        productImageId: productImage?.id,
      }

      if (id) {
        return updateProduct(id, form)
      } else {
        if (!productImage?.id) throw new Error('[ModalProductCreate]: not found productImage')
        return createProduct(form as ICreateProduct)
      }
    },
    onSuccess: (data) => onOk(data),
    pluckData: true,
    sendModifiedOnly: true,
  },
})

const imageField = useField('productImage')
const nameField = useField('name')
const descriptionField = useField('description')
const priceField = useField('price')
const discountField = useField('discount')
const categoryField = useField('categoryId')

const onImageCrop = async (image?: File | null) => {
  if (image) {
    imageField.value.value = await uploadProductImage(image)
  }
}
</script>

<template>
  <Modal size="xl">
    <template #title>
      <div class="flex relative justify-between">
        <p class="text-center text-base leading-normal text-black dark:text-gray-200">
          {{ initialData?.id ? 'Обновить продукт' : 'Добавить продукт' }}
        </p>
        <button class="absolute flex items-start right-[-15px] top-[-15px]" @click="onClose">
          <XMarkIcon class="w-6 h-6" />
        </button>
      </div>
    </template>

    <form class="space-y-6">
      <div class="grid grid-cols-4 gap-6">
        <div class="col-span-4 row-span-2 sm:col-span-2">
          <ImageCropper max-size-mb="1" @update:model-value="onImageCrop">
            <nuxt-img v-if="initialData?.productImage" :src="initialData?.productImage?.path" />
            <div v-else class="bg-gray-200 aspect-[16/9] w-full flex justify-center items-center">
              <span class="text-gray-600 text-center">Нажмите, чтобы загрузить изображение</span>
            </div>
          </ImageCropper>
        </div>

        <div class="col-span-4 sm:col-span-2">
          <InputField
            :field="nameField"
            type="text"
            label="Название"
            class="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full sm:text-sm border border-gray-300"
            placeholder="Шаурма"
          />
        </div>

        <div class="col-span-4 sm:col-span-2">
          <SelectField label="Категория" :field="categoryField" :options="categories" map />
        </div>

        <div class="col-span-2 sm:col-span-2">
          <InputField
            :field="priceField"
            is-number
            label="Цена"
            class="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full sm:text-sm border border-gray-300"
            placeholder="100"
          >
            <template #after>
              <span>₽</span>
            </template>
          </InputField>
        </div>

        <div class="col-span-2 sm:col-span-2">
          <InputField
            :field="discountField"
            is-number
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
