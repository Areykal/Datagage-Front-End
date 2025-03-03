<template>
  <div class="notification" :class="type">
    <div class="notification-header">
      <span class="notification-title">{{ title }}</span>
      <v-icon @click="dismiss" size="small">mdi-close</v-icon>
    </div>
    <div class="notification-body">{{ message }}</div>
  </div>
</template>

<script setup>
import { useNotificationStore } from "@/stores/notificationStore";

const props = defineProps({
  id: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    default: "info",
    validator: (value) =>
      ["info", "success", "warning", "error"].includes(value),
  },
  title: {
    type: String,
    default: "",
  },
  message: {
    type: String,
    required: true,
  },
});

const notificationStore = useNotificationStore();

const dismiss = () => {
  notificationStore.remove(props.id);
};
</script>

<style scoped>
.notification {
  position: fixed;
  top: 20px;
  right: 20px;
  min-width: 300px;
  max-width: 400px;
  padding: 15px;
  margin-bottom: 15px;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  background-color: var(--dark-surface);
  color: var(--dark-text-primary);
  border-left: 4px solid transparent;
}

.notification-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 5px;
}

.notification-title {
  font-weight: bold;
  font-size: 1rem;
}

.notification-body {
  font-size: 0.9rem;
  color: var(--dark-text-secondary);
}

.notification.info {
  border-left-color: #2196f3;
}

.notification.success {
  border-left-color: #4caf50;
}

.notification.warning {
  border-left-color: #ff9800;
}

.notification.error {
  border-left-color: #f44336;
}
</style>
