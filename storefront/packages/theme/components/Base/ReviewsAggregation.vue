<template>
  <div class="p-10 reviews-aggregation">
    <div class="text-center flex flex-col justify-center items-center">
      <h4 data-cy="customer-reviews">Customer reviews</h4>
      <div class="flex gap-x-4 items-center bg-slate-100 py-2 px-3 rounded-full my-4" style="max-width: 170px">
        <star-rating :show-rating="false" read-only :star-size="20" :rating="aggregation.averageRating"/>
        <span class="text-slate-500">{{aggregation.averageRating.toFixed(1)}} of 5</span>
      </div>
    </div>
    <div>
      <div v-for="bar in bars" :key="bar.rating">
        <div class="bar gap-x-2">
          <span class="text-slate-500">{{bar. rating }} Stars</span>
          <span class="bar-progress-container bg-slate-200 mt-1">
            <span class="bar-progress" :style="{width: `${bar.progress}%`}"></span>
          </span>
          <span class="bar-percent text-slate-500">{{bar.progress.toFixed(0)}}%</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ReviewsAggregation",
  props: {
    aggregation: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const totalRatingsCount = props.aggregation.counts.length === 0 ? 0
      : props.aggregation.counts.map(({ count }) => count).reduce((acc, currentVal) => acc + currentVal);
    const getRatingStats = (rating) => props.aggregation.counts.find((({ rating: r }) => r === rating));
    const bars = [1, 2, 3, 4, 5].map((rating) => ({
      rating,
      count: getRatingStats(rating)?.count ?? 0,
      progress: (getRatingStats(rating)?.count ?? 0) * 100 / totalRatingsCount,
    }));
    return {
      bars: bars.reverse(),
    };
  },
};
</script>

<style scoped lang="scss">
.reviews-aggregation{
  span {
    font-size: 0.8rem;
  }
}
.bar {
  display: grid;
  grid-template-columns: 50px 1fr 50px;
}

.bar-progress-container {
  display: block;
  height: 8px;
  position: relative;
  border-radius: 10px;
  .bar-progress {
    border-radius: 10px;
    position: absolute;
    display: block;
    height: 100%;
    left: 0;
    bottom: 0;
    background-color: #ffcc48;
  }
}

</style>
