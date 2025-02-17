import axios from "axios";

const API_URL = "http://localhost:5000";

export const useAnalyticsStore = {
  state: {
    salesData: [],
    analysis: null,
    loading: false,
    error: null,
  },

  async fetchSalesAnalysis(months = 12) {
    this.state.loading = true;
    try {
      const response = await axios.get(
        `${API_URL}/analytics/sales-analysis?months=${months}`
      );
      this.state.salesData = response.data.data;
      this.state.analysis = response.data.analysis;
    } catch (error) {
      this.state.error = error.message;
    } finally {
      this.state.loading = false;
    }
  },
};
