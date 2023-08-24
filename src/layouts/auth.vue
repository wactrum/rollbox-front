<script setup lang="ts">
useHead(() => ({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} - Rollbox` : 'Rollbox'
  },
}))
</script>

<template>
  <div class="flex w-full h-full min-h-[100vh] items-center justify-center">
    <slot />
  </div>
</template>
