<template>
  <div class="order-details fill-height">
    <data-viewer
      class="fill-height"
      #default
      :loading="load.loading.value"
      :error="load.error.value"
    >
      <section class="order-details-container fill-height">
        <v-container fluid class="px-10">
          <v-row class="mb-5">
            <v-col cols="12">
              <h3>
                Issuer
                <span style="font-size: 0.9rem">
                  <dot-divider class="mx-3 mb-1" />
                  <span class="__subtitle font-weight-regular">issued at </span>
                  <date-display
                    class="ml-2 text-slate-500 font-weight-bold"
                    :date="inquiry.createdAt"
                  />
                </span>
              </h3>
            </v-col>
            <v-col cols="12">
              <account-card dense :account="inquiry.account" :index="0" />
            </v-col>
          </v-row>
          <v-row class="mb-10">
            <v-col cols="12">
              <h3>Details</h3>
            </v-col>
            <v-col cols="12">
              <inquiry-form v-model:inquiry="patch" />
            </v-col>
            <v-col cols="12" class="d-flex justify-end">
              <v-btn
                variant="flat"
                color="success"
                size="large"
                rounded="lg"
                @click="updateInquiry"
                :loading="update.loading.value"
              >
                Save changes
              </v-btn>
            </v-col>
          </v-row>
          <v-row class="mb-10">
            <v-col cols="12">
              <h3>
                Replies
                <span style="font-size: 0.9rem">
                  <dot-divider class="mx-3 mb-1" />
                  <span class="__subtitle font-weight-regular">
                    {{ inquiry.repliesCount }}
                  </span>
                </span>
              </h3>
            </v-col>
            <v-col cols="12" v-if="inquiry.repliesCount === 0">
              <no-data> The inquiry has no replies </no-data>
            </v-col>
          </v-row>
        </v-container>
      </section>
    </data-viewer>
  </div>
</template>

<script setup lang="ts">
import DataViewer from "~/components/DataViewer.vue";
import AccountCard from "~/components/Base/AccountCard.vue";
import DateDisplay from "~/components/Base/DateDisplay.vue";
import DotDivider from "~/components/Base/DotDivider.vue";
import InquiryForm from "~/components/Dashboard/Inquiry/InquiryForm.vue";
import type { Inquiry } from "../../../../shared/types";
import cloneDeep from "lodash.clonedeep";
import { useToast } from "vue-toastification";
import NoData from "~/components/Base/NoData.vue";

const { id } = defineProps<{
  id: string;
}>();

const { inquiry, load, update } = useInquiry(id);
const { patch, setState } = useEditState(inquiry.value ?? {});

const updateInquiry = () =>
  update
    .execute(patch.value)
    .then(() => useToast().success("Inquiry updated!"))
    .catch((e) => useError().notify(e));

load.execute().then(() => {
  const patchData = Object.fromEntries(
    [
      "title",
      "description",
      "desiredPricing",
      "expectedConsumptionVolume",
      "expirationDate",
      "license",
      "published",
      "sourceTypes",
      "categories",
      "useCase",
    ].map((p) => [p, inquiry.value[p]])
  );
  setState(patchData);
  patch.value = cloneDeep(patchData);
});
</script>

<style scoped lang="scss">
.order-details-container {
  display: grid;
  grid-template-columns: minmax(300px, 600px) 1fr;
}
.__title {
  font-weight: bold;
  color: black;
}
.__subtitle {
  color: rgb(var(--v-theme-slate-500));
}
</style>
