<template>
  <v-container fluid style="padding: 0">
    <v-row>
      <v-col cols="12">
        <h3>General information</h3>
      </v-col>
      <v-col cols="12">
        <v-text-field
          density="comfortable"
          variant="outlined"
          hide-details
          label="Distribution title"
          v-model="computedDistribution.title"
        />
      </v-col>
      <v-col cols="12">
        <v-combobox
          density="comfortable"
          variant="outlined"
          hide-details
          label="Distribution type"
          chips
          :items="['File', 'API', `Database`, 'URL']"
          v-model="computedDistribution.type"
        />
      </v-col>
      <v-col cols="12">
        <v-textarea
          density="comfortable"
          variant="outlined"
          hide-details
          label="Description"
          rows="3"
          v-model="computedDistribution.description"
        />
      </v-col>
    </v-row>
    <v-row class="mt-8">
      <v-col cols="12">
        <h3>Access information</h3>
      </v-col>
      <v-col cols="12" v-if="showAccessWarning">
        <v-alert
          color="warning"
          variant="tonal"
          density="compact"
          class="text-body-2"
        >
          These are publicly visible to every one who can see the corresponding
          offer! Define the access information only if your distribute the offer
          to free conditions or for some reason want to directly provide access
          to the resource. Otherwise provide this information only after the
          completed purchase for particular customer!
        </v-alert>
      </v-col>
      <v-col cols="12">
        <v-text-field
          density="comfortable"
          variant="outlined"
          hide-details
          label="Access URL"
          v-model="computedDistribution.accessUrl"
        />
      </v-col>
      <v-col cols="12" md="6">
        <v-text-field
          density="comfortable"
          variant="outlined"
          hide-details
          label="User"
          v-model="computedDistribution.user"
        />
      </v-col>
      <v-col cols="12" md="6">
        <v-text-field
          density="comfortable"
          variant="outlined"
          hide-details
          type="password"
          label="Password"
          v-model="computedDistribution.password"
        />
      </v-col>
    </v-row>
    <v-row class="mt-8">
      <v-col cols="12">
        <h3>Additional information</h3>
      </v-col>
      <v-col cols="12" md="4">
        <v-text-field
          density="comfortable"
          variant="outlined"
          hide-details
          label="Format"
          v-model="computedDistribution.format"
        />
      </v-col>
      <v-col cols="12" md="4">
        <v-text-field
          density="comfortable"
          variant="outlined"
          hide-details
          label="MIME type"
          v-model="computedDistribution.mimeType"
        />
      </v-col>
      <v-col cols="12" md="4">
        <v-text-field
          density="comfortable"
          variant="outlined"
          hide-details
          label="Encryption"
          v-model="computedDistribution.encryption"
        />
      </v-col>
      <v-col cols="12" md="4">
        <v-text-field
          density="comfortable"
          variant="outlined"
          hide-details
          label="Size in bytes"
          v-model="computedDistribution.size"
        />
      </v-col>
      <v-col cols="12" md="4">
        <v-text-field
          density="comfortable"
          variant="outlined"
          hide-details
          label="Volume"
          v-model="computedDistribution.volume"
        />
      </v-col>
      <v-col cols="12" md="4">
        <v-text-field
          density="comfortable"
          variant="outlined"
          hide-details
          label="Created at"
          v-model="computedDistribution.createdAt"
        />
      </v-col>
      <v-col cols="12" md="4">
        <v-text-field
          density="comfortable"
          variant="outlined"
          hide-details
          label="Modified at"
          v-model="computedDistribution.modifiedAt"
        />
      </v-col>
      <v-col cols="12" md="4">
        <v-text-field
          density="comfortable"
          variant="outlined"
          hide-details
          label="Language"
          v-model="computedDistribution.language"
        />
      </v-col>
    </v-row>
    <v-row class="mt-8">
      <v-col cols="12">
        <h3>Custom metadata</h3>
      </v-col>
      <v-col cols="12">
        <custom-metadata v-model="distribution.metafields" />
      </v-col>
    </v-row>
    <v-row class="mt-8">
      <v-col cols="12" class="d-flex justify-end">
        <slot> </slot>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { Distribution, FulfillmentDistribution } from "~/types";
import CustomMetadata from "~/components/Base/CustomMetadata.vue";

const { distribution, showAccessWarning = false } = defineProps<{
  distribution: Distribution & FulfillmentDistribution;
  showAccessWarning?: boolean;
}>();

const emit = defineEmits<{
  (
    e: "update:distribution",
    distribution: Distribution & FulfillmentDistribution
  ): void;
}>();

const shouldShowAccessInformation = computed(() => "accessUrl" in distribution);

const computedDistribution = computed({
  get: () => distribution,
  set: (val: Distribution & FulfillmentDistribution) =>
    emit("update:distribution", val),
});
</script>

<style scoped></style>
