<template>
  <div>
    <banner overline="Reviews" headline="Reviews of your offerings"> </banner>
    <data-viewer :loading="load.loading.value" :error="load.error.value">
      <v-container fluid class="px-0">
        <v-row>
          <v-col cols="12">
            <reviews-list :reviews="reviews" v-if="reviews.length > 0">
            </reviews-list>
            <v-alert
              v-else
              class="my-8 text-slate-500 text-center"
              variant="tonal"
            >
              No reviews yet
            </v-alert>
          </v-col>
        </v-row>
      </v-container>
    </data-viewer>
  </div>
</template>

<script setup lang="ts">
import DataViewer from "~/components/DataViewer.vue";
import Banner from "~/components/Base/Banner.vue";
import ReviewsList from "~/components/Dashboard/Review/ReviewsList.vue";

const { reviews, load } = useReviews();
load.execute();
</script>

<style scoped></style>
