<template>
  <div>
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
          <b-table-column field="name" label="Store" sortable v-slot="props">
            {{ props.row.name }}
          </b-table-column>
          <b-table-column
            field="saleCount"
            label="Sale Count"
            numeric
            v-slot="props"
            sortable
          >
            {{ props.row.saleCount }}
          </b-table-column>
          <b-table-column
            field="totalRevenue"
            label="Revenue (Rp)"
            numeric
            v-slot="props"
            sortable
          >
            {{ props.row.totalRevenue }}
          </b-table-column>

          <template #detail="props">
            <article class="media">
              <div class="media-content">
                <div class="content">
                  <h4>
                    Store Details
                    <small class="text-muted">
                      Store ID: {{ props.row.storeId }}
                    </small>
                  </h4>
                  <hr />
                  <div class="list-group">
                    <button class="list-group-item list-group-item-action">
                      <strong>Address:</strong>
                      {{ props.row.address }}
                    </button>
                    <button class="list-group-item list-group-item-action">
                      <strong>City:</strong>
                      {{ props.row.city }}
                    </button>
                    <button class="list-group-item list-group-item-action">
                      <strong>Phone #:</strong>
                      {{ props.row.phone_number }}
                    </button>
                  </div>
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
const apiUrl = `${process.env.VUE_APP_API_URL}/hoSalesEndpoint`;

export default {
  name: "SalesByStore",
  props: ["startDate", "endDate"],
  data: () => {
    return {
      sales: [],
      loading: false,
    };
  },
  created() {
    this.loading = true;
    axios
      .get(`${apiUrl}/getAllSalesTodayByStore`)
      .then((response) => {
        console.log(response);
        this.sales = [...response.data];
        this.loading = false;
        this.$emit("completedQuery", response.data.length);
      })
      .catch((err) => {
        this.loading = false;
        console.log(err);
      });
  },
  methods: {
    filterSales() {
      this.loading = true;

      if (this.startDate && this.endDate) {
        axios
          .get(
            `${apiUrl}/getAllSalesForSpecificPeriodByStore?start=${this.startDate}&end=${this.endDate}`
          )
          .then((response) => {
            this.sales = [...response.data];
            // prettier-ignore
            this.dateQueryString = `${new Date(this.startDate).toLocaleDateString()} - ${new Date(this.endDate).toLocaleDateString()}`;
            this.loading = false;
            this.$emit("completedQuery", response.data.length);
          })
          .catch((err) => {
            this.loading = false;
            console.log(err);
          });
      }
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
