<template>
  <div class="container">
    <div
      class="alert alert-warning alert-dismissible fade show"
      v-if="!loading && sales.length === 0"
      role="alert"
    >
      No sales recorded for today
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
        <h3>All sales for today ({{ new Date().toUTCString() }})</h3>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <b-table
          :data="sales"
          :striped="true"
          :hoverable="true"
          :default-sort-direction="'asc'"
          :paginated="true"
          :pagination-rounded="true"
          :loading="loading"
          :per-page="10"
          :show-detail-icon="true"
          detailed
          aria-next-label="Next page"
          aria-previous-label="Previous page"
          aria-page-label="Page"
          aria-current-label="Current page"
        >
          <b-table-column
            field="saleId"
            label="ID"
            width="40"
            numeric
            sortable
            v-slot="props"
          >
            {{ props.row.saleId }}
          </b-table-column>
          <b-table-column field="store" label="Store" sortable v-slot="props">
            {{ props.row.store }}
          </b-table-column>
          <b-table-column
            field="promotion"
            label="Promotion"
            sortable
            v-slot="props"
          >
            {{ props.row.promotion }}
          </b-table-column>
          <b-table-column
            field="revenue"
            label="Revenue (Rp)"
            numeric
            v-slot="props"
            sortable
          >
            {{ props.row.revenue }}
          </b-table-column>
          <b-table-column field="time" label="Date" sortable v-slot="props">
            <span class="tag is-success">
              {{ new Date(props.row.time).toUTCString() }}
            </span>
          </b-table-column>
          <template #detail="props">
            <article class="media">
              <div class="media-content">
                <div class="content">
                  <table class="table">
                    <thead class="thead-dark">
                      <tr>
                        <th scope="col">Product</th>
                        <th scope="col">Quantity Sold</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="saleDetail in props.row.saleDetails"
                        :key="saleDetail.id"
                      >
                        <td>{{ saleDetail.product.productName }}</td>
                        <td>{{ saleDetail.product.quantity }}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </article>
          </template>
        </b-table>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import {
  faArrowUp,
  faAngleLeft,
  faAngleRight,
} from "@fortawesome/free-solid-svg-icons";

import { library } from "@fortawesome/fontawesome-svg-core";

library.add(faArrowUp, faAngleRight, faAngleLeft);
const apiUrl = "https://owl-backend-server.herokuapp.com/hoSalesEndpoint";

export default {
  name: "Sales",
  data: () => {
    return {
      sales: [],
      loading: false,
    };
  },
  created() {
    this.loading = true;
    axios
      .get(`${apiUrl}/getAllSalesToday`)
      .then((response) => {
        console.log(response);
        this.sales = [...response.data];
        this.loading = false;
      })
      .catch((err) => console.log(err));
  },
};
</script>
