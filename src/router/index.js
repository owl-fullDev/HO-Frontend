import Vue from "vue";
import VueRouter from "vue-router";

import Home from "../views/Home.vue";
import Promotions from "@/views/Promotions.vue";
import Products from "@/views/Products.vue";
import Sales from "@/views/Sales.vue";
import SalesByStore from "@/views/SalesByStore.vue";
import AllSales from "@/views/AllSales.vue";
import Stores from "@/views/Stores.vue";
import Shipments from "@/views/Shipments.vue";
import ActiveShipments from "@/views/ActiveShipments.vue";
import ReceivedSupplierShipments from "@/views/ReceivedSupplierShipments.vue";
import ReceivedInternalShipments from "@/views/ReceivedInternalShipments.vue";
import Employees from "@/views/Employees.vue";
import Warehouse from "@/views/Warehouse.vue";
import Suppliers from "@/views/Suppliers.vue";
import StoreQuantities from "@/views/StoreQuantities.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "OWL Administration",
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
    component: Stores,
    children: [
      {
        path: "",
        name: "Stores",
        component: Stores,
      },
      {
        path: "StoreQuantities",
        name: "Store Product Quantities",
        component: StoreQuantities,
      },
    ],
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
    redirect: "/shipments/activeShipments",
    children: [
      {
        path: "activeShipments",
        name: "Active Shipments",
        component: ActiveShipments,
      },
      {
        path: "receivedSupplierShipments",
        name: "Received Supplier Shipments",
        component: ReceivedSupplierShipments,
      },
      {
        path: "receivedInternalShipments",
        name: "Received Internal Shipments",
        component: ReceivedInternalShipments,
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
  {
    path: "/suppliers",
    name: "Suppliers",
    component: Suppliers,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
