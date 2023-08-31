<template>
  <data-viewer :loading="load.loading.value" :error="load.error.value">
    <section class="asset-container" v-if="state">
      <details-header :title="fullName" :id="account._id" :pages="[]">
        <template #action>
          <v-btn
            class="ml-6"
            icon="settings"
            flat
            color="accent"
            variant="text"
            @click="showSettings = true"
          >
          </v-btn>
        </template>
      </details-header>
      <overlay-sidebar v-model:show="showSettings">
        <account-settings :data="account" />
      </overlay-sidebar>
      <details-save-changes
        :show="hasChanges"
        @discard="reset"
        @save="updateAccount"
      ></details-save-changes>
      <div class="account-overview my-10">
        <div>
          <account-media :account="account" />
        </div>
        <card padding="pa-0">
          <v-container class="pa-10">
            <v-row dense>
              <v-col cols="12" class="pb-0">
                <h2>
                  {{ fullName || "N/A" }}
                </h2>
              </v-col>
              <v-col cols="12" class="pt-0 text-slate-500">
                {{ account.primaryEmailAddress || "N/A" }}
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
                  <date-display
                    class="text-slate-600"
                    :date="account?.createdAt ?? ''"
                  />
                </span>
                <dot-divider class="mx-3 mb-1" />
                <span class="text-slate-500">
                  Updated at
                  <date-display
                    class="text-slate-600"
                    :date="account?.updatedAt ?? ''"
                  />
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
              v-model="patch.firstName"
            />
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              variant="outlined"
              density="comfortable"
              hide-details
              label="Last name"
              v-model="patch.lastName"
            />
          </v-col>
          <v-col cols="12">
            <v-textarea
              variant="outlined"
              density="comfortable"
              hide-details
              label="BIO"
              v-model="patch.bio"
            />
          </v-col>
        </v-row>
      </v-container>
    </section>
  </data-viewer>
</template>

<script setup lang="ts">
import DataViewer from "~/components/DataViewer.vue";
import DetailsHeader from "~/components/Dashboard/DetailsHeader.vue";
import OverlaySidebar from "~/components/Base/OverlaySidebar.vue";
import type { UpdateAccountInput } from "~/types";
import DetailsSaveChanges from "~/components/Dashboard/DetailsSaveChanges.vue";
import DateDisplay from "~/components/Base/DateDisplay.vue";
import DotDivider from "~/components/Base/DotDivider.vue";
import Card from "~/components/Base/Card.vue";
import { useToast } from "vue-toastification";
import AccountSettings from "~/components/Dashboard/Account/AccountSettings.vue";
import { provide } from "vue";
import AccountMedia from "~/components/Dashboard/Account/AccountMedia.vue";

provide("triggerReload", () => load.execute());

const route = useRoute();
const toast = useToast();
const { account, load, update } = useAccount(route.params.id as string);
const { state, patch, sync, reset, hasChanges } =
  useEditState<UpdateAccountInput>({
    firstName: account.value?.firstName,
    lastName: account.value?.lastName,
    bio: account.value?.bio,
    picture: account.value?.picture,
  });

const showSettings = ref<boolean>(false);

const fullName = computed<string>(
  () => `${state.value?.firstName} ${state.value?.lastName}`
);
const userInitials = computed<string>(() =>
  (fullName.value ?? account.value?.primaryEmailAddress ?? "")[0].toUpperCase()
);
const groups = computed<string[]>(() =>
  (account.value?.groups?.nodes ?? [])
    .map(({ name }) => name)
    .filter((t) => t)
    .map((t) => (t.length > 40 ? `${t.slice(0, 40)}...` : t))
);

const updateAccount = () =>
  update
    .execute(patch.value)
    .then(() => {
      sync();
      toast.success("Data updated!");
    })
    .catch(useError().notify);

load.execute().then(() => {
  patch.value = {
    firstName: account.value?.firstName,
    lastName: account.value?.lastName,
    bio: account.value?.bio,
    picture: account.value?.picture,
  };
  sync();
});
</script>

<style scoped lang="scss">
.account-overview {
  display: grid;
  grid-template-columns: max-content 1fr;
  grid-gap: 40px;
}
</style>
