<template>
  <create-form-container>
    <template #heading>
      <section-heading class="mb-0"> Create your shop </section-heading>
    </template>
    <template #form>
      <v-container fluid class="pa-0">
        <v-row>
          <v-col cols="12">
            <v-text-field
              variant="outlined"
              density="comfortable"
              hide-details
              label="Shop name"
              v-model="newShop.name"
            />
          </v-col>
          <v-col cols="12">
            <v-row>
              <v-col cols="12" md="6">
                <v-autocomplete
                  variant="outlined"
                  density="comfortable"
                  hide-details
                  label="Default currency"
                  item-value="code"
                  item-title="name"
                  :items="currenciesArray"
                  v-model="newShop.currencyCode"
                >
                  <template #selection="{ item }">
                    <v-chip label density="comfortable" color="accent">
                      {{ item.raw.symbol }}
                      {{ item.raw.name }}
                    </v-chip>
                  </template>
                  <template #item="{ props, item }">
                    <v-list-item
                      v-bind="props"
                      :subtitle="item.raw.symbol"
                      :title="item.raw.name"
                    ></v-list-item>
                  </template>
                </v-autocomplete>
              </v-col>
              <v-col cols="12" md="6">
                <v-autocomplete
                  variant="outlined"
                  density="comfortable"
                  hide-details
                  label="Default language"
                  item-title="language"
                  item-value="alpha2"
                  :items="countriesArray"
                  v-model="newShop.defaultLanguage"
                >
                  <template #selection="{ item }">
                    <v-chip label density="comfortable" color="accent">
                      {{ item.raw.language }}
                      ({{ item.raw.alpha2.toUpperCase() }})
                    </v-chip>
                  </template>
                </v-autocomplete>
              </v-col>
              <v-col cols="12">
                <v-textarea
                  variant="outlined"
                  density="comfortable"
                  hide-details
                  label="Description (optional)"
                  v-model="newShop.description"
                >
                </v-textarea>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-container>
    </template>
    <template #title> Create a new shop </template>
    <template #body> In your shop you can offer your digital assets </template>
    <template #action>
      <v-btn
        size="x-large"
        color="primary"
        block
        variant="flat"
        rounded="lg"
        @click="createShop"
        :loading="create.loading.value"
        :disabled="!canCreate"
      >
        Create shop
      </v-btn>
    </template>
  </create-form-container>
</template>

<script setup>
import SectionHeading from "~/components/Base/SectionHeading";
import { currenciesArray } from "~/utils/currencies";
import { countriesArray } from "~/utils/countries";
import CreateFormContainer from "~/components/Dashboard/CreateFormContainer";
import { useToast } from "vue-toastification";

const newShop = ref({
  name: "",
  currencyCode: "EUR",
  defaultTimezone: "US/Pacific",
  defaultLanguage: "en",
  type: "primary",
});

const { create } = useShop();
const toast = useToast();

const canCreate = computed(
  () => newShop.value.name && newShop.value.currencyCode,
  newShop.value.defaultLanguage
);

const createShop = () =>
  create
    .execute(newShop.value)
    .then(() => {
      navigateTo({
        name: "index-shop",
      });
    })
    .catch(() => {
      toast.error(create.error.value.response.data.message);
    });
</script>

<style scoped lang="scss"></style>
