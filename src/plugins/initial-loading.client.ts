/**
 * Загрузка первоначальных данных при запуске сервиса
 */
export default defineNuxtPlugin(async () => {
  try {
    const { isAuthorized } = useUserStore()
    const { syncUserCart } = useCartStore()
    if (isAuthorized) {
      await Promise.all([syncUserCart()])
    }
  } catch (e) {
    console.error(e)
  }
})
