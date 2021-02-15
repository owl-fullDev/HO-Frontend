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
    >
      <div class="modal-dialog modal-dialog-centered modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="modalLabel">
              Create New Shipment
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
                <label for="originList">Origin</label>
                <select
                  name="newShipmentWarehouse"
                  id="originList"
                  class="custom-select"
                  v-model="selectedOriginType"
                  @change="
                    getDestinationsListByType('origin', selectedOriginType)
                  "
                  required
                >
                  <option disabled selected value="">Select Origin</option>
                  <option
                    v-for="origin in origins"
                    :key="origin.id"
                    :value="origin"
                  >
                    {{ origin }}
                  </option>
                </select>
              </div>
              <div class="form-group" v-if="selectedOriginType">
                <div v-if="originListByType.length !== 0">
                  <label for="origin">{{ selectedOriginType }}</label>
                  <select
                    class="custom-select"
                    name="Specific Origin"
                    id="origin"
                    v-model="selectedOrigin"
                    required
                  >
                    <option value="" disabled selected>
                      Select {{ selectedOriginType }}
                    </option>
                    <option
                      v-for="o in originListByType"
                      :key="o.id"
                      :value="o.id"
                    >
                      {{ o.name }}
                    </option>
                  </select>
                </div>
                <div v-else class="alert alert-warning" role="alert">
                  Please create a {{ selectedOriginType }}
                </div>
              </div>
              <div class="form-group">
                <label for="destinationsList">Destination</label>
                <select
                  name="Destinations List"
                  id="destinationsList"
                  class="custom-select"
                  v-model="selectedDestinationType"
                  required
                  @change="
                    getDestinationsListByType(
                      'destination',
                      selectedDestinationType
                    )
                  "
                >
                  <option disabled selected value="">Select Destination</option>
                  <option
                    v-for="destination in destinations"
                    :key="destination.id"
                    :value="destination"
                  >
                    {{ destination }}
                  </option>
                </select>
              </div>
              <div class="form-group" v-if="selectedDestinationType">
                <div v-if="destinationListByType.length !== 0">
                  <label for="destination">{{ selectedDestinationType }}</label>
                  <select
                    class="custom-select"
                    v-model="selectedDestination"
                    name="Specific Destination"
                    id="destination"
                    required
                  >
                    <option value="" disabled selected>
                      Select {{ selectedDestinationType }}
                    </option>
                    <option
                      v-for="d in destinationListByType"
                      :key="d.id"
                      :value="d.id"
                    >
                      {{ d.name }}
                    </option>
                  </select>
                </div>
                <div v-else class="alert alert-warning" role="alert">
                  Please create a {{ selectedDestinationType }}
                </div>
              </div>
              <div
                class="form-group"
                v-if="selectedDestination && selectedOrigin"
              >
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
                    <small v-if="selectedOriginType === 'Supplier'">
                      Any quantity can be entered here
                    </small>
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
              :data-dismiss="dismissModal ? 'modal' : ''"
              :disabled="products.length === 0"
            >
              Create Shipment
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
  name: "Shipments",
  components: { EntityList, StoreShipmentDetails },
  data: () => {
    return {
      storeShipments: null,
      selectedShipment: null,
      origins: ["Supplier", "Warehouse", "Store"],
      selectedOriginType: "",
      selectedOrigin: "",
      destinations: ["Warehouse", "Store"],
      selectedDestinationType: "",
      selectedDestination: "",
      destinationListByType: [],
      originListByType: [],
      products: [],
      statusMessage: "",
      dismissModal: false,
    };
  },
  created() {
    this.getStoreShipments();
  },
  computed: {
    storeShipmentsEntityList() {
      if (!this.storeShipments) return null;

      return this.storeShipments.map((x) => ({
        entityId: x.shipmentId,
        name: `Shipment ${x.shipmentId}`,
      }));
    },
    validWarehouseName() {
      return this.newWarehouseName.trim();
    },
  },
  methods: {
    getDestinationsListByType(location, type) {
      if (type === "Supplier") {
        axios
          .get(`${apiUrl}/hoSuppliersEndpoint/getAllSuppliers`)
          .then((response) => {
            this.originListByType = response.data.map((x) => ({
              name: x.name,
              id: x.supplierId,
            }));
          })
          .catch((err) => console.log(err));
      } else if (type === "Warehouse") {
        axios
          .get(`${apiUrl}/hoWarehousesEndpoint/getAllWarehouses`)
          .then((response) => {
            const list = response.data.map((x) => ({
              name: x.name,
              id: x.warehouseId,
            }));

            if (location === "destination") {
              this.destinationListByType = list;
            } else {
              this.originListByType = list;
            }
          })
          .catch((err) => console.log(err));
      } else {
        axios
          .get(`${apiUrl}/hoStoresEndpoint/getAllStores`)
          .then((response) => {
            const list = response.data.map((x) => ({
              name: x.name,
              id: x.storeId,
            }));

            if (location === "destination") {
              this.destinationListByType = list;
            } else {
              this.originListByType = list;
            }
          })
          .catch((err) => console.log(err));
      }
    },
    getStoreShipments() {
      axios
        .get(`${apiUrl}/hoShipmentsEndpoint/getAllShipments`)
        .then((response) => {
          this.storeShipments =
            response.data.length != 0 ? [...response.data] : [];

          window.scrollTo(0, 0);
        })
        .catch((err) => console.log(err));
    },
    selectShipment(shipmentId) {
      this.selectedShipment = _.find(
        this.storeShipments,
        (x) => x.shipmentId === shipmentId
      );
    },
    validateProductSku(idx) {
      let product = this.products[idx];

      if (product.productId.length !== 16) {
        product.productIdError = "SKU length should be 16 characters";
      } else {
        axios
          .get(
            `${apiUrl}/hoShipmentsEndpoint/checkProductId?productId=${product.productId}`
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
      if (this.selectedOriginType === "Supplier") {
        return;
      } else {
        let product = this.products[idx];

        if (this.selectedOriginType === "Warehouse") {
          axios
            .get(
              `${apiUrl}/hoShipmentsEndpoint/checkWarehouseQuantity?warehouseId=${this.selectedOrigin}&productId=${product.productId}&quantity=${product.quantity}`
            )
            .then(() => {
              product.quantityError = null;
            })
            .catch((err) => {
              product.quantityError = err.response.data;
              console.log(err);
            });
        } else {
          axios
            .get(
              `${apiUrl}/hoShipmentsEndpoint/checkStoreQuantity?storeId=${this.selectedOrigin}&productId=${product.productId}&quantity=${product.quantity}`
            )
            .then(() => {
              product.quantityError = null;
            })
            .catch((err) => {
              product.quantityError = err.response.data;
              console.log(err);
            });
        }
      }
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
      if (!this.isFormValid()) {
        this.$refs.newStoreShipmentForm.reportValidity();
        return;
      }
      this.dismissModal = true;
      let originType = 0;

      switch (this.selectedOriginType) {
        case "Supplier":
          originType = 1;
          break;
        case "Warehouse":
          originType = 2;
          break;
        case "Store":
          originType = 3;
          break;

        default:
          break;
      }

      let destinationType = 0;

      switch (this.selectedDestinationType) {
        case "Supplier":
          destinationType = 1;
          break;
        case "Warehouse":
          destinationType = 2;
          break;
        case "Store":
          destinationType = 3;
          break;

        default:
          break;
      }

      axios
        .post(`${apiUrl}/hoShipmentsEndpoint/addShipment`, {
          originType: originType,
          originId: this.selectedOrigin,
          destinationType: destinationType,
          destinationId: this.selectedDestination,
          productCount: this.products.length,
          products: this.products.map((x) => ({
            productId: x.productId,
            quantity: x.quantity,
          })),
        })
        .then((response) => {
          this.selectedOriginType = "";
          this.selectedDestinationType = "";
          this.selectedOrigin = "";
          this.selectedDestination = "";
          this.products = [];
          this.statusMessage = response.data;

          this.getStoreShipments();
        })
        .catch((err) => console.log(err));
    },
  },
  watch: {
    selectedOriginType(val) {
      this.products = [];

      if (val === "Supplier") {
        this.destinations = ["Warehouse"];
      } else {
        this.destinations = ["Warehouse", "Store"];
      }
    },
    selectedOrigin() {
      this.products.forEach((p, index) => {
        console.log(p);
        this.validateProductQuantity(index);
      });
    },
  },
};
</script>
