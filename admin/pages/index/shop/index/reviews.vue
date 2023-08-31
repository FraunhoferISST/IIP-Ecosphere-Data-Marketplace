<template>
  <v-container fluid class="pa-0">
    <v-row>
      <v-col cols="12">
        <data-viewer
          :loading="loadAggregation.loading.value"
          :error="loadAggregation.error.value"
        >
          <div>
            <ReviewsAggregation
              color="transparent"
              :aggregation="reviewsAggregation"
            />
          </div>
        </data-viewer>
      </v-col>
      <v-col cols="12">
        <data-viewer :loading="load.loading.value" :error="load.error.value">
          <v-container fluid class="px-0">
            <v-row>
              <v-col cols="12" v-for="review in reviews" :key="review._id">
                <review-card :review="review" />
              </v-col>
            </v-row>
          </v-container>
        </data-viewer>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import ReviewsAggregation from "~/components/Base/ReviewsAggregation.vue";
import DataViewer from "~/components/DataViewer.vue";
import ReviewCard from "~/components/Base/ReviewCard.vue";

const { shop } = useShop();

const { reviews, load, reviewsAggregation, loadAggregation } = useReviews();
load.execute({ attributedShopId: shop.value._id });
loadAggregation.execute({ attributedShopId: shop.value._id });
</script>

<style scoped lang="scss"></style>
