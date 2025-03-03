<template>
  <v-app>
    <Navigation v-if="isAuthenticated" />
    <v-main>
      <div class="app-container mx-auto px-6">
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </div>
    </v-main>

    <NotificationContainer />

    <!-- App-wide loading indicator -->
    <div v-if="loading" class="global-loader">
      <v-progress-circular
        indeterminate
        color="primary"
        size="64"
      ></v-progress-circular>
    </div>
  </v-app>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import { useRoute } from "vue-router";
import Navigation from "@/components/Navigation.vue";
import NotificationContainer from "@/components/NotificationContainer.vue";
import { auth } from "@/utils/auth";

// Global loading state
const loading = ref(false);
const route = useRoute();

// Check authentication status
const isAuthenticated = computed(() => {
  return auth.isAuthenticated();
});

// Watch for route changes to toggle loading state
watch(
  () => route.fullPath,
  () => {
    loading.value = true;
    // Simulate network delay for demo
    setTimeout(() => {
      loading.value = false;
    }, 300);
  },
  { immediate: true }
);
</script>

<style>
/* Global styles */
.v-application {
  font-family: "Inter", sans-serif !important;
  background-color: var(--background-color) !important;
  color: var(--text-primary-color) !important;
}

.app-container {
  max-width: 1440px;
  min-height: 100vh;
  padding: clamp(1rem, 2vw, 2rem);
  margin: 0 auto;
  width: 100%;
}

@media (max-width: 600px) {
  .app-container {
    padding: 1rem;
  }
}

/* Theme variables */
:root {
  --background-color: #ffffff;
  --surface-color: #f5f5f5;
  --text-primary-color: #000000;
  --text-secondary-color: #555555;
  --border-color: #dddddd;
}

[data-theme="dark"] {
  --background-color: #121212;
  --surface-color: #1e1e1e;
  --text-primary-color: #ffffff;
  --text-secondary-color: rgba(255, 255, 255, 0.7);
  --border-color: rgba(255, 255, 255, 0.1);
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

/* Global loader */
.global-loader {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}
</style>
