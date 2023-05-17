import { InjectionKey } from 'vue'

interface NotificationProvider {
  show(text: string): void
}

export const NotificationProviderKey = Symbol() as InjectionKey<NotificationProvider>
