<script lang="ts" setup>
/**
 * Одноэтажные модальные окна для приложения
 */
import { ModalActionsProviderKey, ModalProviderKey } from '~/components/modal/types'
import type { Component } from 'vue'

const route = useRoute()

watch(route, () => {
  clearModal()
})

type ActionResolver = (data: any) => void
const initialComponent = 'span'

// Data
let isShow = ref(false)
let props = ref<any>(null)
let component = shallowRef<string | Component>('span')
let closeCb: (data: any) => void | null,
  okCb: (data: any) => void | null,
  dismissCb: (data: any) => void | null

// Actions
const clearModal = () => {
  isShow.value = false
  component.value = initialComponent
  props.value = null
  closeCb = null
  okCb = null
  dismissCb = null
}

const onShow = async (data: Component | Promise<{ default: Component }>) => {
  const result = await data
  component.value = 'default' in result ? result.default : result
  isShow.value = true
}

const onClose = (data: any) => {
  closeCb?.(data)
  clearModal()
}

const onOk = (data: any) => {
  okCb?.(data)
  clearModal()
}

const onDismiss = (data: any) => {
  dismissCb?.(data)
  clearModal()
}

// Providers
provide(ModalProviderKey, {
  show: (c, params) => {
    props.value = params?.props
    onShow(c)

    const API = {
      onClose: (cb?: any) => {
        closeCb = cb
        return API
      },
      onOk: (cb?: any) => {
        okCb = cb
        return API
      },
      onDismiss: (cb?: any) => {
        dismissCb = cb
        return API
      },
    }

    return API
  },
})

provide(ModalActionsProviderKey, {
  onOk,
  onClose,
  onDismiss,
})
</script>

<template>
  <slot />

  <ClientOnly>
    <ModalWrapper v-model="isShow">
      <Component :is="component" v-bind="props" />
    </ModalWrapper>
  </ClientOnly>
</template>
