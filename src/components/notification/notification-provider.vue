<script setup lang="ts">
/**
 * Нотификации для приложения, параметры можно кастомизировать
 */
import { NotificationProviderKey } from '~/components/notification/types'

let notificationText = ref<string>()
let isNotificationShow = ref(false)
let type = ref<'info' | 'error' | 'success'>('info')

const colors = {
  error: 'bg-red-400',
  info: 'bg-indigo-400',
  success: 'bg-green-400',
}

provide(NotificationProviderKey, {
  show: (text, options) => {
    if (options?.type) {
      type.value = options.type
    }
    notificationText.value = text
    isNotificationShow.value = true

    setTimeout(() => {
      isNotificationShow.value = false
    }, 2000)

    setTimeout(() => {
      type.value = 'info'
    }, 3000)
  },
})
</script>

<template>
  <div>
    <slot />

    <ClientOnly>
      <div class="absolute top-3 right-0 z-20 flex w-[85%] justify-end">
        <AnimateTransition enter-name="slideInRight" out-name="fadeOut" speed="faster">
          <div v-show="isNotificationShow" class="h-10 px-4">
            <div
              :class="colors[type]"
              class="flex h-full flex-1 items-center justify-center rounded-2xl px-4 py-3.5"
            >
              <div class="flex h-full flex-1 items-center justify-center">
                <p class="text-md text-right leading-none text-white">
                  {{ notificationText }}
                </p>
              </div>
            </div>
          </div>
        </AnimateTransition>
      </div>
    </ClientOnly>
  </div>
</template>

<style scoped></style>
