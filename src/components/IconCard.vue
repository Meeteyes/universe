<script setup lang="ts">
defineProps<{
  title: string
  text: string
  icon: string
}>()
</script>

<template>
  <div class="icon-card">
    <img
      :src="`/img/icons/${icon}`"
      class="icon-card__icon"
      :class="{ 'icon-card__icon--goggles': icon === 'icon-goggles.svg' }"
    />
    <h4 class="icon-card__title">{{ title }}</h4>
    <p class="icon-card__text">{{ text }}</p>
  </div>
</template>

<style lang="scss">
.icon-card {
  flex: 1 1 40%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;

  &__icon {
    width: 80px;
    height: 80px;

    &--goggles {
      width: 120px;
      height: 80px;
    }
  }

  &__text,
  &__title {
    text-align: center;
  }

  &__text {
    font-size: 0.8rem;
  }

  @media (min-width: 769px) {
    &__text {
      font-size: 1rem;
    }
  }
}
</style>
