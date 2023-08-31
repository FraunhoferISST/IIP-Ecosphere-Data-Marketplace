<template>
  <div class="fill-height">
    <v-avatar color="bg-secondary" size="200px">
      <v-img :src="state.picture" v-if="state.picture" />
      <span v-else>{{ userInitials }}</span>
    </v-avatar>
    <v-dialog v-model="dialog" max-width="1100px">
      <template #activator="{ props }">
        <div class="text-center mt-4" v-bind="props">
          <v-btn size="x-small" variant="text" rounded="lg" color="accent">
            change avatar
          </v-btn>
        </div>
      </template>
      <dialog-container>
        <images-editor :multiple="false" v-model="patch.picture" />
        <template #action>
          <v-btn
            class="mr-6"
            variant="flat"
            rounded="lg"
            size="large"
            @click="dialog = false"
          >
            Cancel
          </v-btn>
          <v-btn
            class="mr-6"
            variant="flat"
            rounded="lg"
            size="large"
            color="success"
            @click="saveChanges"
          >
            Save changes
          </v-btn>
        </template>
      </dialog-container>
    </v-dialog>
  </div>
</template>

<script setup lang="ts">
import { Account } from "@/types";
import DialogContainer from "~/components/Base/DialogContainer.vue";
import { useToast } from "vue-toastification";
import ImagesEditor from "~/components/Base/ImagesEditor.vue";

const { account } = defineProps<{
  account: Account;
}>();

const { update } = useAccount(account._id);
const { state, patch, sync } = useEditState<{ picture: string }>({
  picture: account.picture ?? "",
});

const dialog = ref(false);

const userName = computed<string>(
  () => `${account.firstName} ${account.lastName}`
);
const userInitials = computed<string>(() =>
  (userName.value ?? "")[0].toUpperCase()
);

const saveChanges = () => {
  update
    .execute(patch.value)
    .then(() => {
      useToast().success("Avatar updated");
      sync();
      dialog.value = false;
    })
    .catch(useError().notify);
};
</script>

<style scoped></style>
