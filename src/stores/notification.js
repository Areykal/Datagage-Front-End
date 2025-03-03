import { defineStore } from "pinia";
import { ref } from "vue";

export const useNotificationStore = defineStore("notification", () => {
  const notifications = ref([]);
  let nextId = 1;

  const show = (
    message,
    type = "info",
    timeout = 5000,
    position = "top-right",
    title = ""
  ) => {
    const id = nextId++;
    const notification = { id, message, type, timeout, position, title };
    notifications.value.push(notification);

    if (timeout) {
      setTimeout(() => {
        dismiss(id);
      }, timeout);
    }

    return id;
  };

  const showSuccess = (message, options = {}) => {
    return show(
      message,
      "success",
      options.timeout || 5000,
      options.position || "top-right",
      options.title || ""
    );
  };

  const showError = (message, options = {}) => {
    return show(
      message,
      "error",
      options.timeout || 8000,
      options.position || "top-right",
      options.title || "Error"
    );
  };

  const showWarning = (message, options = {}) => {
    return show(
      message,
      "warning",
      options.timeout || 7000,
      options.position || "top-right",
      options.title || "Warning"
    );
  };

  const showInfo = (message, options = {}) => {
    return show(
      message,
      "info",
      options.timeout || 5000,
      options.position || "top-right",
      options.title || ""
    );
  };

  const dismiss = (id) => {
    const index = notifications.value.findIndex((n) => n.id === id);
    if (index !== -1) {
      notifications.value.splice(index, 1);
    }
  };

  const clear = () => {
    notifications.value = [];
  };

  return {
    notifications,
    show,
    showSuccess,
    showError,
    showWarning,
    showInfo,
    dismiss,
    clear,
  };
});
