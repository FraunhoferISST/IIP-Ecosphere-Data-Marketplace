<template>
  <div id="home">
    <LazyHydrate when-idle>
      <SfHero class="hero" v-if="shop" :slider-options="{ autoplay: false}">
        <SfHeroItem
          :title="`Welcome to ${shop.name}`"
          subtitle="Store vendor"
          buttonText="Learn more"
          image="none"
        >
          <template #call-to-action>
            <div class=" flex">
              <SfButton style="width: auto" :link="localePath('/offers')">Discover offers</SfButton>
              <SfButton data-cy="vendor" style="width: auto" :link="localePath('/vendor')" class="color-light block ml-10">learn more about store</SfButton>
            </div>
          </template>
        </SfHeroItem>
      </SfHero>
    </LazyHydrate>

    <LazyHydrate when-visible>
      <div>
        <SfHeading title="Recent offers" :level="2"/>
        <nuxt-link :to="localePath('/c/women')" class="smartphone-only">
          {{ $t('See all') }}
        </nuxt-link>
      </div>
    </LazyHydrate>
    <LazyHydrate when-visible>
      <div class="grid grid-cols-2 md:grid-cols-4" v-if="products.length > 0">
        <div v-for="product in products" :key="product._id">
          <offer-card class="p-4" :offer="product"/>
        </div>
      </div>
      <div v-else class="mt-4">
        <div class="p-4 text-sm text-gray-700 bg-gray-100 dark:bg-gray-700 dark:text-gray-300" role="alert">
          It looks like there are no offers yet
        </div>
      </div>
    </LazyHydrate>
  </div>
</template>
<script>
import {
  SfHero,
  SfProductCard,
  SfImage,
  SfHeading,
  SfArrow,
  SfButton
} from "@storefront-ui/vue";
import { computed } from "@nuxtjs/composition-api";
import LazyHydrate from "vue-lazy-hydration";
import { useUiState } from "../composables";
import { addBasePath } from "@vue-storefront/core";
import {productGetters, useCatalogItems, useShop, useCart, useUser} from "@vue-storefront/iiepmarket";
import ProductCard from "~/components/Common/ProductCard";
import OfferCard from "~/components/Common/OfferCard";

export default {
  name: "Home",
  components: {
    OfferCard,
    ProductCard,
    SfHero,
    SfProductCard,
    SfImage,
    SfHeading,
    SfArrow,
    SfButton,
    LazyHydrate,
  },
  setup() {
    const { toggleNewsletterModal } = useUiState();
    const { load: userLoad } = useUser();
    const { shop, shopId, load: shopLoad } = useShop();
    const { load: cartLoad } = useCart();
    const { items, load: catalogLoad } = useCatalogItems();

    shopLoad.execute().then(() => {
      if (shopId.value) {
        userLoad;
        catalogLoad.execute({ pageSize: 4 });
        cartLoad.execute();
      }
    });

    return {
      shopId,
      shop,
      toggleWishlist: () => {},
      toggleNewsletterModal,
      addBasePath,
      cartLoad,
      productGetters,
      products: computed(() => items.value.slice(0, 4)),
    };
  },
};
</script>

<style lang="scss" scoped>
#home {
  min-height: 90vh;
  box-sizing: border-box;
  padding: 0 var(--spacer-sm);
  @include for-desktop {
    max-width: 1240px;
    padding: 0;
    margin: 0 auto;
  }
  .glide__slide.sf-hero-item {
    background-color: var(--c-light);
  }
}

.hero {
  margin: var(--spacer-xl) auto var(--spacer-lg);
  --hero-item-background-position: center;
  @include for-desktop {
    margin: var(--spacer-xl) auto var(--spacer-2xl);
  }
  ::v-deep .sf-hero__control {
    &--right, &--left {
      display: none;
    }
  }
}
</style>
