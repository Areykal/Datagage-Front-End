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

/**
 * Airbyte Service - Placeholder implementation
 */

// Mock data for development
const mockSourceTypes = [
  {
    type: "mysql",
    name: "MySQL",
    description: "Connect to your MySQL database",
    formFields: [
      { name: "host", label: "Host", type: "text", required: true },
      {
        name: "port",
        label: "Port",
        type: "number",
        default: 3306,
        required: true,
      },
      { name: "database", label: "Database", type: "text", required: true },
      { name: "username", label: "Username", type: "text", required: true },
      { name: "password", label: "Password", type: "password", required: true },
    ],
  },
  {
    type: "postgres",
    name: "PostgreSQL",
    description: "Connect to your PostgreSQL database",
    formFields: [
      { name: "host", label: "Host", type: "text", required: true },
      {
        name: "port",
        label: "Port",
        type: "number",
        default: 5432,
        required: true,
      },
      { name: "database", label: "Database", type: "text", required: true },
      { name: "username", label: "Username", type: "text", required: true },
      { name: "password", label: "Password", type: "password", required: true },
    ],
  },
  {
    type: "google-sheets",
    name: "Google Sheets",
    description: "Import data from Google Sheets",
    formFields: [
      {
        name: "spreadsheetId",
        label: "Spreadsheet ID",
        type: "text",
        required: true,
        hint: "ID from the URL of your Google Sheet",
      },
      {
        name: "credentials",
        label: "Service Account JSON",
        type: "text",
        required: true,
      },
    ],
  },
];

const mockSources = [
  {
    sourceId: "src_1",
    name: "Production MySQL",
    sourceType: "mysql",
    status: "active",
    connectionConfiguration: {
      host: "db.example.com",
      port: 3306,
      database: "production",
    },
  },
  {
    sourceId: "src_2",
    name: "Marketing Data",
    sourceType: "google-sheets",
    status: "active",
    connectionConfiguration: {
      spreadsheetId: "1XYZ123",
    },
  },
];

export const airbyteService = {
  // Source types methods
  getSourceTypes() {
    return Promise.resolve(mockSourceTypes);
  },

  getSourceTypeDetails(typeId) {
    const sourceType = mockSourceTypes.find((type) => type.type === typeId);
    return Promise.resolve(sourceType || null);
  },

  // Sources methods
  getSources() {
    return Promise.resolve({ data: mockSources });
  },

  getSourceDetails(sourceId) {
    const source = mockSources.find((s) => s.sourceId === sourceId);
    if (!source) {
      return Promise.reject(new Error("Source not found"));
    }
    return Promise.resolve(source);
  },

  createSource(sourceData) {
    // Simulate API call
    console.log("Creating source with data:", sourceData);
    return Promise.resolve({
      sourceId: `src_${Date.now()}`,
      ...sourceData,
    });
  },

  deleteSource(sourceId) {
    console.log(`Deleting source with ID: ${sourceId}`);
    return Promise.resolve({ success: true });
  },
};
