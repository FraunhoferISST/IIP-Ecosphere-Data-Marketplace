<template>
  <v-app-bar
    v-if="smAndDown"
    color="slate-100"
    class="elevation-0"
    style="position: fixed"
  >
    <template #prepend>
      <v-app-bar-nav-icon @click="toggleSideNav"></v-app-bar-nav-icon>
    </template>
    <v-app-bar-title>
      <nuxt-link to="/overview">
        <div class="diva-logo">
          <v-avatar size="40px">
            <img width="45" :src="logo" alt="Shop Logo" />
          </v-avatar>
        </div>
      </nuxt-link>
    </v-app-bar-title>

    <template #append>
      <v-menu location="top end" v-if="user">
        <template #activator="{ props }">
          <v-btn v-bind="props" icon>
            <v-avatar color="bg-primary" size="large">
              <v-img :src="user.picture" v-if="user.picture" />
              <span v-else>
                {{ (user.name || user.primaryEmailAddress)[0].toUpperCase() }}
              </span>
            </v-avatar>
          </v-btn>
        </template>

        <card>
          <div>
            <nuxt-link class="user-link" to="/accounts/me">
              <div class="d-flex">
                <v-avatar color="background">
                  <v-img :src="user.picture" v-if="user.picture" />
                  <span v-else>
                    {{
                      (user.name || user.primaryEmailAddress)[0].toUpperCase()
                    }}
                  </span>
                </v-avatar>
                <div class="ml-3">
                  <p>{{ user.name || "N/A" }}</p>
                  <p class="text-caption mt-0 text-slate-600">
                    {{ user.primaryEmailAddress }}
                  </p>
                </div>
              </div>
            </nuxt-link>

            <v-btn
              class="mt-6"
              min-width="200px"
              rounded="lg"
              variant="tonal"
              color="error"
              :loading="logout.loading.value"
              @click="logoutUser"
            >
              Logout
            </v-btn>
          </div>
        </card>
      </v-menu>
    </template>
  </v-app-bar>
</template>

<script setup lang="ts">
import logo from "~/assets/logos/logo.jpeg";
import Card from "~/components/Base/Card.vue";
import { useDisplay } from "vuetify";

const { smAndDown } = useDisplay();
const { user, load, logout } = useUser();
const { toggleSideNav } = useNavigation();

const logoutUser = () =>
  logout.execute().finally(() => {
    navigateTo({ name: "login" });
  });

load.execute();
</script>

<style scoped lang="scss"></style>
