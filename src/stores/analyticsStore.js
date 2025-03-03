import { defineStore } from "pinia";
import { ref, computed } from "vue";
import analyticsService from "@/services/analyticsService";
import metabaseService from "@/services/metabaseService";
import { useNotificationStore } from "./notificationStore";

export const useAnalyticsStore = defineStore("analytics", () => {
  // State
  const salesData = ref([]);
  const aiInsights = ref("");
  const metabaseUrl = ref("");
  const dashboardId = ref(null);
  const loading = ref(false);
  const error = ref(null);
  const timeRange = ref(12);
  const product = ref("all");
  const customer = ref("all");

  // Notification store for user feedback
  const notifications = useNotificationStore();

  // Methods
  async function fetchData(forceRefresh = false) {
    if (loading.value) return;
    if (salesData.value.length > 0 && !forceRefresh) return;

    loading.value = true;
    error.value = null;

    try {
      // Get sales data
      const data = await analyticsService.getSalesData(
        timeRange.value,
        product.value,
        customer.value
      );
      salesData.value = data;

      // Get AI insights
      aiInsights.value = await analyticsService.getInsights(data);

      // Get or create dashboard
      await fetchDashboard();
    } catch (err) {
      error.value = err.message;
      notifications.add({
        type: "error",
        title: "Data Error",
        message: err.message,
      });
    } finally {
      loading.value = false;
    }
  }

  async function fetchDashboard() {
    try {
      // If no dashboard ID stored, create one
      if (!dashboardId.value) {
        const result = await metabaseService.createDashboard();
        if (result.success && result.dashboardId) {
          dashboardId.value = result.dashboardId;
        }
      }

      // Get dashboard URL with current filters
      if (dashboardId.value) {
        metabaseUrl.value = await metabaseService.getDashboardUrl(
          dashboardId.value,
          {
            timeRange: timeRange.value,
            product: product.value,
            customer: customer.value,
          }
        );
      }
    } catch (err) {
      console.error("Dashboard error:", err);
      // Don't fail the whole operation if dashboard fails
      notifications.add({
        type: "warning",
        title: "Dashboard Issue",
        message: "Could not load visualization dashboard",
      });
    }
  }

  async function updateFilters(newFilters) {
    timeRange.value = newFilters.timeRange || timeRange.value;
    product.value = newFilters.product || product.value;
    customer.value = newFilters.customer || customer.value;

    // Refresh data with new filters
    await fetchData(true);
  }

  // Reset store
  function $reset() {
    salesData.value = [];
    aiInsights.value = "";
    error.value = null;
    // Keep dashboardId and metabaseUrl for caching
  }

  return {
    // State
    salesData,
    aiInsights,
    metabaseUrl,
    dashboardId,
    loading,
    error,
    timeRange,
    product,
    customer,

    // Actions
    fetchData,
    fetchDashboard,
    updateFilters,
    $reset,
  };
});
