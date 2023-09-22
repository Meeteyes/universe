<script setup lang="ts">
import ActionButton from './ActionButton.vue'
import cornerImage from '/img/corner.png'
import kidImage from '/img/kid-googles-desktop.png'

defineProps({
  title: { type: String, required: true },
  text: { type: String, required: false },
  actionCall: { type: String, required: true },
  isOrange: { type: Boolean, required: false },
  isDesktop: { type: Boolean, required: false },
  withoutImage: { type: Boolean, required: false, default: false },
  link: { type: String, required: false },
  withoutButton: { type: Boolean, required: false, default: false }
})
</script>
<template>
  <div class="content-banner" :class="{ 'content-banner--orange': isOrange, 'content-banner--desktop': isDesktop }">
    <img :src="cornerImage" class="content-banner__corner content-banner__corner--topright" />
    <img :src="cornerImage" class="content-banner__corner content-banner__corner--topleft" />
    <img :src="cornerImage" class="content-banner__corner content-banner__corner--bottomright" />
    <img :src="cornerImage" class="content-banner__corner content-banner__corner--bottomleft" />
    <h1 class="content-banner__title">{{ title }}</h1>
    <p v-if="text" class="content-banner__text" v-html="text"></p>
    <img v-if="!$slots.default && !withoutImage" :src="kidImage" class="content-banner__image"
      :class="{ 'content-banner__image--desktop': isDesktop }" />
    <slot></slot>
    <a v-if="!withoutButton" :href="`#${link}`">
      <ActionButton class="content-banner__action-button" :text="actionCall" />
    </a>
  </div>
</template>

<style scoped lang="scss">
.content-banner {
  --min-height: 300px;

  position: relative;
  width: 100%;
  background-color: var(--purple);
  padding: 5% 5% 0 5%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  color: white;

  &--desktop {
    min-height: var(--min-height);
    max-height: var(--min-height);
  }

  &--orange {
    background-color: var(--orange);
  }

  &__corner {
    width: 70px;
    position: absolute;

    &--topright {
      top: 16px;
      right: 12px;
    }

    &--topleft {
      top: 16px;
      left: 12px;
      transform: scaleX(-1);
    }

    &--bottomright {
      bottom: 16px;
      right: 12px;
      transform: rotate(180deg);
      transform: scaleY(-1);
    }

    &--bottomleft {
      bottom: 16px;
      left: 12px;
      transform: rotate(180deg);
    }
  }

  &__title {
    max-width: 80%;
    padding: 20px 0;
    text-align: center;
    color: white;
  }

  &__text {
    flex-grow: 2;
    line-height: 2rem;
    text-align: center;
    color: white;
  }

  &__image {
    width: 180px;
    position: relative;
    top: 40px;
    left: -30px;

    &--desktop {
      position: absolute;
      left: 40px;
      top: -30px;
      height: calc(var(--min-height) + 30px);
      width: auto;
    }
  }

  &__action-button {
    margin-top: auto;
    position: relative;
    top: 25px;
  }

  @media (min-width: 769px) {
    padding: 0 0;

    &__text {
      text-align: left;
    }
  }
}
</style>
