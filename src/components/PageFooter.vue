<script setup lang="ts">
defineProps<{
  menu: string[]
}>()
</script>
<template>
  <div class="footer">
    <img class="footer__image" src="/img/logo@10x.png" />
    <a v-for="item in menu" :href="`#${item}`" :key="item">
      <h5>{{ item }}</h5>
    </a>
    <div class="footer__icons-wrapper">
      <a href="https://www.facebook.com/profile.php?id=100093183068678" target="_blank"
        ><img class="footer__icon" src="/img/icons/icon-facebook.svg"
      /></a>
      <a href="https://www.instagram.com/binoklis_universe" target="_blank"
        ><img class="footer__icon" src="/img/icons/icon-insta.svg"
      /></a>
    </div>
  </div>
</template>

<style lang="scss">
.footer {
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: 10vh 10vw;
  background-color: var(--grey);

  &__image {
    width: 150px;
  }

  &__icons-wrapper {
    display: flex;
    gap: 10px;
    align-items: flex-start;
  }

  &__icon {
    width: 30px;
  }
}
</style>
