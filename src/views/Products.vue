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
          data-target="#productModal"
          @click="resetProductData"
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
            v-slot="props"
            sortable
          >
            {{ props.row.productPrice }}
          </b-table-column>
          <b-table-column label="Actions" v-slot="props">
            <button
              class="btn btn-link"
              @click="modifyProduct(props.row)"
              data-toggle="modal"
              data-target="#productModal"
            >
              Modify
            </button>
          </b-table-column>
        </b-table>
      </div>
    </div>
    <!-- Modal -->
    <div
      class="modal fade"
      id="productModal"
      tabindex="-1"
      aria-labelledby="productModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="productModalLabel">
              {{ modalAction }} Product
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
                <label for="productBarcode">Product Barcode</label>
                <input
                  type="text"
                  v-model.number="productBarcode"
                  class="form-control"
                  id="productBarcode"
                  minlength="16"
                  maxlength="16"
                  required
                  :readonly="inputReadonly"
                />
              </div>
              <div class="form-group">
                <label for="productName">Product Name</label>
                <input
                  type="text"
                  v-model.trim="productName"
                  class="form-control"
                  id="productName"
                  required
                />
              </div>
              <div class="form-group">
                <label for="productPrice">Price (Rp)</label>
                <input
                  type="number"
                  v-model.number="productPrice"
                  class="form-control"
                  id="productPrice"
                  min="1"
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
              @click="productAction"
              :data-dismiss="isFormValid() ? 'modal' : ''"
            >
              {{ modalAction }} Product
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
      productName: "",
      productPrice: 0,
      productBarcode: "",
      statusMessage: "",
      alertClass: "alert-primary",
      modalAction: "Create",
    };
  },
  created() {
    this.getProducts();
  },
  computed: {
    inputReadonly() {
      return this.modalAction === "Modify";
    },
  },
  methods: {
    resetProductData() {
      this.productName = "";
      this.productBarcode = "";
      this.productPrice = 0;

      this.modalAction = "Create";
    },
    modifyProduct(product) {
      this.productName = product.productName;
      this.productBarcode = product.productId;
      this.productPrice = product.productPrice;

      this.modalAction = "Modify";
    },
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
    productAction() {
      if (!this.isFormValid()) {
        this.$refs.newProductForm.reportValidity();
        return;
      }

      const product = {
        productId: this.productBarcode,
        productName: this.productName,
        productPrice: this.productPrice,
      };

      if (this.modalAction === "Create") {
        axios
          .post(`${apiUrl}/addNewProduct`, product)
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
      } else if (this.modalAction === "Modify") {
        axios
          .post(`${apiUrl}/updateProduct`, product)
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
      }
    },
  },
};
</script>
