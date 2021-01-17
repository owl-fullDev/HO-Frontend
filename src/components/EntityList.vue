<template>
  <div class="col-xl-4 col-lg-5 col-md-6 col-12 order-last order-md-first">
    <div class="row mb-3">
      <div class="col" style="height: 700px; overflow-y: auto;">
        <div
          v-if="entitiesList.length === 0"
          class="d-flex justify-content-center"
        >
          <div class="spinner-border" role="status">
            <span class="sr-only">Loading...</span>
          </div>
        </div>
        <div class="row mb-2" v-for="entity in entitiesList" :key="entity.id">
          <div class="col">
            <div class="card">
              <div class="card-body">
                <h3 class="card-title">{{ entity.name }}</h3>
                <button
                  type="button"
                  class="btn btn-primary btn-block"
                  @click="$emit('selectEntity', entity.entityId)"
                >
                  Select {{ entityName }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <div class="card">
          <div class="card-body">
            <h3 class="card-title">Create New Promo</h3>
            <button
              type="button"
              class="btn btn-success btn-block"
              data-toggle="modal"
              :data-target="`#${modalName}`"
            >
              Create
              <faIcon :icon="['fas', 'plus-circle']"></faIcon>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { library } from "@fortawesome/fontawesome-svg-core";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";

library.add(faPlusCircle);

export default {
  name: "EntityList",
  props: ["entitiesList", "entityName", "modalName"],
};
</script>
