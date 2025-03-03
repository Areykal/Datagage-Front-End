<template>
  <div class="page-layout">
    <div class="page-header mb-6">
      <div>
        <div class="d-flex align-center">
          <v-btn
            v-if="showBack"
            icon
            variant="text"
            size="small"
            class="mr-2"
            @click="goBack"
          >
            <v-icon>mdi-arrow-left</v-icon>
          </v-btn>
          <h1 class="text-h4 font-weight-bold">{{ title }}</h1>
        </div>
        <p v-if="subtitle" class="text-subtitle-1 text-medium-emphasis mt-1">
          {{ subtitle }}
        </p>
      </div>
      <div class="page-actions">
        <slot name="actions"></slot>
      </div>
    </div>

    <v-alert
      v-if="error"
      type="error"
      variant="tonal"
      closable
      class="mb-6"
      @click:close="error = null"
    >
      {{ error }}
    </v-alert>

    <v-progress-linear
      v-if="loading"
      indeterminate
      color="primary"
      class="mb-6"
    ></v-progress-linear>

    <slot></slot>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";

const props = defineProps({
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
    type: [String, null],
    default: null,
  },
  showBack: {
    type: Boolean,
    default: false,
  },
});

const router = useRouter();

const goBack = () => {
  router.back();
};
</script>

<style scoped>
.page-layout {
  animation: fadeIn 0.3s ease-out;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.page-actions {
  display: flex;
  align-items: center;
  gap: 8px;
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
    gap: 16px;
  }

  .page-actions {
    width: 100%;
    justify-content: flex-start;
  }
}
</style>
