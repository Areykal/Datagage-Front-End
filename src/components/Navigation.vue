<template>
  <div class="navigation-container">
    <v-navigation-drawer
      v-model="isOpen"
      :rail="isRail"
      permanent
      class="navigation-drawer"
    >
      <div class="d-flex align-center pa-4">
        <v-avatar class="mr-4" color="primary" size="36">
          <v-img src="/logo.svg" alt="Datagage" v-if="isOpen" />
          <span v-else>D</span>
        </v-avatar>

        <div v-if="isOpen" class="text-h6 font-weight-bold">Datagage</div>

        <v-spacer></v-spacer>

        <v-btn icon variant="text" @click.stop="toggleDrawer" color="grey">
          <v-icon>{{
            isOpen ? "mdi-chevron-left" : "mdi-chevron-right"
          }}</v-icon>
        </v-btn>
      </div>

      <v-divider></v-divider>

      <v-list density="compact" nav>
        <v-list-item
          v-for="item in navItems"
          :key="item.title"
          :to="item.to"
          :prepend-icon="item.icon"
          :title="isOpen ? item.title : ''"
          :value="item.title"
          class="nav-item my-1"
          rounded="lg"
        >
        </v-list-item>
      </v-list>

      <template v-slot:append>
        <div class="pa-2">
          <v-btn
            v-if="isOpen"
            block
            color="primary"
            to="/sources/new"
            prepend-icon="mdi-plus"
          >
            New Source
          </v-btn>
          <v-btn v-else icon color="primary" to="/sources/new">
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </div>
      </template>
    </v-navigation-drawer>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue";
import { useUiStore } from "@/stores/uiStore";

// Use the UI store for state management
const uiStore = useUiStore();

// Local reactive refs for better control
const isOpen = ref(true);
const isRail = computed(() => !isOpen.value);

// Sync with store state
watch(
  () => uiStore.navDrawerOpen,
  (newVal) => {
    isOpen.value = newVal;
  }
);

watch(isOpen, (newVal) => {
  uiStore.setNavDrawerOpen(newVal);
});

// Toggle drawer state with manual control
const toggleDrawer = () => {
  isOpen.value = !isOpen.value;
};

// Initialize from stored value on mount
onMounted(() => {
  // Force a re-render by briefly setting to null then to the stored value
  const storedValue = localStorage.getItem("nav_drawer_state") === "true";
  isOpen.value = storedValue;

  // Ensure the drawer is visible by forcing permanent attribute
  setTimeout(() => {
    const drawer = document.querySelector(".navigation-drawer");
    if (drawer) {
      drawer.setAttribute("aria-hidden", "false");
    }
  }, 100);
});

const navItems = [
  { title: "Dashboard", icon: "mdi-view-dashboard-outline", to: "/" },
  { title: "Data Sources", icon: "mdi-database-outline", to: "/sources" },
  { title: "Analytics", icon: "mdi-chart-box-outline", to: "/analytics" },
  { title: "Settings", icon: "mdi-cog-outline", to: "/settings" },
];
</script>

<style scoped>
.navigation-container {
  position: relative;
  height: 100%;
}

.navigation-drawer {
  background-color: var(--dark-surface) !important;
  border-right: 1px solid var(--dark-border) !important;
  z-index: 100;
  display: flex !important; /* Force display */
  visibility: visible !important;
  opacity: 1 !important;
}

.nav-item {
  transition: all 0.2s ease;
}

.nav-item:hover {
  background-color: rgba(255, 255, 255, 0.05);
}

.v-list-item--active {
  background: rgba(99, 102, 241, 0.15) !important;
}

.v-list-item--active .v-icon {
  color: rgb(99, 102, 241) !important;
}
</style>
