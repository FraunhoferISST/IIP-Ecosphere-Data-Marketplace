<template>
  <SfProductCard
    style="max-width: 100%"
    v-if="!horizontal"
    :key="productGetters.getId(product)"
    :title="product.fullTitle"
    :image="addBasePath(productGetters.getCoverImage(product))"
    image-width="100%"
    :image-height="150"
    :regular-price="regularPrice"
    :special-price="specialPrice"
    :max-rating="5"
    :scoreRating="product.avgRating"
    :reviews-count="product.reviewsTotalCount"
    :score-rating="productGetters.getAverageRating(product)"
    :show-add-to-cart-button="true"
    :is-in-wishlist="false"
    :is-added-to-cart="isInCart(product)"
    :link="localePath(`/p/${productGetters.getId(product)}/${productGetters.getSlug(product)}`)"
    class="products__product-card"
    @click:wishlist="() => {}"
    @click:add-to-cart="() => addItemToCart.execute(product, 1)"
  >
    <template #title>
      <h4>
        <span>
          {{productGetters.getName(product)}}
        </span>
        <span class="block text-slate-400 font-normal text-sm">
          {{ product.productTitle}}
        </span>
      </h4>
    </template>
    <template #badge>
      <div class="my-2" v-if="productTags.length > 0">
        <span v-for="tag in productTags" :key="tag" class="bg-gray-100 text-gray-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300">
          {{tag}}
        </span>
      </div>
    </template>
    <template #price v-if="isFree">
      <div class="mt-4">
        <span class="bg-green-100 text-green-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-green-200 dark:text-green-900">
          Free
        </span>
      </div>
    </template>
    <template #price v-else-if="hasCustomQuotes">
      <div class="mt-4">
        <span class="bg-gray-100 text-gray-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300">
          Custom quotes
        </span>
      </div>
    </template>
  </SfProductCard>
  <SfProductCardHorizontal
    v-else
    class="products__product-card-horizontal"
    :key="productGetters.getId(product)"
    :title="product.fullTitle"
    :description="productGetters.getDescription(product)"
    :image="addBasePath(productGetters.getCoverImage(product))"
    image-width="100%"
    :image-height="200"
    :regular-price="regularPrice"
    :special-price="specialPrice"
    :scoreRating="product.avgRating"
    :reviews-count="product.reviewsTotalCount"
    :max-rating="5"
    :qty="1"
    :is-in-wishlist="false"
    :link="localePath(`/p/${productGetters.getId(product)}/${productGetters.getSlug(product)}`)"
    @input="productQuantity = $event"
    @click:wishlist="() => {}"
    @click:add-to-cart="() => addItemToCart.execute(product, productQuantity)"
  >
    <template #configuration>
      <SfProperty
        class="desktop-only"
        :name="product.attributeLabel"
        :value="product.optionTitle"
        style="margin: 0 0 1rem 0;"
      />
      <div class="my-2" v-if="productTags.length > 0">
        <span v-for="tag in productTags" :key="tag" class="bg-gray-100 text-gray-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300">
          {{tag}}
        </span>
      </div>
    </template>
    <template #price v-if="isFree">
      <div class="mt-4">
        <span class="bg-green-100 text-green-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-green-200 dark:text-green-900">
          Free
        </span>
      </div>
    </template>
    <template #price v-else-if="hasCustomQuotes">
      <div class="mt-4">
        <span class="bg-gray-100 text-gray-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300">
          Custom quotes
        </span>
      </div>
    </template>
    <template #actions>
      <SfButton
        class="sf-button--text desktop-only"
        style="margin: 0 0 1rem auto; display: block;"
        @click="() => {}"
      >
        {{ $t('Save for later') }}
      </SfButton>
    </template>
  </SfProductCardHorizontal>
</template>

<script>
import {
  SfButton,
  SfIcon,
  SfProductCard,
  SfProductCardHorizontal,
  SfProperty
} from "@storefront-ui/vue";
import { addBasePath } from "@vue-storefront/core";
import {useCart, productGetters} from "@vue-storefront/iiepmarket";
import {computed, ref} from "@nuxtjs/composition-api";

export default {
  name: "ProductCard",
  components: {
    SfButton,
    SfProperty,
    SfIcon,
    SfProductCard,
    SfProductCardHorizontal,
  },
  props: {
    product: {
      type: Object,
      required: true,
    },
    horizontal: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const { add: addItemToCart, isInCart } = useCart();
    const productQuantity = ref(1);

    return {
      productQuantity,
      productTags: computed(() => [...props.product.distributions.map(({ type }) => type)]),
      productGetters,
      specialPrice: computed(() => props.product.pricing.displayPrice),
      isFree: computed(() => props.product.priceModel?.type === "free"),
      hasCustomQuotes: computed(() => props.product.priceModel?.type === "customQuotes"),
      regularPrice: computed(() => props.product.pricing.compareAtPrice?.displayAmount),
      addItemToCart,
      isInCart,
      addBasePath,
    };
  },
};
</script>

<style scoped>

</style>
