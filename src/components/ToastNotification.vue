<template>
  <div class="toast-notification" :class="type">
    <div class="toast-content">
      <v-icon :icon="getIcon" class="mr-2"></v-icon>
      <div class="toast-text">
        <strong v-if="title" class="toast-title">{{ title }}</strong>
        <span>{{ message }}</span>
      </div>
    </div>
    <v-btn icon size="small" @click="dismiss" class="toast-close">
      <v-icon>mdi-close</v-icon>
    </v-btn>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useNotificationStore } from "@/stores/notification";

const props = defineProps({
  id: {
    type: Number,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    default: "",
  },
  type: {
    type: String,
    default: "info",
  },
  position: {
    type: String,
    default: "top-right",
  },
});

const notificationStore = useNotificationStore();

const getIcon = computed(() => {
  const icons = {
    success: "mdi-check-circle",
    error: "mdi-alert-circle",
    warning: "mdi-alert",
    info: "mdi-information",
  };
  return icons[props.type] || icons.info;
});

const dismiss = () => {
  notificationStore.dismiss(props.id);
};
</script>

<style scoped>
.toast-notification {
  min-width: 300px;
  max-width: 450px;
  padding: 16px;
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  margin-bottom: 10px;
  pointer-events: auto;
  animation: slide-in 0.3s ease-out forwards;
}

.toast-content {
  display: flex;
  align-items: flex-start;
  flex: 1;
}

.toast-text {
  display: flex;
  flex-direction: column;
}

.toast-title {
  margin-bottom: 4px;
}

.toast-close {
  margin: -8px -8px -8px 8px;
}

.info {
  background-color: #1976d2;
  color: white;
}

.success {
  background-color: #4caf50;
  color: white;
}

.error {
  background-color: #f44336;
  color: white;
}

.warning {
  background-color: #ff9800;
  color: white;
}

@keyframes slide-in {
  from {
    transform: translateX(30px);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}
</style>
