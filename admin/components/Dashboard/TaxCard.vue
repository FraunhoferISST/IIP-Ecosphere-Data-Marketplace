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
            <h4 class="mb-2">
              {{ localTax.taxCode }}
            </h4>
            <div v-for="(prop, i) in properties" :key="i" class="text-truncate">
              <span class="text-body-2 text-slate-600 font-weight-bold mr-2">
                {{ prop.value }}
              </span>
            </div>
            <v-chip
              class="mt-2"
              label
              color="accent"
              variant="tonal"
              size="small"
              v-if="isDefaultRate"
            >
              Default
            </v-chip>
            <v-btn
              v-else
              class="mt-2"
              variant="outlined"
              color="primary"
              size="small"
              :loading="updateSettings.loading.value"
              @click.stop="setAsDefault"
            >
              set as default
            </v-btn>
          </div>
          <template #actions v-if="interactive">
            <slot name="actions">
              <slot name="actions-clone">
                <v-btn
                  title="Clone tax"
                  class="elevation-0 mt-2 mr-3"
                  size="x-small"
                  variant="tonal"
                  color="accent"
                  icon="view_timeline"
                  @click.stop="cloneTax"
                >
                </v-btn>
              </slot>
              <v-btn
                title="Remove tax"
                class="elevation-0 mt-1"
                size="x-small"
                variant="tonal"
                color="error"
                icon="remove"
                @click.stop="removeTax"
              >
              </v-btn>
            </slot>
          </template>
        </action-card>
      </template>
      <dialog-container v-if="interactive">
        <tax-rate-form v-model:tax="state" />
        <template #action>
          <slot
            name="dialog-action"
            :close="closeDialog"
            :tax="localTax"
            :valid="canSave"
          >
            <v-btn
              size="large"
              variant="flat"
              rounded="lg"
              flat
              @click="closeDialog"
              class="mr-4"
            >
              Cancel
            </v-btn>
            <v-btn
              size="large"
              color="success"
              variant="flat"
              rounded="lg"
              flat
              :disabled="!canSave"
              @click="updateTax"
            >
              Save changes
            </v-btn>
          </slot>
        </template>
      </dialog-container>
    </v-dialog>
  </div>
</template>

<script setup lang="ts">
import currency from "currency.js";
import { TaxRate } from "~/types";
import DialogContainer from "~/components/Base/DialogContainer.vue";
import ActionCard from "~/components/Base/ActionCard.vue";
import TaxRateForm from "~/components/Base/TaxRateForm.vue";
import { useToast } from "vue-toastification";
import { useTax } from "~/composables/useTax";
import { useTaxes } from "~/composables/useTaxes";
import cloneDeep from "lodash.clonedeep";

const { tax, interactive = true } = defineProps<{
  tax: TaxRate;
  interactive?: boolean;
}>();
const emit = defineEmits(["remove"]);

const { create } = useTaxes();
const { update, remove } = useTax(tax._id);
const { settings, updateSettings } = useShop();

const localTax = ref<TaxRate>({ ...tax });
const state = ref<TaxRate>({ ...tax });
const dialog = ref<boolean>(false);

const canSave = computed<boolean>(
  () =>
    state.value.rate !== undefined &&
    !!state.value.taxCode &&
    !!state.value.country
);
const properties = computed<{ title: string; value: string }[]>(() => [
  {
    title: "Rate",
    value: `${currency(localTax.value.rate).value}% - ${
      localTax.value.country
    }`,
  },
]);
const isDefaultRate = computed<boolean>(
  () => settings.value.defaultTaxCode === localTax.value.taxCode
);

const handlePromise = (promise, message = "Tax rates data updated!") =>
  promise
    .then(() => useToast().success(message))
    .then(() => (localTax.value = cloneDeep(state.value)))
    .catch((e) => useToast().error(e?.response?.data?.message ?? e.toString()));
const updateTax = () =>
  handlePromise(update.execute(state.value).then(() => closeDialog()));
const removeTax = () => {
  handlePromise(remove.execute(), "Tax rate removed").then(() =>
    emit("remove", localTax.value)
  );
};
const setAsDefault = () => {
  handlePromise(
    updateSettings.execute({ defaultTaxCode: localTax.value.taxCode }),
    "Default tax rate updated"
  );
};
const cloneTax = () => {
  handlePromise(create.execute(localTax.value), "Tax rate cloned");
};
const closeDialog = () => (dialog.value = false);
</script>

<style scoped lang="scss"></style>
