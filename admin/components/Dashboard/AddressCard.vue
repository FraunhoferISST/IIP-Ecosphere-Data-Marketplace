<template>
  <div class="position-relative">
    <v-dialog v-model="dialog" max-width="1100px">
      <template #activator="{ props }">
        <action-card
          padding="pa-3"
          outline
          :interactive="interactive"
          v-bind="interactive ? props : {}"
        >
          <div>
            <div v-for="(prop, i) in properties" :key="i" class="text-truncate">
              <span class="text-body-2 text-slate-600 font-weight-bold mr-2">
                {{ prop.value }}
              </span>
            </div>
          </div>
          <template #actions v-if="interactive">
            <slot name="actions"> </slot>
          </template>
        </action-card>
      </template>
      <dialog-container v-if="interactive">
        <address-form v-model:address="localAddress" />
        <template #action>
          <slot
            name="dialog-action"
            :close="closeDialog"
            :address="localAddress"
            :valid="canSave"
          >
          </slot>
        </template>
      </dialog-container>
    </v-dialog>
  </div>
</template>

<script setup lang="ts">
import { Address } from "~/types";
import DialogContainer from "~/components/Base/DialogContainer.vue";
import ActionCard from "~/components/Base/ActionCard.vue";
import AddressForm from "~/components/Base/AddressForm.vue";

const { address, interactive = true } = defineProps<{
  address: Address;
  interactive?: boolean;
}>();
const emit = defineEmits(["clone", "remove"]);

const localAddress = ref<Address>({ ...address });
const dialog = ref<boolean>(false);

const canSave = computed<boolean>(() => !!localAddress.value.address1);
const properties = computed<{ title: string; value: string }[]>(() => [
  {
    title: "Company",
    value: address.company ?? "N/A",
  },
  {
    title: "Street",
    value: address.address1 ?? "N/A",
  },
  {
    title: "Postal-code and city",
    value: `${address.postal} ${address.city} ${address.country}`,
  },
  {
    title: "Name",
    value: address.fullName ?? "N/A",
  },
  {
    title: "Phone number",
    value: address.phone ?? "N/A",
  },
]);

const closeDialog = () => (dialog.value = false);
const emitRemove = () => emit("remove", address);
</script>

<style scoped lang="scss"></style>
