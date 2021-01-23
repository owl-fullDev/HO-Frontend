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
        <h4 class="display-4">All Promotions</h4>
        <hr />
      </div>
    </div>
    <div class="row">
      <EntityList
        :entities-list="currentPromoEntityList"
        :entity-name="'promotion'"
        :modal-name="'createNewPromoModal'"
        @selectEntity="selectPromo"
      />

      <PromotionDetails
        :selected-promotion="selectedPromotion"
        :stores="stores"
        @promoAction="updatePromotion"
      />
    </div>
    <div
      class="modal fade"
      id="createNewPromoModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">
              Create New Promotion
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
            <form ref="newPromoForm">
              <div class="form-group">
                <label for="promotionName">Promotion Name</label>
                <input
                  type="text"
                  v-model.trim="newPromotionName"
                  class="form-control"
                  id="promotionName"
                  required
                />
              </div>
              <div class="form-group">
                <label for="newPercentage">Percentage (%)</label>
                <input
                  type="number"
                  v-model.number="newPromotionPercentage"
                  class="form-control"
                  id="newPercentage"
                  min="0"
                  max="100"
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
              @click="createNewPromotion"
              :data-dismiss="isFormValid() ? 'modal' : ''"
            >
              Create promotion
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
import PromotionDetails from "@/components/PromotionDetails.vue";
import EntityList from "@/components/EntityList.vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";

library.add(faPlusCircle);

const apiUrl = "https://owl-backend-server.herokuapp.com";
export default {
  name: "Promotions",
  components: { PromotionDetails, EntityList },
  data: () => {
    return {
      currentPromotions: null,
      selectedPromotion: null,
      stores: [],
      newPromotionName: "",
      newPromotionPercentage: 0,
      statusMessage: "",
    };
  },
  methods: {
    selectPromo(promoId) {
      this.selectedPromotion = _.find(
        this.currentPromotions,
        (x) => x.promotionId == promoId
      );
    },
    isFormValid() {
      if (this.$refs.newPromoForm)
        return this.$refs.newPromoForm.checkValidity();

      return false;
    },
    createNewPromotion() {
      console.log(this.isFormValid());
      if (!this.isFormValid()) {
        this.$refs.newPromoForm.reportValidity();
        return;
      }

      axios
        .post(`${apiUrl}/hoPromotionsEndpoint/addPromotion`, {
          percentage: this.newPromotionPercentage,
          promotionName: this.newPromotionName,
        })
        .then((response) => {
          console.log(response);
          this.statusMessage = `Promotion <strong> ${this.newPromotionName} </strong> successfully created`;
          this.newPromotionName = "";
          this.newPromotionPercentage = 0;
          this.updatePromotionsList();
        })
        .catch((err) => console.log(err));
    },
    deletePromotion() {
      axios
        .get(
          `${apiUrl}/hoPromotionsEndpoint/deletePromotion?promotionId=${this.selectedPromotion.promotionId}`
        )
        .then(async (response) => {
          console.log(response);
          this.statusMessage = `Promotion <strong> ${this.selectedPromotion.promotionName} </strong> successfully deleted`;
          await this.updatePromotionsList();
        })
        .catch((err) => console.log(err));
    },
    updatePromoActivation(action) {
      let apiAction = "";

      if (action.includes("Deactivate")) {
        apiAction = "removePromotionAllStores";
      } else {
        apiAction = "setPromotionAllStores";
      }

      axios
        .get(
          `${apiUrl}/hoPromotionsEndpoint/${apiAction}?promotionId=${this.selectedPromotion.promotionId}`
        )
        .then(async (response) => {
          console.log(response);
          this.statusMessage = response.data;
          const promoId = this.selectedPromotion.promotionId;
          await this.updatePromotionsList(promoId);
        })
        .catch((err) => console.log(err));
    },
    updatePromotion(action, storeId, activationStatus) {
      if (!storeId) {
        if (action === "Delete") {
          this.deletePromotion();
        } else {
          this.updatePromoActivation(action);
        }
      } else {
        this.activatePromotionForStore(storeId, activationStatus);
      }
    },
    activatePromotionForStore(storeId, activationStatus) {
      let apiAction = "";

      if (activationStatus) {
        apiAction = "setPromotionOneStore";
      } else {
        apiAction = "removePromotionOneStore";
      }
      axios
        .get(
          `${apiUrl}/hoPromotionsEndpoint/${apiAction}?promotionId=${this.selectedPromotion.promotionId}&storeId=${storeId}`
        )
        .then(async (response) => {
          this.statusMessage = response.data;
          const promoId = this.selectedPromotion.promotionId;
          await this.updatePromotionsList(promoId);
        })
        .catch((err) => console.log(err));
    },
    async updatePromotionsList(promoId) {
      axios
        .get(`${apiUrl}/hoPromotionsEndpoint/getAllPromotions`)
        .then((response) => {
          this.currentPromotions =
            response.data.length != 0 ? [...response.data] : [];
          if (isNaN(promoId)) {
            this.selectedPromotion = null;
          } else {
            this.selectPromo(promoId);
          }
          window.scrollTo(0, 0);
        })
        .catch((err) => console.log(err));
    },
  },
  computed: {
    currentPromoEntityList() {
      if (!this.currentPromotions) return null;

      return this.currentPromotions.map((x) => ({
        entityId: x.promotionId,
        name: x.promotionName,
      }));
    },
  },
  async created() {
    await this.updatePromotionsList(this.$route.params.promoId);

    axios
      .get(`${apiUrl}/hoStoresEndpoint/getAllStores`)
      .then((response) => {
        this.stores = [...response.data];
      })
      .catch((err) => console.log(err));
  },
  watch: {
    currentPromotions(val) {
      console.log(val);
    },
  },
};
</script>
