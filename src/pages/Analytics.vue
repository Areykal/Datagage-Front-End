<template>
  <PageLayout
    title="Analytics"
    subtitle="Analyze your data insights"
    :loading="loading"
    :error="error"
  >
    <v-row>
      <v-col cols="12">
        <v-card class="analytics-card">
          <v-card-title>Analytics Dashboard</v-card-title>
          <v-card-text>
            <div
              class="d-flex align-center justify-center"
              style="height: 400px"
            >
              <v-icon size="64" color="primary" class="mr-4"
                >mdi-chart-box-outline</v-icon
              >
              <div class="text-h6">Analytics features coming soon...</div>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </PageLayout>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useAnalyticsStore } from "@/stores/analyticsStore"; // Fix import path
import PageLayout from "@/components/PageLayout.vue";

const analytics = useAnalyticsStore(); // Call the function
const months = ref(12);
const periodOptions = [
  { title: "3 Months", value: 3 },
  { title: "6 Months", value: 6 },
  { title: "12 Months", value: 12 },
  { title: "24 Months", value: 24 },
];

const fetchData = () => {
  analytics.fetchSalesAnalysis(months.value);
};

const loading = ref(false);
const error = ref(null);

onMounted(fetchData);
</script>

<style scoped>
.analytics-container {
  animation: fadeIn 0.5s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.analytics-card {
  background: var(--surface-color) !important;
  border: 1px solid var(--border-color) !important;
  color: var(--text-primary-color) !important;
}
</style>
