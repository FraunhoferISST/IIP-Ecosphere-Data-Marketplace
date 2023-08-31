<template>
  <v-container id="login" class="fill-height">
    <v-row justify="center" align="center" class="fill-height">
      <v-col cols="12" style="max-width: 500px">
        <v-row v-if="!showUpdateForm">
          <v-col cols="12" v-if="!disableRegistration">
            <v-tabs v-model="tab" centered background-color="transparent">
              <v-tab value="login">Login</v-tab>
              <v-tab value="create"> Create account </v-tab>
            </v-tabs>
          </v-col>
        </v-row>
        <v-row v-if="!showUpdateForm">
          <v-col cols="12">
            <v-form>
              <v-text-field
                id="email"
                v-model="email"
                variant="outlined"
                density="comfortable"
                label="E-Mail"
                data-cy="email"
                required
              />
              <v-text-field
                id="password"
                required
                v-model="password"
                variant="outlined"
                density="comfortable"
                label="Password"
                type="password"
                data-cy="password"
              />
              <v-btn
                v-if="tab === 'login'"
                block
                variant="flat"
                color="primary"
                rounded="lg"
                size="large"
                type="submit"
                :loading="user.login.loading.value"
                @click.prevent.stop="loginUser"
              >
                log in
              </v-btn>
              <v-btn
                v-else
                block
                variant="flat"
                color="primary"
                rounded="lg"
                size="large"
                type="submit"
                :loading="user.create.loading.value"
                @click.prevent.stop="register"
              >
                create account
              </v-btn>
            </v-form>
          </v-col>
        </v-row>
        <v-row v-else>
          <v-col cols="12">
            <section-heading :show-back-button="false" class="mb-10">
              Add more details
            </section-heading>
            <v-form>
              <v-text-field
                v-model="firstName"
                variant="outlined"
                density="comfortable"
                label="First name"
              />
              <v-text-field
                v-model="lastName"
                variant="outlined"
                density="comfortable"
                label="Last name"
              />
              <v-text-field
                v-model="picture"
                variant="outlined"
                density="comfortable"
                label="Profile image URL"
              />
            </v-form>
          </v-col>
          <v-col cols="12">
            <v-btn
              block
              variant="flat"
              color="primary"
              rounded="lg"
              size="large"
              :loading="user.update.loading.value"
              @click="updateAccount"
            >
              Save data
            </v-btn>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>
<script setup lang="ts">
import { useToast } from "vue-toastification";
import SectionHeading from "~/components/Base/SectionHeading.vue";

const disableRegistration = useRuntimeConfig().disableRegistration;

const tab = ref("login");
const showUpdateForm = ref(false);
const email = ref("");
const password = ref("");
const firstName = ref("");
const lastName = ref("");
const picture = ref("");
const user = useUser();
const shop = useShop();
const { notify } = useError();
const toast = useToast();

const navigateToOverview = () =>
  navigateTo({
    path: "/overview",
  });

const navigateToShopCreation = () =>
  navigateTo({
    path: "/shop",
  });

const notifyError = (error) => {
  toast.error(error.response?.data?.message);
};

const shopExists = (): boolean | Promise<boolean> =>
  !!shop.shopId.value ||
  shop.load.execute().then(() => {
    if (shop.load.error.value) {
      return Promise.resolve(false);
    }
    return Promise.resolve(!!shop.shop.value);
  });

const loginUser = () =>
  user.login
    .execute({ email: email.value, password: password.value })
    .then(async (): Promise<unknown> => {
      if (!(await shopExists())) {
        return navigateToShopCreation();
      }
      return navigateToOverview();
    })
    .catch((e) => {
      notify(e);
    });
const register = () =>
  user.create
    .execute({
      email: email.value,
      password: password.value,
      shopId: shop.shopId.value,
    })
    .then(() => user.load.execute())
    .then(() => (showUpdateForm.value = true))
    .catch((e) => notify(e));

const updateAccount = () =>
  useAccount(user.user.value._id)
    .update.execute({
      firstName: firstName.value,
      lastName: lastName.value,
      name: `${firstName.value} ${lastName.value}`,
      picture: picture.value,
    })
    .then(async (): Promise<unknown> => {
      if (!(await shopExists())) {
        return navigateToShopCreation();
      }
      return navigateToOverview();
    })
    .catch((e) => notify(e));
</script>
<style lang="scss" scoped></style>
