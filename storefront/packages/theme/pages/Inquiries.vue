<template>
  <div id="inquiries">
    <div style="background-color: var(--c-light)" class="p-10 my-6">
      <h2>
        Explore inquiries
      </h2>
      <p class="text-slate-500">
        Companies post their specific inquiries for data here. You can suggest a suitable offer for the requests and also post your own inquiries.
      </p>
      <div class="flex justify-end" v-if="isAuthenticated">
        <SfButton class="btn mt-10 block" style="width: auto" :link="localePath('/my-account/my-inquiries')">
          {{ $t('Create your inquiry') }}
        </SfButton>
      </div>
    </div>
    <div class="navbar section py-4">
      <inquiry-page-header :pagination="pagination">
        <template #default>
          <SfInput
            class="mr-4"
            label="Search inquiries"
            name="name"
            type="text"
            v-model="searchQuery.query"
            style="height: 20px"
            @input="debouncedSearch"
          />
        </template>
        <template #filters>
          <inquiries-filters-sidebar @selectFilters="onSelectFilters"/>
        </template>
      </inquiry-page-header>
    </div>
    <div class="main section">
      <data-viewer :loading="load.loading.value">
        <div>
          <transition-group
            appear
            name="products__slide"
            tag="div"
            :class="{grid: isCategoryGridView}"
          >
            <SfLink :link="localePath(`/inquiry/${inquiry._id}`)" class="no-underline	" v-for="inquiry in inquiries" :key="inquiry._id">
              <inquiry-card class="my-4"  :inquiry="inquiry" :showApplyOfferBtn="isAuthenticated"/>
            </SfLink>
          </transition-group>
        </div>
      </data-viewer>
    </div>
    <div class="flex justify-center text-center my-10" v-if="inquiries.length > 0 && page < pages">
      <div>
        <p class="text-slate-500">
          Page {{ page }} / {{ pages }}
        </p>
        <SfButton v-if="cursor" class="btn color-light" style="width: 250px" @click="() => loadNextPage.execute()">
          {{ $t('Load next page') }}
        </SfButton>
      </div>
    </div>
  </div>
</template>

<script>
import {
  SfProductCardHorizontal,
  SfButton,
  SfProperty,
  SfInput,
  SfLink
} from "@storefront-ui/vue";
import {computed, ref} from "@nuxtjs/composition-api";
import {useInquiries, useUser} from "@vue-storefront/iiepmarket";
import {useUiState} from "~/composables";
import LazyHydrate from "vue-lazy-hydration";
import CategoryPageHeader from "~/components/CategoryPageHeader";
import DataViewer from "@/components/DataViewer";
import ProductCard from "@/components/Common/ProductCard";
import InquiryCard from "~/components/Inquiries/InquiryCard";
import InquiryPageHeader from "~/components/InquiryPageHeader";
import _ from "lodash";
import InquiriesFiltersSidebar from "@/components/InquiriesFiltersSidebar";

export default {
  transition: "fade",
  components: {
    InquiriesFiltersSidebar,
    InquiryPageHeader,
    InquiryCard,
    ProductCard,
    DataViewer,
    CategoryPageHeader,
    SfInput,
    LazyHydrate,
    SfButton,
    SfProperty,
    SfProductCardHorizontal,
    SfLink,
  },
  setup() {
    const {inquiries, load, count, pages, page, loadNextPage, cursor} = useInquiries();
    const uiState = useUiState();
    const { isAuthenticated } = useUser();

    const searchQuery = ref({
      query: "",
      filters: {},
    });

    const searchItems = () => load.execute(searchQuery.value);
    searchItems();
    const debouncedSearch = _.debounce(searchItems, 500);

    return {
      searchQuery,
      debouncedSearch,
      load,
      ...uiState,
      inquiries,
      isAuthenticated,
      page,
      pages,
      cursor,
      loadNextPage,
      hasFiltersSet: computed(() => Boolean(searchQuery.value.query) || Object.keys(searchQuery.value.filters ?? {}).length > 0),
      onSelectFilters: (filters = {}) => {
        searchQuery.value.filters = filters;
        searchItems();
      },
      pagination: computed(() => ({
        totalItems: count.value,
      })),
      // getInquiryAttributes: (inquiry) => Object.fromEntries(Object.entries(inquiry).filter(([k]) => [""]).map(([k, v]) => [k, v])),
    };
  },
};
</script>

<style lang="scss" scoped>
#inquiries {
  min-height: 80vh;
  box-sizing: border-box;
  @include for-desktop {
    max-width: 1240px;
    margin: 0 auto;
  }
}

.navbar {
  border: 1px solid var(--c-light);
  border-width: 0 0 1px 0;
  @include for-desktop {
    border-width: 1px 0 1px 0;
  }
}
</style>
