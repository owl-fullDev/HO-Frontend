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
              Promotions
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" active-class="active" to="/products">
              Products
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
                All Sales
              </router-link>
              <router-link to="/sales/salesByStore" class="dropdown-item">
                Sales By Store
              </router-link>
            </div>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" active-class="active" to="/stores">
              Stores
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" active-class="active" to="/shipments">
              Shipments
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" active-class="active" to="/employees">
              Employees
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" active-class="active" to="/warehouse">
              Warehouse
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
<style scoped>
#salesDropdown:hover {
  cursor: pointer;
}
</style>
