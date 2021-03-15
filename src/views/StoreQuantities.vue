<template>
  <div class="container mt-3 ">
    <div class="row text-center">
      <div class="col">
        <h1>Pilih toko</h1>
        <select
          class="custom-select custom-select-lg mb-3"
          v-model="storeId"
          @change="getStoreQuantities"
        >
          <option value="" selected disabled>Pilih toko</option>
          <option
            v-for="store in stores"
            :key="store.id"
            :value="store.storeId"
          >
            {{ store.name }}
          </option>
        </select>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <b-table
          :data="products"
          :striped="true"
          :hoverable="true"
          :default-sort-direction="'asc'"
          :paginated="true"
          :pagination-rounded="true"
          :loading="loading"
          :per-page="10"
          :show-detail-icon="true"
          aria-next-label="Next page"
          aria-previous-label="Previous page"
          aria-page-label="Page"
          aria-current-label="Current page"
        >
          <b-table-column
            field="productId"
            label="SKU #"
            sortable
            v-slot="props"
          >
            {{ props.row.product.productId }}
          </b-table-column>
          <b-table-column
            field="instoreQuantity"
            label="Quantitas Produk"
            sortable
            v-slot="props"
          >
            {{ props.row.instoreQuantity }}
          </b-table-column>
          <b-table-column
            field="productName"
            label="Name Produk"
            sortable
            v-slot="props"
          >
            {{ props.row.product.productName }}
          </b-table-column>
        </b-table>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

const apiUrl = "https://owl-backend-server.herokuapp.com/hoStoresEndpoint/";

export default {
  name: "StoreQuantities",
  data: () => {
    return {
      stores: [],
      products: [],
      storeId: "",
      loading: false,
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
    getStoreQuantities() {
      this.loading = true;
      axios
        .get(`${apiUrl}/getStoreQuantity?storeId=${this.storeId}`)
        .then((response) => {
          this.products = [...response.data];
          this.loading = false;
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>

<style scoped></style>
