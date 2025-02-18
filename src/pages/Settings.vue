<script setup>
import { ref } from 'vue';
import Navigation from '@/components/Navigation.vue';

const settings = ref({
  theme: 'dark',
  notifications: true,
});

const saveSettings = () => {
  // Save settings logic here
  console.log('Settings saved:', settings.value);
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
          <v-card-title>Settings</v-card-title>
          <v-card-text>
            <v-form @submit.prevent="saveSettings">
              <v-select
                v-model="settings.theme"
                :items="['light', 'dark']"
                label="Theme"
                required
              ></v-select>
              <v-switch
                v-model="settings.notifications"
                label="Enable Notifications"
              ></v-switch>
              <v-btn type="submit" color="primary">Save Settings</v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>