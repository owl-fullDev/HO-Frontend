<template>
  <div class="container">
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
    <div class="row ml-auto">
      <div class="col">
        <p class="h3">
          Returned <strong>{{ salesCount }} </strong> sales
        </p>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <DateFilter ref="dateFilter" @filter="$refs.saleChild.filterSales()" />
      </div>
    </div>

    <router-view
      :start-date="startDate"
      :end-date="endDate"
      ref="saleChild"
      @completedQuery="queryCompleted"
    ></router-view>
  </div>
</template>
<script>
import DateFilter from "@/components/DateFilter.vue";
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
    DateFilter,
  },
  mounted() {
    this.$watch(
      "$refs.saleChild.loading",
      (val) => {
        this.loading = val;
      },
      { immediate: true }
    );

    this.$watch(
      "$refs.dateFilter.formattedStartDate",
      (val) => {
        this.startDate = val;
      },
      { immediate: true }
    );

    this.$watch(
      "$refs.dateFilter.formattedEndDate",
      (val) => {
        this.endDate = val;
      },
      { immediate: true }
    );
  },

  methods: {
    queryCompleted(salesNum) {
      this.salesCount = salesNum;
    },
  },
  watch: {
    $route(to, from) {
      console.log(to, from);
      this.$refs.dateFilter.startDate = new Date().toISOString();
      this.$refs.dateFilter.endDate = new Date().toISOString();
    },
  },
};
</script>
