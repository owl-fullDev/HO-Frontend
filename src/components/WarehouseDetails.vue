<template>
  <div class="col-xl col-lg-7 col-md-6 col-12 order-first order-md-last mb-2">
    <div class="card w-75" v-if="warehouseObj">
      <div class="card-header">
        <h4>{{ warehouseObj.name }}</h4>
      </div>
      <div class="card-body">
        <form>
          <div class="form-group">
            <label for="warehouseAddress">Address</label>
            <input
              type="text"
              v-model.trim="warehouseObj.address"
              class="form-control"
              id="warehouseAddress"
              readonly
              aria-describedby="promoName"
            />
            <small id="promoName" class="form-text text-muted">
              Warehouse Id: {{ warehouseObj.warehouseId }}
            </small>
          </div>
          <div class="form-group">
            <label for="phoneNum">Phone #</label>
            <input
              type="text"
              v-model.trim="warehouseObj.phone_number"
              class="form-control"
              id="phoneNum"
              readonly
            />
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "WarehouseDetails",
  props: ["selectedWarehouse"],
  data: () => {
    return {
      warehouseObj: null,
    };
  },
  watch: {
    selectedWarehouse: {
      handler(val) {
        if (val) {
          this.warehouseObj = { ...val };
        } else {
          this.warehouseObj = null;
        }
      },
    },
  },
};
</script>
