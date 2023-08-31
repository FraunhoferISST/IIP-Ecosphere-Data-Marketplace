<template>
  <v-container class="pa-0" fluid>
    <v-row class="mb-4">
      <v-col cols="12">
        <h3>Tax rate</h3>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-form>
          <v-row>
            <v-col cols="12">
              <v-text-field
                variant="outlined"
                density="comfortable"
                bg-color="transparent"
                hide-details
                name="name"
                type="text"
                label="Title"
                v-model="computedTax.taxCode"
              />
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                variant="outlined"
                density="comfortable"
                bg-color="transparent"
                hide-details
                name="name"
                type="number"
                min="0"
                step="1"
                label="Rate"
                append-inner-icon="percent"
                v-model="taxRate"
                @update:modelValue="setTaxRate"
              />
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                variant="outlined"
                density="comfortable"
                bg-color="transparent"
                hide-details
                name="name"
                type="text"
                label="Country code"
                v-model="computedTax.country"
              />
            </v-col>
          </v-row>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import currency from "currency.js";
import { TaxRate } from "~/types";
import { computed } from "vue";

const { tax } = defineProps<{
  tax: Partial<TaxRate>;
}>();
const emit = defineEmits(["update:address"]);

const taxRate = ref(currency(tax.rate ?? 19).value);

const computedTax = computed({
  get: () => tax,
  set: (val: Partial<TaxRate>) => emit("update:address", val),
});

const setTaxRate = () =>
  (computedTax.value.rate = currency(taxRate.value).value);
</script>

<style scoped></style>
