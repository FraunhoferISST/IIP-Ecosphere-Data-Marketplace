<template>
  <data-viewer :loading="load.loading.value" :error="load.error.value" style="min-height: 80vh">
    <template v-if="item && selectedVariant">
      <div id="product">
        <div class="product block md:grid grid-cols-5 gap-x-5 mt-20">
          <LazyHydrate when-idle>
            <div class="col-span-2 overflow-hidden" v-if="productGallery.length > 0">
              <SfGallery :images="productGallery" class="product__gallery"/>
            </div>
            <div v-else class="col-span-2 flex justify-center align-center p-4 text-sm text-gray-400 bg-gray-50" role="alert">
              <span>
                No images available
              </span>
            </div>
          </LazyHydrate>

          <div class="product__info p-4 col-span-3">
            <div class="product__header">
              <div>
                <h2 class="text-black leading-10">
                  {{ productGetters.getName(item) }}
                  <span class="font-thin">
                    {{ productGetters.getName(selectedVariant) }}
                  </span>
                </h2>
              </div>
            </div>
            <div class="mt-4">
              <span class="text-sm text-slate-500">
                {{ selectedVariant.attributeLabel }} - {{ selectedVariant.optionTitle }}
              </span>
            </div>
            <div class="mt-6">
              <div v-if="['customQuotes', 'free'].includes(priceModel.type)">
                <p v-if="priceModel.type === 'customQuotes'" class="p-3 bg-slate-100">
                  Contact the product vendor to get custom quotes
                </p>
                <div v-else class="text-slate-600">
                    <span
                      class="bg-green-100 text-green-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-green-200 dark:text-green-900">
                      it's free
                    </span>
                </div>
              </div>
              <div v-else>
                <div class="flex items-end">
                  <SfPrice>
                    <template #special>
                      <div>
                        <div>
                          <del class="sf-price__old text-md">
                            {{ $n(productGetters.getPrice(selectedVariant).regular, 'currency') }}
                          </del>
                        </div>
                        <span class="sf-price__regular text-3xl">{{
                            productGetters.getPrice(selectedVariant).special && $n(productGetters.getPrice(selectedVariant).special, 'currency')
                          }}</span>
                      </div>
                    </template>
                  </SfPrice>
                  <div v-if="priceModel" class="text-slate-600 ml-2 mb-1">
                   <span v-if="priceModel.paymentPeriod" style="text-transform: capitalize">
                    / {{ priceModel.paymentPeriod }}
                  </span>
                  </div>
                </div>
                <div v-if="priceModel" class="text-slate-500 text-sm mt-2">
                  <p class="mt-0 mb-1">
                    <span v-for="(prop, i) in usageRestrictions" :key="i"> <dot-divider class="mx-2 mb-1" v-if="i > 0"/> {{
                        prop
                      }}</span>
                  </p>
                </div>
                <div v-if="selectedVariant.taxCode && priceModel.type !== 'free'" class="text-slate-500 text-xs mt-2">
                  <p class="mt-0 mb-1">
                    <span> plus <span class="font-bold">{{ selectedVariant.taxCode }}</span> tax</span>
                  </p>
                </div>
              </div>
            </div>
            <div>
              <SfAddToCart
                v-if="isLoggedInd"
                :stock="100"
                v-model="qty"
                :disabled="add.loading.value"
                :canAddToCart="true"
                class="product__add-to-cart mt-12"
                @click="addItem({...selectedVariant, productId: item.productId }, qty)"
              />
              <SfButton v-else class="color-light block fill-width my-6" disabled>
                Login into your account to add to cart
              </SfButton>
            </div>
            <div class="my-6">
              <variant-picker :variants="variants"/>
            </div>
          </div>
        </div>
        <LazyHydrate when-idle>
          <SfTabs :open-tab="1" class="product__tabs">
            <SfTab title="Description">
              <div class="product__description">
                {{ productGetters.getDescription(item) }}
              </div>
              <div class="block md:grid grid-cols-3 mt-5 gap-x-4">
                <SfProperty
                  v-for="(property, i) in properties"
                  :key="i"
                  :name="property.title"
                  :value="property.value"
                  class="product__property my-3"
                >
                </SfProperty>
              </div>
              <div>
                <template-renderer
                  class="my-10"
                  v-for="template in selectedVariant.templates"
                  :key="template.id"
                  :template="template"
                  :item="selectedVariant"
                >
                  {{ selectedVariant.templates }}
                </template-renderer>
              </div>
            </SfTab>
            <SfTab
              title="Distributions"
              class="product__additional-info"
            >
              <div class="block sm:grid grid-cols-2 gap-x-4">
                <div class="bg-slate-50 p-4" v-for="(dist, i) in selectedVariant.distributions" :key="i">
                  <h4 class="m-0">{{ dist.title }}</h4>
                  <div v-for="(prop, i) in getVariantDistributionProperties(dist)" :key="i">
                    <SfProperty
                      v-if="prop.value"
                      :name="prop.key"
                      :value="prop.value"
                      class="product__property my-3"
                    >
                    </SfProperty>
                  </div>
                </div>
              </div>
            </SfTab>
            <SfTab
              title="Sample"
              class="product__additional-info"
            >
              <div class="product__additional-info">
                coming soon
              </div>
            </SfTab>
            <SfTab title="Read reviews" v-if="item.productId">
              <product-reviews :product-id="item.productId"/>
            </SfTab>
          </SfTabs>
        </LazyHydrate>
      </div>
    </template>
    <template #error>
      <div class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
        <h4 class="mb-4">
          Error occurred
        </h4>
        Catalog product not found or the access is not granted. You may have to login first to access the offer.
      </div>
    </template>
  </data-viewer>
</template>
<script>
import {
  SfProperty,
  SfHeading,
  SfPrice,
  SfAddToCart,
  SfTabs,
  SfGallery,
  SfIcon,
  SfImage,
  SfBreadcrumbs,
  SfButton
} from "@storefront-ui/vue";

import RelatedProducts from "~/components/RelatedProducts.vue";
import {ref, computed, useRoute} from "@nuxtjs/composition-api";
import {
  useCart,
  productGetters, useUser
} from "@vue-storefront/iiepmarket";
import LazyHydrate from "vue-lazy-hydration";
import cacheControl from "./../helpers/cacheControl";
import {addBasePath} from "@vue-storefront/core";
import DataViewer from "~/components/DataViewer";
import VariantPicker from "@/components/Catalog/VariantPicker";
import DotDivider from "@/components/Base/DotDivider";
import {useCatalogItem} from "@vue-storefront/iiepmarket/src";
import ProductReviews from "@/components/Catalog/ProductReviews";
import TemplateRenderer from "~/components/Catalog/TemplateRenderer";

export default {
  name: "Product",
  transition: "fade",
  middleware: cacheControl({
    "max-age": 60,
    "stale-when-revalidate": 5,
  }),
  components: {
    TemplateRenderer,
    ProductReviews,
    DotDivider,
    VariantPicker,
    DataViewer,
    SfProperty,
    SfHeading,
    SfPrice,
    SfAddToCart,
    SfTabs,
    SfGallery,
    SfIcon,
    SfImage,
    SfBreadcrumbs,
    SfButton,
    RelatedProducts,
    LazyHydrate,
  },
  setup() {
    const route = useRoute();
    const {item, load} = useCatalogItem(route.value.params.slug);
    const {add, loading} = useCart();
    const {user} = useUser();

    const qty = ref(1);
    const selectedVariant = ref({});

    const variantId = computed(() => route.value.params.id);
    const slug = computed(() => route.value.params.slug);
    const productGallery = computed(() => productGetters.getGallery(item.value).map(img => ({
      mobile: {url: addBasePath(img.small)},
      desktop: {url: addBasePath(img.normal)},
      big: {url: addBasePath(img.big)},
      alt: "alt",
    })));
    const properties = computed(() => [
      {
        title: "SKU",
        value: selectedVariant.value.sku,
      },
      {
        title: "Asset type",
        value: selectedVariant.value.assetType,
      },
      {
        title: "Vendor",
        value: item.value.vendor,
      },
      {
        title: "Origin country",
        value: item.value.originCountry,
      },
      {
        title: "Data classification",
        value: item.value.dataClassification,
      },
      {
        title: "Themes",
        value: (item.value.themes ?? []).join(", "),
      },
      {
        title: "Barcode",
        value: selectedVariant.value.barcode,
      },
      {
        title: "Version info",
        value: selectedVariant.value.versionInfo,
      },
      {
        title: "Version Notes",
        value: selectedVariant.value.versionNotes,
      },
      {
        title: "Update cycle",
        value: selectedVariant.value.updateCycle,
      },
      ...(item.value.metafields ?? []).map(({key, value}) => ({title: key, value})),
      ...(selectedVariant.value.metafields ?? []).map(({key, value}) => ({title: key, value}))
    ].filter(({value}) => Boolean(value)));
    const priceModel = computed(() => selectedVariant.value?.priceModel ?? {});
    const usageRestrictions = computed(() =>
      Object.entries(priceModel.value)
        .filter(([k]) => !["type", "paymentPeriod", "timeRange"].includes(k))
        .filter((pair) => Boolean(pair[1]))
        .map((pair) => pair[1])
    );

    const getVariantDistributionProperties = (dist) => {
      const metafields = dist.metafields ?? [];
      return [
        ...Object.entries(dist).map(([k, v]) => ({
          key: k,
          value: v,
        })).filter(({key}) => key !== "metafields"),
        ...metafields
      ];
    };

    load.execute().then(() => {
      selectedVariant.value = {
        ...item.value.variants.find(({_id}) => variantId.value === _id),
        slug: slug.value,
      };
    });

    return {
      load,
      item,
      selectedVariant,
      qty,
      loading,
      productGetters,
      productGallery,
      properties,
      usageRestrictions,
      priceModel,
      isLoggedInd: computed(() => Boolean(user.value)),
      variants: computed(() => (item.value.variants ?? [])
        .filter(({_id}) => _id !== selectedVariant.value._id)
        .map(variant => ({...variant, slug: slug.value}))),
      add,
      addItem: (variant, quantity) => add.execute(variant, quantity),
      getVariantDistributionProperties,
    };
  },
};
</script>

<style lang="scss" scoped>
::v-deep .sf-gallery__thumb {
  .sf-image, .sf-image--placeholder {
    //width: 80px !important;
    //height: 80px !important;
  }
}

::v-deep .sf-gallery__big-image .sf-image {
  width: 100% !important;
  height: 100% !important;
  overflow: hidden;
}

#product {
  box-sizing: border-box;
  @include for-desktop {
    max-width: 1272px;
    margin: 0 auto;
  }
}

.product {
  &__header {
    --heading-title-color: var(--c-link);
    --heading-title-font-weight: var(--font-weight--bold);
    --heading-padding: 0;
    margin: 0 var(--spacer-sm);
    display: flex;
    justify-content: space-between;
    @include for-desktop {
      --heading-title-font-weight: var(--font-weight--semibold);
      margin: 0 auto;
    }
  }

  &__drag-icon {
    animation: moveicon 1s ease-in-out infinite;
  }

  &__price-and-rating {
    margin: 0 var(--spacer-sm) var(--spacer-base);
    align-items: center;
    @include for-desktop {
      display: flex;
      justify-content: space-between;
      margin: var(--spacer-sm) 0 var(--spacer-lg) 0;
    }
  }

  &__count {
    @include font(
        --count-font,
        var(--font-weight--normal),
        var(--font-size--sm),
        1.4,
        var(--font-family--secondary)
    );
    color: var(--c-text);
    text-decoration: none;
    margin: 0 0 0 var(--spacer-xs);
  }

  &__description {
    @include font(
        --product-description-font,
        var(--font-weight--light),
        var(--font-size--base),
        1.6,
        var(--font-family--primary)
    );
  }

  &__select-size {
    margin: 0 var(--spacer-sm);
    @include for-desktop {
      margin: 0;
    }
  }

  &__colors {
    @include font(
        --product-color-font,
        var(--font-weight--normal),
        var(--font-size--lg),
        1.6,
        var(--font-family--secondary)
    );
    display: flex;
    align-items: center;
    margin-top: var(--spacer-xl);
  }

  &__color-label {
    margin: 0 var(--spacer-lg) 0 0;
  }

  &__color {
    margin: 0 var(--spacer-2xs);
  }

  &__add-to-cart {
  }

  &__guide,
  &__compare,
  &__save {
    display: block;
    margin: var(--spacer-xl) 0 var(--spacer-base) auto;
  }

  &__compare {
    margin-top: 0;
  }

  &__tabs {
    --tabs-title-z-index: 0;
    margin: var(--spacer-lg) auto var(--spacer-2xl);
    --tabs-title-font-size: var(--font-size--lg);
    @include for-desktop {
      margin-top: var(--spacer-2xl);
    }
  }

  &__property {
    &__button {
      --button-font-size: var(--font-size--base);
    }
  }

  &__review {
    padding-bottom: 24px;
    border-bottom: var(--c-light) solid 1px;
    margin-bottom: var(--spacer-base);
  }

  &__additional-info {
    color: var(--c-link);
    @include font(
        --additional-info-font,
        var(--font-weight--light),
        var(--font-size--sm),
        1.6,
        var(--font-family--primary)
    );

    &__title {
      font-weight: var(--font-weight--normal);
      font-size: var(--font-size--base);
      margin: 0 0 var(--spacer-sm);

      &:not(:first-child) {
        margin-top: 3.5rem;
      }
    }

    &__paragraph {
      margin: 0;
    }
  }

  &__gallery {
    flex: 1;
  }
}

.breadcrumbs {
  margin: var(--spacer-base) auto var(--spacer-lg);
}

@keyframes moveicon {
  0% {
    transform: translate3d(0, 0, 0);
  }
  50% {
    transform: translate3d(0, 30%, 0);
  }
  100% {
    transform: translate3d(0, 0, 0);
  }
}
</style>
