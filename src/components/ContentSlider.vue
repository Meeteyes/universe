<script setup lang="ts">
import arrowImage from '/img/icons/arrow.svg'

defineProps<{
  title?: string
  subheading?: string
  description?: string
  noBackground?: boolean
  image?: string
  hideNav: boolean
  imageName?: string
}>()
</script>
<template>
  <div class="content-slider" :class="`content-slider${noBackground ? '--no-background' : ''}`">
    <div class="content-slider__carousel">
      <div class="content-slider__carousel-content">
        <div class="content-slider__image-wrapper">
          <img v-if="!$slots.default" :src="image" class="content-slider__carousel-slot" :class="{
            energy: imageName === 'energy.png',
            life: imageName === 'life.png',
            earth: imageName === 'earth.png',
            humans: imageName === 'ancestor.png'
          }" />
        </div>
        <div v-if="!$slots.default" class="content-slider__text">
          <h2 v-if="title" class="content-slider__episode-title">{{ title }}</h2>
          <h3 class="content-slider__subheading">{{ subheading }}</h3>
          <p class="content-slider__description" v-html="description"></p>
        </div>
        <slot></slot>
      </div>
      <div v-if="!hideNav" class="content-slider__carousel-nav">
        <div role="button" class="content-slider__carousel-button content-slider__carousel-button--left"
          @click="$emit('changeSlide', -1)">
          <img :src="arrowImage" />
        </div>
        <div role="button" class="content-slider__carousel-button content-slider__carousel-button--right"
          @click="$emit('changeSlide', 1)">
          <img class="content-slider__right-arrow" :src="arrowImage" />
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
      max-height: 400px;
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

  &__right-arrow {
    transform: scaleX(-1);
  }

  &__image-wrapper {
    width: 40%;
  }

  &__text {
    width: 60%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
  }

  &__subheading {
    width: 100%;
  }

  &__description {
    font-size: 0.8rem;
    line-height: 1.1rem;
    text-align: left;
    margin-top: 2rem;
  }

  &__description b {
    font-size: 0.8rem;
    font-weight: 600;
    color: white;
  }
}

.life,
.earth {
  height: 130%;
  position: relative;
  top: -70px;
}

.energy {
  height: 140%;
  position: relative;
  top: -110px;
  right: -70px;
  transform: rotate(10deg);
}

.humans {
  height: 120%;
  position: relative;
  top: -55px;
  right: -50px;
}
</style>
