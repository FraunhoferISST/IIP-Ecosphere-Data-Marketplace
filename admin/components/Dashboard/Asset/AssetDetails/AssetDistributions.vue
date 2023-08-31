<template>
  <v-container fluid class="pa-0">
    <v-row v-if="hasDistributions" class="mt-6">
      <v-col cols="12" md="4">
        <card
          outline
          interactive
          class="fill-height"
          style="border-style: dashed"
          @click="dialog = true"
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
              Add distribution
            </v-btn>
          </div>
        </card>
      </v-col>
      <v-col
        class="d-flex"
        cols="12"
        md="4"
        v-for="(dist, i) in variantDistributions"
        :key="i"
      >
        <distribution-card
          class="fill-width"
          :distribution="dist"
          @clone="cloneDistribution"
          showAccessWarning
        >
          <template #remove="{ close, valid, distribution }">
            <v-btn
              title="remove distribution"
              class="mt-2"
              size="x-small"
              variant="tonal"
              color="error"
              icon="remove"
              @click="() => removeDistribution(i)"
            >
            </v-btn>
          </template>
          <template #action="{ close, valid, distribution }">
            <v-btn
              size="large"
              color="success"
              variant="flat"
              rounded="lg"
              flat
              :disabled="!valid"
              @click="() => updateDistribution(distribution, close, i)"
            >
              Save changes
            </v-btn>
          </template>
        </distribution-card>
      </v-col>
    </v-row>
    <v-row v-else>
      <v-col>
        <no-data rounded="lg" class="text-center" color="info" variant="tonal">
          This asset variant has currently no distributions. Add at least one
          distribution to be able to publish this asset in your shop.
          <div class="my-2">
            <v-btn
              color="accent"
              variant="tonal"
              rounded="lg"
              flat
              @click="dialog = true"
            >
              Add first distribution
            </v-btn>
          </div>
        </no-data>
      </v-col>
    </v-row>
    <v-dialog v-model="dialog" max-width="1100px">
      <dialog-container>
        <asset-variant-distribution-form
          v-model:distribution="newDistribution"
          showAccessWarning
        >
        </asset-variant-distribution-form>
        <template #action>
          <v-btn
            size="large"
            color="primary"
            variant="flat"
            rounded="lg"
            flat
            :disabled="!canAdd"
            :loading="update.loading.value"
            @click="() => addDistribution()"
          >
            Add distribution
          </v-btn>
        </template>
      </dialog-container>
    </v-dialog>
  </v-container>
</template>

<script setup lang="ts">
import type { Distribution, ProductVariant } from "~/types";
import AssetVariantDistributionForm from "~/components/Dashboard/Asset/Create/AssetVariantDistributionForm.vue";
import DialogContainer from "~/components/Base/DialogContainer.vue";
import { useToast } from "vue-toastification";
import DistributionCard from "~/components/Dashboard/DistributionCard.vue";
import Card from "~/components/Base/Card.vue";
import { inject } from "vue";
import NoData from "~/components/Base/NoData.vue";

const { data } = defineProps<{
  data: ProductVariant;
}>();

const triggerReload: () => void = inject("triggerReload");

const { update } = useProductVariant(data._id);
const { patch } = useEditState<Pick<ProductVariant, "distributions">>({
  distributions: data.distributions ?? [],
});
const toast = useToast();

const variantDistributions = ref<Distribution[]>(patch.value.distributions);

const newDistribution = ref<Distribution>({
  title: "",
  description: "",
  format: "",
  size: "",
  mimeType: "",
  type: "",
  encryption: "",
  volume: "",
  modifiedAt: "",
  createdAt: "",
  language: "",
});
const canAdd = computed<boolean>(() => !!newDistribution.value.title);
const dialog = ref(false);
const hasDistributions = computed<boolean>(
  () => variantDistributions.value.length > 0
);

const addDistribution = (
  dist: Distribution = newDistribution.value
): Promise<unknown> =>
  update
    .execute({
      distributions: [...variantDistributions.value, dist],
    })
    .then(() => {
      dialog.value = false;
      variantDistributions.value.push(dist);
      triggerReload();
      toast.success("Data successfully updated!");
    })
    .catch(useError().notify);

const updateDistribution = (
  updatedDist: Distribution,
  closeDialog: () => void,
  index: number
): Promise<unknown> => {
  const tempDistributions: Distribution[] = variantDistributions.value.map(
    (dist: Distribution, i: number) => (index === i ? updatedDist : dist)
  );
  return update
    .execute({
      distributions: tempDistributions,
    })
    .then(() => {
      closeDialog();
      variantDistributions.value = tempDistributions;
      triggerReload();
    })
    .catch(useError().notify);
};

const removeDistribution = (index: number): Promise<unknown> => {
  const tempDistributions: Distribution[] = variantDistributions.value.filter(
    (dist: Distribution, i: number) => index !== i
  );
  return update
    .execute({
      distributions: tempDistributions,
    })
    .then(() => {
      variantDistributions.value = tempDistributions;
      toast.success("Distribution removed");
      triggerReload();
    })
    .catch(useError().notify);
};

const cloneDistribution = (distClone: Distribution) =>
  addDistribution(distClone);
</script>

<style scoped></style>
