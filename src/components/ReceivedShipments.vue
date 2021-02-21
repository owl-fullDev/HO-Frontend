<template>
  <div class="container-fluid">
    <div
      class="alert alert-dismissible fade show"
      :class="alertClass"
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
    <DateFilter
      :loading="loading"
      ref="dateFilter"
      @filter="getReceivedShipments"
    />
    <div class="row">
      <div class="col">
        <b-table
          :data="receivedShipments"
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
          :row-class="
            (row, index) =>
              row.hasWrongAmt ? 'bg-gradient-danger' : 'bg-gradient-success'
          "
        >
          <b-table-column
            field="shipmentId"
            label="ID"
            sortable
            numeric
            v-slot="props"
          >
            {{ props.row.shipmentId }}
          </b-table-column>
          <b-table-column
            field="originName"
            label="Origin"
            sortable
            v-slot="props"
          >
            {{ props.row.originName }} ({{ props.row.originType }})
          </b-table-column>
          <b-table-column
            field="destinationName"
            label="Destination"
            sortable
            v-slot="props"
          >
            {{ props.row.destinationName }} ({{ props.row.destinationType }})
          </b-table-column>

          <b-table-column field="status" label="Status" v-slot="props">
            {{ props.row.status }}
          </b-table-column>
          <template #detail="props">
            <article class="media">
              <div class="media-content">
                <div class="content w-50">
                  <h4>Shipment Details</h4>
                  <hr />
                  <table class="table table-sm table-striped">
                    <thead class="thead-dark">
                      <th scope="col">Product Id</th>
                      <th scope="col">Product Name</th>
                      <th scope="col">Quantity</th>
                      <th scope="col">Received Quantity</th>
                    </thead>
                    <tbody>
                      <tr
                        v-for="item in props.row.shipmentDetailList"
                        :key="item.id"
                        :class="{
                          'bg-gradient-success': item.rightAmt,
                          'bg-gradient-danger': !item.rightAmt,
                        }"
                      >
                        <td>{{ item.product.productId }}</td>
                        <td>{{ item.product.productName }}</td>
                        <td>{{ item.quantity }}</td>
                        <td>{{ item.receivedQuantity }}</td>
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
import _ from "lodash";
import axios from "axios";
import {
  faArrowUp,
  faAngleLeft,
  faAngleRight,
  faMinusCircle,
  faPlusCircle,
} from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import DateFilter from "@/components/DateFilter.vue";

library.add(faArrowUp, faAngleRight, faAngleLeft, faMinusCircle, faPlusCircle);

const apiUrl = `${process.env.VUE_APP_API_URL}/hoShipmentsEndpoint`;

export default {
  name: "ReceivedShipments",
  props: ["isSupplier"],
  components: { DateFilter },
  data: () => {
    return {
      receivedShipments: [],
      statusMessage: "",
      loading: true,
      alertClass: "",
      startDate: "",
      endDate: "",
    };
  },
  mounted() {
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

    this.getReceivedShipments();
  },
  methods: {
    getReceivedShipments() {
      this.loading = true;
      axios
        .get(
          `${apiUrl}/getReceivedShipmentsPeriod?start=${this.startDate}&end=${this.endDate}&isSupplier=${this.isSupplier}`
        )
        .then((response) => {
          // prettier-ignore
          this.receivedShipments =  [];

          if (response.data.length != 0) {
            this.receivedShipments = response.data.map((x) => {
              const shipmentDetailList = x.shipmentDetailList.map((dl) => ({
                rightAmt: dl.quantity == dl.receivedQuantity,
                ...dl,
              }));
              const hasWrongAmt = _.some(shipmentDetailList, [
                "rightAmt",
                false,
              ]);

              return { ...x, hasWrongAmt, shipmentDetailList };
            });
          }
          this.statusMessage = `Received <strong> ${response.data.length} shipments </strong> `;
          this.alertClass = "alert-primary";
          window.scrollTo(0, 0);
          this.loading = false;
        })
        .catch((err) => {
          console.log(err);
          this.loading = false;
          this.statusMessage = "No shipments were received";
          this.alertClass = "alert-warning";
        });
    },
  },
};
</script>
