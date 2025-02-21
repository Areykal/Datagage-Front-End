import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vuetify from "vite-plugin-vuetify";
import path from "path";

export default defineConfig({
  plugins: [vue(), vuetify({ autoImport: true })],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  base: "/",
  server: {
    port: 8080,
  },
  css: {
    preprocessorOptions: {
      sass: {
        additionalData: `
          // Add any global SASS variables or mixins here if needed
        `,
      },
    },
  },
});
