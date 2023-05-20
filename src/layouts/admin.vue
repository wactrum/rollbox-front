<template>
  <div class="h-screen flex">
    <TransitionRoot as="template" :show="sidebarOpen">
      <Dialog as="div" class="fixed inset-0 flex z-40 lg:hidden" @close="sidebarOpen = false">
        <TransitionChild
          as="template"
          enter="transition-opacity ease-linear duration-300"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <DialogOverlay class="fixed inset-0 bg-gray-600 bg-opacity-75" />
        </TransitionChild>
        <TransitionChild
          as="template"
          enter="transition ease-in-out duration-300 transform"
          enter-from="-translate-x-full"
          enter-to="translate-x-0"
          leave="transition ease-in-out duration-300 transform"
          leave-from="translate-x-0"
          leave-to="-translate-x-full"
        >
          <div class="relative flex-1 flex flex-col max-w-xs w-full bg-white focus:outline-none">
            <TransitionChild
              as="template"
              enter="ease-in-out duration-300"
              enter-from="opacity-0"
              enter-to="opacity-100"
              leave="ease-in-out duration-300"
              leave-from="opacity-100"
              leave-to="opacity-0"
            >
              <div class="absolute top-0 right-0 -mr-12 pt-2">
                <button
                  type="button"
                  class="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                  @click="sidebarOpen = false"
                >
                  <span class="sr-only">Close sidebar</span>
                  <XIcon class="h-6 w-6 text-white" aria-hidden="true" />
                </button>
              </div>
            </TransitionChild>
            <div class="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
              <div class="flex-shrink-0 flex items-center px-4">
                <div class="flex gap-2 items-center">
                  <img class="h-8 w-auto" src="/logo.svg" alt="Workflow" />
                  <p class="text-xl">Rollbox</p>
                </div>
              </div>
              <nav aria-label="Sidebar" class="mt-5">
                <div class="px-2 space-y-1">
                  <NuxtLink
                    v-for="item in navigation"
                    :key="item.name"
                    :to="item.to"
                    active-class="bg-gray-100 text-gray-900"
                    :class="[
                      'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                      'group flex items-center px-2 py-2 text-base font-medium rounded-md',
                    ]"
                    @click="sidebarOpen = false"
                  >
                    <component
                      :is="item.icon"
                      :class="[
                        item.current ? 'text-gray-500' : 'text-gray-400 group-hover:text-gray-500',
                        'mr-4 h-6 w-6',
                      ]"
                      aria-hidden="true"
                    />
                    {{ item.name }}
                  </NuxtLink>
                </div>
              </nav>
            </div>
          </div>
        </TransitionChild>
        <div class="flex-shrink-0 w-14" aria-hidden="true">
          <!-- Force sidebar to shrink to fit close icon -->
        </div>
      </Dialog>
    </TransitionRoot>

    <!-- Static sidebar for desktop -->
    <div class="hidden lg:flex lg:flex-shrink-0">
      <div class="flex flex-col w-64">
        <!-- Sidebar component, swap this element with another sidebar if you like -->
        <div class="flex-1 flex flex-col min-h-0 border-r border-gray-200 bg-gray-100">
          <div class="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
            <div class="flex items-center flex-shrink-0 px-4">
              <img src="/logo.svg" class="w-8 h-8" />
              <p class="text-xl ml-2">Rollbox</p>
            </div>
            <nav class="mt-5 flex-1" aria-label="Sidebar">
              <div class="px-2 space-y-1">
                <NuxtLink
                  v-for="item in navigation"
                  :key="item.name"
                  :to="item.to"
                  active-class="bg-gray-200 text-gray-900"
                  :class="[
                    'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                    'group flex items-center px-2 py-2 text-sm font-medium rounded-md',
                  ]"
                >
                  <component
                    :is="item.icon"
                    :class="[
                      item.current ? 'text-gray-500' : 'text-gray-400 group-hover:text-gray-500',
                      'mr-3 h-6 w-6',
                    ]"
                    aria-hidden="true"
                  />
                  {{ item.name }}
                </NuxtLink>
              </div>
            </nav>
          </div>
          <div class="flex-shrink-0 flex border-t border-gray-200 p-4">
            <button
              type="button"
              class="flex gap-3 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
            >
              <ArrowLeftOnRectangleIcon class="h-6 w-6" aria-hidden="true" />
              Выйти
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="flex flex-col min-w-0 flex-1 overflow-hidden">
      <div class="lg:hidden">
        <div
          class="flex items-center justify-between bg-gray-50 border-b border-gray-200 px-4 py-1.5"
        >
          <div class="flex gap-2 items-center">
            <img class="h-8 w-auto" src="/logo.svg" alt="Workflow" />
            <p class="text-xl">Rollbox</p>
          </div>
          <div>
            <button
              type="button"
              class="-mr-3 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900"
              @click="sidebarOpen = true"
            >
              <span class="sr-only">Open sidebar</span>
              <MenuIcon class="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
      <div class="flex-1 relative z-0 flex overflow-hidden max-h-screen">
        <main class="flex-1 relative z-0 py-6 overflow-hidden px-4">
          <slot />
        </main>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Dialog, DialogOverlay, TransitionChild, TransitionRoot } from '@headlessui/vue'
import {
  HomeIcon,
  ListBulletIcon,
  CubeIcon,
  Bars4Icon as MenuIcon,
  XMarkIcon as XIcon,
  InboxArrowDownIcon,
  UserGroupIcon,
  ShieldCheckIcon,
} from '@heroicons/vue/24/outline'
import { ArrowLeftOnRectangleIcon } from '@heroicons/vue/24/solid'

const navigation = [
  { name: 'Главная', to: { name: 'admin' }, icon: HomeIcon, current: true },
  { name: 'Категории', to: { name: 'admin-categories' }, icon: ListBulletIcon, current: false },
  { name: 'Продукты', to: { name: 'admin-products' }, icon: CubeIcon, current: false },
  { name: 'Заказы', to: { name: 'admin-orders' }, icon: InboxArrowDownIcon, current: false },
  { name: 'Пользователи', to: { name: 'admin-users' }, icon: UserGroupIcon, current: false },
  { name: 'Роли', to: { name: 'admin-roles' }, icon: ShieldCheckIcon, current: false },
]

const sidebarOpen = ref(false)
</script>

<style lang="scss">
.apexcharts-legend-text {
  font-size: 24px;
}
</style>
