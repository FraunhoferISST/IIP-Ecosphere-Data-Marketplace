<template>
  <div id="dashboard-overview">
    <banner
      v-if="user"
      overline="overview"
      caption="This is the place to manage all your offers and store operations. Create new products, publish them and define access control"
    >
      <template #headline>
        <div>
          Welcome back, <span class="user-name">{{ user.name }}</span>
        </div>
      </template>
    </banner>
    <v-container flui class="px-0 mt-10">
      <v-row>
        <v-col cols="12">
          <recent-orders />
        </v-col>
        <v-col cols="6" class="mt-10">
          <recent-reviews />
        </v-col>
        <v-col cols="6" class="mt-10">
          <recent-inquiries />
        </v-col>
        <v-col cols="12" class="mt-10">
          <recent-products />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script setup lang="ts">
import Banner from "~/components/Base/Banner.vue";
import { useUser } from "~/composables/useUser";
import RecentOrders from "~/components/Dashboard/Overview/RecentOrders.vue";
import RecentReviews from "~/components/Dashboard/Overview/RecentReviews.vue";
import RecentInquiries from "~/components/Dashboard/Overview/RecentInquiries.vue";
import RecentProducts from "~/components/Dashboard/Overview/RecentProducts.vue";

const { user } = useUser();
</script>
<style scoped lang="scss">
.user-name {
  color: $accent;
}
</style>
