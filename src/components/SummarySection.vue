<script setup lang="ts">
import IconCard from './IconCard.vue'
import { LANG_VAR_ENG } from '../assets/utils'

defineProps<{
  data: typeof LANG_VAR_ENG
  isMobile: boolean
}>()
</script>

<template>
  <div class="summary-section">
    <div class="summary-section__about">
      <div class="summary-section__image-wrapper">
        <img :src="isMobile ? 'img/vr-girl-mobile.png' : '/img/vr-girl-desktop.png'" class="summary-section__image" />
      </div>
      <div class="summary-section__description">
        <h1 class="summary-section__title">{{ data.summaryTitle }}</h1>
        <p class="summary-section__text">{{ data.summaryText }}</p>
      </div>
    </div>
    <div class="summary-section__card-wrapper">
      <IconCard v-for="card in data.iconCards" :key="card.perk" :title="card.perk" :text="card.text" :icon="card.icon" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.summary-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 100px;

  &__about {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
  }

  &__image {
    width: 320px;
  }

  &__description {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  &__title {
    padding: 20px;
    width: 80%;
    text-align: center;
    color: var(--gray-text);
  }

  &__text {
    padding: 10px 20px 70px 20px;
    text-align: center;
  }

  &__card-wrapper {
    display: flex;
    flex-wrap: wrap;
    padding: 0 15px;
    gap: 15px;
  }

  @media (min-width: 768px) {
    &__about {
      flex-direction: row-reverse;
      justify-content: space-evenly;
      padding: 0 50px;
      margin-bottom: 100px;
    }

    &__image-wrapper {
      width: 40%;
      display: flex;
      justify-content: center;
    }

    &__image {
      width: 450px;
    }

    &__description {
      flex-basis: 0;
      align-items: flex-start;
      max-width: 40%;
    }

    &__title {
      width: 100%;
      text-align: start;
    }

    &__text {
      text-align: start;
    }

    &__card-wrapper {
      padding: 0 30px;
      flex-wrap: nowrap;
    }
  }
}
</style>
