<template>
  <div class="col-xl col-lg-7 col-md-6 col-12 order-first order-md-last mb-2">
    <div class="card w-75" v-if="storeObj">
      <div class="card-header">
        <h4>{{ storeObj.name }}</h4>
      </div>
      <div class="card-body">
        <form>
          <div class="form-group">
            <label for="storeAddress">Address</label>
            <input
              type="text"
              v-model.trim="storeObj.address"
              class="form-control"
              id="storeAddress"
              readonly
              aria-describedby="promoName"
            />
            <small id="promoName" class="form-text text-muted">
              Store Id: {{ storeObj.storeId }}
            </small>
          </div>
          <div class="form-group">
            <label for="city">City</label>
            <input
              type="text"
              v-model.trim="storeObj.city"
              class="form-control"
              id="city"
              readonly
            />
          </div>
          <div class="form-group">
            <label for="phoneNum">Phone #</label>
            <input
              type="text"
              v-model.trim="storeObj.phone_number"
              class="form-control"
              id="phoneNum"
              readonly
            />
          </div>
        </form>
        <div class="row">
          <div class="col">
            <h5>Promotions</h5>
            <hr />
            <div
              v-if="activePromotions.length === 0"
              class="alert alert-warning"
              role="alert"
            >
              No Promotions
            </div>
            <div class="list-group">
              <router-link
                class="list-group-item list-group-item-action"
                :to="{
                  name: 'Promotions',
                  params: { promoId: promo.promotionId },
                }"
                v-for="promo in activePromotions"
                :key="promo.id"
              >
                {{ promo.promotionName }}
              </router-link>
            </div>
          </div>
          <div class="col">
            <h5>Employees</h5>
            <hr />
            <div
              v-if="employees.length === 0"
              class="alert alert-warning"
              role="alert"
            >
              No Employees
            </div>
            <div class="list-group">
              <router-link
                class="list-group-item list-group-item-action"
                to="/employees"
                v-for="employee in employees"
                :key="employee.id"
              >
                {{ employee.firstName }} {{ employee.lastname }}
              </router-link>
            </div>
          </div>
          <div class="col">
            <h5>Actions</h5>
            <hr />

            <div class="row">
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
            </div>
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
                {{ storeObj.name }} - {{ selectedAction }}
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
              <strong>{{ selectedAction }}</strong> for the Store:
              <strong>{{ storeObj.name }}</strong>
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
                @click="$emit('storeAction', selectedAction)"
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

const apiUrl = "https://owl-backend-server.herokuapp.com/hoStoresEndpoint";

export default {
  name: "StoreDetails",
  props: ["selectedStore"],
  data: () => {
    return {
      storeObj: null,
      selectedAction: "",
      employees: [],
      activePromotions: [],
    };
  },
  watch: {
    selectedStore: {
      handler(val) {
        if (val) {
          this.storeObj = { ...val };

          axios
            .get(`${apiUrl}/getStorePromotions?storeId=${val.storeId}`)
            .then((response) => {
              this.activePromotions = [...response.data];
            })
            .catch((err) => console.log(err));

          axios
            .get(`${apiUrl}/getStoreEmployees?storeId=${val.storeId}`)
            .then((response) => {
              this.employees = [...response.data];
            })
            .catch((err) => console.log(err));
        } else {
          this.storeObj = null;
        }
      },
    },
  },
};
</script>
