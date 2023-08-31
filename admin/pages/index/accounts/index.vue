<template>
  <div id="dashboard-accounts">
    <div class="mb-10">
      <banner
        overline="accounts"
        headline="Manage shop accounts"
        caption="Add new users and manage existing accounts"
      >
        <template #action>
          <div class="d-flex justify-end mt-6 px-4">
            <v-btn
              to="/accounts/create"
              theme="dark"
              color="accent"
              rounded="lg"
              size="large"
              flat
            >
              Create new account
            </v-btn>
          </div>
        </template>
      </banner>
    </div>
    <data-viewer :loading="load.loading.value" :error="load.error.value">
      <template #default>
        <v-container fluid style="padding: 0">
          <v-row>
            <v-col
              cols="12"
              v-for="(account, i) in accounts"
              :key="account._id"
            >
              <account-card :account="account" :index="i" />
            </v-col>
          </v-row>
        </v-container>
      </template>
    </data-viewer>
  </div>
</template>
<script setup lang="ts">
import DataViewer from "~/components/DataViewer.vue";
import Banner from "~/components/Base/Banner.vue";
import AccountCard from "~/components/Base/AccountCard.vue";

const { accounts, load } = useAccounts();

load.execute({});
</script>

<style lang="scss" scoped></style>
