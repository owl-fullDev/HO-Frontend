<template>
  <ReceivedShipments :isSupplier="false" />
</template>
<script>
import ReceivedShipments from "@/components/ReceivedShipments.vue";

export default {
  name: "ReceivedInternalShipments",
  components: {
    ReceivedShipments,
  },
};
</script>
