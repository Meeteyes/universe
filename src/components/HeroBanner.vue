<script setup lang="ts">
import ActioButton from './ActionButton.vue'

defineProps<{
  title: string
  actionCall: string
}>()
</script>

<template>
  <div class="hero-banner">
    <div class="hero-banner__image"></div>
    <div class="hero-banner__content">
      <h1 class="hero-banner__title">{{ title }}</h1>
      <ActioButton class="hero-banner__button" :text="actionCall" size="large" />
    </div>
  </div>
</template>
<style lang="scss">
.hero-banner {
  padding: 20px 0 40% 0;
  height: 85vh;

  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;

  &__image {
    width: 100%;
    height: 400px;
    grid-area: 1 / 1;
    background-color: orange;
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
  }

  @media (min-width: 768px) {
    &__content {
      justify-content: center;
      gap: 30px;
    }

    &__title {
      max-width: 40%;
    }
  }
}
</style>
