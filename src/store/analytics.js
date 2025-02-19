import { reactive } from "vue";
import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api";

export const state = reactive({
  salesData: [],
  loading: false,
  error: null,
  analysis: null,
});

export const useAnalyticsStore = {
  state,

  async fetchSalesAnalysis(months = 12) {
    try {
      state.loading = true;
      state.error = null;

      const response = await axios.get(
        `${API_BASE_URL}/analytics/sales-analysis`,
        {
          params: { months },
        }
      );

      if (response.data.success) {
        state.salesData = response.data.data;
        state.analysis = response.data.analysis;
      } else {
        throw new Error(response.data.error || "Failed to fetch analytics");
      }
    } catch (error) {
      console.error("Analytics error:", error);
      state.error = error.message;
      state.salesData = [];
      state.analysis = null;
    } finally {
      state.loading = false;
    }
  },
};
