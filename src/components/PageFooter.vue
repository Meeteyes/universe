<script setup lang="ts">
defineProps<{
  menu: string[]
}>()
</script>
<template>
  <div class="footer">
    <img class="footer__image" src="/img/logo@10x.png" />
    <h5 v-for="item in menu" :key="item">{{ item }}</h5>
  </div>
</template>

<style lang="scss">
.footer {
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: 20px 30px;
  background-color: var(--grey);

  &__image {
    width: 150px;
  }
}
</style>
