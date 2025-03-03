<template>
  <slot v-if="!error"></slot>
  <div v-else class="error-container">
    <v-card class="error-card pa-6 text-center">
      <v-icon size="48" color="error" class="mb-4"
        >mdi-alert-circle-outline</v-icon
      >
      <h3 class="text-h5 mb-2">Something went wrong</h3>
      <p class="text-medium-emphasis mb-6">
        {{ error.message || "An unexpected error occurred" }}
      </p>
      <v-btn color="primary" @click="handleRetry" class="mb-2">Retry</v-btn>
      <div
        class="text-caption mt-4"
        v-if="process.env.NODE_ENV !== 'production'"
      >
        {{ error.stack }}
      </div>
    </v-card>
  </div>
</template>

<script setup>
import { ref, onErrorCaptured, provide } from "vue";

const error = ref(null);
const emit = defineEmits(["retry"]);

// Reset error state and emit retry event
const handleRetry = () => {
  error.value = null;
  emit("retry");
};

// Capture errors from child components
onErrorCaptured((err) => {
  error.value = err;
  console.error("Error captured in boundary:", err);
  return false; // Prevent error propagation
});

// Expose error and retry function to child components
provide("errorBoundary", {
  error,
  retry: handleRetry,
});
</script>

<style scoped>
.error-container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 300px;
  width: 100%;
}

.error-card {
  background: linear-gradient(145deg, var(--dark-surface), #1a1a1a) !important;
  border: 1px solid var(--dark-border) !important;
  max-width: 600px;
  width: 100%;
}
</style>
