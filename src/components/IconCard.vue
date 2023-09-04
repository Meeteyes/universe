<script setup lang="ts">
defineProps<{
  title: string
  text: string
}>()
</script>

<template>
  <div class="icon-card">
    <div class="icon-card__icon"></div>
    <h3 class="icon-card__title">{{ title }}</h3>
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
    width: 70px;
    height: 70px;
    background-color: yellow;
  }

  &__text,
  &__title {
    text-align: center;
  }
}
</style>
