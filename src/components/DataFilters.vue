<template>
  <v-card class="filter-card mb-4">
    <v-card-title>Data Filters</v-card-title>
    <v-card-text>
      <v-row>
        <v-col cols="12" sm="4">
          <v-select
            v-model="localFilters.timeRange"
            label="Time Period"
            :items="timeRangeOptions"
            variant="outlined"
            density="comfortable"
          />
        </v-col>
        <v-col cols="12" sm="4">
          <v-select
            v-model="localFilters.product"
            label="Product"
            :items="['all', 'Product A', 'Product B', 'Product C']"
            variant="outlined"
            density="comfortable"
          />
        </v-col>
        <v-col cols="12" sm="4">
          <v-select
            v-model="localFilters.customer"
            label="Customer"
            :items="['all', 'Customer 1', 'Customer 2', 'Customer 3']"
            variant="outlined"
            density="comfortable"
          />
        </v-col>
      </v-row>
      <div class="d-flex justify-end mt-2">
        <v-btn color="primary" @click="applyFilters" :loading="loading">
          Apply Filters
        </v-btn>
      </div>
    </v-card-text>
  </v-card>

  <v-card class="mb-6" variant="outlined">
    <v-card-text>
      <v-row align="center">
        <v-col cols="12" md="3">
          <v-select
            v-model="selectedPeriod"
            :items="periodOptions"
            label="Time Period"
            variant="outlined"
            density="compact"
          ></v-select>
        </v-col>

        <v-col cols="12" md="3">
          <v-select
            v-model="selectedSource"
            :items="sourceOptions"
            label="Data Source"
            variant="outlined"
            density="compact"
          ></v-select>
        </v-col>

        <v-col cols="12" md="3">
          <v-select
            v-model="selectedMetric"
            :items="metricOptions"
            label="Key Metric"
            variant="outlined"
            density="compact"
          ></v-select>
        </v-col>

        <v-col cols="12" md="3" class="d-flex align-center">
          <v-btn color="primary" variant="tonal" class="ml-auto">
            Apply Filters
          </v-btn>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script setup>
import { ref, reactive, computed, onMounted, watch } from "vue";
import { useAnalyticsStore } from "@/stores/analyticsStore";

const store = useAnalyticsStore();
const loading = computed(() => store.loading);

const localFilters = reactive({
  timeRange: store.timeRange,
  product: store.product,
  customer: store.customer,
});

const timeRangeOptions = [
  { title: "3 Months", value: 3 },
  { title: "6 Months", value: 6 },
  { title: "12 Months", value: 12 },
  { title: "24 Months", value: 24 },
];

// Apply filters to store and reload data
const applyFilters = async () => {
  await store.updateFilters(localFilters);
};

// Update local filters when store changes
watch(
  () => [store.timeRange, store.product, store.customer],
  ([newTimeRange, newProduct, newCustomer]) => {
    localFilters.timeRange = newTimeRange;
    localFilters.product = newProduct;
    localFilters.customer = newCustomer;
  }
);

// Filter options
const periodOptions = [
  { title: "Last 7 days", value: "7d" },
  { title: "Last 30 days", value: "30d" },
  { title: "Last 90 days", value: "90d" },
  { title: "Last 12 months", value: "12m" },
];

const sourceOptions = [
  { title: "All Sources", value: "all" },
  { title: "MySQL Database", value: "mysql" },
  { title: "Google Sheets", value: "sheets" },
];

const metricOptions = [
  { title: "Revenue", value: "revenue" },
  { title: "Orders", value: "orders" },
  { title: "Average Order Value", value: "aov" },
];

// Selected values
const selectedPeriod = ref("30d");
const selectedSource = ref("all");
const selectedMetric = ref("revenue");
</script>

<style scoped>
.filter-card {
  background: linear-gradient(145deg, var(--dark-surface), #1a1a1a) !important;
  border: 1px solid var(--dark-border) !important;
}
</style>
