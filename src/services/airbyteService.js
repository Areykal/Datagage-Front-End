import axios from "axios";
import { auth } from "@/utils/auth";

// Base URL for API calls - replace with actual URL in production
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "https://api.datagage.io";

// Create Axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add request interceptor to attach auth token
api.interceptors.request.use(
  (config) => {
    const token = auth.getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Mock data for development
const mockSources = [
  {
    sourceId: "1",
    name: "MySQL Database",
    sourceType: "mysql",
    status: "active",
    connectionConfiguration: {
      host: "mysql.example.com",
      port: 3306,
      database: "analytics",
      username: "dbuser",
      password: "password123",
    },
  },
  {
    sourceId: "2",
    name: "PostgreSQL Data Warehouse",
    sourceType: "postgres",
    status: "active",
    connectionConfiguration: {
      host: "postgres.example.com",
      port: 5432,
      database: "warehouse",
      username: "analyst",
      password: "p@ssw0rd",
    },
  },
  {
    sourceId: "3",
    name: "Google Sheets Marketing",
    sourceType: "google-sheets",
    status: "inactive",
    connectionConfiguration: {
      spreadsheetId: "1XYZ123abc",
      credentialsJson: "{...}",
    },
  },
];

// Simulated API delay
const delay = (ms = 500) => new Promise((resolve) => setTimeout(resolve, ms));

// Airbyte service
export const airbyteService = {
  // Get all sources
  async getSources() {
    if (import.meta.env.DEV) {
      // Return mock data in development
      await delay();
      return { data: mockSources };
    }

    return api.get("/sources");
  },

  // Get a specific source by ID
  async getSourceDetails(sourceId) {
    if (import.meta.env.DEV) {
      await delay();
      const source = mockSources.find((s) => s.sourceId === sourceId);
      if (!source) {
        throw new Error("Source not found");
      }
      return source;
    }

    return api.get(`/sources/${sourceId}`);
  },

  // Create a new source
  async createSource(sourceData) {
    if (import.meta.env.DEV) {
      await delay();
      const newSource = {
        sourceId: Date.now().toString(),
        status: "active",
        ...sourceData,
      };
      mockSources.push(newSource);
      return { data: newSource };
    }

    return api.post("/sources", sourceData);
  },

  // Update a source
  async updateSource(sourceId, sourceData) {
    if (import.meta.env.DEV) {
      await delay();
      const sourceIndex = mockSources.findIndex((s) => s.sourceId === sourceId);
      if (sourceIndex === -1) {
        throw new Error("Source not found");
      }
      mockSources[sourceIndex] = {
        ...mockSources[sourceIndex],
        ...sourceData,
      };
      return { data: mockSources[sourceIndex] };
    }

    return api.put(`/sources/${sourceId}`, sourceData);
  },

  // Delete a source
  async deleteSource(sourceId) {
    if (import.meta.env.DEV) {
      await delay();
      const sourceIndex = mockSources.findIndex((s) => s.sourceId === sourceId);
      if (sourceIndex === -1) {
        throw new Error("Source not found");
      }
      mockSources.splice(sourceIndex, 1);
      return { success: true };
    }

    return api.delete(`/sources/${sourceId}`);
  },

  // Get available source types
  async getSourceTypes() {
    if (import.meta.env.DEV) {
      await delay();
      return {
        data: [
          { id: "mysql", name: "MySQL", icon: "mdi-database" },
          { id: "postgres", name: "PostgreSQL", icon: "mdi-database" },
          {
            id: "google-sheets",
            name: "Google Sheets",
            icon: "mdi-google-spreadsheet",
          },
        ],
      };
    }

    return api.get("/source-types");
  },
};

export default airbyteService;
