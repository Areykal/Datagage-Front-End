<template>
  <div class="page-layout">
    <div class="page-header mb-6">
      <div>
        <h1 class="text-h4 font-weight-medium mb-2">{{ title }}</h1>
        <p class="text-subtitle-1 text-medium-emphasis" v-if="subtitle">
          {{ subtitle }}
        </p>
      </div>
      <div class="page-actions" v-if="$slots.actions">
        <slot name="actions"></slot>
      </div>
    </div>

    <v-fade-transition>
      <div v-if="loading" class="d-flex justify-center align-center my-8">
        <v-progress-circular
          indeterminate
          color="primary"
          size="64"
        ></v-progress-circular>
      </div>
      <div v-else-if="error" class="error-container text-center pa-8">
        <v-icon color="error" size="64" class="mb-4"
          >mdi-alert-circle-outline</v-icon
        >
        <h3 class="text-h5 mb-2">Error Loading Data</h3>
        <p class="text-medium-emphasis mb-6">{{ error }}</p>
        <v-btn color="primary" @click="$emit('retry')">Retry</v-btn>
      </div>
      <div v-else class="page-content">
        <slot></slot>
      </div>
    </v-fade-transition>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
  subtitle: {
    type: String,
    default: "",
  },
  loading: {
    type: Boolean,
    default: false,
  },
  error: {
    type: [String, Object, null],
    default: null,
  },
});

defineEmits(["retry"]);
</script>

<style scoped>
.page-layout {
  padding-bottom: 2rem;
  min-height: 100%;
  animation: fadeIn 0.3s ease-out;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
}

.page-content {
  animation: fadeIn 0.4s ease-out;
}

.error-container {
  background: linear-gradient(145deg, var(--dark-surface), #1a1a1a) !important;
  border: 1px solid var(--dark-border) !important;
  border-radius: 8px;
  max-width: 600px;
  margin: 0 auto;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 600px) {
  .page-header {
    flex-direction: column;
    align-items: flex-start;
  }

  .page-actions {
    width: 100%;
    margin-top: 1rem;
  }
}
</style>
