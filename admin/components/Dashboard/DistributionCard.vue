<template>
  <div class="dist-card position-relative">
    <v-dialog v-model="dialog" max-width="1100px">
      <template #activator="{ props }">
        <card padding="pa-4" outline interactive v-bind="props">
          <h3>
            {{ distribution.title }}
          </h3>
          <div class="mt-2">
            <div v-for="(prop, i) in properties" :key="i" class="text-truncate">
              <span class="text-body-2 text-slate-500 mr-2">
                {{ prop.title }}:
              </span>
              <span class="text-body-2 text-slate-600 font-weight-bold mr-2">
                {{ prop.value }}
              </span>
            </div>
          </div>
        </card>
      </template>
      <dialog-container>
        <asset-variant-distribution-form
          v-model:distribution="localDistribution"
          :showAccessWarning="showAccessWarning"
        />
        <template #action>
          <v-btn
            class="mr-6"
            variant="flat"
            rounded="lg"
            size="large"
            @click="closeDialog"
          >
            Cancel
          </v-btn>
          <slot
            name="action"
            :close="closeDialog"
            :distribution="localDistribution"
            :valid="canSave"
          >
          </slot>
        </template>
      </dialog-container>
    </v-dialog>
    <div class="dist-card-actions position-absolute pa-4 d-flex flex-column">
      <slot name="clone">
        <v-btn
          title="Clone distribution"
          class="elevation-0"
          size="x-small"
          variant="tonal"
          color="accent"
          icon="view_timeline"
          @click="emitClone"
        >
        </v-btn>
      </slot>
      <slot name="remove">
        <v-btn
          title="Remove distribution"
          class="elevation-0"
          size="x-small"
          variant="tonal"
          color="error"
          icon="remove"
          @click="emitRemove"
        >
        </v-btn>
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import Card from "~/components/Base/Card.vue";
import { Distribution, FulfillmentDistribution } from "~/types";
import DialogContainer from "~/components/Base/DialogContainer.vue";
import AssetVariantDistributionForm from "~/components/Dashboard/Asset/Create/AssetVariantDistributionForm.vue";

const { distribution, showAccessWarning = false } = defineProps<{
  distribution: Distribution & FulfillmentDistribution;
  showAccessWarning?: boolean;
}>();
const emit = defineEmits(["clone", "remove"]);

const localDistribution = ref<Distribution & FulfillmentDistribution>({
  ...distribution,
});
const dialog = ref<boolean>(false);

const canSave = computed<boolean>(() => !!localDistribution.value.title);
const properties = computed<{ title: string; value: string }[]>(() => [
  {
    title: "Access URL",
    value: distribution.accessUrl ?? "N/A",
  },
  {
    title: "User",
    value: distribution.user ?? "N/A",
  },
  {
    title: "Password",
    value: (distribution.password ? "****" : null) ?? "N/A",
  },
  {
    title: "Format",
    value: distribution.format ?? "N/A",
  },
  {
    title: "MIME type",
    value: distribution.mimeType ?? "N/A",
  },
]);

const closeDialog = () => (dialog.value = false);
const emitClone = () =>
  emit("clone", { ...distribution, title: `${distribution.title} - clone` });
const emitRemove = () => emit("remove", distribution);
</script>

<style scoped lang="scss">
.dist-card {
  &:hover {
    .dist-card-actions {
      opacity: 1;
    }
  }
}
.dist-card-actions {
  transition: opacity 0.3s;
  opacity: 0;
  top: 0;
  right: 0;
}
</style>
