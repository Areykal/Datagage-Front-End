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

// Don't import vuetify here, it's in registerPlugins
// import vuetify from "./plugins/vuetify"; - Remove this line

// Create app instance
const app = createApp(App);
const pinia = createPinia();

<<<<<<< HEAD
// Register plugins
app.use(pinia);
app.use(router);

// Import and use registerPlugins which already includes Vuetify
import { registerPlugins } from "@/plugins";
registerPlugins(app);

// Mount app
=======
// Apply the selected theme
const theme = localStorage.getItem("theme") || "dark";
document.documentElement.setAttribute("data-theme", theme);

registerPlugins(app); // This already includes router registration
>>>>>>> 7da8da144b996ef72141b6bb9f0d7734386576ba
app.mount("#app");
