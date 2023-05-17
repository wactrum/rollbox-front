<script setup lang="ts">
/**
 * Нотификации для приложения, параметры можно кастомизировать
 * (duration, position, icon...)
 */
import { NotificationProviderKey } from '~/components/notification/types'

let notificationText = ref<string>()
let isNotificationShow = ref(false)

provide(NotificationProviderKey, {
  show: (text) => {
    notificationText.value = text
    isNotificationShow.value = true

    setTimeout(() => {
      isNotificationShow.value = false
    }, 2000)
  },
})
</script>

<template>
  <div>
    <slot />

    <div class="absolute top-3 right-0 z-10 flex w-[85%] justify-end">
      <AnimateTransition enter-name="slideInRight" out-name="fadeOut" speed="fast">
        <div v-if="isNotificationShow" class="h-10 w-full px-4">
          <div
            class="flex h-full flex-1 items-center justify-center rounded-2xl bg-purple-linear px-4 py-3.5"
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
  </div>
</template>

<style scoped></style>
