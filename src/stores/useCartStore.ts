import { useSessionStorage } from '@vueuse/core'
import { ICart, IProductOnCart } from 'domain/cart'

const serializer = {
  read: (v: any) => (v ? JSON.parse(v) : null),
  write: (v: any) => JSON.stringify(v),
}

export default defineStore('cart', () => {
  const userCart = useSessionStorage<ICart | null>('cart', () => null, { serializer })

  const getQuantityInCart = (id: number) =>
    userCart?.value?.products?.find((el) => el.productId === id)?.quantity

  const syncUserCart = async () => {
    userCart.value = await useApi<ICart>('/cart')
  }

  const addToCart = async (productId: number) => {
    const data = await useApi<IProductOnCart>('/cart/add', {
      body: {
        productId,
      },
      method: 'POST',
    })

    const product = userCart.value?.products.find((el) => el.productId === productId)

    if (userCart.value && product) {
      if (product?.quantity === 20) {
        return
      } else {
        product.quantity = product?.quantity + 1
      }
    } else if (userCart.value) {
      userCart.value.products.push(data)
    }

    return data
  }

  const deleteFromCart = async (productId: number) => {
    const data = await useApi(`/cart/product/${productId}`, {
      method: 'DELETE',
    })

    const product = userCart.value?.products.find((el) => el.productId === productId)

    if (userCart.value && product) {
      if (product?.quantity === 1) {
        userCart.value.products = userCart.value?.products.filter(
          (el) => el.productId !== productId
        )
      } else {
        product.quantity = product?.quantity - 1
      }
    }

    return data
  }

  return {
    syncUserCart,
    userCart,
    getQuantityInCart,
    addToCart,
    deleteFromCart,
  }
})
