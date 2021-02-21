<template>
  <div class="container">
    <h3>Product list</h3>
    <hr />
    <div
      class="alert alert-dismissible fade show"
      :class="alertClass"
      role="alert"
      v-if="statusMessage"
    >
      <span>{{ statusMessage }}</span>
      <button
        type="button"
        class="close"
        data-dismiss="alert"
        aria-label="Close"
      >
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="row">
      <div class="col">
        <button
          type="button"
          class="btn btn-primary"
          data-toggle="modal"
          data-target="#createNewProductModal"
        >
          Create new Product
        </button>
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
          aria-next-label="Next page"
          aria-previous-label="Previous page"
          aria-page-label="Page"
          aria-current-label="Current page"
        >
          <b-table-column
            field="productId"
            label="Barcode"
            sortable
            v-slot="props"
          >
            {{ props.row.productId }}
          </b-table-column>
          <b-table-column
            field="productName"
            label="Name"
            sortable
            v-slot="props"
          >
            {{ props.row.productName }}
          </b-table-column>
          <b-table-column
            field="productPrice"
            label="Price (Rp)"
            numeric
            v-slot="props"
            sortable
          >
            {{ props.row.productPrice }}
          </b-table-column>
        </b-table>
      </div>
    </div>
    <!-- Modal -->
    <div
      class="modal fade"
      id="createNewProductModal"
      tabindex="-1"
      aria-labelledby="newProductModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="newProductModalLabel">
              Create new Product
            </h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form ref="newProductForm">
              <div class="form-group">
                <label for="productName">Product Name</label>
                <input
                  type="text"
                  v-model.trim="newProductName"
                  class="form-control"
                  id="productName"
                  required
                />
              </div>
              <div class="form-group">
                <label for="newProductPrice">Price (Rp)</label>
                <input
                  type="number"
                  v-model.number="newProductPrice"
                  class="form-control"
                  id="newProductPrice"
                  min="1"
                  required
                />
              </div>
              <div class="form-group">
                <label for="newProductBarcode">Product Barcode</label>
                <input
                  type="text"
                  v-model.number="newProductBarcode"
                  class="form-control"
                  id="newProductBarcode"
                  minlength="16"
                  maxlength="16"
                  required
                />
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-warning" data-dismiss="modal">
              Cancel
            </button>
            <button
              type="button"
              class="btn btn-primary"
              @click="createNewProduct"
              :data-dismiss="isFormValid() ? 'modal' : ''"
            >
              Create Product
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";

const apiUrl = `${process.env.VUE_APP_API_URL}/hoProductsEndpoint`;

export default {
  name: "Products",
  data: () => {
    return {
      products: [],
      loading: true,
      newProductName: "",
      newProductPrice: 0,
      newProductBarcode: "",
      statusMessage: "",
      alertClass: "alert-primary",
    };
  },
  created() {
    this.getProducts();
  },
  methods: {
    getProducts() {
      axios
        .get(`${apiUrl}/getAllProducts`)
        .then((response) => {
          this.products = [...response.data];
          this.loading = false;
        })
        .catch((err) => {
          console.log(err);
          this.products = [];
          this.loading = false;
        });
    },
    isFormValid() {
      if (this.$refs.newProductForm)
        return this.$refs.newProductForm.checkValidity();

      return false;
    },
    createNewProduct() {
      if (!this.isFormValid()) {
        this.$refs.newProductForm.reportValidity();
        return;
      }
      axios
        .post(`${apiUrl}/addNewProduct`, {
          productId: this.newProductBarcode,
          productName: this.newProductName,
          productPrice: this.newProductPrice,
        })
        .then((response) => {
          console.log(response);
          this.statusMessage = response.data;
          this.alertClass = "alert-success";
          this.getProducts();
        })
        .catch((err) => {
          console.log(err.response);
          this.statusMessage = err.response.data.message;
          this.alertClass = "alert-danger";
        });
    },
  },
};
</script>
