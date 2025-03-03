import { defineStore } from "pinia";
import { ref, computed } from "vue";
import axios from "axios";
import { notify } from "@/utils/notifications";

export const useAnalyticsStore = defineStore("analytics", () => {
  // State
  const salesData = ref([]);
  const aiInsights = ref("");
  const metabaseUrl = ref(null);
  const dashboardId = ref(null);
  const loading = ref(false);
  const error = ref(null);
  const timeRange = ref(12);
  const product = ref("all");
  const customer = ref("all");
  const lastUpdated = ref(null);

  // Mock data for demonstration
  const mockSalesData = [
    {
      id: 1,
      region: "North",
      product: "Widgets",
      total_orders: 1245,
      total_revenue: 124500,
    },
    {
      id: 2,
      region: "South",
      product: "Gadgets",
      total_orders: 876,
      total_revenue: 87600,
    },
    {
      id: 3,
      region: "East",
      product: "Tools",
      total_orders: 543,
      total_revenue: 54300,
    },
    {
      id: 4,
      region: "West",
      product: "Supplies",
      total_orders: 1089,
      total_revenue: 108900,
    },
  ];

  // Mock insights for demonstration
  const mockInsights = `
    <p><strong>Sales Trend Analysis:</strong> Based on your data, we're seeing a 12% increase in revenue compared to last month.
    The top-performing product category is "Widgets" in the North region.</p>
    
    <p><strong>Recommendation:</strong> Consider increasing your marketing budget for the South region, as it shows high potential for growth
    with a 25% conversion rate despite lower total sales.</p>
  `;

  // Actions
  const fetchData = async (forceRefresh = false) => {
    if (salesData.value.length > 0 && !forceRefresh) {
      return salesData.value;
    }

    loading.value = true;
    error.value = null;

    try {
      // In a real app, you would fetch from an API
      // const response = await axios.get('/api/analytics/sales');
      // salesData.value = response.data;

      // For demo purposes, use mock data with a delay to simulate API call
      await new Promise((resolve) => setTimeout(resolve, 800));
      salesData.value = mockSalesData;
      aiInsights.value = mockInsights;

      // Set mock Metabase URL - in a real app this would be a real embedded dashboard URL
      metabaseUrl.value = "about:blank"; // Replace with real URL when available

      lastUpdated.value = new Date().toLocaleString();
      notify.success("Analytics data loaded successfully");

      return salesData.value;
    } catch (err) {
      console.error("Error fetching analytics data:", err);
      error.value = err.message || "Failed to load analytics data";
      notify.error("Failed to load analytics data");
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const fetchSalesAnalysis = async (months = 12, forceRefresh = false) => {
    // In a real app, the months parameter would be passed to the API
    return fetchData(forceRefresh);
  };

  // Reset state
  const $reset = () => {
    // Don't clear the data, just reset loading and error states
    loading.value = false;
    error.value = null;
  };

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
    lastUpdated,

    // Actions
    fetchData,
    fetchSalesAnalysis,
    $reset,
  };
});
