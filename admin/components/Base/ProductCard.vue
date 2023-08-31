<template>
  <link-wrapper :id="product._id" :path="linkPath">
    <div class="product-card-container full-width fill-height">
      <div class="product-card-avatar position-relative">
        <entity-avatar
          :size="60"
          :image-url="avatarUrl"
          :entity-title="product.title"
        />
        <div
          class="product-icons-container position-absolute d-flex flex-column justify-space-between align-center"
        >
          <span class="published-indicator" v-if="!isArchived">
            <dot-divider
              title="Published"
              v-if="isPublished"
              style="border: 3px solid white"
              size="18px"
              :color="$vuetify.theme.computedThemes.customTheme.colors.success"
            />
          </span>
          <div
            class="bg-white pa-1 rounded-circle d-inline-block d-flex justify-center align-center"
            style="height: 24px; width: 24px"
          >
            <v-icon
              v-if="isArchived"
              size="small"
              icon="archive"
              color="error"
              title="Archived"
            />
            <v-icon
              v-else
              size="small"
              :icon="!product.isVisible ? 'visibility_off' : 'visibility'"
              color="accent"
              :title="product.isVisible ? 'Visible' : 'Invisible'"
            />
          </div>
        </div>
      </div>
      <div>
        <div class="d-flex justify-space-between">
          <div>
            <h3 class="product-card-title">
              {{ product.title }}
            </h3>
            <span class="text-slate-400 product-card-id">
              {{ product._id }}
            </span>
          </div>
          <v-menu
            offset-x
            location="bottom end"
            v-if="actions && actions.length > 0"
          >
            <template #activator="{ props }" v-model="menu">
              <v-btn
                icon="more_vert"
                variant="flat"
                rounded
                size="small"
                v-bind="props"
                @click.prevent="menu = !menu"
              >
              </v-btn>
            </template>
            <v-list>
              <v-list-item
                v-for="action in actions"
                :key="action.title"
                @click.stop.prevent="() => action.handler(product, index)"
              >
                <v-list-item-title>{{ action.title }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>
        <div class="text-sm text-slate-500 d-flex align-center">
          <div v-if="product.variants">
            <span>{{ variantsCountString }}</span>
          </div>
          <div v-if="product.distributions">
            <span>{{ distributionsCountString }}</span>
          </div>
          <div v-if="currentPrice">
            <dot-divider style="margin-bottom: 2px" class="mx-2" />
            <span>{{ currentPrice }}</span>
          </div>
          <div v-if="productTags.length > 0">
            <dot-divider style="margin-bottom: 2px" class="mx-2" />
            <v-chip
              class="mr-2"
              size="x-small"
              label
              color="accent"
              v-for="tag in productTags"
              :key="tag"
            >
              {{ tag }}
            </v-chip>
          </div>
        </div>
      </div>
    </div>
  </link-wrapper>
</template>

<script setup lang="ts">
import EntityAvatar from "~/components/Base/EntityAvatar.vue";
import LinkWrapper from "~/components/Base/LinkWrapper.vue";
import DotDivider from "~/components/Base/DotDivider.vue";
import { Product, ProductVariant } from "~/types";
import _ from "lodash";

const { flatten } = _;
const {
  product,
  productId,
  index,
  variantId = "",
  actions = [],
} = defineProps<{
  product: Product & ProductVariant;
  productId: string;
  index: number;
  variantId?: string;
  actions?: Array<{
    title: string;
    handler: (product: object, index: number) => void;
  }>;
}>();

const menu = ref(false);

const avatarUrl = computed(() => {
  if (product.images?.length > 0) {
    return product.images[0];
  }
  if (product.variants?.length > 0) {
    const variantsImages = flatten(
      product.variants.map(({ images }) => images)
    );
    return variantsImages?.[0] ?? "";
  }
  return "";
});
const currentPrice = computed(() => product.pricing?.displayPrice ?? "");
const isPublished = computed<boolean>(() => !!product.publishedProductHash);
const isArchived = computed<boolean>(() => !!product.isDeleted);
const variantsCountString = computed(() => {
  const count = product?.variants?.length;
  return `${count} Variant${count === 1 ? "" : "s"}`;
});
const distributionsCountString = computed(() => {
  const count = product?.distributions?.length;
  return `${count} Distribution${count === 1 ? "" : "s"}`;
});
const productTags = computed(() =>
  [product.productType]
    .filter((t) => t)
    .map((t) => (t.length > 40 ? `${t.slice(0, 40)}...` : t))
);
const linkPath = computed(() => {
  if (variantId) {
    return `/assets/${productId}/variants/${variantId}?page=Overview`;
  }
  return `/assets/${productId || product._id}?page=Overview`;
});
</script>

<style scoped lang="scss">
a {
  text-decoration: none;
}
.product-card-container {
  transition: 0.3s;
  display: grid;
  grid-template-columns: max-content 1fr;
  grid-gap: 20px;
  padding: 16px;
  border-radius: $b-radius;
  &:hover {
    background-color: rgb(248 250 252);
  }
}
.product-card-avatar {
  height: 60px;
}
.product-icons-container {
  height: 120%;
  top: -10%;
  right: -5px;
}

.product-card-title {
  color: $primary;
}
.product-card-id {
  font-size: 0.8rem;
}
</style>
