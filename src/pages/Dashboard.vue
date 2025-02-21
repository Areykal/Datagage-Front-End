<template>
  <PageLayout
    title="Dashboard"
    subtitle="Overview of your data infrastructure"
    :loading="loading"
    :error="error"
  >
    <v-row>
      <!-- Summary Cards -->
      <v-col cols="12" sm="6" md="3">
        <v-card class="dashboard-card">
          <v-card-item>
            <v-card-title>Total Sources</v-card-title>
            <div class="text-h4">{{ stats.totalSources || 0 }}</div>
          </v-card-item>
        </v-card>
      </v-col>

      <v-col cols="12" sm="6" md="3">
        <v-card class="dashboard-card">
          <v-card-item>
            <v-card-title>Active Sources</v-card-title>
            <div class="text-h4">{{ stats.activeSources || 0 }}</div>
          </v-card-item>
        </v-card>
      </v-col>

      <v-col cols="12" sm="6" md="3">
        <v-card class="dashboard-card">
          <v-card-item>
            <v-card-title>Total Records</v-card-title>
            <div class="text-h4">{{ stats.totalRecords || 0 }}</div>
          </v-card-item>
        </v-card>
      </v-col>

      <v-col cols="12" sm="6" md="3">
        <v-card class="dashboard-card">
          <v-card-item>
            <v-card-title>Last Sync</v-card-title>
            <div class="text-subtitle-1">{{ stats.lastSync || "Never" }}</div>
          </v-card-item>
        </v-card>
      </v-col>

      <!-- Placeholder for future widgets -->
      <v-col cols="12">
        <v-card class="dashboard-card">
          <v-card-title>Recent Activity</v-card-title>
          <v-card-text>
            <div class="text-subtitle-1">Coming soon...</div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </PageLayout>
</template>

<script setup>
import { ref, onMounted } from "vue";
import PageLayout from "@/components/PageLayout.vue";

const loading = ref(true);
const error = ref(null);
const stats = ref({});

onMounted(() => {
  // Placeholder for future API integration
  loading.value = false;
});
</script>

<style scoped>
.dashboard-card {
  background: var(--surface-color) !important;
  border: 1px solid var(--border-color) !important;
  transition: all 0.3s ease;
  color: var(--text-primary-color) !important;
}

.dashboard-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 25px 0 rgba(0, 0, 0, 0.25);
}
</style>
