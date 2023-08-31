<template>
  <create-form-container>
    <template #heading>
      <section-heading class="mb-0"> Create new asset </section-heading>
    </template>
    <template #form>
      <v-container fluid class="pa-0">
        <v-row>
          <v-col cols="12">
            <v-text-field
              variant="outlined"
              density="comfortable"
              hide-details
              label="Asset title"
              v-model="newProduct.title"
            />
          </v-col>
          <v-col cols="12">
            <v-textarea
              variant="outlined"
              density="comfortable"
              hide-details
              label="Asset description"
              v-model="newProduct.description"
            />
          </v-col>
        </v-row>
      </v-container>
    </template>
    <template #title>
      Create a new digital asset that you want to offer in your shop
    </template>
    <template #body>
      After creation you can add and edit more information on the details page
      that features this product
    </template>
    <template #action>
      <v-btn
        size="x-large"
        :color="canCreate ? 'primary' : 'default'"
        block
        variant="flat"
        rounded="lg"
        @click="createProduct"
        :loading="create.loading.value"
        :disabled="!canCreate"
      >
        Create asset
      </v-btn>
    </template>
  </create-form-container>
</template>

<script setup lang="ts">
import SectionHeading from "~/components/Base/SectionHeading.vue";
import CreateFormContainer from "~/components/Dashboard/CreateFormContainer.vue";
import { useToast } from "vue-toastification";

const productTypes = ["file", "API", "stream", "database"];
const newProduct = ref({
  title: "",
  description: "",
});

const { create } = useProducts();
const { shopId } = useShop();
const toast = useToast();

const canCreate = computed<boolean>(() => !!newProduct.value.title);

const createProduct = () =>
  create
    .execute({
      ...newProduct.value,
    })
    .then(({ _id }) =>
      navigateTo({
        path: `/assets/${_id}`,
      })
    )
    .catch(() => toast.error(create.error.value));
</script>

<style scoped lang="scss"></style>
