import { createRouter, createWebHistory } from 'vue-router';
import Homepage from '@/pages/Homepage.vue';
import DataSources from '@/pages/DataSources.vue';
import Analytics from '@/pages/Analytics.vue';
import Settings from '@/pages/Settings.vue';

const routes = [
  { path: '/', component: Homepage },
  { path: '/sources', component: DataSources },
  { path: '/analytics', component: Analytics },
  { path: '/settings', component: Settings },
  // Add other routes as needed
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;