<script lang="ts" setup>
/**
 * Wrapper on base Vue transition and use Animate.css
 */

import { Transition, TransitionGroup, TransitionProps } from 'vue'

interface Props extends TransitionProps {
  group?: boolean
  enterName?: string
  outName?: string
  speed?: 'slow' | 'slower' | 'fast' | 'faster'
  withoutLeave?: boolean
  withoutEnter?: boolean
}

const props = defineProps<Props>()

const {
  enterName = 'fadeIn',
  outName = 'fadeOut',
  speed = 'faster',
  withoutEnter = false,
  withoutLeave = false,
} = toRefs(props)

const enterActiveClass = computed(() =>
  withoutEnter ? '' : `animate__animated animate__${speed} animate__${enterName}`
)

const leaveActiveClass = computed(() =>
  withoutLeave ? '' : `animate__animated animate__${speed} animate__${outName}`
)
</script>

<template>
  <Component
    :is="group ? TransitionGroup : Transition"
    :enter-active-class="enterActiveClass"
    :leave-active-class="leaveActiveClass"
    mode="out-in"
    v-bind="$attrs"
  >
    <slot />
  </Component>
</template>

<style scoped></style>
