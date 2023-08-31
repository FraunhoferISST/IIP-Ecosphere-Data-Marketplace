<template>
  <h2 class="section-heading">
    <slot name="arrow" :go-back="goBack">
      <v-btn
        v-if="showBackButton"
        class="mr-2 mr-md-6"
        flat
        icon="arrow_back"
        @click="goBack"
      />
    </slot>
    <slot :go-back="goBack">
      {{ text }}
    </slot>
  </h2>
</template>

<script>
export default {
  name: "SectionHeading",
  props: {
    text: {
      type: String,
      default: "",
    },
    showBackButton: {
      type: Boolean,
      default: true,
    },
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
  },
};
</script>

<style scoped lang="scss">
.section-heading {
  font-size: 2.1rem;
}
@media screen and (max-width: 959px) {
  .section-heading {
    font-size: 1.5rem;
  }
}
</style>
