<template>
  <v-container fluid class="pa-0">
    <v-row>
      <v-col cols="12">
        <h3>Shop addresses</h3>
      </v-col>
      <v-col cols="12" md="6" class="d-flex">
        <card
          outline
          interactive
          style="border-style: dashed"
          class="fill-width"
          @click="newAddressDialog = true"
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
              Add address
            </v-btn>
          </div>
        </card>
      </v-col>
      <v-col cols="12" md="6" v-for="(address, i) in addresses" :key="i">
        <address-card :address="address">
          <template #actions>
            <v-btn
              title="Clone address"
              class="elevation-0 mt-2 mr-3"
              size="x-small"
              variant="tonal"
              color="accent"
              icon="view_timeline"
              @click.stop="() => cloneAddress(address)"
            >
            </v-btn>
            <v-btn
              title="Remove address"
              class="elevation-0 mt-1"
              size="x-small"
              variant="tonal"
              color="error"
              icon="remove"
              @click.stop="() => removeAddress(i)"
            >
            </v-btn>
          </template>
          <template #dialog-action="{ address, close, valid }">
            <v-btn
              size="large"
              color="success"
              variant="flat"
              rounded="lg"
              flat
              :disabled="!valid"
              @click="() => updateAddress(address, i, close)"
            >
              Save changes
            </v-btn>
          </template>
        </address-card>
      </v-col>
    </v-row>
    <v-dialog max-width="1100px" v-model="newAddressDialog">
      <dialog-container>
        <address-form v-model:address="newAddress" />
        <template #action>
          <v-btn
            class="mr-4"
            size="large"
            variant="text"
            rounded="lg"
            @click="newAddressDialog = false"
          >
            Cancel
          </v-btn>
          <v-btn
            size="large"
            color="primary"
            variant="flat"
            rounded="lg"
            flat
            :loading="update.loading.value"
            @click="() => addAddress()"
          >
            Add address
          </v-btn>
        </template>
      </dialog-container>
    </v-dialog>
  </v-container>
</template>

<script setup lang="ts">
import AddressCard from "~/components/Dashboard/AddressCard.vue";
import type { Address, Shop } from "~/types";
import DialogContainer from "~/components/Base/DialogContainer.vue";
import AddressForm from "~/components/Base/AddressForm.vue";
import { useToast } from "vue-toastification";
import Card from "~/components/Base/Card.vue";

const { shop } = defineProps<{
  shop: Shop;
}>();

const { update } = useShop();

const addresses = ref<Address[]>(shop.addressBook ?? []);
const newAddress = ref<Partial<Address>>({
  isCommercial: true,
});
const newAddressDialog = ref(false);

const computedNewAddress = computed<Partial<Address>>(() => ({
  ...newAddress.value,
  fullName: `${newAddress.value.firstName} ${newAddress.value.lastName}`,
}));

const handlePromise = (promise) =>
  promise
    .then(() => (addresses.value = shop.addressBook))
    .then(() => (newAddressDialog.value = false))
    .then(() => useToast().success("Shop data updated"))
    .catch((e) => useToast().error(e?.response?.data?.message ?? e.toString()));
const addAddress = () =>
  handlePromise(
    update.execute({
      addressBook: [computedNewAddress.value, ...addresses.value],
    })
  );
const updateAddress = (address: Address, index: number, closDialogMethod) =>
  handlePromise(
    update
      .execute({
        addressBook: addresses.value.map((a: Address, i: number) =>
          i === index
            ? {
                ...address,
                fullName: `${address.firstName} ${address.lastName}`,
              }
            : a
        ),
      })
      .then(() => closDialogMethod())
  );
const removeAddress = (index) => {
  handlePromise(
    update.execute({
      addressBook: addresses.value.filter((_, i: number) => i !== index),
    })
  );
};
const cloneAddress = (address: Address) => {
  handlePromise(
    update.execute({
      addressBook: [address, ...addresses.value],
    })
  );
};
</script>

<style scoped></style>
