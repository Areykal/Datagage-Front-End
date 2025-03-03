import { defineStore } from "pinia";
import { ref, computed } from "vue";
import analyticsService from "@/services/analyticsService";
import metabaseService from "@/services/metabaseService";
import { useNotificationStore } from "./notification";

export const useAnalyticsStore = defineStore("analytics", () => {
  // State
  const salesData = ref([]);
  const aiInsights = ref(
    "Based on your current data trends, your sales are showing positive growth in the last quarter. Consider investing more in your top-performing product categories."
  );
  const metabaseUrl = ref("");
  const dashboardId = ref(null);
  const loading = ref(false);
  const error = ref(null);
  const timeRange = ref(12);
  const product = ref("all");
  const customer = ref("all");

  // Notification store for user feedback
  const notifications = useNotificationStore();

  // Mock data
  const generateMockData = (months = 12) => {
    const data = [];
    const now = new Date();
    for (let i = 0; i < months; i++) {
      const date = new Date(now);
      date.setMonth(now.getMonth() - i);

      data.push({
        month: date.toLocaleString("default", {
          month: "long",
          year: "numeric",
        }),
        total_revenue: Math.floor(Math.random() * 50000) + 10000,
        total_orders: Math.floor(Math.random() * 500) + 100,
        average_order_value: Math.floor(Math.random() * 200) + 50,
      });
    }
    return data.reverse();
  };

  // Methods
  async function fetchData(forceRefresh = false) {
    if (loading.value) return;
    if (salesData.value.length > 0 && !forceRefresh) return;

    loading.value = true;
    error.value = null;

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1500));
      salesData.value = generateMockData(12);
      return salesData.value;
    } catch (err) {
      error.value = "Failed to load analytics data";
      console.error(err);
      return [];
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
      notifications.showWarning("Could not load visualization dashboard", {
        title: "Dashboard Issue",
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

  async function fetchSalesAnalysis(months = 12) {
    loading.value = true;

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      salesData.value = generateMockData(months);
      return salesData.value;
    } catch (err) {
      error.value = "Failed to load sales analysis";
      console.error(err);
    } finally {
      loading.value = false;
    }
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
    fetchSalesAnalysis,
    $reset,
  };
});
