import { ICategory } from '~/domain/product'

export default function (categories: Ref<ICategory[] | null>) {
  const img = useImage()

  const products = categories.value?.flatMap((category) => {
    return category.products?.map((product) => {
      return {
        '@type': 'Product',
        name: product.name,
        description: product.description,
        offers: {
          '@type': 'Offer',
          price: product.price,
          priceCurrency: 'RUB',
        },
        image: product?.productImage?.path && img(product?.productImage?.path),
      }
    })
  })

  useSchemaOrg([...(products ?? [])])
}
