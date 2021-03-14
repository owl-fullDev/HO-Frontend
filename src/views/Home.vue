<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <router-link class="btn btn-secondary btn-lg" to="/promos">
          Promotions
        </router-link>
      </div>
      <div class="col">
        <router-link class="btn btn-secondary btn-lg" to="/products">
          Products
        </router-link>
      </div>
      <div class="col">
        <router-link class="btn btn-secondary btn-lg" to="/sales">
          Sales
        </router-link>
      </div>
      <div class="col">
        <router-link class="btn btn-secondary btn-lg" to="/stores">
          Stores
        </router-link>
      </div>
      <div class="col">
        <router-link class="btn btn-secondary btn-lg" to="/shipments">
          Shipments
        </router-link>
      </div>
    </div>
    <br />
    <br />
    <div class="row">
      <div class="col">
        <router-link class="btn btn-secondary btn-lg" to="/employees">
          Employees
        </router-link>
      </div>
      <div class="col">
        <router-link class="btn btn-secondary btn-lg" to="/warehouse">
          Warehouse
        </router-link>
      </div>
      <div class="col">
        <router-link class="btn btn-secondary btn-lg" to="/suppliers">
          Supplier
        </router-link>
      </div>
      <div class="col">
        <router-link class="btn btn-secondary btn-lg" to="/stores">
          Stock Toko
        </router-link>
      </div>
      <div class="col"></div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "Home",
  components: {},
};
</script>
