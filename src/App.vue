<template>
  <app-layout>
    <router-view />
  </app-layout>
</template>

<script setup>
import AppLayout from '@/layouts/AppLayout.vue'
</script>

<style>
/* Global styles */
:root {
  --dark-background: #121212;
  --dark-surface: #1e1e1e;
  --dark-border: rgba(255, 255, 255, 0.05);
  --dark-text-primary: #ffffff;
  --dark-text-secondary: rgba(255, 255, 255, 0.7);
}

.v-application {
  font-family: "Inter", sans-serif !important;
  background-color: var(--dark-background) !important;
}

/* Toast animations */
.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}

.toast-enter-from,
.toast-leave-to {
  transform: translateY(-100%);
  opacity: 0;
}

/* Page transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
