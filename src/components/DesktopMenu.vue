<script setup lang="ts">
import ActionButton from './ActionButton.vue'

defineProps<{
  menu: string[]
  actionText: string
}>()
</script>

<template>
  <nav class="desktop-menu__wrapper">
    <a v-for="item in menu" :href="`#${item}`" :key="item"
      ><span> {{ item }}</span></a
    >
    <a :href="`#${menu[4]}`">
      <ActionButton :text="actionText" :outlined="true" />
    </a>
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
