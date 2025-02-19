<template>
  <v-snackbar
    v-model="isVisible"
    :color="type"
    :timeout="timeout"
    location="top"
    class="toast-notification"
  >
    <div class="d-flex align-center">
      <v-icon :icon="icon" class="mr-2" />
      {{ message }}
    </div>

    <template v-slot:actions>
      <v-btn
        v-if="!timeout"
        variant="text"
        @click="isVisible = false"
        icon="mdi-close"
      ></v-btn>
    </template>
  </v-snackbar>
</template>

<script setup>
import { ref, computed } from "vue";

const props = defineProps({
  message: { type: String, required: true },
  type: { type: String, default: "success" },
  timeout: { type: Number, default: 3000 },
});

const isVisible = ref(true);

const icon = computed(() => {
  const icons = {
    success: "mdi-check-circle",
    error: "mdi-alert-circle",
    warning: "mdi-alert",
    info: "mdi-information",
  };
  return icons[props.type] || icons.info;
});
</script>

<style scoped>
.toast-notification {
  border-radius: 8px !important;
}
</style>
