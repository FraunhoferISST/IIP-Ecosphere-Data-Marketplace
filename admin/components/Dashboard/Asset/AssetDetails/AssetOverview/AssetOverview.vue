<template>
  <details-save-changes :show="hasChanges" @discard="onDiscardChanges">
    <template #default="{ close }">
      <v-btn
        class="ml-4"
        flat
        color="success"
        variant="flat"
        rounded="lg"
        @click="() => onSaveChanges(close)"
      >
        Save changes
      </v-btn>
    </template>
  </details-save-changes>
  <div>
    <div class="asset-overview">
      <div class="asset-media mb-5 mb-md-0">
        <div class="fill-height">
          <asset-media :data="data" />
        </div>
      </div>
      <div class="asset-info">
        <div>
          <card v-if="hasSlug">
            <span class="text-slate-500">Slug</span>
            <div class="text-h5 text-md-h4 font-weight-bold">
              {{ state.slug }}
            </div>
          </card>
          <card v-if="hasOption">
            <span class="text-slate-500">Option</span>
            <div class="text-h5 text-md-h4 font-weight-bold">
              {{ state.attributeLabel }}
              <span class="text-slate-400 text-h5 text-md-h4">
                {{ state.optionTitle }}
              </span>
            </div>
          </card>
        </div>
        <v-container fluid class="pa-0 mt-5">
          <v-row>
            <v-col cols="12" md="6" class="d-flex">
              <card class="fill-width">
                <span class="text-slate-500">Prices</span>
                <div class="text-h5 text-md-h4 font-weight-bold">
                  {{ currentPrice || "N/A" }}
                </div>
              </card>
            </v-col>
            <v-col cols="12" md="6" v-if="hasVariants" class="d-flex">
              <card @click="goToVariants" interactive class="fill-width">
                <div class="d-flex justify-space-between">
                  <span class="text-slate-500">Variants</span>
                  <v-icon color="primary">chevron_right </v-icon>
                </div>
                <div class="text-h5 text-md-h4 font-weight-bold">
                  {{ variantsCount }}
                </div>
              </card>
            </v-col>
            <v-col cols="12" md="6" v-if="hasBelongingProduct" class="d-flex">
              <card
                @click="goToBelongingProduct"
                interactive
                class="fill-width"
              >
                <div class="d-flex justify-space-between">
                  <span class="text-slate-500">Product</span>
                  <v-icon color="primary">chevron_right </v-icon>
                </div>
                <div class="text-h5 text-md-h4 font-weight-bold text-truncate">
                  {{ belongsTo.title }}
                </div>
              </card>
            </v-col>
          </v-row>
        </v-container>
        <div class="mt-5">
          <v-chip
            label
            size="x-small"
            color="accent"
            v-for="(tag, i) in tags"
            :key="i"
          >
            {{ tag }}
          </v-chip>
          <dot-divider class="mx-4 mb-1" />
          <span
            v-if="data.isDeleted"
            class="d-inline-block mr-4 text-slate-500"
          >
            <v-icon size="x-small" color="error"> archive </v-icon>
            Archived
          </span>
          <div v-if="!data.isDeleted" class="d-inline-block">
            <span class="d-inline-block mr-4 text-slate-500">
              <v-icon size="x-small" color="accent">
                {{ data.isVisible ? "visibility" : "visibility_off" }}
              </v-icon>
              {{ data.isVisible ? "Visible" : "Hidden" }}
            </span>
            <span class="text-slate-500">
              <dot-divider size="10px" :color="publishIndicatorColor" />
              {{ isPublished ? "Published" : "Not published" }}
            </span>
          </div>
        </div>
      </div>
    </div>
    <asset-overview-general-fields
      v-model="generalInfoPatch"
      @update:modelValue="composePatches"
    />
    <div class="mt-4">
      <template-renderer
        v-for="template in templates"
        :template="template"
        :key="template.id"
        v-model="templatesFieldsPatch[template.id]"
        @update:modelValue="composePatches"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import DotDivider from "~/components/Base/DotDivider.vue";
import Card from "~/components/Base/Card.vue";
import { FieldsTemplate, Product, ProductVariant } from "~/types";
import { useTheme } from "vuetify";
import type { Ref } from "vue";
import AssetOverviewGeneralFields from "~/components/Dashboard/Asset/AssetDetails/AssetOverview/AssetOverviewGeneralFields.vue";
import DetailsSaveChanges from "~/components/Dashboard/DetailsSaveChanges.vue";
import TemplateRenderer from "~/components/Base/TemplateRenderer.vue";
import { useToast } from "vue-toastification";
import AssetMedia from "~/components/Dashboard/Asset/AssetDetails/AssetOverview/AssetMedia.vue";

const { data } = defineProps<{
  data: Product & ProductVariant;
}>();
const emit = defineEmits(["changePage"]);
const belongsTo: Ref<Product> = inject("belongsTo");

const { patch: generalInfoPatch } = useEditState<Product & ProductVariant>(
  data
);
const { patch: templatesFieldsPatch } = useEditState<object>(
  Object.fromEntries(
    Object.entries(data.templatesFields ?? {}).map(([id, v]) => [id, v ?? {}])
  )
);
const { state, patch, hasChanges, reset, sync, getDiff } = useEditState<
  Product & ProductVariant
>(data);
const theme = useTheme();

const tags = computed(() =>
  [
    state.value.productType,
    state.value.mimeType,
    belongsTo ? "variant" : "asset",
  ].filter((t) => t)
);
const isPublished = computed<boolean>(
  () =>
    !!(
      state.value.publishedProductHash || belongsTo?.value.publishedProductHash
    )
);
const publishIndicatorColor = computed<string>(() =>
  isPublished.value
    ? theme.computedThemes.value.customTheme.colors.success
    : theme.computedThemes.value.customTheme.colors.error
);
const hasSlug = computed<boolean>(() => "slug" in data);
const hasBelongingProduct = computed<boolean>(() => !!belongsTo?.value);
const hasOption = computed<boolean>(() => "attributeLabel" in data);
const hasVariants = computed<boolean>(() => "variants" in data);
const variantsCount = computed<number>(() => (data.variants ?? []).length);
const currentPrice = computed<string>(() => data.pricing.displayPrice ?? "");
const templates = computed<FieldsTemplate[]>(() => state.value.templates ?? []);

const goToVariants = () => emit("changePage", "Variants");
const goToBelongingProduct = () =>
  navigateTo({
    name: "index-assets-id",
    params: {
      id: belongsTo.value._id,
    },
  });
const composePatches = () => {
  patch.value = {
    ...patch.value,
    ...generalInfoPatch.value,
    templatesFields: templatesFieldsPatch.value,
  };
};
const onDiscardChanges = () => {
  reset();
};
const onSaveChanges = (closeMethod: () => void) => {
  (belongsTo
    ? useProductVariant(state.value._id)
    : useProduct(state.value._id)
  ).update
    .execute(getDiff())
    .then(() => {
      sync();
      closeMethod();
      useToast().success("Data updated!");
    })
    .catch(useError().notify);
};
</script>

<style scoped lang="scss">
.asset-overview {
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 30px;
}
@media screen and (max-width: 959px) {
  .asset-overview {
    display: block;
  }
}
</style>
