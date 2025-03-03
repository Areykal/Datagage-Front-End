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
</script>

<style scoped>
.filter-card {
  background: linear-gradient(145deg, var(--dark-surface), #1a1a1a) !important;
  border: 1px solid var(--dark-border) !important;
}
</style>
