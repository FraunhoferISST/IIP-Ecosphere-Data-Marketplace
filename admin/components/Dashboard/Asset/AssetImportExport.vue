<template>
  <div class="import-export pa-3">
    <div class="d-flex justify-end">
      <a
        ref="downloadLink"
        type="button"
        :href="`data:text/json;charset=utf-8,${JSON.stringify(products)}`"
        :download="`assets.json`"
      >
      </a>
      <v-btn
        color="primary"
        flat
        size="small"
        rounded="s-xl e-0"
        variant="tonal"
        :loading="load.loading.value"
        @click="exportAssets"
      >
        export
      </v-btn>
      <label>
        <v-btn
          color="primary"
          flat
          size="small"
          variant="tonal"
          rounded="s-0 e-xl"
          @click="openFileDialog"
        >
          import
        </v-btn>
        <input
          ref="importInput"
          type="file"
          accept=".json"
          @change="loadAssetsConfigFile"
          style="width: 0"
        />
      </label>
    </div>
    <card padding="pa-2" color="white" v-if="loadedAssetsConfig">
      <div class="d-flex align-center">
        <ve-progress
          :progress="importProgress.progress"
          :size="40"
          :determinate="importProgress.processing"
        >
          <template #default>
            <span v-if="!importIsDone">{{ importProgress.doneCount }}</span>
            <v-icon v-else color="success">done</v-icon>
          </template>
        </ve-progress>
        <p class="ml-2">Import {{ loadedAssetsConfig.count }} assets</p>
      </div>
      <div class="mt-2 d-flex justify-end" v-if="!importIsDone">
        <v-btn
          class="mr-2"
          v-if="!importProgress.processing"
          variant="flat"
          rounded="lg"
          size="small"
          flat
          @click="loadedAssetsConfig = null"
        >
          cancel
        </v-btn>
        <v-btn
          color="accent"
          rounded="lg"
          size="small"
          flat
          @click="importAssets"
          :loading="importProgress.processing"
        >
          Import
        </v-btn>
      </div>
    </card>
  </div>
</template>

<script setup lang="ts">
import { Product } from "~/types";
import _ from "lodash";
import { useToast } from "vue-toastification";
import Card from "~/components/Base/Card.vue";

type AssetsConfig = { count: number; assets: Product[] };

const { products, load, create } = useProducts();

const assetsConfig = ref<AssetsConfig>({
  count: 0,
  assets: [],
});
const loadedAssetsConfig = ref<AssetsConfig | null>(null);
const downloadLink = ref<HTMLAnchorElement | null>(null);
const importInput = ref<HTMLInputElement | null>(null);
const importProgress = ref<{
  doneCount: number;
  progress: number;
  processing: boolean;
}>({
  doneCount: 0,
  progress: 0,
  processing: false,
});

const exportAssets = () =>
  load.execute().then(() => {
    assetsConfig.value = {
      count: products.value.length,
      assets: products.value,
    };
    downloadLink.value?.setAttribute(
      "href",
      `data:text/json;charset=utf-8,${JSON.stringify(
        assetsConfig.value,
        null,
        2
      )}`
    );
    downloadLink.value?.click();
  });

const importIsDone = computed<boolean>(
  () => importProgress.value.progress === 100
);

const loadAssetsConfigFile = (event): Promise<AssetsConfig> =>
  new Promise((resolve) => {
    event.preventDefault();

    if (!importInput.value.value.length) return;

    let reader = new FileReader();
    reader.onload = (e) => {
      const result: AssetsConfig = JSON.parse(e.target.result as string);
      if (!result.count || !result.assets) {
        useToast().error(
          "Please provide valid JSON file exported from this application!"
        );
      } else {
        loadedAssetsConfig.value = result;
        resolve(result);
      }
    };
    reader.readAsText(importInput.value.files[0]);
  });

const openFileDialog = () => importInput.value.click();

const importAssets = async () => {
  importProgress.value.processing = true;
  importProgress.value.doneCount = 0;
  importProgress.value.progress = 0;
  try {
    for (const asset of loadedAssetsConfig.value.assets) {
      const { _id: newProductId } = await create.execute(
        _.omit(asset, [
          "_id",
          "tags",
          "pricing",
          "shop",
          "slug",
          "variants",
          "publishedProductHash",
        ])
      );
      for (const variant of asset.variants) {
        const templates = (variant.templates ?? []).map(({ id }) => id);
        const { _id: newProductVariantId } = await useProductVariant(
          "",
          newProductId
        ).create.execute({
          ..._.omit(variant, [
            "_id",
            "tags",
            "pricing",
            "shop",
            "shopId",
            "productId",
            "createdAt",
            "updatedAt",
            "slug",
            "variants",
          ]),
          templates,
        });
        if (variant.pricing) {
          await useProductVariant(newProductVariantId).update.execute({
            ..._.omit(variant, ["templates"]),
            templates,
            pricing: variant.pricing,
          });
        }
      }
      importProgress.value.doneCount++;
      importProgress.value.progress =
        (importProgress.value.doneCount * 100) / loadedAssetsConfig.value.count;
    }
  } catch (e) {
    useToast().error(e.toString());
  } finally {
    importProgress.value.processing = false;
  }
};
</script>

<style scoped lang="scss">
.import-export {
  position: absolute;
  top: 0;
  right: 0;
}
</style>
