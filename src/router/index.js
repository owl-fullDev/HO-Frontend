import Vue from "vue";
import VueRouter from "vue-router";

import Home from "../views/Home.vue";
import Promotions from "@/views/Promotions.vue";
import Products from "@/views/Products.vue";
import Sales from "@/views/Sales.vue";
import Stores from "@/views/Stores.vue";
import Shipments from "@/views/Shipments.vue";
import Employees from "@/views/Employees.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/promos",
    name: "Promotions",
    component: Promotions,
  },
  {
    path: "/promos/:promoId",
    component: Promotions,
  },
  {
    path: "/products",
    name: "Products",
    component: Products,
  },
  {
    path: "/stores",
    name: "Stores",
    component: Stores,
  },
  {
    path: "/sales",
    name: "Sales",
    component: Sales,
  },
  {
    path: "/shipments",
    name: "Shipments",
    component: Shipments,
  },
  {
    path: "/employees",
    name: "Employees",
    component: Employees,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
