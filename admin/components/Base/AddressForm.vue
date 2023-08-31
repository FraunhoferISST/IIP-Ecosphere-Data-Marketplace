<template>
  <v-container class="pa-0" fluid>
    <v-row class="mb-4">
      <v-col cols="12">
        <h3>Address information</h3>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-form>
          <v-row>
            <v-col
              cols="12"
              :md="field.fullWidth ? 12 : 6"
              v-for="(field, i) in fields"
              :key="i"
            >
              <v-text-field
                variant="outlined"
                density="comfortable"
                bg-color="transparent"
                hide-details
                v-model="field.value"
                name="name"
                type="text"
                @input="() => onInput(field.key, field.value)"
                :label="field.title"
              />
            </v-col>
          </v-row>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { Address } from "~/types";
import { computed } from "vue";

const { address } = defineProps<{
  address: Address;
}>();
const emit = defineEmits(["update:address"]);

const computedAddress = computed({
  get: () => address,
  set: (val) => emit("update:address", val),
});

const fields = ref<
  { title: string; value: string | boolean; fullWidth: boolean; key: string }[]
>([
  {
    title: "First name",
    key: "firstName",
    value: address.firstName,
    fullWidth: false,
  },
  {
    title: "Last name",
    key: "lastName",
    value: address.lastName,
    fullWidth: false,
  },
  {
    title: "Street name and House/Apartment number",
    key: "address1",
    value: address.address1,
    fullWidth: true,
  },
  {
    title: "City",
    key: "city",
    value: address.city,
    fullWidth: false,
  },
  {
    title: "Region",
    key: "region",
    value: address.region,
    fullWidth: false,
  },
  {
    title: "Country",
    key: "country",
    value: address.country,
    fullWidth: false,
  },
  {
    title: "Postal code",
    key: "postal",
    value: address.postal,
    fullWidth: false,
  },
  {
    title: "Phone number",
    key: "phone",
    value: address.phone,
    fullWidth: true,
  },
  {
    title: "Company",
    key: "company",
    value: address.company,
    fullWidth: true,
  },
]);

const onInput = (prop, val) => {
  computedAddress.value[prop] = val;
  computedAddress.value.fullName = `${tax.firstName} ${tax.lastName}`;
};
</script>

<style scoped></style>
