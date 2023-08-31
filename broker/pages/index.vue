<template>
  <div class="my-5" style="position: relative;">
    <el-input data-cy="search" v-loading.fullscreen.lock="fullscreenLoading" v-model="searchInput" placeholder="Search offers" prefix-icon="Search" size="large" @input="onInput" :loading="isSearching"/>
    <el-progress
        v-if="isSearching"
        style="position: absolute; width: 100%"
        :percentage="100"
        :format="() => ''"
        :indeterminate="true"
        :duration="1"
        :show-text="false"
        :stroke-width="1"
        color="SlateBlue"
    />
    <span class="block mt-4">
      Found: <b>{{totalItemsCount}}</b>
    </span>
  </div>
  <div v-if="items.length > 0">
    <offer-card v-for="item of items" :offer="item" :key="item._id">
      {{ item.title }}
    </offer-card>
  </div>
  <el-empty v-else-if="!isSearching" description="Couldn't find anything" />
</template>

<script setup lang="ts">
import { ElLoading } from 'element-plus'
import { useFetch } from "~/composables/useFetch";

import {useLocalStorage} from "@vueuse/core";
import {useKnownNodes} from "~/composables/useKnownNodes";

const { fetch } = useFetch();
const userStore = useLocalStorage("broker-user", {})
const { knownNodes } = useKnownNodes()

const searchResults = ref([])
const searchInput = ref("")
const fullscreenLoading = ref(true)
const isSearching = ref(true)

const items = computed(() => {
  const _items = []
  for (const result of searchResults.value) {
    for (const item of result.items) {
      for (const variant of item.variants) {
        _items.push({
          ...variant,
          storefrontURL: `${result.storefront}/p/${variant._id}/${item.slug}`,
          shopName: item.shop?.name ?? "",
          productCatalogId: item._id,
          productId: item.productId,
          description: item.description,
          slug: item.slug,
          productTitle: item.title,
          fullTitle: `${item.title} - ${variant.title}`,
          pricing: variant.pricing[0],
          avgRating: item.avgRating,
          reviewsTotalCount: item.reviewsTotalCount,
          images: [...(variant.images ?? []), ...(item.images ?? [])],
        })
      }
    }
  }
  return _items;
})
const totalItemsCount = computed(() => {
  let count = 0;
  for (const result of searchResults.value) {
    count += result.count;
  }
  return count;
})

const search = async() => {
  isSearching.value = true
  searchResults.value = await fetch("/api/handlers/searchCatalog", {
    method: "POST",
    body: {
      searchQuery: {
        query: searchInput.value,
        pageSize: 1000
      },
      knownNodes: knownNodes.value,
      accountNodeEndpoint: userStore.value?.node?.apiEndpoint ?? ""
    }
  }).finally(() => {
    fullscreenLoading.value = false;
    isSearching.value = false;
  })
}

const onInput = () =>  {
  search();
}

search();
</script>
