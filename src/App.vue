<template>
  <v-app>
    <Navigation />
    <v-main>
      <div class="app-container mx-auto px-6">
        <router-view v-slot="{ Component }">
          <component :is="Component" />
        </router-view>
      </div>
    </v-main>

    <TransitionGroup name="toast">
      <ToastNotification
        v-for="notification in notificationStore.notifications"
        :key="notification.id"
        v-bind="notification"
      />
    </TransitionGroup>
  </v-app>
</template>

<script setup>
import Navigation from "@/components/Navigation.vue";
import ToastNotification from "@/components/ToastNotification.vue";
import { notificationStore } from "@/stores/notification";
import { useRoute } from "vue-router";

const route = useRoute();

const beforeLeave = (el) => {
  el.style.position = "absolute";
  el.style.width = "100%";
};

const enter = (el) => {
  el.style.position = "relative";
};
</script>

<style>
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

.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}

.toast-enter-from {
  transform: translateY(-100%);
  opacity: 0;
}

.toast-leave-to {
  transform: translateY(-100%);
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.v-main {
  position: relative;
  min-height: 100vh;
}
</style>
