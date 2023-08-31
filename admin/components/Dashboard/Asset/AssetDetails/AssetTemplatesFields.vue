<template>
  <section class="asset-template-fields">
    <template-renderer
      v-for="template in templates"
      :template="template"
      :key="template.id"
      v-model="patch"
    ></template-renderer>
  </section>
</template>

<script setup lang="ts">
import { FieldsTemplate, ProductVariant } from "../../../../../shared/types";
import TemplateRenderer from "~/components/Base/TemplateRenderer.vue";

const { asset } = defineProps<{
  asset: ProductVariant;
}>();

const { patch } = useEditState(asset.templatesFields);

const templates = computed<FieldsTemplate[]>(() => asset?.templates ?? []);
</script>
<style scoped lang="scss"></style>
