/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Components
import App from "./App.vue";

// Composables
import { createApp } from "vue";
import { createPinia } from "pinia";
import router from "./router";
import { registerPlugins } from "@/plugins";
import { notificationPlugin } from "@/utils/notifications";

// Global error handler
const handleError = (err, vm, info) => {
  console.error("Global error:", err);
  console.log("Error info:", info);

  // Notify user of error
  const notify = vm.$notify || vm.$root?.$notify;
  if (notify) {
    notify.error("An unexpected error occurred", {
      title: "Application Error",
      timeout: 0, // No auto-dismiss
    });
  }
};

// Create app instance
const app = createApp(App);
app.config.errorHandler = handleError;
app.config.warnHandler = (msg) => console.warn(`Warning: ${msg}`);

const pinia = createPinia();

// Register plugins
app.use(pinia);
app.use(router);
app.use(notificationPlugin);

// Register Vuetify and other plugins
registerPlugins(app);

// Apply the selected theme
const theme = localStorage.getItem("theme") || "dark";
document.documentElement.setAttribute("data-theme", theme);

// Mount app
app.mount("#app");

// Log that the app is ready
console.log("Datagage application loaded successfully");
