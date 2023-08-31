<template>
  <div>
    <banner
      overline="Inquiries"
      headline="Inquiries in your store"
      caption="Here you can manage the inquiries in your store and also create your own inquiries."
    >
      <template #action>
        <v-dialog max-width="2100px" v-model="dialog">
          <template #activator="{ props }">
            <div class="d-flex justify-end mt-5 px-4">
              <v-btn
                v-bind="props"
                theme="dark"
                color="accent"
                rounded="lg"
                size="large"
                flat
              >
                Create new inquiry
              </v-btn>
            </div>
          </template>
          <dialog-container>
            <v-container fluid class="pa-0">
              <v-row>
                <v-col cols="12">
                  <h2>Define inquiry details</h2>
                </v-col>
                <v-col cols="12">
                  <inquiry-form :inquiry="newInquiry" />
                </v-col>
              </v-row>
            </v-container>
            <template #action>
              <div>
                <v-btn
                  rounded="lg"
                  size="large"
                  variant="text"
                  flat
                  @click="dialog = false"
                >
                  Cancel
                </v-btn>
                <v-btn
                  color="primary"
                  rounded="lg"
                  size="large"
                  flat
                  width="180px"
                  class="ml-5"
                  :loading="create.loading.value"
                  @click="createInquiry"
                >
                  Create
                </v-btn>
              </div>
            </template>
          </dialog-container>
        </v-dialog>
      </template>
    </banner>
    <data-viewer :loading="load.loading.value" :error="load.error.value">
      <v-container fluid class="px-0">
        <v-row>
          <v-col cols="12">
            <inquiries-list
              :inquiries="inquiries"
              v-if="inquiries.length > 0"
            />
            <v-alert
              v-else
              class="my-8 text-slate-500 text-center"
              variant="tonal"
            >
              No inquiries yet
            </v-alert>
          </v-col>
        </v-row>
      </v-container>
    </data-viewer>
  </div>
</template>

<script setup lang="ts">
import DataViewer from "~/components/DataViewer.vue";
import Banner from "~/components/Base/Banner.vue";
import { useInquiries } from "~/composables/useInquiries";
import InquiriesList from "~/components/Dashboard/Inquiry/InquiriesList.vue";
import DialogContainer from "~/components/Base/DialogContainer.vue";
import InquiryForm from "~/components/Dashboard/Inquiry/InquiryForm.vue";
import type { InquiryInput } from "../../../../shared/types";
import { useToast } from "vue-toastification";

const { inquiries, load, create } = useInquiries();

const newInquiry = ref<InquiryInput>({
  title: "",
  published: true,
});
const dialog = ref(false);

const createInquiry = () =>
  create
    .execute(newInquiry.value)
    .then(() => useToast().success("Inquiry created!"))
    .then(() => (dialog.value = false))
    .catch(useError().notify);

load.execute({});
</script>

<style scoped></style>
