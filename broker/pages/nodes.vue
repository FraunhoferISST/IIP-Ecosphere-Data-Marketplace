<template>
  <el-alert style="margin-bottom: 20px" :closable="false">
    Below are listed the marketplace participants known to this broker
  </el-alert>
  <div v-if="knownNodes.length > 0">
    <el-row :gutter="12">
      <el-col :xs="24" :sm="24" :md="12" v-for="(node, i) in knownNodes" :key="i">
        <el-card class="box-card" shadow="never">
          <template #header>
            <div class="card-header">
              <span>{{ node.name }}</span>
            </div>
            <div class="text item">
              <el-link :href="node.storefront" target="_blank" :underline="false">{{node.storefront}}</el-link>
            </div>
          </template>
          <el-descriptions
            :column="1"
            size="small"
            :border="false"
          >
            <el-descriptions-item label="Phone">
              <span v-if="hasPhone(node)">
                {{ node.addressBook[0].phone}}
              </span>
              <span v-else>
                -
              </span>
            </el-descriptions-item>
            <el-descriptions-item label="Currency">
              <span v-if="hasCurrency(node)">
                <el-tag size="small">{{ node.currency.code }}</el-tag>
              </span>
              <span v-else>
                -
              </span>
            </el-descriptions-item>
            <el-descriptions-item label="Language">
              <span v-if="hasLanguage(node)">
                <el-tag size="small">{{ node.language.toUpperCase() }}</el-tag>
              </span>
              <span v-else>
                -
              </span>
            </el-descriptions-item>
            <el-descriptions-item label="Address">
              <span v-if="hasAddress(node)">
                {{ getAddress(node) }}
              </span>
              <span v-else>
                -
              </span>
            </el-descriptions-item>
          </el-descriptions>
        </el-card>
      </el-col>
    </el-row>
  </div>
  <el-empty v-else description="Couldn't find anything" />
</template>

<script setup lang="ts">

import {useKnownNodes} from "~/composables/useKnownNodes";

const { fetch } = useFetch();
const { knownNodes } = useKnownNodes()

const searchInput = ref("")

const hasPhone = (node) => {
  return !!node.addressBook?.[0]?.phone
}
const hasAddress = (node) => {
  return !!node.addressBook?.[0]
}
const hasCurrency = (node) => {
  return !!node.currency?.code
}
const hasLanguage = (node) => {
  return !!node.language;
}
const getAddress = (node) => {
  const address = node.addressBook[0];
  const street = address.address1 ?? "";
  const postal = address.postal ?? "";
  const city = address.city ?? "";
  const country = address.country ?? "";
  const company = address.company ?? "";
  return `${company} ${street} ${postal} ${city} ${country}`
}
</script>
