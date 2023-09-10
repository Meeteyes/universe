<script setup lang="ts">
import { ref } from 'vue'

defineProps<{
  menu: string[]
}>()
const isOpen = ref(false)

const toggleMenu = () => {
  isOpen.value = !isOpen.value
}
</script>

<template>
  <div class="mobile-menu" @click="toggleMenu">
    <div v-if="!isOpen" class="mobile-menu__hamburger">
      <div class="mobile-menu__hamburger-item"></div>
      <div class="mobile-menu__hamburger-item"></div>
      <div class="mobile-menu__hamburger-item"></div>
    </div>
    <div v-else class="mobile-menu__close-button" @click="toggleMenu">
      <span @click="toggleMenu" class="mobile-menu__close-icon">&#10005;</span>
    </div>
  </div>
  <div v-if="isOpen" class="mobile-menu__menu-wrapper">
    <a v-for="item in menu" :key="item" :href="`#${item}`" @click="toggleMenu">
      <h2>{{ item }}</h2>
    </a>
  </div>
</template>

<style lang="scss" scoped>
.mobile-menu {
  &__hamburger {
    width: 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 4px;
  }

  &__hamburger-item {
    width: 80%;
    height: 5px;
    background-color: var(--orange);
  }

  &__menu-wrapper {
    padding: 1rem 3rem;
    width: 100vw;
    height: 100vh;
    position: absolute;
    left: 0;
    top: 150px;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    background-color: white;
    z-index: 10;
  }

  &__close-button {
    width: 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &__close-icon {
    font-size: 30px;
    font-weight: 900;
    color: var(--orange);
  }
}
</style>
