<template>
  <v-form>
    <v-text-field
      label="Title"
      variant="outlined"
      density="comfortable"
      persistent-hint
      v-model="computedInquiry.title"
    />
    <v-textarea
      class="mb-5"
      label="Description"
      variant="outlined"
      density="comfortable"
      rows="3"
      hint="Describe you inquiry"
      persistent-hint
      v-model="computedInquiry.description"
    />
    <v-text-field
      class="mb-5"
      label="Use case"
      variant="outlined"
      density="comfortable"
      hint="Shortly emphasize what is your use case"
      persistent-hint
      v-model="computedInquiry.useCase"
    />
    <v-combobox
      class="mb-5"
      density="comfortable"
      variant="outlined"
      hint="Add any preferred source types that should represent the data"
      label="Source types"
      chips
      multiple
      persistent-hint
      :items="['File', 'API', `Database`, 'Stream', 'JSON', 'CSV', 'Other']"
      v-model="computedInquiry.sourceTypes"
    />
    <v-combobox
      class="mb-5"
      density="comfortable"
      variant="outlined"
      hint="Define general topics that the data should match"
      label="Categories"
      chips
      multiple
      persistent-hint
      :items="categories"
      v-model="computedInquiry.categories"
    />
    <v-text-field
      class="mb-5"
      label="Expected consumption volume"
      variant="outlined"
      density="comfortable"
      hint="What is the expected consumption volume, e.g. in GB, request per month, number of accounts etc."
      persistent-hint
      v-model="computedInquiry.expectedConsumptionVolume"
    />
    <v-text-field
      class="mb-5"
      label="Desired pricing"
      variant="outlined"
      density="comfortable"
      hint="Describe acceptable costs or a desired pricing model"
      persistent-hint
      v-model="computedInquiry.desiredPricing"
    />
    <v-checkbox
      label="Publish"
      v-model="computedInquiry.published"
      density="com"
    />
  </v-form>
</template>
<script setup lang="ts">
import type { Inquiry } from "../../../../shared/types";

const { inquiry } = defineProps<{
  inquiry: Inquiry;
}>();
const emit = defineEmits<{ (e: "update:inquiry", inquiry: Inquiry): void }>();

const categories = [
  "Computer Science",
  "AI",
  "ML",
  "NLP",
  "Education",
  "Classification",
  "Data Visualization",
  "Models",
  "Pre-Trained Models",
];

const computedInquiry = computed<Inquiry>({
  get: () => inquiry,
  set: (val: Inquiry) => emit("update:inquiry", val),
});
</script>

<style scoped></style>
