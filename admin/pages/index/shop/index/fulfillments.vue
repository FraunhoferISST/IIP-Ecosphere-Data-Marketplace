<template>
  <data-viewer
    :loading="loadFulfillmetns.loading.value"
    :error="loadFulfillmetns.error.value"
  >
    <v-container class="pa-0" fluid>
      <v-row>
        <v-col cols="12">
          <h3>Fulfilment methods</h3>
          <p class="text-slate-500 my-4">
            Fulfillment methods describe how to deliver an item to a customer.
            We offer only digital distribution fulfillment which provides the
            variant distributions after a successful payment and is enabled by
            default
          </p>
        </v-col>
      </v-row>
      <v-row>
        <v-col
          cols="12"
          sm="6"
          md="4"
          v-for="(method, i) in fulfillmentsState"
          :key="i"
        >
          <action-card padding="pa-3">
            <h4 class="mb-2 d-flex justify-space-between">
              <span>
                {{ method.label }}
              </span>
              <dot-divider
                v-if="method.isEnabled"
                size="12px"
                :color="
                  $vuetify.theme.computedThemes.customTheme.colors.success
                "
              />
            </h4>
            <div>
              <span class="text-body-2 text-slate-500 mr-2"> Name: </span>
              <span class="text-body-2 text-slate-600 font-weight-bold mr-2">
                {{ method.name }}
              </span>
            </div>
            <div>
              <span class="text-body-2 text-slate-500 mr-2"> Price: </span>
              <span class="text-body-2 text-slate-600 font-weight-bold mr-2">
                {{ method.handling }}
              </span>
            </div>
            <div>
              <span class="text-body-2 text-slate-500 mr-2"> Group: </span>
              <span class="text-body-2 text-slate-600 font-weight-bold mr-2">
                {{ method.group }}
              </span>
            </div>
            <div>
              <span class="text-body-2 text-slate-500 mr-2">
                Fulfillment type:
              </span>
              <span class="text-body-2 text-slate-600 font-weight-bold mr-2">
                {{ method.fulfillmentTypes.join("m, ") }}
              </span>
            </div>
          </action-card>
        </v-col>
      </v-row>
    </v-container>
  </data-viewer>
</template>

<script setup lang="ts">
import DataViewer from "~/components/DataViewer.vue";
import ActionCard from "~/components/Base/ActionCard.vue";
import { useToast } from "vue-toastification";
import { FulfillmentMethod } from "~/types";
import DotDivider from "~/components/Base/DotDivider.vue";

const toast = useToast();
const { fulfillments, loadFulfillmetns } = useShop();

const fulfillmentsState = ref<FulfillmentMethod[]>(fulfillments.value);

loadFulfillmetns
  .execute()
  .then(() => (fulfillmentsState.value = [...fulfillments.value]));
</script>

<style scoped></style>
