const routes = [
  { path: "/", component: () => import("@/views/Home.vue") },
  { path: "/tran", component: () => import("@/views/transition.vue") },
  { path: "/snow", component: () => import("@/views/snow.vue") },
  { path: "/d3", component: () => import("@/views/d3.vue") },
  { path: "/liujiaotu", component: () => import("@/views/liujiaotu.vue") }
];
export default routes;
