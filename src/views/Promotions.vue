<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-xl-4 col-lg-5 col-md-6 col-12">
        <h4 class="display-4">All Promotions</h4>
        <hr />
        <div class="h-50 overflow-auto">
          <div
            v-if="currentPromotions.length === 0"
            class="d-flex justify-content-center"
          >
            <div class="spinner-border" role="status">
              <span class="sr-only">Loading...</span>
            </div>
          </div>
          <div
            class="card mb-2"
            v-for="promo in currentPromotions"
            :key="promo.id"
          >
            <div class="card-body">
              <h3 class="card-title">{{ promo.promotionName }}</h3>
              <button type="button" class="btn btn-primary btn-block">
                Select Promotion
              </button>
            </div>
          </div>
        </div>
        <div class="card">
          <div class="card-body">
            <h3 class="card-title">Create New Promo</h3>
            <button type="button" class="btn btn-success btn-block">
              Create
            </button>
          </div>
        </div>
      </div>
      <div class="col-xl col-lg-7 col-md-6 col-12">
        <div class="card" style="display: none;">
          <div class="card-header">
            Featured
          </div>
          <div class="card-body">
            <h5 class="card-title">Card title</h5>
            <p class="card-text">
              With supporting text below as a natural lead-in to additional
              content.
            </p>
            <a href="#" class="btn btn-primary">Button</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";

const apiUrl = "https://owl-backend-server.herokuapp.com/hoPromotionsEndpoint";
export default {
  name: "Promotions",
  data: () => {
    return {
      currentPromotions: [],
    };
  },
  created() {
    axios
      .get(`${apiUrl}/getAllPromotions`)
      .then((response) => {
        this.currentPromotions = [...response.data];
      })
      .catch((err) => console.log(err));
  },
};
</script>
