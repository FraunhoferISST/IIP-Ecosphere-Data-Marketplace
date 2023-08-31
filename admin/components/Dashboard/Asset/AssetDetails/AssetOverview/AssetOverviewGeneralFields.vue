<template>
  <v-container fluid class="px-0">
    <v-row>
      <v-col cols="12" class="mt-6 pb-0">
        <h3>Asset general attributes</h3>
      </v-col>
      <v-col cols="12">
        <v-row>
          <v-col
            cols="12"
            :md="prop.fullWidth ? 12 : 6"
            v-for="prop in generalInfo"
            :key="prop.title"
          >
            <component
              variant="outlined"
              :id="prop.id"
              density="comfortable"
              hide-details
              :label="prop.title"
              :is="getComponentByType(prop.type)"
              v-model="prop.value"
              auto-grow
              rows="3"
              @input="emitUpdate"
              :placeholder="prop.placeholder"
              @update="emitUpdate"
              :items="prop.options ?? []"
            />
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" class="mt-6 pb-0">
        <h3>Additional information</h3>
      </v-col>
      <v-col cols="12">
        <v-row>
          <v-col
            cols="12"
            :md="prop.fullWidth ? 12 : 6"
            v-for="prop in additionalInfo"
            :key="prop.title"
          >
            <component
              variant="outlined"
              density="compact"
              hide-details
              :label="prop.title"
              :is="getComponentByType(prop.type)"
              v-model="prop.value"
              auto-grow
              rows="3"
              @input="emitUpdate"
              @update="emitUpdate"
              @update:modelValue="emitUpdate"
              :items="prop.options ?? []"
              :multiple="prop.multiple"
              chips
            />
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" class="mt-6 pb-0">
        <h3>Custom metadata</h3>
      </v-col>
      <v-col cols="12">
        <v-row v-for="(prop, i) in metaProperties" :key="i">
          <v-col cols="6">
            <v-text-field
              variant="outlined"
              density="compact"
              hide-details
              label="Field key"
              v-model="prop.key"
              @input="emitUpdate"
            />
          </v-col>
          <v-col cols="6">
            <v-text-field
              variant="outlined"
              density="compact"
              hide-details
              label="Field value"
              v-model="prop.value"
              @input="emitUpdate"
            />
          </v-col>
        </v-row>
        <v-row v-if="canAddAdditionalProp">
          <v-col cols="12">
            <v-btn icon flat @click="addAdditionalProp">
              <v-icon color="primary">add</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import type { ProductVariant, Product } from "@/types";

const { modelValue } = defineProps<{
  modelValue: Product & ProductVariant;
}>();
const emit = defineEmits<{
  (e: "update:modelValue", val: Partial<Product & ProductVariant>): void;
}>();

const { patch } = useEditState<Product & ProductVariant>(modelValue);

const generalProperties = ref(
  [
    {
      title: "Title",
      id: "title",
      propName: "title",
      type: "text",
      value: "",
      fullWidth: true,
    },
    {
      title: "Description",
      id: "description",
      propName: "description",
      type: "textArea",
      value: "",
      fullWidth: true,
    },
    {
      title: "Attribute label",
      propName: "attributeLabel",
      type: "text",
      value: "",
      fullWidth: false,
    },
    {
      title: "Option title",
      propName: "optionTitle",
      type: "text",
      value: "",
      fullWidth: false,
    },
    {
      title: "Asset type",
      propName: "assetType",
      type: "combobox",
      placeholder: "Select one or define custom",
      options: ["file", "Database", "API", "Stream"],
      customOptions: true,
      value: "",
      fullWidth: false,
    },
  ].map((prop) => ({
    ...prop,
    value: patch.value[prop.propName] ?? prop.value,
  }))
);
const additionalProperties = ref(
  [
    {
      title: "Vendor",
      type: "text",
      propName: "vendor",
      value: null,
      fullWidth: false,
    },
    {
      title: "Origin country",
      propName: "originCountry",
      type: "text",
      value: null,
      fullWidth: false,
    },
    {
      title: "Data classification",
      propName: "dataClassification",
      type: "select",
      value: null,
      options: ["Public", "Internal", "Confidential", "Restricted"],
      fullWidth: false,
    },
    {
      title: "Themes",
      propName: "themes",
      type: "select",
      multiple: true,
      value: null,
      options: [
        "Agriculture",
        "Culture",
        "Economy",
        "Education",
        "Energy",
        "Environment",
        "Finance",
        "Fisheries",
        "Health",
        "Infrastructure",
        "International",
        "Justice",
        "Population",
        "Public Sector",
        "Regional",
        "Science",
        "Society",
        "Sports",
        "Technology",
        "Transport",
      ],
      fullWidth: false,
    },
    {
      title: "Version info",
      propName: "versionInfo",
      type: "text",
      value: null,
      fullWidth: false,
    },
    {
      title: "Version notes",
      propName: "versionNotes",
      type: "text",
      value: null,
      fullWidth: false,
    },
    {
      title: "Update Cycle",
      propName: "updateCycle",
      type: "text",
      value: null,
      fullWidth: false,
    },
    {
      title: "SKU",
      propName: "sku",
      type: "text",
      value: null,
      fullWidth: false,
    },
    {
      title: "Barcode",
      propName: "barcode",
      type: "text",
      value: null,
      fullWidth: false,
    },
  ].map((prop) => ({
    ...prop,
    value: patch.value[prop.propName] ?? prop.value,
  }))
);
const metaProperties = ref([
  ...(patch.value.metafields ?? []),
  {
    key: "",
    value: "",
  },
]);
const typeMap = {
  text: "v-text-field",
  textArea: "v-textarea",
  select: "v-select",
  combobox: "v-combobox",
};

const generalInfo = computed(() =>
  generalProperties.value.filter(({ propName }) => propName in modelValue)
);
const additionalInfo = computed(() =>
  additionalProperties.value.filter(({ propName }) => propName in modelValue)
);
const metaInfo = computed(() => ({
  metafields: metaProperties.value.filter(({ key }) => key),
}));
const canAddAdditionalProp = computed<boolean>(() =>
  metaProperties.value.every(({ key }) => key)
);

const getComponentByType = (type) => typeMap[type] ?? "v-text";
const addAdditionalProp = () => {
  if (canAddAdditionalProp.value)
    metaProperties.value.push({
      key: "",
      value: "",
    });
};
const emitUpdate = () => {
  emit("update:modelValue", {
    ...Object.fromEntries(
      generalInfo.value.map(({ propName, value }) => [propName, value || null])
    ),
    ...Object.fromEntries(
      additionalInfo.value.map(({ propName, value }) => [
        propName,
        value || null,
      ])
    ),
    ...metaInfo.value,
  });
};
</script>

<style scoped></style>
