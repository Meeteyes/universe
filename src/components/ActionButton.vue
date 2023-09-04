<script setup lang="ts">
import { computed } from 'vue';
const props = defineProps<{
  text: String
  outlined?: boolean
  size?: string
}>()

const textSize = computed(() => props.size === "large" ? 'var(--font-size-action--large)' : '1rem');
console.log("Text", textSize.value)
</script>
<template>
  <div role="button" class="action-button" :class="{ 'action-button--outlined': outlined }">
    {{ text.toUpperCase() }}
  </div>
</template>
<style>
.action-button {
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 30px;
  background-color: #000;
  color: white;
  /* max-width: 160px; */
  height: 2.7rem;
  font-size: v-bind(textSize);
  padding: 1.7rem 4.2rem;
}

.action-button--outlined {
  background-color: white;
  color: #000;
  border: 1px solid #000;

}
</style>
