<template xmlns="http://www.w3.org/1999/html">
  <el-container class="app">
    <el-header>
      <el-menu
          class="el-menu-demo"
          mode="horizontal"
          :ellipsis="false"
      >
        <el-menu-item>
          <nuxt-link to="/">
            <div>
              <img width="56" :src="logo" alt="Shop Logo"/>
            </div>
          </nuxt-link>
        </el-menu-item>
        <el-menu-item index="/">
          <nuxt-link to="/">Offers</nuxt-link>
        </el-menu-item>
        <el-menu-item index="/inquiries">
          <nuxt-link to="/inquiries">Inquiries</nuxt-link>
        </el-menu-item>
        <el-menu-item index="/nodes">
          <nuxt-link to="/nodes">Participants</nuxt-link>
        </el-menu-item>
        <div class="flex-grow"/>
        <div class="flex items-center" v-if="userIsLoggedIn">
          <div class="pt-2">
            <span class="block text-sm">{{ userName }}</span>
            <span class="text-slate-500 text-xs relative" style="top: -5px">
            {{ userEmail }}
          </span>
          </div>
        </div>
        <div class="flex items-center ml-4" v-if="userIsLoggedIn">
          <el-button text @click="logout">
            Logout
          </el-button>
        </div>
        <el-button v-else text @click="dialogFormVisible = true" class="mt-4">
          Login
        </el-button>
      </el-menu>
    </el-header>
    <el-main>
      <NuxtLayout>
        <NuxtPage/>
      </NuxtLayout>
      <el-dialog v-model="dialogFormVisible" title="Login" class="p-10">
        <el-form :model="form" class="px-0">
          <el-form-item>
            <el-input data-cy="email" v-model="form.email" autocomplete="off" size="large" placeholder="E-mail"/>
          </el-form-item>
          <el-form-item>
            <el-input
                data-cy="password"
                v-model="form.password"
                size="large"
                type="password"
                placeholder="Password"
                show-password
            />
          </el-form-item>
          <el-autocomplete
              data-cy="node"
              label="label"
              v-model="shopSelectInput"
              trigger-on-focus
              class="w-full"
              size="large"
              :fetch-suggestions="getKnownShopsItems"
              placeholder="Select your shop"
              @select="onSelectShop"
          >
            <template #default="props">
              <div data-cy="selected-node" class="value">{{ props?.item?.name }}</div>
              <span class="link">{{ props?.item?.storefront }}</span>
            </template>
          </el-autocomplete>
        </el-form>
        <template #footer>
          <div class="mb-4">
            <el-alert v-if="loginError" type="error" :closable="false">
              {{ loginError?.message ?? "Some error occurred" }}
            </el-alert>
          </div>
          <el-button type="primary" size="large" class="w-full" :disabled="!canLogin" :loading="loginLoading"
                     @click="login">
            login
          </el-button>
        </template>
      </el-dialog>
    </el-main>
    <el-footer></el-footer>
  </el-container>
</template>
<script setup lang="ts">
import {useLocalStorage} from '@vueuse/core'
import {useKnownNodes} from "~/composables/useKnownNodes";
import {useFetch} from "~/composables/useFetch";
import logo from "~/assets/logos/iipe_logo.svg";

const {fetch} = useFetch();
const userStore = useLocalStorage("broker-user", {})
const {knownNodes, load} = useKnownNodes()

const dialogFormVisible = ref(false)
const loginLoading = ref(false)
const loginError = ref(null)
const shopSelectInput = ref("")
const form = reactive({
  email: '',
  password: '',
  node: null
})

const canLogin = computed(() => form.email && form.password && form.node)
const userIsLoggedIn = computed(() => userStore.value.accessToken)
const userEmail = computed(() => userStore.value.primaryEmail ?? userStore.value.emails?.[0]?.address)
const userName = computed(() => userStore.value.name)

const getKnownShopsItems = (queryString: string, cb: any) => {
  const results = queryString
      ? knownNodes.value.filter(({name}) => name.toLowerCase().includes(queryString.toLowerCase()))
      : knownNodes.value
  cb(results)
}
const onSelectShop = (selection) => {
  form.node = selection;
  shopSelectInput.value = form.node?.name;
}
const login = () => {
  loginLoading.value = true;
  loginError.value = null;
  fetch("/api/handlers/login", {
    method: "POST",
    body: form,
  })
      .then(async response => {
        if (response.error) {
          loginError.value = response.error;
        } else {
          userStore.value = response;
          await fetch("/api/handlers/getViewer",
              {
                method: "POST",
                body: {node: response.node},
                headers: {'Authorization': `Bearer ${userStore.value.accessToken}`}
              })
              .then((getViewerResponse) => {
                if (getViewerResponse) {
                  userStore.value = {...userStore.value, ...getViewerResponse};
                }
              })
          dialogFormVisible.value = false;
        }
      })
      .catch(e => {
        loginError.value = e
      })
      .finally(() => {
        loginLoading.value = false;
      })
}
const logout = () => {
  userStore.value = {}
}

if (userStore.value.accessToken) {
  await fetch("/api/handlers/getViewer", {method: "POST", body: {node: userStore.value.node}})
      .then((response) => {
        if (response && !response?.error) {
          userStore.value = {...userStore.value, ...response};
        } else {
          logout();
        }
      })
}

await load();
</script>
<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Khula:wght@400;600;700&display=swap");

.app {
  font-family: "Khula", sans-serif !important;
  max-width: 1200px;
  margin: auto;
}

.Vue-Toastification__toast.Vue-Toastification__toast--success {
  background-color: green;
}

.Vue-Toastification__toast.Vue-Toastification__toast--error {
  background-color: red;
}
</style>
