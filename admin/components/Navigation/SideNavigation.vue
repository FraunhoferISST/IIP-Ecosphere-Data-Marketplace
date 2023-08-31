<template>
  <v-navigation-drawer
    width="280"
    bottom
    v-model="sideNavState"
    :temporary="smAndDown"
    :permanent="!smAndDown"
    :floating="!smAndDown"
    :scrim="!smAndDown"
    style="position: fixed; height: 100vh; margin-top: 0; z-index: 20"
  >
    <aside
      id="side-navigation"
      class="position-fixed"
      :class="{ 'pt-16': smAndDown }"
    >
      <div
        class="side-navigation-content d-flex justify-space-between flex-column"
      >
        <div>
          <div class="d-flex justify-center pa-6" v-if="!smAndDown">
            <nuxt-link to="/overview">
              <div class="diva-logo">
                <img width="60" :src="logo" alt="Shop Logo" />
              </div>
            </nuxt-link>
          </div>
          <div>
            <nuxt-link
              v-for="(item, i) in navItems"
              :key="i"
              :to="item.path"
              :title="item.text"
              class="navigation-item d-block py-2 px-6"
            >
              <span class="d-block navigation-item-container px-5 py-3">
                <v-icon small color="black" class="mr-3">
                  {{ item.icon }}
                </v-icon>
                <span>{{ item.title }}</span>
              </span>
              <span class="navigation-item-border"></span>
            </nuxt-link>
          </div>
        </div>
        <div class="d-flex justify-center pa-10" v-if="!smAndDown">
          <v-menu location="top end" v-if="user">
            <template #activator="{ props }">
              <v-btn v-bind="props" icon>
                <v-avatar color="bg-primary" size="large">
                  <v-img :src="user.picture" v-if="user.picture" />
                  <span v-else>
                    {{
                      (user.name || user.primaryEmailAddress)[0].toUpperCase()
                    }}
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
                          (user.name ||
                            user.primaryEmailAddress)[0].toUpperCase()
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
        </div>
      </div>
    </aside>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { useDisplay } from "vuetify";
import logo from "~/assets/logos/iipe_logo.svg";
import Card from "~/components/Base/Card.vue";

const { smAndDown } = useDisplay();
const { sideNavState, navItems } = useNavigation();

const { user, load, logout } = useUser();
const logoutUser = () =>
  logout.execute().finally(() => {
    navigateTo({ name: "login" });
  });

load.execute();
</script>

<style scoped lang="scss">
#side-navigation {
  width: 100%;
  height: 100%;
  max-height: 100vh;
  z-index: 1002;
}
.side-navigation-content {
  width: 100%;
  height: 100%;
  background-color: rgb(var(--v-theme-slate-50));
  backdrop-filter: blur(3px);
  box-shadow: inset -8px 0px 15px -9px rgba(0, 0, 0, 0.01);
  //border-radius: $b-radius;
  overflow-y: auto;
}
.navigation-item {
  color: black;
  position: relative;
  transition: 0.3s;
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  opacity: 0.8;
  font-weight: bold;
  .navigation-item-border {
    height: 80%;
    width: 0;
    background-color: $primary;
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    border-radius: 5px 0 0 5px;
  }
  .navigation-item-container {
    transition: 0.3s;
    position: relative;
    border-radius: $b-radius;
    &:before {
      transition: 0.3s;
      content: "";
      display: block;
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      right: 0;
      background: linear-gradient(to right, transparent, rgba($primary, 1));
      opacity: 0;
      border-radius: $b-radius;
    }
  }
  &:hover {
    .navigation-item-container {
      background-color: rgb(var(--v-theme-slate-200));
    }
  }
  &.router-link-active {
    opacity: 1;
    color: white;
    i {
      color: white !important;
    }
    .navigation-item-container {
      background-color: $primary;
    }
    .navigation-item-border {
      width: 4px;
    }
  }
}
.user-link {
  text-decoration: none;
  color: $accent;
}
</style>
