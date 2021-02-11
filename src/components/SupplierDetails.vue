<template>
  <div class="col-xl col-lg-7 col-md-6 col-12 order-first order-md-last mb-2">
    <div class="card w-75" v-if="supplierObj">
      <div class="card-header">
        <h4>{{ supplierObj.name }}</h4>
      </div>
      <div class="card-body">
        <form>
          <div class="form-group">
            <label for="supplierAddress">Address</label>
            <input
              type="text"
              v-model.trim="supplierObj.address"
              class="form-control"
              id="supplierAddress"
              readonly
              aria-describedby="promoName"
            />
            <small id="promoName" class="form-text text-muted">
              Supplier Id: {{ supplierObj.supplierId }}
            </small>
          </div>
          <div class="form-group">
            <label for="email">Email</label>
            <input
              type="text"
              v-model.trim="supplierObj.email"
              class="form-control"
              id="email"
              readonly
            />
          </div>
          <div class="form-group">
            <label for="phoneNum">Phone #</label>
            <input
              type="text"
              v-model.trim="supplierObj.phoneNumber"
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
  name: "SupplierDetails",
  props: ["selectedSupplier"],
  data: () => {
    return {
      supplierObj: null,
    };
  },
  watch: {
    selectedSupplier: {
      handler(val) {
        this.supplierObj = { ...val };
      },
    },
  },
};
</script>
