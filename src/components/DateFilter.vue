<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col">
        <h4>Results {{ dateQueryString }}</h4>
      </div>
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
          <form class="form-inline" @submit.prevent="filterResults">
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
  </div>
</template>
<script>
import { Datetime } from "vue-datetime";

export default {
  name: "DateFilter",
  components: {
    datetime: Datetime,
  },
  props: ["loading"],
  data: () => {
    return {
      startDate: new Date().toISOString(),
      endDate: new Date().toISOString(),
      dateQueryString: `for ${new Date().toDateString()}`,
    };
  },
  computed: {
    maxDate() {
      let today = new Date();
      today.setHours(0, 0, 0, 0);
      return today.toISOString();
    },
    formattedStartDate() {
      const startDate = new Date(this.startDate);

      let month = this.padValue(startDate.getMonth() + 1);
      let date = this.padValue(startDate.getDate());

      return `${startDate.getFullYear()}-${month}-${date}`;
    },
    formattedEndDate() {
      const endDate = new Date(this.endDate);
      let date = this.padValue(endDate.getDate());
      let month = this.padValue(endDate.getMonth() + 1);
      return `${endDate.getFullYear()}-${month}-${date}`;
    },
  },
  methods: {
    padValue(val) {
      if (val < 10) {
        return `0${val}`;
      }

      return val;
    },
    filterResults() {
      if (Date.parse(this.startDate) == Date.parse(this.endDate)) {
        this.dateQueryString = new Date(this.startDate).toDateString();
      } else {
        // prettier-ignore
        this.dateQueryString = `From ${new Date(this.startDate).toDateString()} to  ${new Date(this.endDate).toDateString()}`;
      }
      this.$emit("filter");
    },
  },
};
</script>
