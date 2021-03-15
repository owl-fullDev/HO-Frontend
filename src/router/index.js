import Vue from "vue";
import VueRouter from "vue-router";

import Home from "../views/Home.vue";
import Promotions from "@/views/Promotions.vue";
import Products from "@/views/Products.vue";
import Sales from "@/views/Sales.vue";
import SalesByStore from "@/views/SalesByStore.vue";
import AllSales from "@/views/AllSales.vue";
import Store from "@/views/Store.vue";
import Stores from "@/views/Stores.vue";
import Shipments from "@/views/Shipments.vue";
import ActiveShipments from "@/views/ActiveShipments.vue";
import ReceivedSupplierShipments from "@/views/ReceivedSupplierShipments.vue";
import ReceivedInternalShipments from "@/views/ReceivedInternalShipments.vue";
import Employees from "@/views/Employees.vue";
import Warehouse from "@/views/Warehouse.vue";
import Warehouses from "@/views/Warehouses.vue";
import WarehouseQuantities from "@/views/WarehouseQuantities.vue";
import Suppliers from "@/views/Suppliers.vue";
import StoreQuantities from "@/views/StoreQuantities.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "OWL Administrasi",
    component: Home,
  },
  {
    path: "/promos",
    name: "Promosi",
    component: Promotions,
  },
  {
    path: "/promos/:promoId",
    component: Promotions,
  },
  {
    path: "/products",
    name: "Produk",
    component: Products,
  },
  {
    path: "/stores",
    component: Store,
    children: [
      {
        path: "",
        name: "Toko",
        component: Stores,
      },
      {
        path: "StoreQuantities",
        name: "Inventory Toko",
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
        name: "Penjualan",
        component: AllSales,
      },
      {
        path: "salesByStore",
        name: "Penjualan per Toko",
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
        name: "Kiriman Aktif",
        component: ActiveShipments,
      },
      {
        path: "receivedSupplierShipments",
        name: "Kiriman Supplier Diterima",
        component: ReceivedSupplierShipments,
      },
      {
        path: "receivedInternalShipments",
        name: "Kiriman Internal Diterima",
        component: ReceivedInternalShipments,
      },
    ],
  },
  {
    path: "/employees",
    name: "Karyawan",
    component: Employees,
  },
  {
    path: "/warehouses",
    component: Warehouse,
    children: [
      {
        path: "",
        name: "Gudang",
        component: Warehouses,
      },
      {
        path: "WarehouseQuantities",
        name: "Inventory Gudang",
        component: WarehouseQuantities,
      },
    ],
  },
  {
    path: "/suppliers",
    name: "Supplier",
    component: Suppliers,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
