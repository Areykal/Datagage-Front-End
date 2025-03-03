<template>
  <PageLayout
    title="Analytics"
    subtitle="Analyze your data insights"
    :loading="loading"
    :error="error"
  >
    <!-- Filter controls -->
    <v-card class="mb-6">
      <v-card-text>
        <v-row align="center">
          <v-col cols="12" md="4">
            <v-select
              v-model="months"
              :items="periodOptions"
              item-title="title"
              item-value="value"
              label="Time Period"
              variant="outlined"
              density="comfortable"
              @update:model-value="fetchData"
            ></v-select>
          </v-col>
          <v-col cols="12" md="8" class="d-flex justify-end">
            <v-btn
              color="primary"
              prepend-icon="mdi-refresh"
              @click="fetchData(true)"
              :loading="loading"
            >
              Refresh Data
            </v-btn>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <!-- Stats Summary Cards -->
    <v-row class="mb-6">
      <v-col cols="12" sm="6" md="3">
        <v-card class="analytics-card">
          <v-card-item>
            <v-card-title>Total Sources</v-card-title>
            <div class="text-h4">{{ analytics.salesData?.length || 0 }}</div>
          </v-card-item>
        </v-card>
      </v-col>

      <v-col cols="12" sm="6" md="3">
        <v-card class="analytics-card">
          <v-card-item>
            <v-card-title>Active Sources</v-card-title>
            <div class="text-h4">{{ activeSources }}</div>
          </v-card-item>
        </v-card>
      </v-col>

      <v-col cols="12" sm="6" md="3">
        <v-card class="analytics-card">
          <v-card-item>
            <v-card-title>Total Records</v-card-title>
            <div class="text-h4">{{ totalRecords }}</div>
          </v-card-item>
        </v-card>
      </v-col>

      <v-col cols="12" sm="6" md="3">
        <v-card class="analytics-card">
          <v-card-item>
            <v-card-title>Last Sync</v-card-title>
            <div class="text-subtitle-1">{{ lastSync }}</div>
          </v-card-item>
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <!-- Metabase visualization (if available) -->
        <v-card v-if="analytics.metabaseUrl" class="analytics-card mb-6">
          <v-card-title>Sales Analytics Dashboard</v-card-title>
          <v-card-text>
            <iframe
              :src="analytics.metabaseUrl"
              frameborder="0"
              width="100%"
              height="600"
              allowtransparency
            ></iframe>
          </v-card-text>
        </v-card>

        <!-- AI Insights -->
        <v-card v-if="analytics.aiInsights" class="analytics-card mb-6">
          <v-card-title>AI Insights</v-card-title>
          <v-card-text>
            <div class="text-body-1" v-html="analytics.aiInsights"></div>
          </v-card-text>
        </v-card>

        <!-- Data table -->
        <v-card class="analytics-card mb-6">
          <v-card-title class="d-flex align-center">
            <span>Sales Data</span>
            <v-spacer></v-spacer>
            <v-btn icon="mdi-download" variant="text" @click="downloadData">
              <v-tooltip activator="parent" location="top"
                >Export Data</v-tooltip
              >
            </v-btn>
          </v-card-title>

          <v-data-table
            :headers="tableHeaders"
            :items="analytics.salesData || []"
            :loading="loading"
          ></v-data-table>
        </v-card>

        <!-- Placeholder when no data is available -->
        <v-card
          v-if="!analytics.salesData.length && !loading"
          class="analytics-card"
        >
          <v-card-title>Analytics Dashboard</v-card-title>
          <v-card-text>
            <div
              class="d-flex align-center justify-center"
              style="height: 400px"
            >
              <v-icon size="64" color="primary" class="mr-4"
                >mdi-chart-box-outline</v-icon
              >
              <div class="text-h6">
                No data available for the selected filters
              </div>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </PageLayout>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useAnalyticsStore } from "@/stores/analyticsStore";
import PageLayout from "@/components/PageLayout.vue";
import { notify } from "@/utils/notifications";

const analytics = useAnalyticsStore();
const months = ref(12);
const periodOptions = [
  { title: "3 Months", value: 3 },
  { title: "6 Months", value: 6 },
  { title: "12 Months", value: 12 },
  { title: "24 Months", value: 24 },
];

const tableHeaders = [
  { title: "Region", key: "region" },
  { title: "Product", key: "product" },
  { title: "Orders", key: "total_orders" },
  {
    title: "Revenue",
    key: "total_revenue",
    format: (val) => `$${val.toLocaleString()}`,
  },
];

const loading = computed(() => analytics.loading);
const error = computed(() => analytics.error);

// Computed statistics
const activeSources = computed(() => {
  return analytics.salesData?.filter((s) => s.total_revenue > 0).length || 0;
});

const totalRecords = computed(() => {
  return (
    analytics.salesData?.reduce(
      (acc, curr) => acc + (curr.total_orders || 0),
      0
    ) || 0
  );
});

const lastSync = computed(() => {
  return analytics.lastUpdated || new Date().toLocaleString();
});

const fetchData = async (forceRefresh = false) => {
  try {
    await analytics.fetchSalesAnalysis(months.value, forceRefresh);
    if (forceRefresh) {
      notify.success("Analytics data refreshed");
    }
  } catch (err) {
    notify.error("Failed to load analytics data");
    console.error(err);
  }
};

const downloadData = () => {
  try {
    // Create CSV content
    const headers = Object.keys(analytics.salesData[0]).join(",");
    const rows = analytics.salesData
      .map((item) => Object.values(item).join(","))
      .join("\n");
    const csvContent = `${headers}\n${rows}`;

    // Create blob and download link
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `datagage_analytics_${
      new Date().toISOString().split("T")[0]
    }.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    notify.success("Data exported successfully");
  } catch (error) {
    notify.error("Failed to export data");
    console.error(error);
  }
};

onMounted(() => fetchData());
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
  transition: all 0.3s ease;
}

.analytics-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 25px 0 rgba(0, 0, 0, 0.25);
}
</style>
