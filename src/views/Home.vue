<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <router-link class="btn btn-secondary btn-lg" to="/promos">
          Promosi
        </router-link>
      </div>
      <div class="col">
        <router-link class="btn btn-secondary btn-lg" to="/products">
          Produk
        </router-link>
      </div>
      <div class="col">
        <router-link class="btn btn-secondary btn-lg" to="/sales">
          Sales
        </router-link>
      </div>
      <div class="col">
        <router-link class="btn btn-secondary btn-lg" to="/stores">
          Toko
        </router-link>
      </div>
      <div class="col">
        <router-link class="btn btn-secondary btn-lg" to="/shipments">
          Kiriman
        </router-link>
      </div>
    </div>
    <br />
    <br />
    <div class="row">
      <div class="col">
        <router-link class="btn btn-secondary btn-lg" to="/employees">
          Karyawan
        </router-link>
      </div>
      <div class="col">
        <router-link class="btn btn-secondary btn-lg" to="/warehouse">
          Gudang
        </router-link>
      </div>
      <div class="col">
        <router-link class="btn btn-secondary btn-lg" to="/suppliers">
          Supplier
        </router-link>
      </div>
      <div class="col"></div>
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
