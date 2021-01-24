<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <h3>
          Sales for {{ dateQueryString }}.
          <small class="text-muted">Returned {{ salesCount }} results</small>
        </h3>
      </div>
    </div>
    <div
      class="alert alert-warning alert-dismissible fade show"
      v-if="!loading && salesCount === 0"
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
          <form
            class="form-inline"
            @submit.prevent="$refs.saleChild.filterSales()"
          >
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
    <router-view
      :start-date="formattedStartDate"
      :end-date="formattedEndDate"
      ref="saleChild"
      @completedQuery="queryCompleted"
    ></router-view>
  </div>
</template>
<script>
import { Datetime } from "vue-datetime";

export default {
  name: "Sales",
  data: () => {
    return {
      startDate: "",
      endDate: "",
      dateQueryString: new Date().toLocaleDateString(),
      loading: false,
      salesCount: 0,
    };
  },
  components: {
    datetime: Datetime,
  },
  mounted() {
    this.$watch(
      "$refs.saleChild.loading",
      (val) => {
        this.loading = val;
      },
      { immediate: true }
    );
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
  },
  methods: {
    padValue(val) {
      if (val < 10) {
        return `0${val}`;
      }

      return val;
    },
    queryCompleted(salesNum) {
      this.salesCount = salesNum;
    },
  },
  watch: {
    $route(to, from) {
      console.log(to, from);
      this.startDate = "";
      this.endDate = "";
    },
  },
};
</script>
