<script setup lang="ts">
useHead(() => ({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} - RollBox` : 'RollBox'
  },
}))
</script>

<template>
  <div class="flex w-full h-full min-h-[100vh] items-center justify-center">
    <slot />
  </div>
</template>
