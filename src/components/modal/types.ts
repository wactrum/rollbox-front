import { InjectionKey } from 'vue'
import { Component } from 'vue'

export interface IShowParams {
  props: any
}

export interface IShowCallback {
  onClose: (cb?: (data: any) => void) => IShowCallback
  onOk: (cb?: (data: any) => void) => IShowCallback
  onDismiss: (cb?: (data: any) => void) => IShowCallback
}

interface IModalProvider {
  show(component: Component | Promise<Component>, params?: IShowParams): IShowCallback
}

export interface IModalActionsProvider {
  onOk: (data?: any) => void
  onClose: (data?: any) => void
  onDismiss: (data?: any) => void
}

export const ModalProviderKey = Symbol() as InjectionKey<IModalProvider>
export const ModalActionsProviderKey = Symbol() as InjectionKey<IModalActionsProvider>
