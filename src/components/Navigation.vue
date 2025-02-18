<script setup></script>

<template>
  <v-navigation-drawer permanent>
    <v-list-item title="Datagage" subtitle="Analytics Dashboard"></v-list-item>

    <v-divider></v-divider>

    <v-list density="compact" nav>
      <v-list-item
        prepend-icon="mdi-view-dashboard"
        title="Dashboard"
        value="dashboard"
        to="/"
      ></v-list-item>
      <v-list-item
        prepend-icon="mdi-database"
        title="Data Sources"
        value="sources"
        to="/sources"
      ></v-list-item>
      <v-list-item
        prepend-icon="mdi-chart-box"
        title="Analytics"
        value="analytics"
        to="/analytics"
      ></v-list-item>
      <v-list-item
        prepend-icon="mdi-cog"
        title="Settings"
        value="settings"
        to="/settings"
      ></v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>
