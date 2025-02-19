<template>
  <div class="page-layout">
    <div class="page-header">
      <v-btn
        v-if="showBack"
        icon="mdi-arrow-left"
        variant="text"
        class="back-button"
        @click="handleBack"
      ></v-btn>
      <div class="header-content">
        <h1 class="page-title">{{ title }}</h1>
        <span v-if="subtitle" class="subtitle">{{ subtitle }}</span>
      </div>
      <v-spacer></v-spacer>
      <div class="actions">
        <slot name="actions"></slot>
      </div>
    </div>

    <v-alert
      v-if="error"
      type="error"
      variant="tonal"
      :text="error"
      class="mb-4"
      closable
    ></v-alert>

    <div v-if="loading" class="d-flex justify-center align-center py-12">
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
    </div>

    <slot v-else></slot>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();
const props = defineProps({
  title: { type: String, required: true },
  subtitle: { type: String, default: "" },
  loading: { type: Boolean, default: false },
  error: { type: String, default: "" },
  showBack: { type: Boolean, default: false },
});

const handleBack = () => {
  router.go(-1); // Use browser's back functionality instead of manual routing
};
</script>

<style scoped>
.page-layout {
  animation: fadeIn 0.3s ease-out;
  width: 100%;
}

.page-header {
  display: flex;
  align-items: center;
  margin-bottom: clamp(1rem, 3vw, 2rem);
  gap: 1rem;
  flex-wrap: wrap;
}

.header-content {
  flex: 1;
  min-width: 200px;
}

.page-title {
  font-size: clamp(1.5rem, 2.5vw, 2rem);
  line-height: 1.2;
  margin-bottom: 0.25rem;
}

.subtitle {
  font-size: clamp(0.875rem, 1.5vw, 1rem);
  opacity: 0.7;
}

.back-button {
  margin-right: 0.5rem;
}

.actions {
  display: flex;
  gap: 0.5rem;
  margin-left: auto;
}

@media (max-width: 600px) {
  .page-header {
    flex-direction: column;
    align-items: flex-start;
  }

  .actions {
    width: 100%;
    justify-content: flex-end;
  }
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
</style>
