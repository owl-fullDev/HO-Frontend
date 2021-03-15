<template>
  <div class="container mt-3 ">
    <div class="row text-center">
      <div class="col">
        <h1>Pilih Gudang</h1>
        <select
          class="custom-select custom-select-lg mb-3"
          v-model="warehousesId"
          @change="getWarehouseQuantities"
        >
          <option value="" selected disabled>Pilih Gudang</option>
          <option
            v-for="warehouse in warehouses"
            :key="warehouse.id"
            :value="warehouse.warehouseId"
          >
            {{ warehouse.name }}
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
            {{ props.row.inWarehouseQuantity }}
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

const apiUrl = "https://owl-backend-server.herokuapp.com/hoWarehousesEndpoint/";

export default {
  name: "WarehouseQuantities",
  data: () => {
    return {
      warehouses: [],
      products: [],
      warehousesId: "",
      loading: false
    };
  },
  components: {},
  created() {
    axios
      .get(`${apiUrl}/getAllWarehouses`)
      .then(response => {
        this.warehouses = [...response.data];
      })
      .catch(err => console.log(err));
  },
  methods: {
    getWarehouseQuantities() {
      this.loading = true;
      axios
        .get(`${apiUrl}/getWarehouseQuantity?warehouseId=${this.warehousesId}`)
        .then(response => {
          this.products = [...response.data];
          this.loading = false;
        })
        .catch(err => console.log(err));
    }
  }
};
</script>
