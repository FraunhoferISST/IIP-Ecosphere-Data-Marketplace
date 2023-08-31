<template>
  <section>
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
          <account-media :account="user" />
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
    </data-viewer>
  </section>
</template>

<script setup lang="ts">
import DataViewer from "~/components/DataViewer.vue";
import DetailsHeader from "~/components/Dashboard/DetailsHeader.vue";
import Card from "~/components/Base/Card.vue";
import DateDisplay from "~/components/Base/DateDisplay.vue";
import DotDivider from "~/components/Base/DotDivider.vue";
import { useToast } from "vue-toastification";
import type { Account, UpdateAccountInput } from "~/types";
import DetailsSaveChanges from "~/components/Dashboard/DetailsSaveChanges.vue";
import AccountMedia from "~/components/Dashboard/Account/AccountMedia.vue";

const { user, load, update } = useUser();
const { state, patch, sync, hasChanges, setState } =
  useEditState<UpdateAccountInput>({
    firstName: user.value?.firstName,
    lastName: user.value?.lastName,
    bio: user.value?.bio,
    picture: user.value?.picture,
  });
const toast = useToast();
const initialUserData = ref<Account>(null);

const userName = computed<string>(
  () => `${state.value?.firstName} ${state.value?.lastName}`
);
const userInitials = computed<string>(() =>
  (userName.value ?? "")[0].toUpperCase()
);
const groups = computed<string[]>(() =>
  (user.value?.groups ?? [])
    .map(({ name }) => name)
    .filter((t) => t)
    .map((t) => (t.length > 40 ? `${t.slice(0, 40)}...` : t))
);

const onDiscardChanges = () => (initialUserData.value = { ...user.value });

const updateUser = () =>
  update
    .execute({ ...patch.value, name: userName.value })
    .then(() => {
      sync();
      toast.success("Changes successfully applied");
    })
    .catch((e) => toast.error(e.response.data.message));

load.execute().then(() => {
  setState({
    firstName: user.value?.firstName,
    lastName: user.value?.lastName,
    bio: user.value?.bio,
    picture: user.value?.picture,
  });
});
</script>

<style scoped lang="scss">
.user-overview {
  display: grid;
  grid-template-columns: max-content 1fr;
  grid-gap: 40px;
}
</style>
