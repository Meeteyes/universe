<script setup lang="ts">
defineProps<{
  title?: string
  subheading: string
  description: string
  noBackground?: boolean
  avatar?: string
}>()
</script>
<template>
  <div class="content-slider" :class="`content-slider${noBackground ? '--no-background' : ''}`">
    <h2 v-if="title" class="content-slider__episode-title">{{ title }}</h2>
    <div class="content-slider__carousel">
      <div class="content-slider__carousel-wrapper">
        <img :src="avatar
          ? avatar
          : 'img/png-transparent-monkey-face-monkey-face-animals-head-thumbnail.png'
          " class="content-slider__carousel-image" />
        <div class="content-slider__carousel-nav">
          <div role="button" class="content-slider__carousel-button content-slider__carousel-button--left"
            @click="$emit('changeSlide', -1)">
            &#10216;
          </div>
          <div role="button" class="content-slider__carousel-button content-slider__carousel-button--right"
            @click="$emit('changeSlide', 1)">
            &#10217;
          </div>
        </div>
      </div>
      <div></div>
      <h3 class="content-slider__subheading">{{ subheading }}</h3>
      <p class="content-slider__description">{{ description }}</p>
    </div>
  </div>
</template>

<style lang="scss">
.content-slider {
  padding: 20px 0;
  background-color: var(--orange);
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  color: white;

  &--no-background {
    background-color: white;
    color: black;
  }

  &__carousel {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 20px;

    &-wrapper {
      display: grid;
      grid-template-columns: 1;
      grid-template-rows: 1;
      place-items: center;
    }

    &-image {
      // width: 100%;
      max-width: 200px;
      grid-area: 1/1;
    }

    &-nav {
      display: flex;
      width: 100%;
      justify-content: space-between;
      position: relative;
      grid-area: 1/1;
    }

    &-button {
      width: 50px;
      height: 50px;
      background-color: var(--orange);
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 30px;
      font-weight: 900;

      &--right {
        position: relative;
        left: 25px;
      }

      &--left {
        position: relative;
        right: 25px;
      }
    }
  }

  &__subheading {
    width: 75%;
    text-align: center;
  }

  &__description {
    padding: 0 30px;
    font-size: 1.3rem;
    line-height: 1.8rem;
    text-align: center;
  }
}
</style>
