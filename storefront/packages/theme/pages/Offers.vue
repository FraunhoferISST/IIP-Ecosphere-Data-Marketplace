<template>
  <div id="discover">
    <div class="navbar section py-2">
      <CategoryPageHeader :pagination="pagination">
        <template #default>
          <SfInput
            class="mr-4"
            label="Search offers"
            name="name"
            type="text"
            v-model="searchQuery.query"
            style="height: 20px"
            @input="debouncedSearch"
          />
        </template>
        <template #filters>
          <filters-sidebar @selectFilters="onSelectFilters"/>
        </template>
      </CategoryPageHeader>
    </div>
    <div class="main section">
      <data-viewer :loading="load.loading.value">
        <div class="products" v-if="items.length > 0">
          <transition-group
            appear
            name="products__slide"
            tag="div"
            class="grid-cols-2 md:grid-cols-3 lg:grid-cols-3"
            :class="{grid: isCategoryGridView}"
          >
            <offer-card class="p-6" :offer="product" v-for="product in items" :key="product._id" :horizontal="!isCategoryGridView"/>
          </transition-group>
        </div>
        <div v-else class="flex justify-center text-center">
          <p class="w-1/2">
            <SfImage width="200" :src="addBasePath('/empty_cart.svg')" alt="No offers" class="my-10"/><br>
              <span v-if="hasFiltersSet">
                Couldn't find any offers. Try to reformulate your search query or adjust the filters.
              </span>
            <span v-else>
              There seems to be no offers in this store at the moment. Maybe they will appear a little later. <b>Come by again soon!</b>
            </span>
          </p>
        </div>
      </data-viewer>
    </div>
    <div class="flex justify-center text-center my-10" v-if="items.length > 0 && page < pages">
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
  SfInput,
  SfButton,
  SfImage
} from "@storefront-ui/vue";
import { computed, ref } from "@nuxtjs/composition-api";
import {useCatalogItems} from "@vue-storefront/iiepmarket";
import { useUiState } from "~/composables";
import LazyHydrate from "vue-lazy-hydration";
import CategoryPageHeader from "~/components/CategoryPageHeader";
import DataViewer from "@/components/DataViewer";
import ProductCard from "@/components/Common/ProductCard";
import FiltersSidebar from "@/components/FiltersSidebar";
import { addBasePath } from "@vue-storefront/core";
import _ from "lodash";
import OfferCard from "@/components/Common/OfferCard";

export default {
  transition: "fade",
  components: {
    OfferCard,
    FiltersSidebar,
    ProductCard,
    DataViewer,
    CategoryPageHeader,
    SfInput,
    SfImage,
    SfButton,
    LazyHydrate,
  },
  setup() {
    const { items, load, count, pages, page, loadNextPage, cursor } = useCatalogItems();
    const uiState = useUiState();

    const searchQuery = ref({
      query: "",
      filters: {},
    });

    const searchItems = () => load.execute(searchQuery.value);
    searchItems();
    const debouncedSearch = _.debounce(searchItems, 500);

    return {
      searchQuery,
      load,
      ...uiState,
      items,
      debouncedSearch,
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
      addBasePath,
    };
  },
};
</script>

<style lang="scss" scoped>
#discover {
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
.products {
  box-sizing: border-box;
  flex: 1;
  margin: 0;
  &__grid {
    justify-content: stretch;
    @include for-desktop {
      justify-content: stretch;
    }
  }
  &__grid,
  &__list {
    display: flex;
    flex-wrap: wrap;
  }
  @include for-desktop {
    &__grid {
    }
    &__pagination {
      display: flex;
      justify-content: flex-start;
      margin: var(--spacer-xl) 0 0 0;
    }
    &__product-card-horizontal {
      margin: var(--spacer-lg) 0;
    }
    &__product-card {
      flex: 1 1 33%;
    }
    &__list {
      margin: 0 0 0 var(--spacer-sm);
    }
  }
}
</style>
