<template>
  <div class="container mt-3 text-center">
    <h1>Pilih toko</h1>
    <select class="custom-select custom-select-lg mb-3" v-model="storeId">
      <option value="" selected disabled>Pilih toko</option>
      <option v-for="store in stores" :key="store.id" :value="store.storeId">
        {{ store.name }}
      </option>
    </select>
  </div>
</template>

<script>
import axios from "axios";

const apiUrl =
    "https://owl-backend-server.herokuapp.com/hoStoresEndpoint/";

export default {
name: "StoreQuantities",
  data: () => {
    return {
      stores: [],
      storeId: "",
    };
  },
  components: {},
  created() {
    axios
        .get(`${apiUrl}/getAllStores`)
        .then((response) => {
          this.stores = [...response.data];
        })
        .catch((err) => console.log(err));
  },
  methods: {

  },
};


</script>

<style scoped>

</style>