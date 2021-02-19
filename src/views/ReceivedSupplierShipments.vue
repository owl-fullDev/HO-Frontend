<template>
  <ReceivedShipments :isSupplier="true" />
</template>
<script>
import ReceivedShipments from "@/components/ReceivedShipments.vue";

export default {
  name: "ReceivedSupplierShipments",
  components: {
    ReceivedShipments,
  },
};
</script>
