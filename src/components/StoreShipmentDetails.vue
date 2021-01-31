<template>
  <div class="col-xl col-lg-7 col-md-6 col-12 order-first order-md-last mb-2">
    <div class="card w-75" v-if="shipmentObj">
      <div class="card-header">
        <h4>Shipment {{ shipmentObj.internalShipmentId }}</h4>
      </div>
      <div class="card-body">
        <div class="row">
          <div class="col">
            <h3>Shipment Details</h3>
            <hr />
            <ul class="list-group mb-3">
              <li class="list-group-item list-group-item-primary">
                Status: <strong>{{ shipmentObj.status }}</strong>
              </li>
              <li class="list-group-item">
                Shipment Id:
                <strong>{{ shipmentObj.internalShipmentId }}</strong>
              </li>
              <li class="list-group-item">
                Warehouse: <strong>{{ shipmentObj.warehouseName }}</strong>
              </li>
              <li class="list-group-item">
                Store: <strong>{{ shipmentObj.storeName }}</strong>
              </li>
              <li class="list-group-item">
                Date Sent: <strong>{{ dateSent }}</strong>
              </li>
            </ul>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <h3>Products</h3>
            <hr />
            <table class="table table-striped">
              <thead class="thead-dark">
                <th scope="col">Product Id</th>
                <th scope="col">Product Name</th>
                <th scope="col">Quantity</th>
              </thead>
              <tbody>
                <tr
                  v-for="product in shipmentObj.internalShipmentDetails"
                  :key="product.id"
                >
                  <th scope="row">{{ product.productId }}</th>
                  <td>{{ product.productName }}</td>
                  <td>{{ product.quantity }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "StoreShipmentDetails",
  props: ["selectedShipment"],
  data: () => {
    return {
      shipmentObj: null,
    };
  },
  computed: {
    dateSent() {
      // prettier-ignore
      return this.shipmentObj.dateSent === "-" ? "-" : new Date(this.shipmentObj.dateSent).toUTCString();
    },
  },
  watch: {
    selectedShipment: {
      handler(val) {
        if (val) {
          this.shipmentObj = { ...val };
        } else {
          this.shipmentObj = null;
        }
      },
    },
  },
};
</script>
