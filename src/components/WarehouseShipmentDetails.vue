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
        <div class="row">
          <div class="col">
            <h5>Actions</h5>
            <hr />

            <div class="row">
              <div class="col">
                <button
                  class="btn btn-danger"
                  @click="selectedAction = 'Delete'"
                  data-toggle="modal"
                  data-target="#confirmationModal"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        class="modal fade"
        id="confirmationModal"
        tabindex="-1"
        aria-labelledby="confirmationModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="confirmationModalLabel">
                {{ warehouseObj.name }} - {{ selectedAction }}
              </h5>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              Are you sure you want to do the action
              <strong>{{ selectedAction }}</strong> for the Warehouse:
              <strong>{{ warehouseObj.name }}</strong>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-dismiss="modal"
              >
                Cancel
              </button>
              <button
                type="button"
                class="btn btn-primary"
                @click="$emit('warehouseAction', selectedAction)"
                data-dismiss="modal"
              >
                {{ selectedAction }}
              </button>
            </div>
          </div>
        </div>
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
      selectedAction: "",
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
