<script setup lang="ts">
import ContentBanner from './ContentBanner.vue'

const handleClick = () => {
  window.history.back()
}
</script>
<template>
  <div class="form-submitted">
    <ContentBanner
      title="Paldies!"
      text="Divu darba dienu laikā sazināsimies ar Jums un precīzēsim visus Jums interesējošos jautājumus."
      action-call="ATGRIEZTIES"
      without-image
      @click="handleClick"
    />
  </div>
</template>

<style lang="scss" scoped>
.form-submitted {
  padding: 10vh 10vw;
}
</style>
