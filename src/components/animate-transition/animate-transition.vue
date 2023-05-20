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

const props = withDefaults(defineProps<Props>(), {
  enterName: 'fadeIn',
  outName: 'fadeOut',
  speed: 'faster',
  withoutEnter: false,
  withoutLeave: false,
})

const { enterName, outName, speed, withoutEnter, withoutLeave } = toRefs(props)

const enterActiveClass = computed(() =>
  withoutEnter.value ? '' : `animate__animated animate__${speed.value} animate__${enterName.value}`
)

const leaveActiveClass = computed(() =>
  withoutLeave.value ? '' : `animate__animated animate__${speed.value} animate__${outName.value}`
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
