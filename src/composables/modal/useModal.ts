import { Component } from 'vue'
import {
  IModalActionsProvider,
  ModalActionsProviderKey,
  ModalProviderKey,
  IShowParams,
} from '~/components/modal/types'

export default function () {
  const modalProviderInjection = inject(ModalProviderKey, null)

  const showModal = (component: Component | Promise<Component>, params?: IShowParams) => {
    if (!modalProviderInjection) {
      throw Error('Not found ModalProvider')
    }

    return modalProviderInjection.show(component, params)
  }

  return {
    showModal,
  }
}

export function useModalActions(): IModalActionsProvider {
  const actions = inject(ModalActionsProviderKey, null)

  if (!actions) {
    throw Error('Not found ModalActionsProvider')
  }

  return actions
}
