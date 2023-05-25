import {
  useDebounceFn,
  useIntersectionObserver,
  UseIntersectionObserverReturn,
  useMouse,
} from '@vueuse/core'
import { ICategory } from '~/domain/product'

/**
 * Вспомогательная функция для динамичной прокрутки верхнего меню в зависимости от текущей категории
 */
export default function () {
  const activeCategory = ref<null | number>(null)
  const categoriesButtonsRef = ref<{ categoryId: number; el: HTMLElement }[]>([])
  const { sourceType } = useMouse()
  let observers: UseIntersectionObserverReturn[] = []

  const categoriesRef = ref<{ categoryId: number; el: HTMLElement }[]>([])
  const setCategoryRef = (el: HTMLElement, category: ICategory) => {
    categoriesRef.value.push({
      el,
      categoryId: category.id,
    })
  }

  const setCategoryButtonsRef = (el: HTMLElement, category: ICategory) => {
    categoriesButtonsRef.value.push({
      el,
      categoryId: category.id,
    })
  }

  const scrollToActive = useDebounceFn(() => {
    const menuItem = categoriesButtonsRef.value.find((el) => el.categoryId === activeCategory.value)
    if (menuItem) {
      const parentElement = menuItem.el.parentElement
      const rect = menuItem.el.getBoundingClientRect()
      if (!parentElement) return
      const parentElementRect = parentElement.getBoundingClientRect()
      const isVisible = rect.left >= parentElementRect.left && rect.right <= parentElementRect.right

      if (!isVisible) {
        menuItem.el.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
          inline: 'center',
        })
      }
    }
  }, 1000)

  /**
   * Если было пересечение центром видимой области,
   * устанавливаем активную категорию и скролим верхнее меню до нее
   */
  const startObserve = () => {
    for (const categoryRef of categoriesRef.value) {
      observers.push(
        useIntersectionObserver(
          categoryRef.el,
          async ([{ isIntersecting }]) => {
            if (isIntersecting) {
              activeCategory.value = categoryRef.categoryId
              await scrollToActive()
            }
          },
          {
            rootMargin: '-50% 0% -50% 0%',
            threshold: 0,
          }
        )
      )
    }
  }

  const stopObserve = () => {
    for (const observer of observers) {
      observer.stop()
    }

    observers = []
  }

  const onHover = (category: ICategory) => {
    activeCategory.value = category.id
  }

  return {
    activeCategory,
    setCategoryRef,
    setCategoryButtonsRef,
    onHover,
  }
}
