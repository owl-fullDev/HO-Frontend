<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <h3>
          All sales for {{ dateQueryString }}.
          <small class="text-muted">Returned {{ salesCount }} results</small>
        </h3>
      </div>
    </div>
    <div
      class="alert alert-warning alert-dismissible fade show"
      v-if="!loading && sales.length === 0"
      role="alert"
    >
      No sales recorded for {{ dateQueryString }}
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
          style="padding-left: 0 !important"
          class="btn btn-link mb-2"
          type="button"
          data-toggle="collapse"
          data-target="#filterForm"
          aria-expanded="false"
          aria-controls="filterForm"
        >
          Click to toggle filters
        </button>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <div class="collapse" id="filterForm">
          <form class="form-inline" @submit.prevent="filterSales">
            <datetime
              v-model="startDate"
              input-class="form-control mb-2 mr-sm-2"
              placeholder="Start Date"
              :max-datetime="maxDate"
              :phrases="{ ok: 'Select', cancel: 'Exit' }"
              zone="local"
              value-zone="local"
              required
            ></datetime>

            <datetime
              v-model="endDate"
              input-class="form-control mb-2 mr-sm-2"
              placeholder="End Date"
              :max-datetime="maxDate"
              :phrases="{ ok: 'Select', cancel: 'Exit' }"
              zone="local"
              value-zone="local"
              required
            ></datetime>
            <button
              type="submit"
              class="btn btn-success mb-2"
              :disabled="loading"
            >
              Filter
            </button>
          </form>
        </div>
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
import { Datetime } from "vue-datetime";

library.add(faArrowUp, faAngleRight, faAngleLeft);
const apiUrl = "https://owl-backend-server.herokuapp.com/hoSalesEndpoint";

export default {
  name: "Sales",
  data: () => {
    return {
      dateQueryString: new Date().toLocaleDateString(),
      sales: [],
      loading: false,
      startDate: "",
      endDate: "",
    };
  },
  components: {
    datetime: Datetime,
  },
  computed: {
    maxDate() {
      let today = new Date();
      today.setHours(0, 0, 0, 0);
      return today.toISOString();
    },
    formattedStartDate() {
      if (this.startDate) {
        const startDate = new Date(this.startDate);
        let month = this.padValue(startDate.getMonth() + 1);
        let date = this.padValue(startDate.getDate());

        return `${startDate.getFullYear()}-${month}-${date}`;
      }

      return "";
    },
    formattedEndDate() {
      if (this.endDate) {
        const endDate = new Date(this.endDate);
        let date = this.padValue(endDate.getDate());
        let month = this.padValue(endDate.getMonth() + 1);
        return `${endDate.getFullYear()}-${month}-${date}`;
      }

      return "";
    },
    salesCount() {
      return this.sales.length;
    },
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
  methods: {
    filterSales() {
      this.loading = true;

      if (this.formattedStartDate && this.formattedEndDate) {
        axios
          .get(
            `${apiUrl}/getAllSalesForSpecificPeriod?start=${this.formattedStartDate}&end=${this.formattedEndDate}`
          )
          .then((response) => {
            this.sales = [...response.data];
            // prettier-ignore
            this.dateQueryString = `${new Date(this.startDate).toLocaleDateString()} - ${new Date(this.endDate).toLocaleDateString()}`;
            this.loading = false;
          })
          .catch((err) => console.log(err));
      }
    },
    padValue(val) {
      if (val < 10) {
        return `0${val}`;
      }

      return val;
    },
  },
};
</script>
<style>
@media screen and (min-width: 769px), print {
  .pagination-list {
    margin-bottom: 0 !important;
  }
}
</style>
