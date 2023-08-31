<template>
  <div id="dashboard-shop">
    <data-viewer :loading="load.loading.value" :error="load.error.value">
      <banner
        overline="your shop"
        :headline="shop.name"
        :caption="shop._id"
        class="pb-0"
      >
        <template #nav>
          <details-nav :pages="pages" v-model:page="page" height="40px" />
        </template>
      </banner>
      <v-container class="px-0 pt-12" fluid>
        <nuxt-page> </nuxt-page>
      </v-container>
    </data-viewer>
  </div>
</template>
<script setup lang="ts">
import DataViewer from "~/components/DataViewer.vue";
import Banner from "~/components/Base/Banner.vue";
import DetailsNav from "~/components/Dashboard/DetailsNav.vue";
import { watch } from "vue";

const page = ref(useRoute().path.replace("/shop/", ""));
const pages = ["Overview", "Payments", "Taxes", "Fulfillments", "Reviews"];
const { shop, load } = useShop();

watch(page, () => navigateTo(`/shop/${page.value.toLowerCase()}`));

load.execute().then(() => {
  if (!shop.value) {
    navigateTo({
      name: "index-shop-create",
    });
  }
});
</script>

<style lang="scss" scoped></style>
