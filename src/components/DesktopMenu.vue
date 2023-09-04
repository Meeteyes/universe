<script setup lang="ts">
import ActionButton from './ActionButton.vue'

defineProps<{
  menu: string[]
  actionText: string
}>()
</script>

<template>
  <nav class="desktop-menu__wrapper">
    <span v-for="item in menu" :key="item"> {{ item }}</span>
    <ActionButton :text="actionText" :outlined="true" />
  </nav>
</template>

<style lang="scss">
.desktop-menu {
  &__wrapper {
    font-size: 1rem;
    display: flex;
    flex: 1;
    gap: 1rem;
    justify-content: flex-end;
    align-items: center;
  }
}
</style>
