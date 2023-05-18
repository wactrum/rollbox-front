<template>
  <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <img class="mx-auto h-10 w-auto" src="/logo.svg" alt="Your Company" />
      <h2 class="mt-8 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
        Войдите в ваш аккаунт
      </h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form class="space-y-6">
        <div>
          <label for="email" class="block text-sm font-medium leading-6 text-gray-900">
            Телефон
          </label>
          <div class="relative mt-2 rounded-md">
            <InputField
              id="phone"
              v-mask
              :field="phoneField"
              name="phone"
              type="tel"
              data-maska="(###) ###-##-##"
              autocomplete="phone"
              class="pl-8 outline-none focus:border-orange-500 flex-1 block w-full sm:text-sm border border-gray-300"
            >
              <template #label>
                <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <span>+7</span>
                </div>
              </template>
            </InputField>
          </div>
        </div>

        <div>
          <div class="flex items-center justify-between">
            <label for="password" class="block text-sm font-medium leading-6 text-gray-900">
              Пароль
            </label>
            <div class="text-sm">
              <a href="#" class="font-semibold text-orange-600 hover:text-orange-500"
                >Забыли пароль?</a
              >
            </div>
          </div>
          <div class="mt-2">
            <InputField
              id="password"
              :field="passwordField"
              name="password"
              type="password"
              autocomplete="phone"
              class="outline-none focus:border-orange-500 flex-1 block w-full sm:text-sm border border-gray-300"
            />
          </div>
        </div>

        <div>
          <button
            type="button"
            class="flex w-full justify-center rounded-md bg-orange-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
            @click="onSubmit"
          >
            Войти
          </button>
        </div>
      </form>

      <p class="mt-10 text-center text-sm text-gray-500">
        <a href="#" class="font-semibold leading-6 text-orange-600 hover:text-orange-500"
          >Еще не зарегистрированы?</a
        >
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import * as yup from 'yup'
import { ISignForm } from '~/stores/useUserStore'

definePageMeta({
  layout: 'auth',
  middleware: ['guest'],
})

const { signIn } = useUserStore()

const { useField, onSubmit } = useForm<ISignForm>({
  formParams: {
    initialValues: {
      phone: '9965046432',
      password: 'secre',
    },
    validationSchema: {
      phone: yup
        .string()
        .matches(/^\(\d{3}\) \d{3}-\d{2}-\d{2}$/, 'Некорректный номер телефона')
        .required(),
      password: yup.string().required().min(4),
    },
  },
  params: {
    submitMethod: async (data) => {
      const number = data.phone.replace(/\D/g, '')
      const phone = `+7${number}`
      await signIn(phone, data.password)
    },
    onError: (error, ctx) => {
      if (error.statusCode === 401) {
        phoneField.setErrors('Неправильный номер телефона или пароль')
        return
      }

      ctx.defaults.onError(error)
    },
    onSuccess: async () => {
      await navigateTo({ name: 'index' })
    },
  },
})

const phoneField = useField('phone')
const passwordField = useField('password')
</script>
