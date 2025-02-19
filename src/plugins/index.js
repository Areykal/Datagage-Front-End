/**
 * plugins/index.js
 *
 * Automatically included in `./src/main.js`
 */

// Styles
import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";

// Plugins
import { createVuetify } from "vuetify";
import router from "../router";

const vuetify = createVuetify({
  theme: {
    defaultTheme: "dark",
  },
});

export function registerPlugins(app) {
  app.use(vuetify).use(router);
}

export { router };
