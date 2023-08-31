<template>
  <div>
    <v-container>
      <v-row>
        <v-col cols="12">
          <h5 class="text-subtitle-2 mb-4">Account groups</h5>
          <data-viewer
            :loading="loadGroups.loading.value"
            :error="loadGroups.error.value"
          >
            <v-select
              variant="outlined"
              density="compact"
              :loading="updateGroups.loading.value"
              :items="loadedGroups"
              hide-selected
              chips
              v-model="patch.groups"
              @update:modelValue="executeUpdateGroups"
              clearable
              closable-chips
              multiple
            >
              <template #chip="{ props, item }">
                <v-chip label v-bind="props" color="accent">
                  {{ item.raw.name }}
                </v-chip>
              </template>
              <template #item="{ props, item }">
                <v-list-item
                  v-bind="props"
                  :title="item.raw.name"
                  :subtitle="item.raw.permissions.length"
                >
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
import { Account, Group } from "~/types";
import { inject } from "vue";
import DataViewer from "~/components/DataViewer.vue";

const { data } = defineProps<{
  data: Account;
}>();

const triggerReload: () => void = inject("triggerReload");

const loadGroups = useRequest(() =>
  useNuxtApp()
    .$api.handle<Group[]>("getGroups")
    .then((response) => {
      loadedGroups.value = response;
    })
);
const { notify } = useError();
const toast = useToast();
const { updateGroups } = useAccount(data._id);
const { patch, sync } = useEditState<{
  groups: Group[];
}>({
  groups: data.groups?.nodes ?? [],
});

const loadedGroups = ref<Group[]>([]);

const handleSuccess = (msg = "Data updated!") => {
  toast.success(msg);
  triggerReload();
};

const executeUpdateGroups = () =>
  updateGroups
    .execute({ groupIds: patch.value.groups.map(({ _id }) => _id) })
    .then(() => {
      sync();
      handleSuccess();
    })
    .catch(notify);

loadGroups.execute();
</script>

<style scoped></style>
