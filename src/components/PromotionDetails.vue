<template>
  <div class="col-xl col-lg-7 col-md-6 col-12 order-first order-md-last mb-2">
    <div class="card w-75" v-if="promoObj">
      <div class="card-header">
        <h4>{{ selectedPromotion.promotionName }}</h4>
      </div>
      <div class="card-body">
        <form>
          <div class="form-group">
            <label for="promoName">Promotion Name</label>
            <input
              type="text"
              v-model.trim="promoObj.promotionName"
              class="form-control"
              id="promoName"
              readonly
              aria-describedby="promoName"
            />
            <small id="promoName" class="form-text text-muted">
              Promo Id: {{ promoObj.promotionId }}
            </small>
          </div>
          <div class="form-group">
            <label for="promoName">Discount Percentage</label>
            <input
              type="text"
              v-model.number="promoObj.percentage"
              class="form-control"
              id="percentage"
              readonly
              aria-describedby="percentage"
            />
          </div>
        </form>
        <div class="row">
          <div class="col">
            <h5>Stores</h5>
            <hr />
            <ul class="list-group">
              <li
                v-for="store in allStores"
                :key="store.id"
                class="list-group-item"
                :class="{
                  'list-group-item-success': store.active,
                  'list-group-item-danger': !store.active,
                }"
              >
                <div class="row">
                  <div class="col">
                    {{ store.location }}
                  </div>
                  <div class="col text-right">
                    <div class="custom-control custom-checkbox">
                      <input
                        type="checkbox"
                        class="custom-control-input"
                        :id="`customCheck-${store.storeId}`"
                        v-model="store.active"
                        @click="setStoreStatus(store.storeId)"
                      />
                      <label
                        class="custom-control-label"
                        :for="`customCheck-${store.storeId}`"
                      >
                        {{ store.active ? "Deactivate" : "Activate" }}
                      </label>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <div class="col">
            <h5>Actions</h5>
            <hr />
            <div class="row mb-3">
              <div class="col">
                <button
                  class="btn btn-success"
                  @click="selectedAction = 'Activate in all stores'"
                  data-toggle="modal"
                  data-target="#confirmationModal"
                >
                  Activate in all stores
                </button>
              </div>
            </div>

            <div class="row mb-3">
              <div class="col">
                <button
                  class="btn btn-secondary"
                  @click="selectedAction = 'Deactivate in all stores'"
                  data-toggle="modal"
                  data-target="#confirmationModal"
                >
                  Deactivate in all stores
                </button>
              </div>
            </div>

            <!-- <div class="row">
              <div class="col">
                <button
                  class="btn btn-danger"
                  @click="selectedAction = 'Delete'"
                  data-toggle="modal"
                  data-target="#confirmationModal"
                >
                  Delete
                </button>
              </div>
            </div> -->
          </div>
        </div>
      </div>
      <div
        class="modal fade"
        id="confirmationModal"
        tabindex="-1"
        aria-labelledby="confirmationModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="confirmationModalLabel">
                {{ promoObj.promotionName }} - {{ selectedAction }}
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
              Are you sure you want to do the action
              <strong>{{ selectedAction }}</strong> for the Promotion:
              <strong>{{ promoObj.promotionName }}</strong>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-dismiss="modal"
              >
                Cancel
              </button>
              <button
                type="button"
                class="btn btn-primary"
                @click="$emit('promoAction', selectedAction)"
                data-dismiss="modal"
              >
                {{ selectedAction }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import _ from "lodash";

const apiUrl = "https://owl-backend-server.herokuapp.com/hoPromotionsEndpoint";

export default {
  name: "PromotionDetails",
  props: ["selectedPromotion", "stores"],
  data: () => {
    return {
      promoObj: null,
      allStores: [],
      selectedAction: "",
    };
  },
  computed: {
    renderTemplate() {
      return this.selectedPromotion != null;
    },
  },
  methods: {
    setStoreStatus(storeId) {
      const store = _.find(this.allStores, (s) => s.storeId === storeId);

      this.$emit(
        "promoAction",
        "individualStoreUpdate",
        storeId,
        !store.active
      );
    },
  },
  watch: {
    selectedPromotion: {
      deep: true,
      handler(val) {
        if (val) {
          this.promoObj = { ...val };

          axios
            .get(
              `${apiUrl}/getPromotionActiveStoreList?promotionId=${val.promotionId}`
            )
            .then((response) => {
              let activeStoreList = response.data.map((s) => s.storeId);
              this.allStores = this.stores.map((s) => {
                let storeToAdd = { active: false, ...s };
                if (activeStoreList.includes(s.storeId)) {
                  storeToAdd.active = true;
                }

                return storeToAdd;
              });
            })
            .catch((err) => console.log(err));
        } else {
          this.promoObj = null;
        }
      },
    },
  },
};
</script>
