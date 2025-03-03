<template>
  <div>
    <template v-if="hasError">
      <v-alert type="error" title="Something went wrong" class="mb-4">
        {{ error }}
      </v-alert>
      <v-btn color="primary" @click="retry">Try Again</v-btn>
    </template>
    <template v-else>
      <slot></slot>
    </template>
  </div>
</template>

<script setup>
import { ref, onErrorCaptured } from "vue";

const props = defineProps({
  onRetry: {
    type: Function,
    default: () => {},
  },
});

const emit = defineEmits(["retry"]);

const error = ref(null);
const hasError = ref(false);

onErrorCaptured((err) => {
  console.error("Error captured in boundary:", err);
  error.value = err.message || "An unexpected error occurred";
  hasError.value = true;
  return false; // Prevent error propagation
});

const retry = () => {
  hasError.value = false;
  error.value = null;
  emit("retry");
  if (props.onRetry && typeof props.onRetry === "function") {
    props.onRetry();
  }
};
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
