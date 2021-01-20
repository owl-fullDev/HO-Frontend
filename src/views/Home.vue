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
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "Home",
  components: {},
};
</script>
