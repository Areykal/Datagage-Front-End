<template>
  <div class="error-boundary-wrapper">
    <div v-if="error" class="error-boundary">
      <v-card variant="outlined" color="error">
        <v-card-title class="d-flex align-center">
          <v-icon icon="mdi-alert-circle" class="mr-2" />
          Something went wrong
        </v-card-title>
        <v-card-text>
          <p class="mb-4">{{ error }}</p>
          <v-btn @click="retry" color="white" variant="outlined">
            Try Again
          </v-btn>
        </v-card-text>
      </v-card>
    </div>
    <div v-else>
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
  onRetry: { type: Function, required: true },
});

const error = ref(null);

const handleError = (err) => {
  error.value = err.message;
  return false;
};

const retry = async () => {
  error.value = null;
  await props.onRetry();
};

defineExpose({ handleError });
</script>

<style scoped>
.error-boundary {
  animation: fadeIn 0.3s ease-out;
}
</style>
