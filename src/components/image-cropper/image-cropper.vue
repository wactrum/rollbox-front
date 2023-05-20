<script setup lang="ts">
import { Cropper, CropperResult, Preview } from 'vue-advanced-cropper'
import { XCircleIcon } from '@heroicons/vue/24/solid'
import 'vue-advanced-cropper/dist/style.css'
import type { FieldContext } from 'vee-validate'
import { CroppedFile, CropperRef } from '~/components/image-cropper/types'

const props = defineProps<{
  modelValue?: string | null
  maxSizeMb?: string | number
  field?: FieldContext
}>()

const emit = defineEmits<{
  (event: 'update:modelValue', val?: File | null): void
}>()

const { showNotification } = useNotification()
const { field, modelValue, maxSizeMb } = toRefs(props)

const inputRef = ref<HTMLInputElement>()

// Data
let file = ref<File>()
let fileUrl = ref<string>()
let croppedFile = ref<CroppedFile>({
  coordinates: null,
  image: null,
  result: null,
})
let isModalShow = ref(false)
let cropperRef = ref<CropperRef>()

let formValue = computed({
  set: (val) => {
    emit('update:modelValue', val)

    if (field?.value) {
      const { value } = field
      value.value = val
    }
  },
  get: () => (field ? (field?.value?.value as any) : modelValue),
})

// Actions
const uploadAvatar = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target && target.files && target.files.length > 0) {
    if (target.files[0].size / 1024 / 1024 > Number(maxSizeMb?.value ?? 1)) {
      target.value = ''
      showNotification(`Размер файла больше ${maxSizeMb?.value ?? 1}мб.`, { type: 'error' })
      return
    }
    file.value = target.files[0]
    fileUrl.value = URL.createObjectURL(file.value)
    target.value = ''
    isModalShow.value = true
  }
}

const onChange = async (result: CropperResult) => {
  const { coordinates, image } = result
  croppedFile.value = {
    coordinates,
    image,
    result: null,
  }
}

const onSubmit = async () => {
  if (cropperRef.value) {
    const { canvas } = cropperRef?.value?.getResult()

    if (canvas) {
      canvas.toBlob((blob: Blob | null): void => {
        if (blob) {
          formValue.value = new File([blob], file?.value?.name ?? 'Image', {
            type: file.value?.type ?? 'image/png',
          })
          isModalShow.value = false
        }
      }, file.value?.type ?? 'image/png')
    }
  } else {
    throw Error('No cropper')
  }
}

const onCloseModal = () => {
  croppedFile.value = {
    coordinates: null,
    image: null,
    result: null,
  }
  isModalShow.value = false
}
</script>

<template>
  <div>
    <input
      ref="inputRef"
      accept="image/jpeg, image/png, image/jpg"
      class="hidden"
      type="file"
      @change="uploadAvatar"
    />

    <div class="flex w-full justify-center">
      <AnimateTransition enter-name="zoomIn" out-name="zoomOut" speed="fast" mode="out-in">
        <Preview
          v-if="croppedFile.image"
          class="border w-full h-full aspect-[16/9]"
          :coordinates="croppedFile.coordinates"
          :image="croppedFile.image"
          @click="inputRef?.click()"
        />
        <div v-else class="w-full flex cursor-pointer" @click="inputRef?.click()">
          <slot />
        </div>
      </AnimateTransition>
    </div>

    <ModalWrapper v-model="isModalShow">
      <Modal>
        <template #title>
          <div class="flex justify-between">
            <p class="text-base leading-normal text-black">Отредактируйте изображение</p>
            <XCircleIcon class="h-6 w-6" @click="onCloseModal" />
          </div>
        </template>

        <Cropper
          v-if="fileUrl"
          ref="cropperRef"
          :debounce="false"
          :src="fileUrl"
          :stencil-props="{
            aspectRatio: 16 / 9,
          }"
          @change="onChange"
        />

        <div class="mt-3 flex items-center justify-center">
          <button
            type="button"
            class="inline-flex items-center justify-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none sm:w-auto"
            @click="onSubmit"
          >
            Завершить редактирование
          </button>
        </div>
      </Modal>
    </ModalWrapper>
  </div>
</template>

<style scoped lang="css">
.vue-preview :deep(.vue-preview__wrapper) {
  @apply h-10 w-10 !important;
}
</style>
