<script setup lang="ts">
import ActioButton from './ActionButton.vue'

defineProps<{
  title: string
  actionCall: string
  isMobile: boolean
  menu: string[]
}>()
</script>

<template>
  <div class="hero-banner">
    <img class="hero-banner__image" :src="isMobile ? '/img/hero-mobile.png' : '/img/hero-desktop.png'" />
    <div class="hero-banner__content">
      <h1 class="hero-banner__title">{{ title }}</h1>
      <a :href="`#${menu[1]}`">
        <ActioButton class="hero-banner__button" :text="actionCall" size="large" />
      </a>
    </div>
  </div>
</template>
<style lang="scss">
.hero-banner {
  padding: 20px 0 50px 0;
  height: 75vh;
  margin-bottom: 15vh;

  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
  overflow: hidden;

  &__image {
    width: 100%;
    height: 100%;
    grid-area: 1 / 1;
    object-fit: cover;
  }

  &__content {
    grid-area: 1 / 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
  }

  &__title {
    max-width: 60%;
    text-align: center;
    color: white;
    padding-top: 20px;
  }

  &__button {
    position: relative;
    top: 40px;
  }

  @media (min-width: 768px) {
    height: 100%;
    margin-bottom: 100px;

    &__content {
      justify-content: center;
      gap: 30px;
    }

    &__title {
      max-width: 40%;
      position: relative;
      top: -60px;
      padding: 0 20px;
    }

    &__button {
      position: relative;
      top: -60px;
    }
  }
}
</style>
