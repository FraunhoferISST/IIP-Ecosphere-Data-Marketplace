<template>
  <div>
    <v-list lines="three" select-strategy="multiple">
      <v-list-subheader>Visibility</v-list-subheader>
      <v-list-item
        class="px-10"
        title="Visible"
        subtitle="Control the visibility of the asset in your shop"
      >
        <template #prepend>
          <v-checkbox
            color="accent"
            class="mr-4"
            v-model="isVisible"
            hide-details
            @change="changeVisibility"
          ></v-checkbox>
        </template>
      </v-list-item>
      <v-list-item
        class="px-10"
        color="accent"
        @click="publishAsset"
        value="1"
        :title="
          isPublished
            ? 'Asset is published. Republish changes'
            : 'Publish in catalog'
        "
        :subtitle="
          isPublished
            ? 'The asset is already offered in your shops catalog'
            : 'Only visible products with at least on visible variant can be published'
        "
      >
        <template #prepend>
          <v-icon class="mt-4" color="accent">
            {{ isPublished ? "done" : "add" }}
          </v-icon>
        </template>
      </v-list-item>
      <v-list-item
        class="px-10"
        color="error"
        title="Archive"
        value="2"
        :subtitle="
          !isArchived
            ? 'Mark the product as achieved. It will not be available in the shop'
            : 'The Asset is archived'
        "
        @click="archiveAsset"
        :disabled="isArchived"
      >
        <template #prepend>
          <v-icon class="mt-4" color="error">archive</v-icon>
        </template>
      </v-list-item>
    </v-list>
    <v-divider></v-divider>
    <v-list lines="three" select-strategy="multiple">
      <v-list-item
        class="px-10"
        color="error"
        title="Clone"
        subtitle="Create a copy of this product"
        value="3"
        @click="cloneAsset"
      >
        <template #prepend>
          <v-icon class="mt-4" color="accent">view_timeline</v-icon>
        </template>
      </v-list-item>
    </v-list>
    <v-divider></v-divider>
    <v-list lines="three" select-strategy="multiple">
      <v-list-subheader>Access</v-list-subheader>
      <v-list-item
        class="px-10"
        color="info"
        title="Private"
        :subtitle="privateHint"
      >
        <template #prepend>
          <v-switch
            inset
            color="accent"
            class="mr-4"
            v-model="isPrivate"
            hide-details
            density="compact"
            @change="changePrivate"
          ></v-switch>
        </template>
        <div class="mt-5" v-if="isPrivate">
          <v-btn-toggle
            mandatory
            rounded="xl"
            density="compact"
            v-model="accessMode"
            color="accent"
            @update:modelValue="changeAccessMode"
          >
            <v-btn size="small" value="restrict">Prohibit</v-btn>
            <v-btn size="small" value="allow">Allow</v-btn>
          </v-btn-toggle>
          <v-combobox
            class="mt-4"
            density="compact"
            variant="outlined"
            color="accent"
            multiple
            chips
            closable-chips
            :items="['admin@dev.com']"
            v-model="accessAccounts"
            persistent-hint
            :hint="
              (accessMode === 'restrict' ? 'Prohibit' : 'Allow') +
              ' access only for this accounts'
            "
            @update:modelValue="changeAccessAccounts"
          >
            <template #no-data>
              <v-list-item>
                <v-list-item-title>
                  No results found. Press
                  <kbd>enter</kbd> to create a new one
                </v-list-item-title>
              </v-list-item>
            </template>
          </v-combobox>
        </div>
      </v-list-item>
    </v-list>
  </div>
</template>

<script setup lang="ts">
import { useToast } from "vue-toastification";
import { Product } from "~/types";
import { inject } from "vue";
import { Ref } from "@vue/runtime-core";

const { data } = defineProps<{
  data: Product;
}>();

const triggerReload: () => void = inject("triggerReload");
const belongsToProduct: Ref<Product> = inject("belongsTo");

const { notify } = useError();
const toast = useToast();
const { publish, update, archive, clone } = useProduct(
  belongsToProduct?.value?._id ?? data._id
);

const isVisible = ref<boolean>(data.isVisible);
const isPrivate = ref<boolean>(data.isPrivate);
const isArchived = ref<boolean>(data.isDeleted);
const accessMode = ref<string>(data.accessMode ?? "restrict");
const accessAccounts = ref<string[]>(data.accessAccounts ?? []);

const isPublished = computed<boolean>(() => !!data.publishedProductHash);
const privateHint = computed<boolean>(() => {
  if (isPrivate.value) {
    return "The access to this asset is restricted. Below you can select specific accounts by email that are allowed or prohibited to access the asset";
  }
  return "This asset is public and visible to every one";
});
const handleSuccess = (msg = "Data updated!") => {
  toast.success(msg);
  triggerReload();
};

const changeVisibility = () => {
  update
    .execute({
      isVisible: isVisible.value,
      isDeleted: isVisible.value ? false : isArchived.value,
    })
    .then(() => {
      isArchived.value = isVisible.value ? false : isArchived.value;
      handleSuccess("Visibility successfully updated!");
    })
    .catch(notify);
};
const changePrivate = () => {
  update
    .execute({
      isPrivate: isPrivate.value,
    })
    .then(() => {
      handleSuccess("Successfully updated!");
    })
    .catch(notify);
};
const changeAccessMode = () => {
  update
    .execute({
      accessMode: accessMode.value,
    })
    .then(() => {
      handleSuccess("Successfully updated!");
    })
    .catch(notify);
};
const changeAccessAccounts = () => {
  update
    .execute({
      accessAccounts: accessAccounts.value,
    })
    .then(() => {
      handleSuccess("Successfully updated!");
    })
    .catch(notify);
};

const archiveAsset = () => {
  archive
    .execute()
    .then(() => {
      handleSuccess("Asset archived!");
      isVisible.value = false;
      isArchived.value = true;
    })
    .then(() => changeVisibility())
    .catch(notify);
};

const publishAsset = () =>
  publish
    .execute()
    .then(() => {
      handleSuccess("The changes are is now available in your shop!");
    })
    .catch((e) => {
      isVisible.value = data.isVisible;
      notify(e);
    });

const cloneAsset = () => {
  clone
    .execute()
    .then(({ _id }) => {
      navigateTo({
        name: "index-assets-id",
        params: {
          id: _id,
        },
      });
      toast.success("Clone created!");
    })
    .catch(notify);
};
</script>

<style scoped></style>
