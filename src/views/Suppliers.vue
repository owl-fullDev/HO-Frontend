<template>
  <div class="container-fluid">
    <div
      class="alert alert-success alert-dismissible fade show"
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
    <div class="row">
      <div class="col-xl-4 col-lg-5 col-md-6 col-12">
        <h4 class="display-4">All Suppliers</h4>
        <hr />
      </div>
    </div>
    <div class="row">
      <EntityList
        :entities-list="currentSuppliersEntityList"
        :entity-name="'Supplier'"
        :modal-name="'createNewSupplierModal'"
        @selectEntity="selectSupplier"
      />

      <SupplierDetails :selected-supplier="selectedSupplier" />
    </div>
    <div
      class="modal fade"
      id="createNewSupplierModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">
              Create New Supplier
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
            <form ref="newSupplierForm">
              <div class="form-group">
                <label for="supplierName">Supplier Name</label>
                <input
                  type="text"
                  v-model.trim="newSupplierName"
                  class="form-control"
                  id="supplierName"
                  required
                />
              </div>
              <div class="form-group">
                <label for="supplierAddress">Supplier Address</label>
                <input
                  type="text"
                  v-model.trim="newSupplierAddress"
                  class="form-control"
                  id="supplierAddress"
                  required
                />
              </div>
              <div class="form-group">
                <label for="supplierEmail">Supplier Email</label>
                <input
                  type="email"
                  v-model.trim="newSupplierEmail"
                  class="form-control"
                  id="supplierEmail"
                  required
                />
              </div>
              <div class="form-group">
                <label for="supplierPhoneNum">Supplier Phone #</label>
                <input
                  type="text"
                  v-model.trim="newSupplierPhoneNumber"
                  class="form-control"
                  id="supplierPhoneNum"
                  required
                />
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-warning" data-dismiss="modal">
              Cancel
            </button>
            <button
              type="button"
              class="btn btn-primary"
              @click="createNewSupplier"
              :data-dismiss="isFormValid() ? 'modal' : ''"
            >
              Create Supplier
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import _ from "lodash";
import SupplierDetails from "@/components/SupplierDetails.vue";
import EntityList from "@/components/EntityList.vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";

library.add(faPlusCircle);

const apiUrl = `${process.env.VUE_APP_API_URL}/hoSuppliersEndpoint`;
export default {
  name: "Suppliers",
  components: { SupplierDetails, EntityList },
  data: () => {
    return {
      currentSuppliers: null,
      selectedSupplier: null,
      newSupplierName: "",
      newSupplierAddress: "",
      newSupplierPhoneNumber: "",
      newSupplierEmail: "",
      statusMessage: "",
    };
  },
  methods: {
    selectSupplier(supplierId) {
      this.selectedSupplier = _.find(
        this.currentSuppliers,
        (x) => x.supplierId == supplierId
      );
    },
    isFormValid() {
      if (this.$refs.newSupplierForm)
        return this.$refs.newSupplierForm.checkValidity() && this.validPhoneNum;

      return false;
    },
    createNewSupplier() {
      console.log(this.isFormValid());
      if (!this.isFormValid()) {
        this.$refs.newSupplierForm.reportValidity();
        return;
      }

      axios
        .post(`${apiUrl}/addNewSupplier`, {
          supplierName: this.newSupplierName,
          supplierAddress: this.newSupplierAddress,
          supplierPhoneNumber: this.newSupplierPhoneNumber,
          supplierEmail: this.newSupplierEmail,
        })
        .then((response) => {
          console.log(response);
          this.statusMessage = `Supplier <strong> ${this.newSupplierName} </strong> successfully created`;
          this.newSupplierName = "";
          this.newSupplierAddress = "";
          this.newSupplierPhoneNumber = "";
          this.supplierEmail = "";

          this.updateSuppliersList();
        })
        .catch((err) => console.log(err));
    },
    async updateSuppliersList(supplierId) {
      axios
        .get(`${apiUrl}/getAllSuppliers`)
        .then((response) => {
          //prettier-ignore
          this.currentSuppliers = response.data.length != 0 ? [...response.data] : [];

          if (isNaN(supplierId)) {
            this.selectedSupplier = null;
          } else {
            this.selectSupplier(supplierId);
          }
          window.scrollTo(0, 0);
        })
        .catch((err) => {
          console.log(err.response);
          this.currentSuppliers = [];
        });
    },
  },
  computed: {
    currentSuppliersEntityList() {
      if (!this.currentSuppliers) return null;

      return this.currentSuppliers.map((x) => ({
        entityId: x.supplierId,
        name: x.name,
      }));
    },
    validPhoneNum() {
      const regex = new RegExp("^\\d+$");

      return regex.test(this.newSupplierPhoneNumber);
    },
  },
  async created() {
    await this.updateSuppliersList(this.$route.params.supplierId);
  },
};
</script>
