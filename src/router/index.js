import { createRouter, createWebHistory } from "vue-router";
import DashBoard from "../views/DashBoard.vue";

const routes = [
  {
    path: "/",
    name: "DashBoard",
    component: DashBoard,
  },
  {
    path: "/todolist",
    name: "Todolist",
    component: () =>
      import(/* webpackChunkName: "Todolist" */ "../views/Todolist.vue"),
    children: [
      {
        path: ":id",
        name: "Task",
        component: () =>
          import(/* webpackChunkName: "task" */ "../views/Task.vue"),
      },
    ],
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/",
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
