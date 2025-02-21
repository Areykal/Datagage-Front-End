<script setup>
import { ref, watch } from "vue";
import { useDisplay } from "vuetify";

const display = useDisplay();
const rail = ref(true);

// Remove mobile behavior for now to ensure drawer is always visible
watch(
  () => display.mdAndDown.value,
  (isMobile) => {
    if (!isMobile) {
      rail.value = true;
    }
  }
);

const menuItems = [
  {
    title: "Dashboard",
    icon: "mdi-view-dashboard-outline",
    value: "dashboard",
    to: "/",
  },
  {
    title: "Data Sources",
    icon: "mdi-database-outline",
    value: "sources",
    to: "/sources",
  },
  {
    title: "Analytics",
    icon: "mdi-chart-box-outline",
    value: "analytics",
    to: "/analytics",
  },
  {
    title: "Settings",
    icon: "mdi-cog-outline",
    value: "settings",
    to: "/settings",
  },
];
</script>

<template>
  <v-navigation-drawer
    permanent
    :rail="rail"
    @mouseenter="rail = false"
    @mouseleave="rail = true"
    :elevation="0"
    class="navigation-drawer"
    width="256"
    rail-width="75"
  >
    <div class="logo-container px-4 py-4 d-flex align-center">
      <v-avatar color="primary" size="38" class="mr-3 elevation-1">
        <span class="text-h6 font-weight-bold text-white">D</span>
      </v-avatar>
      <div v-if="!rail" class="nav-title text-h6 font-weight-medium">
        Datagage
      </div>
    </div>

    <v-divider class="my-2"></v-divider>

    <v-list class="px-2">
      <v-list-item
        v-for="item in menuItems"
        :key="item.value"
        :to="item.to"
        :value="item.value"
        :prepend-icon="item.icon"
        :title="item.title"
        rounded="lg"
        class="nav-item mb-1"
        active-color="primary"
      >
        <template v-slot:append v-if="!rail">
          <v-icon size="18" color="grey" class="nav-arrow">
            mdi-chevron-right
          </v-icon>
        </template>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<style scoped>
.navigation-drawer {
  background-color: var(--dark-surface) !important;
  border-right: 1px solid var(--dark-border) !important;
  color: var(--text-primary-color) !important;
}

.logo-container {
  min-height: 56px;
}

.nav-title {
  background: linear-gradient(45deg, #6366f1, #8b5cf6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.nav-item {
  transition: all 0.3s ease;
  margin: 4px 0;
}

.nav-item:hover {
  background: rgba(255, 255, 255, 0.05);
}

.nav-arrow {
  opacity: 0;
  transform: translateX(-10px);
  transition: all 0.3s ease;
}

.nav-item:hover .nav-arrow {
  opacity: 1;
  transform: translateX(0);
}

.v-list-item--active {
  background: rgba(99, 102, 241, 0.15) !important;
}

.v-list-item--active .v-icon {
  color: rgb(99, 102, 241) !important;
}

.v-list-item--active .nav-arrow {
  opacity: 1;
  transform: translateX(0);
  color: rgb(99, 102, 241) !important;
}
</style>
