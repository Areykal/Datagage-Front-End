import { defineStore } from "pinia";
import { ref } from "vue";

export const useNotificationStore = defineStore("notification", () => {
  // State
  const notifications = ref([]);
  let nextId = 0;

  // Add a notification
  function add(notification) {
    const id = nextId++;
    const timeout = notification.timeout || 5000;

    notifications.value.push({
      id,
      type: notification.type || "info",
      title: notification.title || "",
      message: notification.message,
      timeout,
    });

    // Auto-remove notification after timeout
    if (timeout > 0) {
      setTimeout(() => {
        remove(id);
      }, timeout);
    }

    return id;
  }

  // Remove a notification by ID
  function remove(id) {
    const index = notifications.value.findIndex((n) => n.id === id);
    if (index !== -1) {
      notifications.value.splice(index, 1);
    }
  }

  // Clear all notifications
  function clear() {
    notifications.value = [];
  }

  return {
    notifications,
    add,
    remove,
    clear,
  };
});
