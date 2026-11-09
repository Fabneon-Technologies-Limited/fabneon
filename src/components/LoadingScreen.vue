<script setup lang="ts">
import { ref } from 'vue';

defineProps<{
  theme: 'light' | 'dark';
}>();

// Instant load - zero artificial delay for maximum PageSpeed, SEO, and user retention
const isLoading = ref(false);
</script>

<template>
  <div v-if="isLoading" class="loading-screen" aria-hidden="true"></div>
</template>

<style scoped>
.loading-screen {
  display: none;
}
</style>
