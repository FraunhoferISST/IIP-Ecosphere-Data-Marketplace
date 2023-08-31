<template>
  <v-container class="pa-0">
    <v-row v-if="hasVariants">
      <v-col cols="12" class="d-flex align-center">
        <v-text-field
          v-model="filterInput"
          hide-details
          variant="outlined"
          density="comfortable"
          label="Filter by title"
        />
        <v-btn
          class="ml-6"
          min-width="200px"
          size="large"
          color="accent"
          variant="tonal"
          rounded="lg"
          append-icon="add"
          clearable
          flat
          @click="newVariantDialog = true"
        >
          Add new
        </v-btn>
      </v-col>
    </v-row>
    <v-row dense v-if="hasVariants" class="mt-6">
      <v-col cols="12" v-for="(variant, i) in filteredVariants" :key="i">
        <product-card
          :product="variant"
          :product-id="data._id"
          :variant-id="variant._id"
          :index="i"
          :actions="actions"
        />
      </v-col>
    </v-row>
    <v-row v-else>
      <v-col>
        <no-data>
          This product asset has currently no variants. Add at least one variant
          to be able to publish this asset in your shop.
          <div class="my-2">
            <v-btn
              size="large"
              color="accent"
              variant="tonal"
              rounded="lg"
              flat
              @click="newVariantDialog = true"
            >
              Add first variant
            </v-btn>
          </div>
        </no-data>
      </v-col>
    </v-row>
    <v-dialog v-model="newVariantDialog" max-width="1200px">
      <dialog-container>
        <asset-variant-form v-model="newVariant"> </asset-variant-form>
        <template #action>
          <v-btn
            size="large"
            color="primary"
            variant="flat"
            rounded="lg"
            flat
            :disabled="!canCreateVariant"
            :loading="create.loading.value"
            @click="createVariant"
          >
            Create variant
          </v-btn>
        </template>
      </dialog-container>
    </v-dialog>
  </v-container>
</template>

<script setup lang="ts">
import ProductCard from "~/components/Base/ProductCard.vue";
import AssetVariantForm from "~/components/Dashboard/Asset/Create/AssetVariantForm.vue";
import NoData from "~/components/Base/NoData.vue";
import DialogContainer from "~/components/Base/DialogContainer.vue";
import { Product, ProductVariant, PriceModelType } from "~/types";
import { useToast } from "vue-toastification";
import cloneDeep from "lodash.clonedeep";

const { data } = defineProps<{
  data: Product;
}>();

const { create } = useProductVariant("", data._id);
const toast = useToast();

const state = ref(cloneDeep(data));
const filterInput = ref("");
const newVariantDialog = ref(false);
const newVariant = ref<Partial<ProductVariant>>({
  title: "New product variant title",
  priceModel: {
    type: PriceModelType.Once,
    paymentPeriod: "",
    timeRange: {
      from: "",
      to: "",
    },
    volume: "",
    quantity: "",
  },
});

const hasVariants = computed(() => state.value?.variants?.length > 0);
const canCreateVariant = computed(
  () =>
    newVariant.value.title &&
    newVariant.value.optionTitle &&
    newVariant.value.attributeLabel
);
const filteredVariants = computed(() =>
  (state.value?.variants ?? []).filter(({ title }) =>
    filterInput.value
      ? title.toLowerCase().includes(filterInput.value.toLowerCase())
      : true
  )
);

const actions = ref([
  {
    title: "Make visible",
    handler: (v) =>
      useProductVariant(v._id, data._id)
        .update.execute({ ...v, isVisible: true })
        .then(handleActionSuccess)
        .then(() => (v.isVisible = true))
        .catch(handleActionError),
  },
  {
    title: "Hide",
    handler: (v) =>
      useProductVariant(v._id, data._id)
        .update.execute({ ...v, isVisible: false })
        .then(handleActionSuccess)
        .then(() => (v.isVisible = false))
        .catch((err) => handleActionError(err)),
  },
]);

const handleActionError = (error) =>
  toast.error(error?.response?.data?.message);

const handleActionSuccess = () => {
  toast.success("Successfully updated!");
};

const createVariant = () =>
  create.execute(newVariant.value).then((response: ProductVariant) => {
    const { _id: newVariantId } = response;
    navigateTo({
      name: "index-assets-id-variants-variantId",
      params: {
        id: data._id,
        variantId: newVariantId,
      },
    });
  });
</script>

<style scoped></style>
