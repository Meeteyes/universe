<script setup lang="ts">
defineProps<{
  title?: string
  subheading?: string
  description?: string
  noBackground?: boolean
}>()
</script>
<template>
  <div class="content-slider" :class="`content-slider${noBackground ? '--no-background' : ''}`">
    <div class="content-slider__carousel">
      <div class="content-slider__carousel-content">
        <img
          v-if="!$slots.default"
          src="../../public/img/png-transparent-monkey-face-monkey-face-animals-head-thumbnail.png"
          class="content-slider__carousel-slot"
        />
        <div v-if="!$slots.default" class="content-slider__text">
          <h2 v-if="title" class="content-slider__episode-title">{{ title }}</h2>
          <h3 class="content-slider__subheading">{{ subheading }}</h3>
          <p class="content-slider__description">{{ description }}</p>
        </div>
        <slot></slot>
      </div>
      <div class="content-slider__carousel-nav">
        <div
          role="button"
          class="content-slider__carousel-button content-slider__carousel-button--left"
          @click="$emit('changeSlide', -1)"
        >
          &#10216;
        </div>
        <div
          role="button"
          class="content-slider__carousel-button content-slider__carousel-button--right"
          @click="$emit('changeSlide', 1)"
        >
          &#10217;
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.content-slider {
  padding: 20px 0;
  background-color: var(--orange);
  &--no-background {
    background-color: white;
    color: black;
  }

  &__carousel {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr;
    place-items: center;

    &-content {
      padding: 0 50px;
      display: flex;
      grid-area: 1 / 1;
      height: 400px;
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

  &__text {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
  }

  &__description {
    font-size: 0.8rem;
  }
}
</style>
