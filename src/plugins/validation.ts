import { setLocale } from 'yup'

export default defineNuxtPlugin(() => {
  setLocale({
    mixed: {
      required: 'Поле обязательно для заполнения',
      notType: function notType(_ref) {
        switch (_ref.type) {
          case 'number':
            return 'Поле должно быть цифровым значением'
          case 'string':
            return 'Поле должно быть строкой'
          default:
            return 'Неверный тип поля'
        }
      },
    },
    string: {
      email: 'Некорректный Email адрес',
      min: (params) => `Не менее ${params.min} символов`,
    },
    number: {
      positive: 'Поле должно быть положительным числом',
      integer: 'Поле должно быть целым числом',
    },
  })
})
