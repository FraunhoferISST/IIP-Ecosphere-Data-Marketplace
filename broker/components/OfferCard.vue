<template>
  <a :href="offerStorefrontURL" target="_blank">
    <div class="hover:bg-slate-50 p-10 flex justify-between gap-4">
      <div>
        <div class="flex gap-4 mb-4">
          <el-avatar shape="square" :size="60" fit="fill" :src="avatar"/>
          <div>
            <h1 class="text-2xl font-bold">
              {{ offer.title }}
            </h1>
            <span class="text-slate-500 font-light text-sm">{{ offer.productTitle }}</span>
            <div class="mt-1">
              <el-tag class="mr-2" type="info" v-for="(tag, i) in tags" :key="i"> {{ tag }}</el-tag>
            </div>
          </div>
        </div>
        <p class="text-slate-500 font-light">{{ description }}</p>
        <div v-if="offer.avgRating">
          <el-rate
              class="mt-4"
              v-model="offer.avgRating"
              disabled
              size="small"
              show-score
              text-color="#ff9900"
              score-template=""
          />
        </div>
      </div>
      <div class="offer-price">
        <template v-if="isFree">
          <div class="mt-4">
            <span
                class="bg-green-100 text-green-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-green-200 dark:text-green-900">
              Free
            </span>
          </div>
        </template>
        <template v-else-if="hasCustomQuotes">
          <div class="mt-4">
            <span
                class="bg-gray-100 text-gray-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300">
              Custom quotes
            </span>
          </div>
        </template>
        <template v-else>
          <div class="offer-price-regular">{{ regularPrice }}</div>
          <div class="offer-price-special font-bold">{{ specialPrice }}</div>
        </template>
      </div>
    </div>
  </a>
</template>

<script setup lang="ts">
import { CatalogProduct } from "../../shared/types";
import {useLocalStorage} from "@vueuse/core";

const {offer} = defineProps<{
  offer: CatalogProduct
}>()

const runtimeConfig = useRuntimeConfig();
const userStore = useLocalStorage("broker-user", {})

const description = computed(() => {
  const limit = 200
  if ((offer.description ?? "").length > limit) {
    return `${offer.description?.slice(0, limit)}...`
  }
  return offer.description
})
const tags = computed(() => [offer.shopName, offer.assetType].filter(tag => !!tag));
const avatar = computed(() => offer.images?.[0]);
const specialPrice = computed(() => offer.pricing?.displayPrice);
const isFree = computed(() => offer.priceModel?.type === "free");
const hasCustomQuotes = computed(() => offer.priceModel?.type === "customQuotes");
const regularPrice = computed(() => offer.pricing.compareAtPrice?.displayAmount);
const offerStorefrontURL = computed(() => `${offer.storefrontURL}`)
</script>

<style scoped lang="scss">
.offer-price {
  white-space: nowrap;
}

.offer-price-regular {
  text-decoration: line-through;
  color: rosybrown;
}

.offer-price-special {
  font-size: 1.3rem;
}

</style>
