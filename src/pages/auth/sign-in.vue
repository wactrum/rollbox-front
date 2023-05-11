<template>
  <form class="flex flex-col gap-5 w-52">
    <InputField :field="emailField" label="Email" />
    <InputField :field="passwordField" type="password" label="Пароль" />

    <button
      type="button"
      class="bg-sky-500 dark:bg-sky-500 text-white p-2 rounded-lg"
      @click="onSubmit"
    >
      Войти
    </button>
  </form>
</template>

<script setup lang="ts">
import * as yup from 'yup'
import { ISignForm } from '~/stores/useUserStore'
import type { FetchError } from 'ofetch'

definePageMeta({
  layout: 'auth',
  middleware: ['guest'],
})

const { signIn } = useUserStore()

const { useField, onSubmit } = useForm<ISignForm>({
  formParams: {
    initialValues: {
      email: 'patlakh.sergey@gmail.com',
      password: 'secre',
    },
    validationSchema: {
      email: yup.string().required().email(),
      password: yup.string().required().min(4),
    },
  },
  params: {
    submitMethod: async (data) => {
      await signIn(data.email, data.password)
    },
    onSuccess: async () => {
      await navigateTo({ name: 'index' })
    },
    onError: async (error: FetchError) => {
      if (error.status === 401) {
        emailField.setErrors('Неправильная почта или пароль')
      }
    },
  },
})

const emailField = useField('email')
const passwordField = useField('password')
</script>
