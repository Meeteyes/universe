<script setup lang="ts">
import { computed } from 'vue'
const props = defineProps<{
  text: String
  outlined?: boolean
  size?: string
  isSubmit?: boolean
  isDisabled?: boolean
}>()

const textSize = computed(() =>
  props.size === 'large' ? 'var(--font-size-action--large)' : '1rem'
)
</script>
<template>
  <button :type="isSubmit ? 'submit' : 'button'" class="action-button"
    :class="{ 'action-button--outlined': outlined, 'action-button--disabled': isDisabled }" :disabled="isDisabled">
    {{ text.toUpperCase() }}
  </button>
</template>
<style>
.action-button {
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 30px;
  background-color: #000;
  color: white;
  height: 2.7rem;
  font-size: v-bind(textSize);
  padding: 2rem 3.5rem;
}

.action-button--outlined {
  background-color: white;
  color: var(--gray-text);
  border: 1px solid #000;
  padding: 1.5rem 3.5rem;

  &:hover {
    background-color: #000;
    color: white;
  }
}

.action-button--disabled {
  background-color: rgba(0, 0, 0, 0.5);
}
</style>
