<script setup lang="ts">
import IconCard from './IconCard.vue'
import { LANG_VAR_ENG } from '../assets/utils'

defineProps<{
  data: typeof LANG_VAR_ENG
}>()
</script>

<template>
  <div class="summary-section">
    <div class="summary-section__about">
      <div class="summary-section__image-wrapper">
        <div class="summary-section__image"></div>
      </div>
      <div class="summary-section__description">
        <h1 class="summary-section__title">{{ data.summaryTitle }}</h1>
        <p class="summary-section__text">{{ data.summaryText }}</p>
      </div>
    </div>
    <div class="summary-section__card-wrapper">
      <IconCard v-for="card in data.iconCards" :key="card.perk" :title="card.perk" :text="card.text" />
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

  }

  &__image {
    background-color: red;
    width: 250px;
    height: 250px;
    border-radius: 50%;
  }

  &__description {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  &__title {
    padding: 20px 10px;
    width: 60%;
    text-align: center;
  }

  &__text {
    padding: 10px 10px 70px 10px;
    text-align: center;
    font-size: 1rem;
  }

  &__card-wrapper {
    display: flex;
    flex-wrap: wrap;
    padding: 0 20px;
    gap: 10px;
  }

  @media (min-width: 768px) {
    &__about {
      flex-direction: row-reverse;
      justify-content: center;
      justify-content: center;
      margin-bottom: 70px;
    }



    &__image {
      flex-grow: 1;
      flex-basis: 0;
      width: 450px;
      height: 450px;
    }

    &__description {
      flex-grow: 1;
      flex-basis: 0;
      align-items: flex-start;
    }

    &__title {
      width: 80%;
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
