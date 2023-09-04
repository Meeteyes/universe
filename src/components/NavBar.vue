<script setup lang="ts">
import { computed } from 'vue'
import { useWindowSize } from '@vueuse/core'
import MobileMenu from './MobileMenu.vue'
import DesktopMenu from './DesktopMenu.vue'

const { width } = useWindowSize()

const isMobileView = computed(() => width.value < 769)

defineProps<{
  menu: string[]
  actionText: string
}>()
</script>
<template>
  <div class="nav-bar">
    <img class="nav-bar__logo" src="../../public/img/logo@10x.png" />
    <MobileMenu v-if="isMobileView" :menu="menu" />
    <DesktopMenu v-else :menu="menu" :action-text="actionText" />
  </div>
</template>

<style lang="scss">
.nav-bar {
  height: 15vh;
  padding: 2rem 3rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  &__logo {
    width: 45%;
    max-width: 150px;
  }
}
</style>
