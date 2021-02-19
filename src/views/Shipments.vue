<template>
  <div class="container-fluid">
    <nav>
      <div class="nav nav-tabs" id="nav-tab" role="tablist">
        <router-link
          to="/shipments/activeShipments"
          class="nav-link"
          :active-class="activeClass('Active Shipments')"
          data-toggle="tab"
          role="tab"
          :aria-selected="selected('Active Shipments')"
        >
          Active Shipments
        </router-link>
        <router-link
          to="/shipments/receivedSupplierShipments"
          class="nav-link"
          :active-class="activeClass('Received Supplier Shipments')"
          data-toggle="tab"
          role="tab"
          :aria-selected="selected('Received Supplier Shipments')"
        >
          Received Supplier Shipments
        </router-link>
        <router-link
          to="/shipments/receivedInternalShipments"
          class="nav-link"
          :active-class="activeClass('Received Internal Shipments')"
          data-toggle="tab"
          role="tab"
          :aria-selected="selected('Received Internal Shipments')"
        >
          Received Internal Shipments
        </router-link>
      </div>
    </nav>
    <div class="tab-content mt-3" id="nav-tabContent">
      <div class="tab-pane show active" role="tabpanel">
        <router-view />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Shipments",
  methods: {
    activeClass(routeName) {
      return this.selected(routeName) ? "active" : "";
    },
    selected(routeName) {
      return routeName === this.$route.name;
    },
  },
};
</script>
