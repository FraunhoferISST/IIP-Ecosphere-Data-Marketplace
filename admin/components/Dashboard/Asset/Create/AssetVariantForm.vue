<template>
  <v-container fluid class="pa-0">
    <v-row>
      <v-col cols="12">
        <h3>General information</h3>
      </v-col>
      <v-col cols="12">
        <v-text-field
          id="title"
          density="comfortable"
          variant="outlined"
          hide-details
          label="Variant title"
          v-model="computedModelValue.title"
        />
      </v-col>
      <v-col cols="12" md="6">
        <v-text-field
          id="label"
          density="comfortable"
          variant="outlined"
          hide-details
          label="Attribute label"
          v-model="computedModelValue.attributeLabel"
        />
      </v-col>
      <v-col cols="12" md="6">
        <v-text-field
          id="option"
          density="comfortable"
          variant="outlined"
          hide-details
          label="Option"
          v-model="computedModelValue.optionTitle"
        />
      </v-col>
    </v-row>
    <v-row class="mt-8">
      <v-col cols="12" class="d-flex justify-end">
        <slot :variant="computedModelValue"> </slot>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ProductVariant } from "../../../../../shared/types";
const { modelValue } = defineProps<{
  modelValue: Partial<ProductVariant>;
}>();
const emit = defineEmits(["update:modelValue"]);

const computedModelValue = computed({
  get: () => modelValue,
  set: (value: Partial<ProductVariant>) => emit("update:modelValue", value),
});
</script>

<style scoped></style>
