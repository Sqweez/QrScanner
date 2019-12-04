import Vue from 'vue'
import VueRouter from 'vue-router'
import Welcome from '@/views/Welcome';
import WorkSpace from '@/views/Workspace';

Vue.use(VueRouter);

const routes = [
  {
    name: 'welcome',
    path: '/',
    component: Welcome
  },
  {
    name: 'workspace',
    path: '/workspace',
    component: WorkSpace
  }
];

const router = new VueRouter({
  mode: 'hash',
  base: '/',
  routes
})

export default router
