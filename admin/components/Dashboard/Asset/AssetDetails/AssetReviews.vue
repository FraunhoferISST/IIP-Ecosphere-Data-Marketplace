<template>
  <div>
    <v-container fluid class="pa-0">
      <v-row>
        <v-col cols="12">
          <data-viewer
            :loading="loadAggregation.loading.value"
            :error="loadAggregation.error.value"
          >
            <reviews-aggregation
              v-if="reviewsAggregation.totalCount"
              :aggregation="reviewsAggregation"
            />
            <no-data v-else> There are no reviews yet </no-data>
          </data-viewer>
        </v-col>
      </v-row>
    </v-container>
    <data-viewer :loading="load.loading.value" :error="load.error.value">
      <v-container fluid class="px-0">
        <v-row>
          <v-col cols="12" v-for="review in reviews" :key="review._id">
            <review-card :review="review" />
          </v-col>
        </v-row>
      </v-container>
    </data-viewer>
  </div>
</template>

<script setup lang="ts">
import ReviewsAggregation from "~/components/Base/ReviewsAggregation.vue";
import { Product } from "~/types";
import DataViewer from "~/components/DataViewer.vue";
import ReviewCard from "~/components/Base/ReviewCard.vue";
import NoData from "~/components/Base/NoData.vue";

const { data } = defineProps<{
  data: Product;
}>();

const { reviews, load, reviewsAggregation, loadAggregation } = useReviews();
load.execute({ attributedProductId: data._id });
loadAggregation.execute({ attributedProductId: data._id });
</script>

<style scoped lang="scss"></style>
