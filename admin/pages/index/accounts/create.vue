<template>
  <v-row class="fill-height" align="center">
    <v-col cols="12">
      <v-row>
        <v-col cols="12">
          <section-heading class="mb-0"> Create new account </section-heading>
        </v-col>
        <v-col cols="12">
          <card>
            <div class="create-form-container">
              <div class="create-content">
                <v-container fluid class="pa-16">
                  <v-row>
                    <v-col cols="12">
                      <v-text-field
                        variant="outlined"
                        density="comfortable"
                        hide-details
                        label="First name"
                        v-model="newAccount.firstName"
                      />
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        variant="outlined"
                        density="comfortable"
                        hide-details
                        label="Last name"
                        v-model="newAccount.lastName"
                      />
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        variant="outlined"
                        density="comfortable"
                        hide-details
                        label="Email"
                        v-model="newAccount.email"
                      />
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        variant="outlined"
                        density="comfortable"
                        hide-details
                        label="Password"
                        v-model="newAccount.password"
                      />
                    </v-col>
                  </v-row>
                </v-container>
              </div>
              <div class="pa-16">
                <h3>Create a new shop account</h3>
                <p class="mb-10">
                  <br />
                  After creation you can add and edit more information on the
                  details page of the new account
                </p>
                <v-btn
                  size="x-large"
                  color="primary"
                  block
                  variant="flat"
                  rounded="lg"
                  flat
                  @click="createAccount"
                  @disabled="!isNewAccountValid"
                  :loading="create.loading.value"
                >
                  Create account
                </v-btn>
              </div>
            </div>
          </card>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import SectionHeading from "~/components/Base/SectionHeading.vue";
import Card from "~/components/Base/Card.vue";
import { useAccounts } from "~/composables/useAccounts";
import { CreateUserInput, UpdateAccountInput } from "../../../../shared/types";

const { create } = useAccounts();

const newAccount = ref<CreateUserInput & UpdateAccountInput>({
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  picture: "",
});

const isNewAccountValid = computed(
  () =>
    newAccount.value.firstName &&
    newAccount.value.lastName &&
    newAccount.value.email &&
    newAccount.value.password
);

const createAccount = () =>
  create
    .execute(newAccount.value)
    .then(({ _id }) => {
      if (!create.error.value) {
        navigateTo({
          path: `/accounts/${_id}`,
        });
      }
    })
    .catch(useError().notify);
</script>

<style scoped lang="scss">
.create-form-container {
  display: grid;
  grid-template-columns: 1fr 400px;
}
.create-content {
  background-color: $bg;
  border-radius: $b-radius;
}
</style>
