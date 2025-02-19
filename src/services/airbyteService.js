import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api/airbyte";

// Add error handling and response processing
const handleResponse = (response) => {
  if (response.data.error) {
    throw new Error(response.data.error);
  }
  return response.data;
};

const handleError = (error) => {
  const message =
    error.response?.data?.error || error.message || "An unknown error occurred";
  console.error("API Error:", error);
  throw new Error(message);
};

export const airbyteService = {
  async getSources() {
    try {
      const response = await axios.get(`${API_BASE_URL}/sources`);
      // Ensure we're returning data in a consistent format
      const sourceData = response.data?.data || response.data || [];
      return {
        success: true,
        data: Array.isArray(sourceData) ? sourceData : [],
      };
    } catch (error) {
      console.error("Error fetching sources:", error);
      return handleError(error);
    }
  },

  async getSourceTypes() {
    try {
      const response = await axios.get(`${API_BASE_URL}/source-types`);
      return handleResponse(response).sourceTypes;
    } catch (error) {
      return handleError(error);
    }
  },

  async getSourceTypeDetails(sourceType) {
    const response = await axios.get(
      `${API_BASE_URL}/source-types/${sourceType}`
    );
    return response.data.typeDetails;
  },

  async createSource(sourceData) {
    if (!sourceData?.sourceName || !sourceData?.sourceType) {
      throw new Error("Source name and type are required");
    }
    try {
      const response = await axios.post(
        `${API_BASE_URL}/create/sources`,
        sourceData
      );
      return handleResponse(response);
    } catch (error) {
      return handleError(error);
    }
  },

  async getSourceDetails(sourceId) {
    if (!sourceId) throw new Error("Source ID is required");
    try {
      const response = await axios.get(`${API_BASE_URL}/sources/${sourceId}`);
      return handleResponse(response);
    } catch (error) {
      return handleError(error);
    }
  },

  async deleteSource(sourceId) {
    if (!sourceId) throw new Error("Source ID is required");
    try {
      const response = await axios.delete(
        `${API_BASE_URL}/sources/${sourceId}`
      );
      return handleResponse(response);
    } catch (error) {
      return handleError(error);
    }
  },
};
