<script setup lang="ts">
const title = 'Rollbox - заказ роллов и суши по низким ценам в Астрахани'
const description =
  'Rollbox - доставка роллов и суши в городе Астрахань. Суши, пицца, роллы, шаурма - быстрая доставка и высокое качество.'

useHead(() => ({
  title,
  htmlAttrs: {
    lang: 'ru',
  },
}))

const host = useHost()

useSeoMeta({
  title: title,
  ogTitle: title,
  description: description,
  ogDescription: description,
  ogImage: `https://${host}/preview.jpg`,
  twitterImage: `https://${host}/preview.jpg`,
  twitterCard: 'summary_large_image',
})

useSchemaOrg([
  defineOrganization({
    name: 'Rollbox',
    logo: '/logo.svg',
    //sameAs: ['instagram_url'],
  }),
  defineWebSite({
    name: 'Rollbox',
  }),
])
</script>

<template>
  <Header />
  <slot />
</template>
