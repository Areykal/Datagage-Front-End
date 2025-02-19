import { createRouter, createWebHistory } from "vue-router";
import DataSources from "@/pages/DataSources.vue";
import Dashboard from "@/pages/Dashboard.vue";

const routes = [
  {
    path: "/",
    name: "dashboard",
    component: Dashboard,
  },
  {
    path: "/sources",
    name: "sources",
    component: DataSources,
    props: true,
    // Add specific navigation handling
    beforeEnter: (to, from, next) => {
      if (from.name === "source-detail") {
        to.meta.requiresRefresh = true;
      }
      next();
    },
  },
  {
    path: "/sources/new",
    name: "source-types",
    component: () => import("@/pages/sources/SourceTypes.vue"),
  },
  {
    path: "/sources/new/:sourceType",
    name: "source-config",
    component: () => import("@/pages/sources/SourceConfig.vue"),
  },
  {
    path: "/sources/:sourceId",
    name: "source-detail",
    component: () => import("@/pages/sources/SourceDetail.vue"),
    props: true,
    // Add meta to preserve parent state
    meta: {
      preserveState: true,
      parent: "sources",
    },
  },
  {
    path: "/analytics",
    name: "analytics",
    component: () => import("@/pages/Analytics.vue"),
  },
  {
    path: "/settings",
    name: "settings",
    component: () => import("@/pages/Settings.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    return { top: 0 };
  },
});

// Update navigation guard
router.beforeEach((to, from, next) => {
  // Force data refresh when returning to sources list from detail view
  if (to.name === "sources" && from.name === "source-detail") {
    to.meta.shouldRefresh = true;
  }
  next();
});

export default router;
