<script setup>
import { onMounted, ref } from "vue";
import { useAnalyticsStore } from "@/store/analytics";

const analytics = useAnalyticsStore;
const months = ref(12);

onMounted(() => {
  analytics.fetchSalesAnalysis(months.value);
});
</script>

<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title>Sales Analytics Dashboard</v-card-title>
          <v-card-text>
            <v-select
              v-model="months"
              :items="[3, 6, 12, 24]"
              label="Select Period (Months)"
              @update:modelValue="analytics.fetchSalesAnalysis(months)"
            ></v-select>

            <v-alert
              v-if="analytics.state.error"
              type="error"
              text="{{ analytics.state.error }}"
            ></v-alert>

            <v-progress-circular
              v-if="analytics.state.loading"
              indeterminate
              color="primary"
            ></v-progress-circular>

            <template v-else-if="analytics.state.salesData.length">
              <v-row>
                <v-col
                  v-for="(data, index) in analytics.state.salesData"
                  :key="index"
                  cols="12"
                  md="4"
                >
                  <v-card>
                    <v-card-title>{{
                      new Date(data.month).toLocaleDateString("en-US", {
                        month: "long",
                        year: "numeric",
                      })
                    }}</v-card-title>
                    <v-card-text>
                      <p>Revenue: ${{ data.total_revenue }}</p>
                      <p>Orders: {{ data.total_orders }}</p>
                      <p>Customers: {{ data.unique_customers }}</p>
                      <p>Avg Order: ${{ data.avg_order_value }}</p>
                    </v-card-text>
                  </v-card>
                </v-col>
              </v-row>

              <v-card class="mt-4">
                <v-card-title>Analysis</v-card-title>
                <v-card-text>
                  <p style="white-space: pre-line">
                    {{ analytics.state.analysis }}
                  </p>
                </v-card-text>
              </v-card>
            </template>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
