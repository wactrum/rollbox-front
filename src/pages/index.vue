<template>
  <div>{{ user }}</div>
  <div>{{ roles }}</div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: ['auth'],
})

const { getCurrent } = useUserStore()
const { data: user } = await getCurrent({
  asyncDataOptions: {
    server: false,
  },
})
const { data: roles } = await useAsyncApi('/roles')
</script>
