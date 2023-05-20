import {
  FieldContext,
  FieldOptions,
  FormOptions,
  RuleExpression,
  useField,
  useForm,
  FormContext,
  Path,
} from 'vee-validate'
import type { MaybeRef } from '@vueuse/core'
import { FetchError } from 'ofetch'
import { Errors } from '~/composables/form/errors'

export default <
  SubmitValues extends Record<string, any>,
  ReturnValues = SubmitValues,
  ErrorType extends FetchError<any> = FetchError<any>
>(
  options: IUseFormOptions<SubmitValues, ReturnValues, ErrorType>
) => {
  const { formParams, params } = options

  const pluckData = (data: any) => pluckValues(data, Object.keys(formParams.validationSchema ?? {}))

  const form = useForm<SubmitValues>({
    ...formParams,
    initialValues: params.pluckData
      ? pluckData(formParams.initialValues)
      : formParams.initialValues,
  })

  const fields = Object.fromEntries(
    Object.keys(formParams.validationSchema).map((el) => [el, useField(el)])
  )

  const { handleSubmit, meta, setErrors, setTouched, resetForm } = form

  const defaults: IDefaults<SubmitValues, ReturnValues, ErrorType> = {
    onError: (error: ErrorType) => {
      if (error.response?._data.message && Array.isArray(error.response._data.message)) {
        const errors = error.response?._data.message.reduce(
          (result: { [x: string]: any[] }, item: { key: string | number; errors: any }) => {
            result[item.key] = Object.keys(item.errors).map((key) => {
              return Errors[key] || Errors.base
            })
            return result
          },
          {}
        )
        setErrors(errors)
      } else {
        console.error(`[useForm] необработанная ошибка ${error}`)
      }
    },

    onReset: (data: ReturnValues | SubmitValues) => {
      resetForm({
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        values: (params.pluckData ? pluckData(data) : data) as SubmitValues,
      })
    },
  }

  const onError = (
    error: ErrorType,
    ctx: IUseFormMethodsContext<SubmitValues, ReturnValues, ErrorType>
  ) => {
    const method = params.onError ?? defaults.onError
    method(error, ctx)
  }
  const onReset = params.onReset ?? defaults.onReset

  const ctx: IUseFormMethodsContext<SubmitValues, ReturnValues, ErrorType> = {
    form,
    defaults,
  }

  const onSubmit = handleSubmit.withControlled(async (values) => {
    if (meta.value.valid && meta.value.dirty) {
      try {
        if (params.sendModifiedOnly) {
          const changedFields = Object.keys(values).filter((el) => fields[el].meta.dirty)
          values = pluckValues(values, changedFields)
        }

        const data = await params.submitMethod(values)

        params.onSuccess && params.onSuccess(data ?? null, ctx)

        if (data) {
          onReset(data, ctx)
        }
      } catch (err) {
        if (err instanceof TypeError) {
          console.error(
            `[useForm] использование в форме значений не определенных в схеме валидации - ${err.message}`
          )
        } else {
          onError(err as ErrorType, ctx)
        }
      }
    }
  })

  const useFormField = <T = unknown>(
    name: MaybeRef<keyof SubmitValues | string>,
    rules?: MaybeRef<RuleExpression<T>>,
    opts?: Partial<FieldOptions<T>>
  ): FieldContext<T> => useField(name as string, rules, opts)

  return {
    form,
    onSubmit,
    useField: useFormField,
  }
}

function pluckValues(obj: any, values: string[]): any {
  return Object.fromEntries(Object.entries(obj ?? {}).filter(([key]) => values.includes(key)))
}

// TYPES
export interface IUseFormMethodsContext<
  SubmitValues extends Record<string, any>,
  ReturnValues = SubmitValues,
  ErrorType extends FetchError<any> = FetchError<any>
> {
  form: FormContext<SubmitValues>
  defaults: IDefaults<SubmitValues, ReturnValues, ErrorType>
}

interface IDefaults<
  SubmitValues extends Record<string, any>,
  ReturnValues = SubmitValues,
  ErrorType extends FetchError<any> = FetchError<any>
> {
  onError: (error: ErrorType) => void
  onReset: (data: SubmitValues | ReturnValues) => void
}

interface IFormOptions<TValues extends Record<string, any>> extends FormOptions<TValues> {
  initialValues?: Record<keyof TValues, any> | any | undefined
}

export interface IUseFormOptionsParams<
  SubmitValues extends Record<string, any>,
  ReturnValues = SubmitValues,
  ErrorType extends FetchError<any> = FetchError<any>
> {
  /**
   * Method to be executed when the form is submitted
   * @param params
   */
  submitMethod: (params: SubmitValues) => Promise<ReturnValues | null | void>
  /**
   * Actions on Success
   * @param params
   * @param ctx
   */
  onSuccess?: (
    params: ReturnValues | null,
    ctx: IUseFormMethodsContext<SubmitValues, ReturnValues, ErrorType>
  ) => void
  /**
   * Actions on Errors
   * @param error
   * @param ctx
   */
  onError?: (
    error: ErrorType,
    ctx: IUseFormMethodsContext<SubmitValues, ReturnValues, ErrorType>
  ) => void
  /**
   * Method describing the behavior of the form after a successful submission
   * If not passed, the form is filled with results
   * @param params - результат submitMethod
   * @param ctx
   */
  onReset?: (
    params: ReturnValues,
    ctx: IUseFormMethodsContext<SubmitValues, ReturnValues, ErrorType>
  ) => void
  /**
   * Notification text on successful form submission
   * @deprecated and depends on your logic
   */
  successMessage?: string
  /**
   * Whether to remove from the data formParams.initialData and from the result of submitMethod - values,
   * which are not described in formParams.validationSchema
   */
  pluckData?: boolean
  /**
   * Whether to pass to submitMethod only those fields whose values do not match the original
   * TypeScript does not yet know how to understand this,
   * and will consider that all data goes to submitMethod
   */
  sendModifiedOnly?: boolean
}

export interface IUseFormOptions<
  SubmitValues extends Record<string, any>,
  ReturnValues = SubmitValues,
  ErrorType extends FetchError<any> = FetchError<any>
> {
  params: IUseFormOptionsParams<SubmitValues, ReturnValues, ErrorType>
  formParams: IFormOptions<SubmitValues>
}
