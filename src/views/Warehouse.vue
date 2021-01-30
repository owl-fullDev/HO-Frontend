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
        <h4 class="display-4">All Warehouses</h4>
        <hr />
      </div>
    </div>

    <div class="row">
      <EntityList
        :entities-list="warehousesEntityList"
        :entity-name="'Warehouse'"
        :modal-name="'createNewWarehouseModal'"
        @selectEntity="selectWarehouse"
      />
      <WarehouseDetails
        :selected-warehouse="selectedWarehouse"
        @warehouseAction="updateWarehouses"
      />
    </div>
    <div
      class="modal fade"
      id="createNewWarehouseModal"
      tabindex="-1"
      aria-labelledby="modalLabel"
      aria-hidden="true"
      ref="warehouseModal"
    >
      <div class="modal-dialog modal-dialog-centered">
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
            <form ref="newWarehouseForm">
              <div class="form-group">
                <label for="newWarehouseName">Warehouse Name</label>
                <input
                  type="text"
                  v-model.trim="newWarehouseName"
                  class="form-control"
                  id="newWarehouseName"
                  required
                />
              </div>
              <div class="form-group">
                <label for="newWarehouseAddress">Warehouse Address</label>
                <input
                  type="text"
                  v-model.trim="newWarehouseAddress"
                  class="form-control"
                  id="newWarehouseAddress"
                  required
                />
              </div>
              <div class="form-group">
                <label for="newWarehousePhone">Phone #</label>
                <input
                  type="text"
                  v-model.trim="newWarehousePhone"
                  class="form-control"
                  id="newWarehousePhone"
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
              @click="createNewWarehouse"
              :data-dismiss="isFormValid() ? 'modal' : ''"
            >
              Create Warehouse
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
import WarehouseDetails from "@/components/WarehouseDetails.vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";

library.add(faTimesCircle);

const apiUrl = "https://owl-backend-server.herokuapp.com/hoWarehousesEndpoint";

export default {
  name: "Warehouse",
  components: { EntityList, WarehouseDetails },
  data: () => {
    return {
      warehouses: null,
      selectedWarehouse: null,
      promotions: [],
      newWarehouseName: "",
      newWarehouseAddress: "",
      newWarehousePhone: "",
      statusMessage: "",
    };
  },
  created() {
    this.getWarehouses();
  },
  computed: {
    warehousesEntityList() {
      if (!this.warehouses) return null;

      return this.warehouses.map((x) => ({
        entityId: x.warehouseId,
        name: x.name,
      }));
    },
    validWarehouseName() {
      return this.newWarehouseName.trim();
    },
  },
  methods: {
    getWarehouses() {
      axios
        .get(`${apiUrl}/getAllWarehouses`)
        .then((response) => {
          this.warehouses = response.data.length != 0 ? [...response.data] : [];

          window.scrollTo(0, 0);
        })
        .catch((err) => console.log(err));
    },
    selectWarehouse(warehouseId) {
      this.selectedWarehouse = _.find(
        this.warehouses,
        (x) => x.warehouseId === warehouseId
      );
    },
    isFormValid() {
      if (this.$refs.newWarehouseForm)
        return this.$refs.newWarehouseForm.checkValidity();

      return false;
    },
    updateWarehouses(action) {
      if (action === "Delete") {
        axios
          .get(
            `${apiUrl}/deleteWarehouse?warehouseId=${this.selectedWarehouse.warehouseId}`
          )
          .then((response) => {
            console.log(response);
            this.statusMessage = response.data;
            this.selectedWarehouse = null;
            this.getWarehouses();
          })
          .catch((err) => console.log(err));
      }
    },
    createNewWarehouse() {
      axios
        .post(`${apiUrl}/addWarehouse`, {
          name: this.newWarehouseName,
          address: this.newWarehouseAddress,
          city: this.newWarehouseCity,
          phoneNumber: this.newWarehousePhone,
        })
        .then((response) => {
          this.newWarehouseLocation = "";
          this.statusMessage = response.data;
          this.getWarehouses();
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>
