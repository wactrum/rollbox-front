<script setup lang="ts">
const title = 'RollBox - заказ роллов и суши по низким ценам в Астрахани'
const description =
  'RollBox - доставка роллов и суши в городе Астрахань. Суши, пицца, роллы, шаурма - быстрая доставка и высокое качество.'

useHead(() => ({
  title,
  htmlAttrs: {
    lang: 'ru',
  },
}))

useSeoMeta({
  title: title,
  ogTitle: title,
  description: description,
  ogDescription: description,
  ogImage: ``,
  twitterCard: 'summary_large_image',
})
</script>

<template>
  <Header />
  <slot />
</template>
