<script setup>
import { ref } from 'vue';
import Navigation from '@/components/Navigation.vue';

const dataSources = ref([
  { name: 'Source 1', type: 'API', status: 'Active' },
  { name: 'Source 2', type: 'Database', status: 'Inactive' },
  // Add more data sources as needed
]);

const newSource = ref({
  name: '',
  type: '',
  status: 'Active'
});

const addDataSource = () => {
  if (newSource.value.name && newSource.value.type) {
    dataSources.value.push({ ...newSource.value });
    newSource.value.name = '';
    newSource.value.type = '';
  }
};
</script>

<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <Navigation />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title>Data Sources</v-card-title>
          <v-card-text>
            <v-list>
              <v-list-item
                v-for="(source, index) in dataSources"
                :key="index"
              >
                <v-list-item-content>
                  <v-list-item-title>{{ source.name }}</v-list-item-title>
                  <v-list-item-subtitle>Type: {{ source.type }}</v-list-item-subtitle>
                  <v-list-item-subtitle>Status: {{ source.status }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title>Add New Data Source</v-card-title>
          <v-card-text>
            <v-form @submit.prevent="addDataSource">
              <v-text-field
                v-model="newSource.name"
                label="Name"
                required
              ></v-text-field>
              <v-select
                v-model="newSource.type"
                :items="['API', 'Database', 'Google Sheets', 'Excel File', 'MySQL']"
                label="Type"
                required
              ></v-select>
              <v-btn type="submit" color="primary">Add Data Source</v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>