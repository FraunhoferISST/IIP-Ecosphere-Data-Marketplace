<template>
  <v-container fluid class="pa-0">
    <v-row>
      <v-col
        cols="12"
        md="6"
        v-for="(email, i) in emails"
        :key="i"
        class="d-flex align-center"
      >
        <v-text-field
          label="Email"
          v-model="email.address"
          density="comfortable"
          variant="outlined"
          hide-details
          @update:modelValue="update"
        >
        </v-text-field>
        <v-btn
          v-if="emails.length > 0"
          class="ml-2"
          variant="text"
          size="small"
          color="error"
          icon="close"
          @click="() => removeEmail(i)"
        >
        </v-btn>
      </v-col>
      <v-col cols="12" class="pt-0 mb-4">
        <v-btn
          variant="text"
          size="small"
          color="accent"
          append-icon="add"
          @click="addEmail"
        >
          Add address
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import type { EmailRecord } from "~/types";
const { modelValue } = defineProps<{
  modelValue: EmailRecord[] | null;
}>();
const emit = defineEmits<{
  (e: "update:modelValue", emails: EmailRecord[] | null): void;
}>();

const newEmail: EmailRecord = {
  address: "",
  provides: "",
  verified: false,
};
const emails = ref<EmailRecord[]>(modelValue ?? [{ ...newEmail }]);

const addEmail = () => emails.value.push({ ...newEmail });
const removeEmail = (index: number) => {
  emails.value = emails.value.filter((_, i: number) => index !== i);
  update();
};

const update = () => {
  const emailssWithAddress = emails.value.filter(({ address }) => !!address);
  emit(
    "update:modelValue",
    emailssWithAddress.length > 0 ? emailssWithAddress : null
  );
};
</script>

<style scoped></style>
