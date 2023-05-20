import { InjectionKey } from 'vue'

export interface IShowNotificationOptions {
  type: 'error' | 'info' | 'success'
}

interface NotificationProvider {
  show(text: string, options?: IShowNotificationOptions): void
}

export const NotificationProviderKey = Symbol() as InjectionKey<NotificationProvider>
