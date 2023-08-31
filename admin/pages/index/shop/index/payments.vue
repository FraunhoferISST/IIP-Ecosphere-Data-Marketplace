<template>
  <data-viewer
    :loading="loadPaymentMethods.loading.value"
    :error="loadPaymentMethods.error.value"
  >
    <v-container class="pa-0" fluid>
      <details-save-changes
        :show="hasChanges"
        @save="updateShopInvoiceDetails"
        @discard="discardChanges"
      />
      <v-row>
        <v-col cols="12">
          <h3>Available payment methods</h3>
        </v-col>
      </v-row>
      <v-row>
        <v-col
          cols="12"
          sm="6"
          md="4"
          v-for="(method, i) in paymentMethodsState"
          :key="i"
        >
          <action-card padding="pa-3" :permanent-action="!method.isEnabled">
            <h4 class="mb-2 d-flex justify-space-between">
              <span>
                {{ method.displayName }}
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
              <span class="text-body-2 text-slate-600 font-weight-bold mr-2">
                {{ method.isEnabled ? "Enabled" : "Disabled" }}
              </span>
            </div>
            <div>
              <span class="text-body-2 text-slate-500 mr-2"> Name: </span>
              <span class="text-body-2 text-slate-600 font-weight-bold mr-2">
                {{ method.name }}
              </span>
            </div>
            <div>
              <span class="text-body-2 text-slate-500 mr-2"> Plugin: </span>
              <span class="text-body-2 text-slate-600 font-weight-bold mr-2">
                {{ method.pluginName }}
              </span>
            </div>
            <template #actions>
              <div class="pa-2">
                <v-btn
                  v-if="!method.isEnabled"
                  color="accent"
                  variant="flat"
                  size="small"
                  rounded="pill"
                  @click="() => toggleEnabled(method.name, true, i)"
                >
                  Enable
                </v-btn>
                <v-btn
                  v-else
                  color="error"
                  variant="flat"
                  size="small"
                  rounded="pill"
                  @click="() => toggleEnabled(method.name, false, i)"
                >
                  Disable
                </v-btn>
              </div>
            </template>
          </action-card>
        </v-col>
      </v-row>
      <v-row class="mt-6">
        <v-col cols="12">
          <h3>Invoice details</h3>
        </v-col>
        <v-col cols="12">
          <v-row>
            <v-col cols="12" md="6">
              <v-text-field
                hide-details
                variant="outlined"
                label="BIC*"
                density="comfortable"
                v-model="invoiceDetailsState.bic"
              >
              </v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                hide-details
                variant="outlined"
                label="IBAN*"
                density="comfortable"
                v-model="invoiceDetailsState.iban"
              >
              </v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                hide-details
                variant="outlined"
                label="Tax identity number*"
                density="comfortable"
                v-model="invoiceDetailsState.taxIdentityNumber"
              >
              </v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                variant="outlined"
                label="Additional information"
                density="comfortable"
                hide-details
                v-model="invoiceDetailsState.additionalInfo"
              >
              </v-text-field>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </data-viewer>
</template>

<script setup lang="ts">
import DataViewer from "~/components/DataViewer.vue";
import ActionCard from "~/components/Base/ActionCard.vue";
import { useToast } from "vue-toastification";
import { PaymentMethod } from "~/types";
import DotDivider from "~/components/Base/DotDivider.vue";
import isEqual from "lodash.isequal";
import DetailsSaveChanges from "~/components/Dashboard/DetailsSaveChanges.vue";

const toast = useToast();
const {
  shop,
  load,
  updateInvoiceDetails,
  paymentMethods,
  loadPaymentMethods,
  enablePaymentMethod,
} = useShop();

const paymentMethodsState = ref<PaymentMethod[]>(paymentMethods.value);
const invoiceDetailsState = ref(
  shop.value.invoiceDetails ?? {
    taxIdentityNumber: "",
    iban: "",
    bic: "",
    additionalInfo: "",
  }
);

const hasChanges = computed(
  () =>
    Object.entries({
      ...invoiceDetailsState.value,
    }).filter(([k, v]) => !isEqual(v, shop.value.invoiceDetails?.[k] ?? ""))
      .length > 0
);

const discardChanges = () => {
  invoiceDetailsState.value = shop.value.invoiceDetails ?? {
    taxIdentityNumber: "",
    iban: "",
    bic: "",
    additionalInfo: "",
  };
};
const toggleEnabled = (
  paymentMethodName: string,
  isEnabled: boolean,
  index: number
) =>
  enablePaymentMethod
    .execute({ paymentMethodName, isEnabled })
    .then(
      () =>
        (paymentMethodsState.value = paymentMethodsState.value.map((pm, i) =>
          i === index ? { ...pm, isEnabled } : pm
        ))
    )
    .then(() =>
      toast.success(
        isEnabled
          ? `The payments method is now enabled in your shop`
          : `The payment method is disabled`
      )
    )
    .catch((e) => toast.error(e));

const updateShopInvoiceDetails = () =>
  updateInvoiceDetails
    .execute(invoiceDetailsState.value)
    .then(() => toast.success("Invoice details updated"));

load
  .execute()
  .then(() => loadPaymentMethods.execute())
  .then(() => (paymentMethodsState.value = [...paymentMethods.value]));
</script>

<style scoped></style>
