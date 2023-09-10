<script setup lang="ts">
import arrowImage from '/img/icons/arrow.svg'

defineProps<{
  title?: string
  subheading: string
  description: string
  noBackground?: boolean
  image?: string
}>()
</script>
<template>
  <div class="content-slider" :class="`content-slider${noBackground ? '--no-background' : ''}`">
    <h2 v-if="title" class="content-slider__episode-title">{{ title }}</h2>
    <div class="content-slider__carousel">
      <div class="content-slider__carousel-wrapper">
        <img v-if="!$slots.default" :src="`/img/${image}`" class="content-slider__carousel-image" />
        <slot class="content-slider__carousel-image"></slot>
        <div class="content-slider__carousel-nav">
          <div
            role="button"
            class="content-slider__carousel-button content-slider__carousel-button--left"
            @click="$emit('changeSlide', -1)"
          >
            <img class="content-slider__carousel-button-icon" :src="arrowImage" />
          </div>
          <div
            role="button"
            class="content-slider__carousel-button content-slider__carousel-button--right"
            @click="$emit('changeSlide', 1)"
          >
            <img
              class="content-slider__carousel-button-icon content-slider__right-arrow"
              :src="arrowImage"
            />
          </div>
        </div>
      </div>
      <div></div>
      <h3 :class="`content-slider__subheading${noBackground ? '--no-background' : ''}`">
        {{ subheading }}
      </h3>
      <p
        :class="`content-slider__description${noBackground ? '--no-background' : ''}`"
        v-html="description"
      />
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

  &__episode-title {
    color: white;
  }

  &__carousel {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 20px;

    &-wrapper {
      width: 100%;
      display: grid;
      grid-template-columns: 1;
      grid-template-rows: 1;
      place-items: center;
    }

    &-image {
      max-width: 110%;
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
      position: relative;

      &-icon {
        width: 1rem;
        position: relative;
        right: 5px;
      }

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

  &__right-arrow {
    transform: scaleX(-1);
    right: 0;
    left: 5px;
  }

  &__subheading {
    width: 75%;
    text-align: center;
    color: white;

    &--no-background {
      width: 75%;
      color: var(--gray-text);
      text-align: center;
    }
  }

  &__description {
    padding: 0 30px;
    font-size: 1.3rem;
    line-height: 1.8rem;
    text-align: center;
    color: white;

    &--no-background {
      width: 90%;
      color: var(--gray-text);
      text-align: center;
    }
  }
}
</style>
