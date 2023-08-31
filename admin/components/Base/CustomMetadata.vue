<template>
  <v-row v-for="(prop, i) in metafields" :key="i">
    <v-col cols="6">
      <v-text-field
        variant="outlined"
        density="comfortable"
        hide-details
        label="Field key"
        v-model="prop.key"
        @update:modelValue="() => emit('update:modelValue', metafields)"
      />
    </v-col>
    <v-col cols="6">
      <v-text-field
        variant="outlined"
        density="comfortable"
        hide-details
        label="Field value"
        v-model="prop.value"
        @update:modelValue="() => emit('update:modelValue', metafields)"
      />
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import { Metafield } from "~/types";

const { modelValue } = defineProps<{
  modelValue: Metafield[] | null;
}>();
const emit = defineEmits<{
  (e: "update:modelValue", type: Metafield[]): void;
}>();

const metafields = ref<Metafield[]>([
  ...(modelValue ?? []),
  {
    key: "",
    value: "",
  },
]);
</script>

<style scoped></style>
