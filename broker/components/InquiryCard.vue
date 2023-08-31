<template>
  <a :href="inquiryStorefrontURL" target="_blank">
    <div class="hover:bg-slate-50 p-10 flex justify-between gap-4">
      <div>
        <div class="flex gap-4 mb-4">
          <div>
            <h1 class="text-2xl font-bold">
              {{ inquiry.title }}
            </h1>
            <div class="inquiry-price text-slate-600">
              Desired pricing: <b>{{ inquiry.desiredPricing || "N/A" }}</b>
            </div>
            <div class="text-slate-600">
              Replies: <b>{{ inquiry.repliesCount || 0 }}</b>
            </div>
          </div>
        </div>
        <p class="text-slate-500 font-light my-8">{{ description }}</p>
        <div>
          <el-descriptions
              :column="1"
              size="small"
              :border="false"
          >
            <el-descriptions-item label="Use case" v-if="inquiry.useCase">
              <span>
                {{ inquiry.useCase }}
              </span>
            </el-descriptions-item>
            <el-descriptions-item label="Categories" v-if="hasCategories">
              <span >
                <el-tag size="small" type="info" class="mb-1 mr-1" v-for="(c, i) in inquiry.categories" :key="i">{{ c }}</el-tag>
              </span>
            </el-descriptions-item>
            <el-descriptions-item label="Source types" v-if="hasSourceTypes">
              <span>
               <el-tag size="small" type="info" class="mb-1 mr-1" v-for="(st, i) in inquiry.sourceTypes" :key="i">{{ st }}</el-tag>
              </span>
            </el-descriptions-item>
          </el-descriptions>
        </div>
        <div class="text-slate-600 mt-8">
          Published by <b>{{ fromAccount.name }} {{ fromAccount.email }}</b>
        </div>
      </div>
    </div>
  </a>
</template>

<script setup lang="ts">
import { Inquiry } from "../../shared/types";
import {useLocalStorage} from "@vueuse/core";

const {inquiry} = defineProps<{
  inquiry: Inquiry
}>()

const runtimeConfig = useRuntimeConfig();
const userStore = useLocalStorage("broker-user", {})

const description = computed(() => {
  const limit = 200
  if ((inquiry.description ?? "").length > limit) {
    return `${inquiry.description?.slice(0, limit)}...`
  }
  return inquiry.description
})
const categories = computed(() => inquiry.categories ?? []);
const inquiryStorefrontURL = computed(() => inquiry.storefrontUrl)
const hasCategories = computed(() => (inquiry.categories?.length ?? []) > 0)
const hasSourceTypes= computed(() => (inquiry.sourceTypes?.length ?? []) > 0)
const fromAccount = computed(() => {
  const account = inquiry.account ?? {};
  return {
    name: account.name,
    email: account.primaryEmailAddress,
  }
})
</script>

<style scoped lang="scss">
.inquiry-price {
  white-space: nowrap;
}

.inquiry-price-regular {
  text-decoration: line-through;
  color: rosybrown;
}

.inquiry-price-special {
  font-size: 1.3rem;
}
:global(.el-descriptions__body) {
 background-color: transparent !important;
}

</style>
