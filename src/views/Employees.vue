<template>
  <div class="container">
    <h3>Employee list</h3>
    <hr />
    <div
      class="alert alert-dismissible fade show"
      :class="alertClass"
      role="alert"
      v-if="statusMessage"
    >
      <span>{{ statusMessage }}</span>
      <button
        type="button"
        class="close"
        data-dismiss="alert"
        aria-label="Close"
      >
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="row mb-2">
      <div class="col">
        <button
          type="button"
          class="btn btn-primary"
          data-toggle="modal"
          data-target="#employeeModal"
          @click="employeeAction = 'Create'"
        >
          Create new Employee
        </button>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <b-table
          :data="employees"
          :striped="true"
          :hoverable="true"
          :default-sort-direction="'asc'"
          :paginated="true"
          :pagination-rounded="true"
          :loading="loading"
          :per-page="10"
          aria-next-label="Next page"
          aria-previous-label="Previous page"
          aria-page-label="Page"
          aria-current-label="Current page"
        >
          <b-table-column
            field="firstName"
            label="Name"
            sortable
            v-slot="props"
          >
            {{ props.row.firstName }} {{ props.row.lastname }}
          </b-table-column>
          <b-table-column
            field="jobTitle"
            label="Job Title"
            sortable
            v-slot="props"
          >
            {{ props.row.jobTitle }}
          </b-table-column>
          <b-table-column
            field="phoneNumber"
            label="Phone Number"
            numeric
            v-slot="props"
            sortable
          >
            {{ props.row.phoneNumber }}
          </b-table-column>
          <b-table-column field="email" label="Email" sortable v-slot="props">
            <a :href="`mailto:${props.row.email}`">
              {{ props.row.email }}
            </a>
          </b-table-column>
          <b-table-column label="Actions" v-slot="props">
            <button
              class="btn btn-link"
              data-toggle="modal"
              data-target="#employeeModal"
              @click="selectEmployee(props.row.employeeId)"
            >
              Modify
            </button>
          </b-table-column>
        </b-table>
      </div>
    </div>
    <!-- Modal -->
    <div
      class="modal fade"
      id="employeeModal"
      tabindex="-1"
      aria-labelledby="employeeModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="employeeModalLabel">
              Create Employee
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
            <form ref="employeeForm">
              <div class="form-group">
                <label for="employeeFirstName">Employee First Name</label>
                <input
                  type="text"
                  v-model.trim="employeeFirstName"
                  class="form-control"
                  id="employeeFirstName"
                  required
                  :readonly="employeeAction === 'Modify'"
                />
              </div>
              <div class="form-group">
                <label for="employeeLastName">Employee Last Name</label>
                <input
                  type="text"
                  v-model.trim="employeeLastName"
                  class="form-control"
                  id="employeeLastName"
                  required
                  :readonly="employeeAction === 'Modify'"
                />
              </div>
              <div class="form-group">
                <label for="employeeJobTitle">Employee Job Title</label>
                <input
                  type="text"
                  v-model.trim="employeeJobTitle"
                  class="form-control"
                  id="employeeJobTitle"
                  required
                />
              </div>
              <div class="form-group">
                <label for="phoneNum">Employee Phone Number</label>
                <input
                  type="text"
                  v-model.trim="employeePhoneNum"
                  class="form-control"
                  id="phoneNum"
                  pattern="^\d+$"
                />
              </div>
              <div class="form-group">
                <label for="email">Employee Email</label>
                <input
                  type="email"
                  v-model.trim="employeeEmail"
                  class="form-control"
                  id="email"
                />
              </div>
              <div class="form-group">
                <label for="storeId">Employee Store</label>
                <select
                  class="custom-select"
                  name="storeId"
                  id="storeId"
                  v-model="employeeStoreId"
                >
                  <option value="" disabled selected>Select Store</option>
                  <option value="0">No Store</option>
                  <option
                    v-for="{ storeId, name } in stores"
                    :key="storeId"
                    :value="storeId"
                  >
                    {{ name }}
                  </option>
                </select>
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
              @click="createNewEmployee"
              :data-dismiss="isFormValid() ? 'modal' : ''"
            >
              {{ employeeAction }} Employee
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

const apiUrl = process.env.VUE_APP_API_URL;

export default {
  name: "Employees",
  data: () => {
    return {
      employees: [],
      loading: true,
      selectedEmployee: null,
      employeeFirstName: "",
      employeeLastName: "",
      employeeJobTitle: "",
      employeePhoneNum: "",
      employeeEmail: "",
      employeeStoreId: "",
      stores: [],
      statusMessage: "",
      alertClass: "alert-primary",
      employeeAction: "",
    };
  },
  created() {
    this.getEmployees();
    this.getStores();
  },
  methods: {
    getEmployees() {
      axios
        .get(`${apiUrl}/hoEmployeesEndpoint/getAllEmployees`)
        .then((response) => {
          this.employees = [...response.data];
          this.loading = false;
        })
        .catch((err) => {
          console.log(err);
          this.employees = [];
          this.loading = false;
        });
    },
    getStores() {
      axios
        .get(`${apiUrl}/hoStoresEndpoint/getAllStores`)
        .then((response) => {
          this.stores = response.data.map((s) => ({
            storeId: s.storeId,
            name: s.name,
          }));
        })
        .catch((err) => (this.statusMessage = err.response.data));
    },
    isFormValid() {
      if (this.$refs.employeeForm)
        return this.$refs.employeeForm.checkValidity();

      return false;
    },
    selectEmployee(employeeId) {
      this.selectedEmployee = _.find(
        this.employees,
        (e) => e.employeeId === employeeId
      );

      this.employeeAction = "Modify";
    },
    createNewEmployee() {
      if (!this.isFormValid()) {
        this.$refs.employeeForm.reportValidity();
        return;
      }

      // prettier-ignore
      const employeeId = this.selectedEmployee ? this.selectedEmployee.employeeId : 0;

      const employee = {
        employeeId: employeeId,
        firstName: this.employeeFirstName,
        lastName: this.employeeLastName,
        jobTitle: this.employeeJobTitle,
        phoneNumber: this.employeePhoneNum,
        email: this.employeeEmail,
        storeId: this.employeeStoreId,
      };

      if (this.employeeAction === "Create") {
        axios
          .post(`${apiUrl}/hoEmployeesEndpoint/addNewEmployee`, employee)
          .then((response) => {
            console.log(response);
            this.statusMessage = response.data;
            this.alertClass = "alert-success";
            this.getEmployees();
          })
          .catch((err) => {
            console.log(err.response);
            this.statusMessage = err.response.data.message;
            this.alertClass = "alert-danger";
          });
      } else {
        // we modify if we dont create
        axios
          .post(`${apiUrl}/hoEmployeesEndpoint/modifyEmployee`, employee)
          .then((response) => {
            console.log(response);
            this.statusMessage = response.data;
            this.alertClass = "alert-success";
            this.getEmployees();
          })
          .catch((err) => {
            console.log(err.response);
            this.statusMessage = err.response.data.message;
            this.alertClass = "alert-danger";
          });
      }
    },
  },
  watch: {
    selectedEmployee(val) {
      this.employeeFirstName = val.firstName;
      this.employeeLastName = val.lastname;
      this.employeeJobTitle = val.jobTitle;
      this.employeeEmail = val.email;
      this.employeePhoneNum = val.phoneNumber;
    },
    employeeAction(val) {
      if (val === "Create") {
        this.employeeFirstName = "";
        this.employeeLastName = "";
        this.employeeJobTitle = "";
        this.employeeEmail = "";
        this.employeePhoneNum = "";
      }
    },
  },
};
</script>
