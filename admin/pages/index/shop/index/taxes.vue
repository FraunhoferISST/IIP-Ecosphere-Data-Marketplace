<template>
  <v-container fluid class="pa-0">
    <v-row>
      <v-col cols="12">
        <h3>Shop Taxes</h3>
      </v-col>
      <v-col cols="12">
        <data-viewer :loading="load.loading.value" :error="load.error.value">
          <v-container fluid class="pa-0">
            <v-row>
              <v-col cols="12" md="3" class="d-flex">
                <card
                  outline
                  interactive
                  style="border-style: dashed"
                  class="fill-width"
                  @click="newTaxDialog = true"
                >
                  <div class="d-flex justify-center align-center fill-height">
                    <v-btn
                      size="large"
                      color="accent"
                      variant="text"
                      rounded="lg"
                      flat
                      append-icon="add"
                    >
                      Add tax rate
                    </v-btn>
                  </div>
                </card>
              </v-col>
              <v-col cols="12" md="3" v-for="(tax, i) in taxes" :key="i">
                <tax-card :tax="tax" @remove="onRemove">
                  <template #actions-clone>
                    <v-btn
                      title="Clone tax"
                      class="elevation-0 mt-2 mr-3"
                      size="x-small"
                      variant="tonal"
                      color="accent"
                      icon="view_timeline"
                      @click.stop="() => cloneTax(tax)"
                    >
                    </v-btn>
                  </template>
                </tax-card>
              </v-col>
            </v-row>
            <v-dialog max-width="1100px" v-model="newTaxDialog">
              <dialog-container>
                <tax-rate-form v-model:tax="newTax" />
                <template #action>
                  <v-btn
                    size="large"
                    variant="flat"
                    rounded="lg"
                    class="mr-4"
                    flat
                    @click="newTaxDialog = false"
                  >
                    Cancel
                  </v-btn>
                  <v-btn
                    size="large"
                    color="primary"
                    variant="flat"
                    rounded="lg"
                    flat
                    :disabled="!canCreate"
                    :loading="create.loading.value"
                    @click="() => createTax()"
                  >
                    Add tax rate
                  </v-btn>
                </template>
              </dialog-container>
            </v-dialog>
          </v-container>
        </data-viewer>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import type { TaxRate } from "~/types";
import DialogContainer from "~/components/Base/DialogContainer.vue";
import { useToast } from "vue-toastification";
import Card from "~/components/Base/Card.vue";
import { useTaxes } from "~/composables/useTaxes";
import TaxRateForm from "~/components/Base/TaxRateForm.vue";
import TaxCard from "~/components/Dashboard/TaxCard.vue";
import DataViewer from "~/components/DataViewer.vue";

const { taxes, create, load } = useTaxes();

const newTax = ref<Partial<TaxRate>>({
  rate: 19,
  taxCode: "USt.",
  country: "DE",
});
const newTaxDialog = ref(false);

const canCreate = computed<boolean>(
  () =>
    newTax.value.rate >= 0 && !!newTax.value.taxCode && !!newTax.value.country
);

const handlePromise = (promise, message = "Tax rates data updated!") =>
  promise
    .then(() => (newTaxDialog.value = false))
    .then(() => useToast().success(message))
    .then(() => load.execute())
    .catch((e) => useToast().error(e?.response?.data?.message ?? e.toString()));
const createTax = () =>
  handlePromise(create.execute(newTax.value as TaxRate), "Tax rate created");
const cloneTax = (tax: TaxRate) => {
  handlePromise(create.execute(tax), "Tax rate cloned");
};
const onRemove = () => {
  handlePromise(load.execute());
};

load.execute();
</script>

<style scoped></style>
