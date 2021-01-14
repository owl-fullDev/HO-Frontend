import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Promotions from "@/views/Promotions.vue";
import Products from "@/views/Products.vue";
import Sales from "@/views/Sales.vue";
import Stores from "@/views/Stores.vue";
import Shipments from "@/views/Shipments.vue";

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
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
