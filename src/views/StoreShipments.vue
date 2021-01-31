<template>
  <div class="container-fluid">
    <div
      class="alert alert-success alert-dismissible fade show"
      role="alert"
      v-if="statusMessage"
    >
      <span v-html="statusMessage"></span>
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
      <div class="col-xl-4 col-lg-5 col-md-6 col-12">
        <h4 class="display-4">All Store Shipments</h4>
        <hr />
      </div>
    </div>

    <div class="row">
      <EntityList
        :entities-list="storeShipmentsEntityList"
        :entity-name="'Store Shipment'"
        :modal-name="'createNewStoreShipmentModal'"
        @selectEntity="selectShipment"
      />
      <StoreShipmentDetails :selected-shipment="selectedShipment" />
    </div>
    <div
      class="modal fade"
      id="createNewStoreShipmentModal"
      tabindex="-1"
      aria-labelledby="modalLabel"
      aria-hidden="true"
      ref="warehouseModal"
    >
      <div class="modal-dialog modal-dialog-centered modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="modalLabel">
              Create New Warehouse
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
            <form ref="newStoreShipmentForm">
              <div class="form-group">
                <label for="newShipmentWarehouse">Warehouse</label>
                <select
                  name="newShipmentWarehouse"
                  id="newShipmentWarehouse"
                  class="custom-select"
                  v-model="newShipmentWarehouseId"
                  required
                >
                  <option disabled selected value="">Select Wareouse</option>
                  <option
                    v-for="w in warehouses"
                    :key="w.id"
                    :value="w.warehouseId"
                  >
                    {{ w.name }}
                  </option>
                </select>
              </div>
              <div class="form-group">
                <label for="newShipmentStore">Store</label>
                <select
                  name="newShipmentStore"
                  id="newShipmentStore"
                  class="custom-select"
                  v-model="newShipmentStoreId"
                  required
                >
                  <option disabled selected value="">Select Store</option>
                  <option v-for="s in stores" :key="s.id" :value="s.storeId">
                    {{ s.name }}
                  </option>
                </select>
              </div>
              <div class="form-group" v-if="newShipmentWarehouseId">
                <button
                  class="btn btn-primary btn-block"
                  type="button"
                  @click="addProduct"
                >
                  Add Product
                </button>
                <div class="row" v-for="(p, index) in products" :key="p.id">
                  <div class="col">
                    <label>Product SKU</label>
                    <input
                      type="text"
                      class="form-control"
                      :class="{
                        'is-invalid':
                          p.productIdError && p.productIdError != null,
                        'is-valid': p.productIdError === null,
                      }"
                      placeholder="Enter 16 digit SKU"
                      v-model.trim="p.productId"
                      @change="validateProductSku(index)"
                      required
                    />
                    <small class="form-text text-danger">
                      {{ p.productIdError }}
                    </small>
                  </div>
                  <div class="col">
                    <label>Quantity</label>
                    <input
                      type="number"
                      class="form-control"
                      :class="{
                        'is-invalid':
                          p.quantityError && p.quantityError != null,
                        'is-valid': p.quantityError === null,
                      }"
                      min="1"
                      v-model.number="p.quantity"
                      :disabled="!p.productId || p.productIdError != null"
                      @change="validateProductQuantity(index)"
                      required
                    />
                    <small class="form-text text-danger">
                      {{ p.quantityError }}
                    </small>
                  </div>
                  <div class="col">
                    <label for="Remove Product" class="form-label">
                      Remove Product
                    </label>
                    <button
                      class="btn btn-danger form-control"
                      type="button"
                      @click="removeProduct(index)"
                    >
                      <faIcon :icon="['fas', 'minus-circle']"></faIcon>
                    </button>
                  </div>
                </div>
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
              @click="createNewRestockShipment"
              :data-dismiss="isFormValid() ? 'modal' : ''"
              :disabled="products.length === 0"
            >
              Create Restock Shipment
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import _ from "lodash";
import EntityList from "@/components/EntityList.vue";
import StoreShipmentDetails from "@/components/StoreShipmentDetails.vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faMinusCircle } from "@fortawesome/free-solid-svg-icons";

library.add(faMinusCircle);

const apiUrl = "https://owl-backend-server.herokuapp.com";

export default {
  name: "StoreShipments",
  components: { EntityList, StoreShipmentDetails },
  data: () => {
    return {
      storeShipments: null,
      selectedShipment: null,
      newShipmentWarehouseId: "",
      newShipmentStoreId: "",
      newShipmentProducts: "",
      warehouses: [],
      stores: [],
      products: [],
      statusMessage: "",
    };
  },
  created() {
    this.getStoreShipments();

    axios
      .get(`${apiUrl}/hoWarehousesEndpoint/getAllWarehouses`)
      .then((response) => {
        this.warehouses = [...response.data];
      })
      .catch((err) => console.log(err));

    axios
      .get(`${apiUrl}/hoStoresEndpoint/getAllStores`)
      .then((response) => {
        this.stores = [...response.data];
      })
      .catch((err) => console.log(err));
  },
  computed: {
    storeShipmentsEntityList() {
      if (!this.storeShipments) return null;

      return this.storeShipments.map((x) => ({
        entityId: x.internalShipmentId,
        name: `Shipment ${x.internalShipmentId}`,
      }));
    },
    validWarehouseName() {
      return this.newWarehouseName.trim();
    },
  },
  methods: {
    getStoreShipments() {
      axios
        .get(`${apiUrl}/hoRestockShipmentsEndpoint/getAllRestockShipments`)
        .then((response) => {
          this.storeShipments =
            response.data.length != 0 ? [...response.data] : [];

          window.scrollTo(0, 0);
        })
        .catch((err) => console.log(err));
    },
    selectShipment(internalShipmentId) {
      this.selectedShipment = _.find(
        this.storeShipments,
        (x) => x.internalShipmentId === internalShipmentId
      );
    },
    validateProductSku(idx) {
      let product = this.products[idx];

      if (product.productId.length !== 16) {
        product.productIdError = "SKU length should be 16 characters";
      } else {
        axios
          .get(
            `${apiUrl}/hoRestockShipmentsEndpoint/checkProductId?productId=${product.productId}`
          )
          .then(() => {
            product.productIdError = null;
          })
          .catch((err) => {
            product.productIdError = err.response.data;
            console.log(err);
          });
      }
    },
    validateProductQuantity(idx) {
      let product = this.products[idx];
      axios
        .get(
          `${apiUrl}/hoRestockShipmentsEndpoint/checkWarehouseQuantity?warehouseId=${this.newShipmentWarehouseId}&productId=${product.productId}&quantity=${product.quantity}`
        )
        .then(() => {
          product.quantityError = null;
        })
        .catch((err) => {
          product.quantityError = err.response.data;
          console.log(err);
        });
    },
    isFormValid() {
      if (this.$refs.newStoreShipmentForm)
        return this.$refs.newStoreShipmentForm.checkValidity();

      return false;
    },
    addProduct() {
      this.products.push({
        productId: "",
        quantity: "",
        quantityError: "",
        productIdError: "",
      });
    },
    removeProduct(idx) {
      this.products.splice(idx, 1);
    },
    createNewRestockShipment() {
      axios
        .post(`${apiUrl}/hoRestockShipmentsEndpoint/addRestockShipment`, {
          warehouseId: this.newShipmentWarehouseId,
          storeId: this.newShipmentStoreId,
          productCount: this.products.length,
          products: this.products,
        })
        .then((response) => {
          this.newShipmentWarehouseId = "";
          this.newShipmentStoreId = "";
          this.products = [];
          this.statusMessage = response.data;
          this.getWarehouses();
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>
