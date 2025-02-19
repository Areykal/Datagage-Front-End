import { reactive } from "vue";

export const notificationStore = reactive({
  notifications: [],

  show(message, type = "success", timeout = 3000) {
    const id = Date.now();
    this.notifications.push({ id, message, type, timeout });

    if (timeout > 0) {
      setTimeout(() => {
        this.remove(id);
      }, timeout);
    }
  },

  remove(id) {
    const index = this.notifications.findIndex((n) => n.id === id);
    if (index !== -1) {
      this.notifications.splice(index, 1);
    }
  },
});
