<script setup lang="ts">
import ActionButton from './ActionButton.vue'
defineProps<{
  title: string
  text?: string
  actionCall: string
  isOrange?: boolean
}>()
</script>
<template>
  <div class="content-banner" :class="isOrange ? 'content-banner--orange' : ''">
    <h1 class="content-banner__title">{{ title }}</h1>
    <p v-if="text" class="content-banner__text">{{ text }}</p>
    <slot> </slot>
    <ActionButton class="content-banner__action-button" :text="actionCall" />
  </div>
</template>

<style scoped lang="scss">
.content-banner {
  width: 100%;
  background-color: var(--purple);
  padding: 5% 5% 0 5%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  flex-grow: 2;
  gap: 15px;
  color: white;

  &--orange {
    background-color: var(--orange);
  }

  &__title {
    flex-grow: 2;
    padding: 20px 0;

    text-align: center;
  }

  &__text {
    flex-grow: 2;
    line-height: 2rem;
    text-align: center;
  }

  &__action-button {
    margin-top: auto;
    position: relative;
    top: 25px;
  }
}
</style>
