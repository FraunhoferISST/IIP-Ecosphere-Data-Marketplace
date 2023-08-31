<template>
  <v-container fluid class="pa-0">
    <v-row>
      <v-col cols="12">
        <h3>Shop Taxes</h3>
      </v-col>
      <v-col cols="12" md="6" class="d-flex">
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
      <v-col cols="12" md="6" v-for="(tax, i) in taxesState" :key="i">
        <tax-card :tax="tax">
          <template #actions>
            <v-btn
              title="Clone address"
              class="elevation-0 mt-2 mr-3"
              size="x-small"
              variant="tonal"
              color="accent"
              icon="view_timeline"
              @click.stop="() => cloneTax(tax)"
            >
            </v-btn>
            <v-btn
              title="Remove address"
              class="elevation-0 mt-1"
              size="x-small"
              variant="tonal"
              color="error"
              icon="remove"
              @click.stop="() => removeTax(tax)"
            >
            </v-btn>
          </template>
          <template #dialog-action="{ address, close, valid }">
            <v-btn
              size="large"
              variant="flat"
              rounded="lg"
              flat
              @click="close"
              class=""
            >
              Cancel
            </v-btn>
            <v-btn
              size="large"
              color="success"
              variant="flat"
              rounded="lg"
              flat
              :disabled="!valid"
              @click="() => updateTax(address, close)"
            >
              Save changes
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
            @click="() => createTax()"
          >
            Add tax rate
          </v-btn>
        </template>
      </dialog-container>
    </v-dialog>
  </v-container>
</template>

<script setup lang="ts">
import type { TaxRate } from "~/types";
import DialogContainer from "~/components/Base/DialogContainer.vue";
import { useToast } from "vue-toastification";
import Card from "~/components/Base/Card.vue";
import cloneDeep from "lodash.clonedeep";
import { useTaxes } from "~/composables/useTaxes";
import { useTax } from "~/composables/useTax";
import TaxRateForm from "~/components/Base/TaxRateForm.vue";
import TaxCard from "~/components/Dashboard/TaxCard.vue";

const { taxes } = defineProps<{
  taxes: TaxRate[];
}>();

const { create } = useTaxes();

const taxesState = ref<TaxRate[]>(cloneDeep(taxes));
const newTax = ref<Partial<TaxRate>>({
  rate: 0.19,
  taxCode: "USt.",
});
const newTaxDialog = ref(false);

const handlePromise = (promise, message = "Tax rates data updated!") =>
  promise
    .then(() => (newTaxDialog.value = false))
    .then(() => useToast().success(message))
    .catch((e) => useToast().error(e?.response?.data?.message ?? e.toString()));
const createTax = () =>
  handlePromise(create.execute(newTax.value as TaxRate), "Tax rate created");
const updateTax = (tax: TaxRate, closDialogMethod) =>
  handlePromise(
    useTax(tax._id)
      .update.execute(tax)
      .then(() => closDialogMethod())
  );
const removeTax = (tax: TaxRate) => {
  handlePromise(useTax(tax._id).remove.execute(), "Tax rate removed");
};
const cloneTax = (tax: TaxRate) => {
  handlePromise(create.execute(tax), "Tax rate cloned");
};
</script>

<style scoped></style>
