import Vue from "vue";
import VueRouter from "vue-router";

import Home from "../views/Home.vue";
import Promotions from "@/views/Promotions.vue";
import Products from "@/views/Products.vue";
import Sales from "@/views/Sales.vue";
import SalesByStore from "@/views/SalesByStore.vue";
import AllSales from "@/views/AllSales.vue";
import Stores from "@/views/Stores.vue";
import StoreShipments from "@/views/StoreShipments.vue";
import WarehouseShipments from "@/views/WarehouseShipments.vue";
import Shipments from "@/views/Shipments.vue";
import Employees from "@/views/Employees.vue";
import Warehouse from "@/views/Warehouse.vue";

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
    component: Sales,
    children: [
      {
        path: "",
        name: "All Sales",
        component: AllSales,
      },
      {
        path: "salesByStore",
        name: "Sales By Store",
        component: SalesByStore,
      },
    ],
  },
  {
    path: "/shipments",
    component: Shipments,
    name: "Shipments",
    redirect: "/shipments/storeRestock",
    children: [
      {
        path: "storeRestock",
        name: "Store Restock Shipments",
        component: StoreShipments,
      },
      {
        path: "warehouse",
        name: "Warhouse Shipments",
        component: WarehouseShipments,
      },
    ],
  },
  {
    path: "/employees",
    name: "Employees",
    component: Employees,
  },
  {
    path: "/warehouse",
    name: "Warehouse",
    component: Warehouse,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
