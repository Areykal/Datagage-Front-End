<template>
  <PageLayout
    title="Add New Data Source"
    subtitle="Connect to a new data source"
    :loading="loading"
    :error="error"
    showBack
  >
    <v-card class="mb-6">
      <v-card-title>Select Source Type</v-card-title>
      <v-card-text>
        <v-row>
          <v-col
            v-for="sourceType in sourceTypes"
            :key="sourceType.type"
            cols="12"
            sm="6"
            md="4"
          >
            <v-card
              variant="outlined"
              class="source-type-card"
              :class="{ selected: selectedType === sourceType.type }"
              @click="selectSourceType(sourceType.type)"
              hover
            >
              <v-card-item>
                <template v-slot:prepend>
                  <v-avatar
                    color="primary"
                    variant="tonal"
                    size="48"
                    class="source-icon"
                  >
                    <v-icon size="24">mdi-database-outline</v-icon>
                  </v-avatar>
                </template>
                <v-card-title>{{ sourceType.name }}</v-card-title>
                <v-card-subtitle>{{ sourceType.description }}</v-card-subtitle>
              </v-card-item>
            </v-card>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <v-card v-if="selectedType" class="mb-6">
      <v-card-title
        >Configure {{ getSelectedTypeName }} Connection</v-card-title
      >
      <v-card-text>
        <v-form @submit.prevent="handleSubmit" ref="form">
          <v-text-field
            v-model="formData.name"
            label="Connection Name"
            required
            hint="Give this connection a descriptive name"
            class="mb-4"
          ></v-text-field>

          <!-- Dynamic fields based on selected source type -->
          <template v-for="field in getSourceTypeFields" :key="field.name">
            <v-text-field
              v-model="formData[field.name]"
              :label="field.label"
              :type="field.type"
              :required="field.required"
              :hint="field.hint"
              class="mb-3"
            ></v-text-field>
          </template>

          <div class="d-flex justify-end mt-6">
            <v-btn variant="outlined" class="mr-4" @click="$router.back()">
              Cancel
            </v-btn>
            <v-btn type="submit" color="primary" :loading="submitting">
              Create Connection
            </v-btn>
          </div>
        </v-form>
      </v-card-text>
    </v-card>
  </PageLayout>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { airbyteService } from "@/services/airbyteService";
import PageLayout from "@/components/PageLayout.vue";
import { notify } from "@/utils/notifications";

const router = useRouter();
const loading = ref(false);
const error = ref(null);
const sourceTypes = ref([]);
const selectedType = ref(null);
const formData = ref({
  name: "",
  sourceType: "",
});
const submitting = ref(false);
const form = ref(null);

// Computed properties
const getSelectedTypeName = computed(() => {
  const found = sourceTypes.value.find(
    (type) => type.type === selectedType.value
  );
  return found ? found.name : "";
});

const getSourceTypeFields = computed(() => {
  const found = sourceTypes.value.find(
    (type) => type.type === selectedType.value
  );
  return found ? found.formFields || [] : [];
});

// Fetch available source types
const fetchSourceTypes = async () => {
  loading.value = true;
  error.value = null;

  try {
    sourceTypes.value = await airbyteService.getSourceTypes();
  } catch (err) {
    error.value = "Failed to load source types";
    notify.error(error.value);
    console.error(err);
  } finally {
    loading.value = false;
  }
};

// Select a source type
const selectSourceType = (type) => {
  selectedType.value = type;
  formData.value.sourceType = type;
};

// Handle form submission
const handleSubmit = async () => {
  if (!selectedType.value) {
    notify.warning("Please select a source type first");
    return;
  }

  submitting.value = true;

  try {
    const result = await airbyteService.createSource(formData.value);
    notify.success("Data source created successfully");
    router.push("/sources");
  } catch (err) {
    notify.error("Failed to create data source");
    console.error(err);
  } finally {
    submitting.value = false;
  }
};

onMounted(fetchSourceTypes);
</script>

<style scoped>
.source-type-card {
  cursor: pointer;
  transition: all 0.2s ease;
  height: 100%;
}

.source-type-card:hover {
  transform: translateY(-4px);
  border-color: var(--primary-color) !important;
}

.source-type-card.selected {
  border: 2px solid var(--primary-color) !important;
  background-color: rgba(var(--primary-color-rgb), 0.05) !important;
}

.source-icon {
  transition: transform 0.3s ease;
}

.source-type-card:hover .source-icon {
  transform: scale(1.1);
}
</style>
