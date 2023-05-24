<script setup lang="ts">
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from '@headlessui/vue'
import {
  ShoppingCartIcon,
  RectangleStackIcon,
  UserIcon,
  ArrowLeftOnRectangleIcon,
  HomeIcon,
} from '@heroicons/vue/24/solid'
import {
  Bars4Icon as MenuIcon,
  XMarkIcon as XIcon,
  ListBulletIcon,
} from '@heroicons/vue/24/outline'

const { isAuthorized, logOut } = useUserStore()

const search = useState('search')

const onLogout = async () => {
  await logOut()
  await navigateTo({ name: 'auth-sign-in' })
}
</script>

<template>
  <Disclosure v-slot="{ open }" as="nav" class="bg-white fixed w-full z-20">
    <div class="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 sticky">
      <div class="flex justify-between h-16">
        <div class="flex px-2 lg:px-0">
          <div class="flex-shrink-0 flex items-center">
            <img src="/logo.svg" alt="" class="w-8 h-8" />
          </div>
          <div class="hidden lg:ml-6 lg:flex lg:space-x-8">
            <!-- Current: "border-orange-500 text-gray-900", Default: "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700" -->
            <a
              href="#"
              class="border-orange-500 text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
            >
              Каталог
            </a>
            <a
              href="#"
              class="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
            >
              Корзина
            </a>
            <a
              v-if="isAuthorized"
              href="#"
              class="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
            >
              Заказы
            </a>
          </div>
        </div>
        <div class="flex-1 flex items-center justify-center px-2 lg:ml-6 lg:justify-end">
          <div class="max-w-lg w-full lg:max-w-xs">
            <InputSearch v-model="search" />
          </div>
        </div>
        <div class="flex items-center lg:hidden">
          <!-- Mobile menu button -->
          <DisclosureButton
            v-if="isAuthorized"
            class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-orange-500"
          >
            <span class="sr-only">Открыть меню</span>
            <MenuIcon v-if="!open" class="block h-6 w-6" aria-hidden="true" />
            <XIcon v-else class="block h-6 w-6" aria-hidden="true" />
          </DisclosureButton>
          <NuxtLink
            v-else
            :to="{ name: 'auth-sign-in' }"
            type="button"
            class="inline-flex items-center px-3.5 py-2 border border-transparent text-xs font-medium rounded-full shadow-sm text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
          >
            Войти
          </NuxtLink>
        </div>
        <div class="hidden lg:ml-2 lg:flex lg:items-center">
          <!-- Profile dropdown -->
          <Menu v-if="isAuthorized" as="div" class="ml-4 relative flex-shrink-0">
            <div>
              <MenuButton
                class="bg-white rounded-full flex text-sm focus:outline-none transition duration-300 focus:ring-2 focus:ring-offset-2 focus:ring-orange-300"
              >
                <span class="sr-only">Открыть меню пользователя</span>
                <UserIcon class="text-gray-400 h-6 w-6" />
              </MenuButton>
            </div>
            <transition
              enter-active-class="transition ease-out duration-100"
              enter-from-class="transform opacity-0 scale-95"
              enter-to-class="transform opacity-100 scale-100"
              leave-active-class="transition ease-in duration-75"
              leave-from-class="transform opacity-100 scale-100"
              leave-to-class="transform opacity-0 scale-95"
            >
              <MenuItems
                class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
              >
                <MenuItem v-slot="{ active }">
                  <a
                    href="#"
                    :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700']"
                    >Профиль</a
                  >
                </MenuItem>
                <MenuItem v-slot="{ active }">
                  <a
                    href="#"
                    :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700']"
                    >Адреса доставки</a
                  >
                </MenuItem>
                <MenuItem v-slot="{ active }">
                  <button
                    :class="[
                      active ? 'bg-gray-100' : '',
                      'w-full text-left block px-4 py-2 text-sm text-gray-700',
                    ]"
                    @click="onLogout"
                  >
                    Выйти
                  </button>
                </MenuItem>
              </MenuItems>
            </transition>
          </Menu>
          <NuxtLink
            v-else
            :to="{ name: 'auth-sign-in' }"
            type="button"
            class="inline-flex items-center px-3.5 py-2 border border-transparent text-xs font-medium rounded-full shadow-sm text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
          >
            Войти
          </NuxtLink>
        </div>
      </div>
    </div>

    <Transition
      enter-active-class="transition duration-100 ease-out"
      enter-from-class="transform scale-95 opacity-0"
      enter-to-class="transform scale-100 opacity-100"
      leave-active-class="transition duration-75 ease-out"
      leave-from-class="transform scale-100 opacity-100"
      leave-to-class="transform scale-95 opacity-0"
    >
      <DisclosurePanel class="lg:hidden shadow-bottom">
        <div class="pt-2 pb-3 space-y-1">
          <!-- Current: "bg-orange-50 border-orange-500 text-orange-700", Default: "border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800" -->
          <DisclosureButton
            as="a"
            href="#"
            class="bg-orange-50 border-orange-500 text-orange-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
          >
            <div class="flex gap-3 items-center">
              <ListBulletIcon class="h-6 w-6" aria-hidden="true" />
              Каталог
            </div>
          </DisclosureButton>
          <DisclosureButton
            as="a"
            href="#"
            class="border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
          >
            <div class="flex gap-3 items-center">
              <ShoppingCartIcon class="h-6 w-6" aria-hidden="true" />
              Корзина
            </div>
          </DisclosureButton>
          <DisclosureButton
            as="a"
            href="#"
            class="border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
          >
            <div class="flex gap-3 items-center">
              <RectangleStackIcon class="h-6 w-6" aria-hidden="true" />
              Заказы
            </div>
          </DisclosureButton>
        </div>
        <div class="pb-3 border-t border-gray-200">
          <div class="space-y-1">
            <DisclosureButton
              as="a"
              href="#"
              class="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
            >
              <div class="flex gap-3 items-center">
                <UserIcon class="h-6 w-6" aria-hidden="true" />
                Профиль
              </div>
            </DisclosureButton>
            <DisclosureButton
              as="a"
              href="#"
              class="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
            >
              <div class="flex gap-3 items-center">
                <HomeIcon class="h-6 w-6" aria-hidden="true" />
                Адреса доставки
              </div>
            </DisclosureButton>
            <DisclosureButton
              as="button"
              class="block w-full px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
              @click="onLogout"
            >
              <div class="flex gap-3 items-center">
                <ArrowLeftOnRectangleIcon class="h-6 w-6" aria-hidden="true" />
                Выйти
              </div>
            </DisclosureButton>
          </div>
        </div>
      </DisclosurePanel>
    </Transition>
  </Disclosure>
</template>
