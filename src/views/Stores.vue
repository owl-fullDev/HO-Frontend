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
        <h4 class="display-4">All Stores</h4>
        <hr />
      </div>
    </div>

    <div class="row">
      <EntityList
        :entities-list="storesEntityList"
        :entity-name="'store'"
        :modal-name="'createNewStoreModal'"
        @selectEntity="selectStore"
      />
      <StoreDetails
        :selected-store="selectedStore"
        @storeAction="updateStores"
      />
    </div>
    <div
      class="modal fade"
      id="createNewStoreModal"
      tabindex="-1"
      aria-labelledby="modalLabel"
      aria-hidden="true"
      ref="storeModal"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="modalLabel">
              Create New Store
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
            <form ref="newStoreForm">
              <div class="form-group">
                <label for="newStoreName">Store Name</label>
                <input
                  type="text"
                  v-model.trim="newStoreName"
                  class="form-control"
                  id="newStoreName"
                  required
                />
              </div>
              <div class="form-group">
                <label for="newStoreAddress">Store Address</label>
                <input
                  type="text"
                  v-model.trim="newStoreAddress"
                  class="form-control"
                  id="newStoreAddress"
                  required
                />
              </div>
              <div class="form-group">
                <label for="newStoreCity">City</label>
                <b-autocomplete
                  v-model="newStoreCity"
                  placeholder="e.g. Jakarta"
                  :open-on-focus="true"
                  :clearable="true"
                  :data="filteredCitiesArray"
                  custom-class="form-control"
                  required
                >
                  <template #empty>No results found</template>
                </b-autocomplete>
              </div>
              <div class="form-group">
                <label for="newStorePhone">Phone #</label>
                <input
                  type="text"
                  v-model.trim="newStorePhone"
                  class="form-control"
                  id="newStorePhone"
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
              @click="createNewStore"
              :data-dismiss="isFormValid() ? 'modal' : ''"
            >
              Create Store
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
import StoreDetails from "@/components/StoreDetails.vue";
import { Cities } from "@/Variables.js";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";

library.add(faTimesCircle);

const apiUrl = `${process.env.VUE_APP_API_URL}/hoStoresEndpoint`;

export default {
  name: "Stores",
  components: { EntityList, StoreDetails },
  data: () => {
    return {
      stores: null,
      selectedStore: null,
      promotions: [],
      newStoreName: "",
      newStoreAddress: "",
      newStorePhone: "",
      newStoreCity: "",
      statusMessage: "",
    };
  },
  created() {
    this.getStores();
  },
  computed: {
    storesEntityList() {
      if (!this.stores) return null;

      return this.stores.map((x) => ({
        entityId: x.storeId,
        name: x.name,
      }));
    },
    validStoreName() {
      return this.newStoreName.trim();
    },
    filteredCitiesArray() {
      return Cities.filter((option) => {
        return (
          option
            .toString()
            .toLowerCase()
            .indexOf(this.newStoreCity.toLowerCase()) >= 0
        );
      });
    },
  },
  methods: {
    getStores() {
      axios
        .get(`${apiUrl}/getAllStores`)
        .then((response) => {
          this.stores = response.data.length != 0 ? [...response.data] : [];

          window.scrollTo(0, 0);
        })
        .catch((err) => console.log(err));
    },
    selectStore(storeId) {
      this.selectedStore = _.find(this.stores, (x) => x.storeId === storeId);
    },
    isFormValid() {
      if (this.$refs.newStoreForm)
        return this.$refs.newStoreForm.checkValidity();

      return false;
    },
    updateStores(action) {
      if (action === "Delete") {
        axios
          .get(`${apiUrl}/deleteStore?storeId=${this.selectedStore.storeId}`)
          .then((response) => {
            console.log(response);
            this.statusMessage = response.data;
            this.selectedStore = null;
            this.getStores();
          })
          .catch((err) => console.log(err));
      }
    },
    createNewStore() {
      axios
        .post(`${apiUrl}/addStore`, {
          name: this.newStoreName,
          address: this.newStoreAddress,
          city: this.newStoreCity,
          phoneNumber: this.newStorePhone,
        })
        .then((response) => {
          this.newStoreLocation = "";
          this.statusMessage = response.data;
          this.getStores();
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>
