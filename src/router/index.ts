import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Home from '../views/Home.vue';

export const routePath: string[] = ['todo-list'];

const ToRouteName = (path: string) =>
  path
    .split('-')
    .map((ele) => ele.slice(0, 1).toUpperCase() + ele.slice(1))
    .reduce((newName, ele) => newName + ele);

const route = routePath.map((ele) => ({
  path: `/${ele}`,
  name: ToRouteName(ele),
  component: () => import(`../views/${ToRouteName(ele)}/${ToRouteName(ele)}.vue`),
}));

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  ...route,
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
