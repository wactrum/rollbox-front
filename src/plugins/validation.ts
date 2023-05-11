import { setLocale } from 'yup'

export default defineNuxtPlugin(() => {
  setLocale({
    mixed: {
      required: 'Поле обязательно для заполнения',
    },
    string: {
      email: 'Некорректный Email адрес',
      min: (params) => `Не менее ${params.min} символов`,
    },
  })
})
