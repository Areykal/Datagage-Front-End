import { useNotificationStore } from "@/stores/notification";

/**
 * Utility functions for working with the notification system.
 * This provides an easy-to-use interface for showing notifications from any component.
 */

export const notify = {
  /**
   * Show a success notification
   */
  success(message, options = {}) {
    const store = useNotificationStore();
    return store.showSuccess(message, options);
  },

  /**
   * Show an error notification
   */
  error(message, options = {}) {
    const store = useNotificationStore();
    return store.showError(message, options);
  },

  /**
   * Show a warning notification
   */
  warning(message, options = {}) {
    const store = useNotificationStore();
    return store.showWarning(message, options);
  },

  /**
   * Show an info notification
   */
  info(message, options = {}) {
    const store = useNotificationStore();
    return store.showInfo(message, options);
  },

  /**
   * Show a custom notification with the specified parameters
   */
  show(
    message,
    type = "info",
    timeout = 5000,
    position = "top-right",
    title = ""
  ) {
    const store = useNotificationStore();
    return store.show(message, type, timeout, position, title);
  },

  /**
   * Dismiss a notification by ID
   */
  dismiss(id) {
    const store = useNotificationStore();
    store.dismiss(id);
  },

  /**
   * Clear all notifications
   */
  clearAll() {
    const store = useNotificationStore();
    store.clear();
  },
};

/**
 * Plugin for Vue application to provide global $notify object
 */
export const notificationPlugin = {
  install: (app) => {
    app.config.globalProperties.$notify = notify;
  },
};

export default notify;
