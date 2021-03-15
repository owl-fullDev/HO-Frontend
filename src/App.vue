<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <router-link class="navbar-brand" to="/">
        Owl
      </router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link class="nav-link " active-class="active" to="/promos">
              Promosi
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" active-class="active" to="/products">
              Produk
            </router-link>
          </li>
          <li class="nav-item dropdown">
            <span
              class="nav-link dropdown-toggle"
              id="salesDropdown"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Sales
            </span>
            <div class="dropdown-menu" aria-labelledby="salesDropdown">
              <router-link to="/sales" class="dropdown-item">
                Semua Penjualan
              </router-link>
              <router-link to="/sales/salesByStore" class="dropdown-item">
                Penjualan per Toko
              </router-link>
            </div>
          </li>
          <li class="nav-item dropdown">
            <span
              class="nav-link dropdown-toggle"
              id="storesDropdown"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Toko
            </span>
            <div class="dropdown-menu" aria-labelledby="storesDropdown">
              <router-link to="/stores" class="dropdown-item">
                Toko
              </router-link>
              <router-link to="/stores/StoreQuantities" class="dropdown-item">
                Inventory Toko
              </router-link>
            </div>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" active-class="active" to="/shipments">
              Kiriman
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" active-class="active" to="/employees">
              Karyawan
            </router-link>
          </li>
          <li class="nav-item dropdown">
            <span
              class="nav-link dropdown-toggle"
              id="warehousesDropdown"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Gudang
            </span>
            <div class="dropdown-menu" aria-labelledby="warehousesDropdown">
              <router-link to="/warehouses" class="dropdown-item">
                Gudang
              </router-link>
              <router-link
                to="/warehouses/WarehouseQuantities"
                class="dropdown-item"
              >
                Inventory Gudang
              </router-link>
            </div>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" active-class="active" to="/suppliers">
              Supplier
            </router-link>
          </li>
        </ul>
      </div>
    </nav>
    <h3 class="display-3">{{ $route.name }}</h3>
    <hr />
    <router-view class="mt-5" />
  </div>
</template>
<style lang="scss">
$enable-gradients: true;
@import "../node_modules/bootstrap/scss/bootstrap";

#salesDropdown:hover {
  cursor: pointer;
}
</style>
