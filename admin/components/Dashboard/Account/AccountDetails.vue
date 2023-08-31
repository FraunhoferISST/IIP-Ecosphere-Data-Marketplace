<template>
  <section class="account-container">
    <details-header
      :title="data.title"
      :id="data._id"
      :pages="pages"
      v-model:page="selectedPage"
    >
      <template #action>
        <v-btn
          class="ml-6"
          icon="settings"
          flat
          color="accent"
          variant="text"
          @click="openSettings"
        >
        </v-btn>
      </template>
    </details-header>
    <overlay-sidebar
      :show="showSettings"
      @update:show="(val) => (showSettings = val)"
    >
      <asset-settings :data.sync.state="state" />
    </overlay-sidebar>
    <data-viewer :loading="load.loading.value" :error="load.error.value">
      <details-save-changes :show="hasChanges" @discard="onDiscardChanges">
        <template #default>
          <v-btn
            class="ml-4"
            flat
            color="success"
            variant="flat"
            rounded="lg"
            @click="updateUser"
          >
            Save changes
          </v-btn>
        </template>
      </details-save-changes>
      <details-header title="Your account" :id="user._id"> </details-header>
      <div class="user-overview my-10">
        <div>
          <v-avatar color="bg-secondary" size="200px">
            <v-img :src="user.picture" v-if="user.picture" />
            <span v-else>{{ userInitials }}</span>
          </v-avatar>
          <div class="text-center mt-4">
            <v-btn size="x-small" variant="text" rounded="lg" color="accent">
              change avatar
            </v-btn>
          </div>
        </div>
        <card padding="pa-0">
          <v-container class="pa-10">
            <v-row dense>
              <v-col cols="12" class="pb-0">
                <h2>
                  {{ userName || "N/A" }}
                </h2>
              </v-col>
              <v-col cols="12" class="pt-0 text-slate-500">
                {{ user.primaryEmailAddress || "N/A" }}
              </v-col>
              <v-col cols="12">
                <v-chip
                  label
                  size="x-small"
                  color="accent"
                  class="mr-2"
                  v-for="(group, i) in groups"
                  :key="i"
                >
                  {{ group }}
                </v-chip>
              </v-col>
              <v-col cols="12">
                <span class="text-slate-500">
                  Created at
                  <date-display class="text-slate-600" :date="user.createdAt" />
                </span>
                <dot-divider class="mx-3 mb-1" />
                <span class="text-slate-500">
                  Updated at
                  <date-display class="text-slate-600" :date="user.updatedAt" />
                </span>
              </v-col>
            </v-row>
          </v-container>
        </card>
      </div>
      <v-container fluid class="px-0">
        <v-row>
          <v-col cols="12" class="mt-6 mb-1">
            <h3>General information</h3>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              variant="outlined"
              density="comfortable"
              hide-details
              label="First name"
              v-model="user.firstName"
            />
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              variant="outlined"
              density="comfortable"
              hide-details
              label="Last name"
              v-model="user.lastName"
            />
          </v-col>
          <v-col cols="12">
            <v-textarea
              variant="outlined"
              density="comfortable"
              hide-details
              label="BIO"
              v-model="user.bio"
            />
          </v-col>
        </v-row>
      </v-container>
    </data-viewer>
  </section>
</template>

<script setup lang="ts">
import { watch } from "vue";
import cloneDeep from "lodash.clonedeep";
import OverlaySidebar from "~/components/Base/OverlaySidebar.vue";
import AssetSettings from "~/components/Dashboard/Asset/AssetDetails/AssetSettings/AssetSettings.vue";
import AssetOverview from "~/components/Dashboard/Asset/AssetDetails/AssetOverview/AssetOverview.vue";
import AssetReviews from "~/components/Dashboard/Asset/AssetDetails/AssetReviews.vue";
import AssetVariants from "~/components/Dashboard/Asset/AssetDetails/AssetVariants.vue";
import AssetPricing from "~/components/Dashboard/Asset/AssetDetails/AssetPricing.vue";
import AssetDistributions from "~/components/Dashboard/Asset/AssetDetails/AssetDistributions.vue";
import DetailsHeader from "~/components/Dashboard/DetailsHeader.vue";
import { Account } from "../../../../shared/types";
import DataViewer from "~/components/DataViewer.vue";
import DetailsSaveChanges from "~/components/Dashboard/DetailsSaveChanges.vue";

const { account } = defineProps<{
  account: Account;
}>();
const emit = defineEmits(["save"]);

const { state, patch } = useUser(account);

const showSettings = ref(false);

const openSettings = () => (showSettings.value = true);
</script>
<style scoped lang="scss"></style>
