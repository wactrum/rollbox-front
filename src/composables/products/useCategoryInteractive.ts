import { ICategory } from '~/domain/product'
import { UseIntersectionObserverReturn, useIntersectionObserver } from '@vueuse/core'

/**
 * Вспомогательная функция для динамичной прокрутки верхнего меню в зависимости от текущей категории
 *
 * @DOCS
 * categoriesButtonsRef - кнопки категорий в шапке
 * categoriesRef - блоки категорий на странице
 *
 * Каждая категория в categoriesRef имеет IntersectionObserver
 * который сделает эту категорию активной в случае если эта категория сейчас находится по центру экрана
 * после чего происходит центрование этой же категории в шапке (navRef) cм. scrollToElement
 */
export default function (navRef: Ref<HTMLElement | undefined>) {
  const activeCategory = ref<null | number>(null)
  const categoriesButtonsRef = ref<{ categoryId: number; el: HTMLElement }[]>([])
  const isScrolling = ref(false)

  const categoriesRef = shallowRef<
    { categoryId: number; el: HTMLElement; iobserver: UseIntersectionObserverReturn }[]
  >([])

  const scrollToElement = (el: HTMLElement) => {
    const navWidth = navRef.value?.clientWidth || 0
    const elementWidth = el.clientWidth
    const centerOffset = (navWidth - elementWidth) / 2

    const scrollFunc = () => {
      navRef.value?.scrollTo({
        left: el.offsetLeft - centerOffset,
        behavior: 'smooth',
      })
    }

    requestAnimationFrame(scrollFunc)
  }

  const setCategoryRef = (el: HTMLElement, category: ICategory) => {
    categoriesRef.value.push({
      el,
      categoryId: category.id,
      iobserver: useIntersectionObserver(
        el,
        ([{ isIntersecting }]) => {
          if (isIntersecting && !isScrolling.value) {
            activeCategory.value = category.id

            const headerBtn = categoriesButtonsRef.value.find((el) => el.categoryId === category.id)
            headerBtn && scrollToElement(headerBtn.el)
          }
        },
        {
          rootMargin: '-50% 0% -50% 0%',
          threshold: 0,
        }
      ),
    })
  }

  const setCategoryButtonsRef = (el: HTMLElement, category: ICategory) => {
    categoriesButtonsRef.value.push({
      el,
      categoryId: category.id,
    })
  }
  const onHover = (category: ICategory) => {
    activeCategory.value = category.id
  }

  const onHeaderCategoryClick = (item: ICategory) => {
    const domItem = categoriesRef.value.find((el) => el.categoryId === item.id)
    isScrolling.value = true
    domItem?.el?.scrollIntoView({
      behavior: 'smooth',
    })
    setTimeout(() => (isScrolling.value = false), 1500)
  }

  return {
    activeCategory,
    setCategoryRef,
    setCategoryButtonsRef,
    onHover,
    onHeaderCategoryClick,
  }
}
