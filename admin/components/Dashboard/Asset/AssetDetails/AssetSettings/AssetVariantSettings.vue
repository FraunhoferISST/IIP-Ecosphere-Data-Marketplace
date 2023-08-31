<template>
  <div>
    <v-list lines="three" select-strategy="multiple">
      <v-list-subheader>Visibility</v-list-subheader>
      <v-list-item
        class="px-10"
        :disabled="!hasPrice || !hasDistributions"
        title="Visible"
        :subtitle="`Control the visibility of the variant in your shop. ${'Price Information and at least one distribution is required to make variant visible!'}`"
      >
        <template #prepend>
          <v-checkbox
            color="accent"
            class="mr-4"
            v-model="isVisible"
            hide-details
            :disabled="!hasPrice || !hasDistributions"
            @change="changeVisibility"
          ></v-checkbox>
        </template>
      </v-list-item>
    </v-list>
    <v-divider></v-divider>
    <v-container fluid>
      <v-row>
        <v-col cols="12">
          <h5 class="text-subtitle-2 mb-4">Tax rates</h5>
          <v-select
            variant="outlined"
            density="compact"
            :loading="loadTaxes.loading.value"
            :items="taxes"
            item-value="taxCode"
            item-title="taxCode"
            chips
            v-model="appliedTaxCode"
            @update:modelValue="updateTax"
            clearable
          >
            <template #chip="{ props, item }">
              <v-chip class="mb-1 mr-1" label v-bind="props" color="accent">
                {{ item.raw.taxCode }}
              </v-chip>
            </template>
          </v-select>
        </v-col>
        <v-col cols="12">
          <h5 class="text-subtitle-2 mb-4">Fields templates</h5>

          <data-viewer
            :loading="loadTemplates.loading.value"
            :error="loadTemplates.error.value"
          >
            <v-select
              variant="outlined"
              density="compact"
              :loading="loadTemplates.loading.value"
              :items="templates"
              item-value="id"
              item-title="title"
              hide-selected
              chips
              v-model="appliedTemplates"
              @update:modelValue="updateAppliedTemplates"
              clearable
              closable-chips
              multiple
              return-object
            >
              <template #chip="{ props, item }">
                <v-chip label v-bind="props" color="accent">
                  {{ item.raw.title }}
                </v-chip>
              </template>
              <template #item="{ props, item }">
                <v-list-item
                  v-bind="props"
                  :title="item.raw.title"
                  :subtitle="item.raw.description"
                >
                  <template #subtitle>
                    <p>
                      {{ item.raw.description }}
                      <dot-divider
                        v-if="item.raw.description"
                        class="mb-1 mx-2"
                      />
                      <span>{{ item.raw.fields.length }} fields</span>
                    </p>
                  </template>
                </v-list-item>
              </template>
            </v-select>
          </data-viewer>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup lang="ts">
import { useToast } from "vue-toastification";
import { FieldsTemplate, Product, ProductVariant } from "~/types";
import { inject } from "vue";
import { Ref } from "@vue/runtime-core";
import { useFieldsTemplates } from "~/composables/useFieldsTemplates";
import DataViewer from "~/components/DataViewer.vue";
import DotDivider from "~/components/Base/DotDivider.vue";

const { data } = defineProps<{
  data: ProductVariant;
}>();

const triggerReload: () => void = inject("triggerReload");
const belongsToProduct: Ref<Product> = inject("belongsTo");

const { notify } = useError();
const toast = useToast();

const { update } = useProductVariant(data._id);
const { templates, load: loadTemplates } = useFieldsTemplates();
const { taxes, load: loadTaxes } = useTaxes();

const isVisible = ref<boolean>(data.isVisible);
const isArchived = ref<boolean>(data.isDeleted);
const appliedTaxCode = ref<string>(data.taxCode);
const appliedTemplates = ref<FieldsTemplate[]>(data.templates ?? []);

const hasPrice = computed<boolean>(() => !!data.pricing.price !== null);
const hasDistributions = computed<boolean>(() => data.distributions.length > 0);

const handleSuccess = (msg = "Data updated!") => {
  toast.success(msg);
  triggerReload();
};

const changeVisibility = () => {
  update
    .execute({
      isVisible: isVisible.value,
      isDeleted: isVisible.value ? false : isArchived.value,
    })
    .then(() => {
      isArchived.value = isVisible.value ? false : isArchived.value;
      handleSuccess("Visibility successfully updated!");
    })
    .catch(notify);
};

const updateTax = () =>
  update
    .execute({
      taxCode: appliedTaxCode.value,
      isTaxable: !!appliedTaxCode.value,
    })
    .then(() => toast.success("Clone created!"))
    .catch((e) => toast.error(e));

const updateAppliedTemplates = () =>
  update
    .execute({
      templates: appliedTemplates.value.map(({ id }) => id),
    })
    .then(() => toast.success("Templates updated!"))
    .catch((e) => toast.error(e));

loadTaxes.execute();
loadTemplates.execute();
</script>

<style scoped></style>
