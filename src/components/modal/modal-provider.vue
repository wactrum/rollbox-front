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
let closeResolver: ActionResolver | null,
  okResolver: ActionResolver | null,
  dismissResolver: ActionResolver | null

// Actions
const clearModal = () => {
  isShow.value = false
  component.value = initialComponent
  props.value = null
  closeResolver = null
  okResolver = null
  dismissResolver = null
}

const onShow = async (data: Component | Promise<{ default: Component }>) => {
  const result = await data
  component.value = 'default' in result ? result.default : result
  isShow.value = true
}

const onClose = (data: any) => {
  closeResolver?.(data)
  clearModal()
}

const onOk = (data: any) => {
  dismissResolver?.(data)
  clearModal()
}

const onDismiss = (data: any) => {
  dismissResolver?.(data)
  clearModal()
}

const setResolver = (resolver: ActionResolver | null, cb?: any) => {
  resolver = cb ? (data: any) => new Promise((resolve) => resolve(cb(data))) : null
  return resolver
}

// Providers
provide(ModalProviderKey, {
  show: (c, params) => {
    props.value = params?.props
    onShow(c)

    const API = {
      onClose: (cb?: any) => {
        setResolver(closeResolver, cb)
        return API
      },
      onOk: (cb?: any) => {
        setResolver(okResolver, cb)
        return API
      },
      onDismiss: (cb?: any) => {
        setResolver(closeResolver, cb)
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
