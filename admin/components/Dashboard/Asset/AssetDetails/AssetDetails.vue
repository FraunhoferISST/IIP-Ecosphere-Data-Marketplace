<template>
  <section class="asset-container">
    <details-header
      :title="data.title"
      :id="data._id"
      :pages="pages"
      v-model:page="selectedPage"
    >
      <template #action>
        <v-btn
          class="ml-6"
          icon="settings"
          flat
          color="accent"
          variant="text"
          @click="openSettings"
        >
        </v-btn>
      </template>
    </details-header>
    <overlay-sidebar
      :show="showSettings"
      @update:show="(val) => (showSettings = val)"
    >
      <asset-settings :data.sync.state="state" />
    </overlay-sidebar>
    <div class="mt-10">
      <component
        :is="pageComponent"
        :data="state"
        @change-page="selectedPage = $event"
      >
      </component>
    </div>
  </section>
</template>

<script setup lang="ts">
import { watch } from "vue";
import cloneDeep from "lodash.clonedeep";
import OverlaySidebar from "~/components/Base/OverlaySidebar.vue";
import AssetSettings from "~/components/Dashboard/Asset/AssetDetails/AssetSettings/AssetSettings.vue";
import AssetOverview from "~/components/Dashboard/Asset/AssetDetails/AssetOverview/AssetOverview.vue";
import AssetReviews from "~/components/Dashboard/Asset/AssetDetails/AssetReviews.vue";
import AssetVariants from "~/components/Dashboard/Asset/AssetDetails/AssetVariants.vue";
import AssetPricing from "~/components/Dashboard/Asset/AssetDetails/AssetPricing.vue";
import AssetDistributions from "~/components/Dashboard/Asset/AssetDetails/AssetDistributions.vue";
import DetailsHeader from "~/components/Dashboard/DetailsHeader.vue";

const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
  pages: {
    type: Array,
    default: () => ["Overview", "Variants", /*"Sample",*/ "Reviews"],
  },
});
const emit = defineEmits(["save"]);

const route = useRoute();
const router = useRouter();

const componentsMap = {
  Overview: AssetOverview,
  Variants: AssetVariants,
  Pricing: AssetPricing,
  Distributions: AssetDistributions,
  Reviews: AssetReviews,
};
const selectedPage = ref<string>((route.query.page as string) ?? "Overview");
const showSettings = ref(false);
const state = ref(cloneDeep(props.data));

watch(selectedPage, () => goToPage(selectedPage.value));
watch(
  () => props.data,
  () => {
    state.value = cloneDeep(props.data);
  }
);

const pageComponent = computed(() => componentsMap[selectedPage.value]);

const openSettings = () => (showSettings.value = true);
const goToPage = (page) => {
  router.push({
    name: route.name,
    params: route.params,
    query: { ...route.query, page: page },
  });
};
</script>
<style scoped lang="scss"></style>
