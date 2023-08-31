<template>
  <v-card
    class="pa-4 pt-md-10 px-md-10 elevation-0 banner-card"
    color="bg-secondary"
    :class="{ 'pb-md-10': !$slots.nav }"
  >
    <div class="py-0">
      <v-card-header class="pa-0">
        <div style="max-width: 100%">
          <div class="text-overline text-slate-500">
            <slot name="overline"> {{ overline }} </slot>
          </div>
          <div class="d-flex">
            <div>
              <div class="text-h2">
                <slot name="headline"> {{ headline }} </slot>
              </div>
              <div class="text-caption text-slate-600">
                <slot name="caption"> {{ caption }} </slot>
              </div>
            </div>
            <div>
              <slot name="content"></slot>
            </div>
          </div>
        </div>
      </v-card-header>
      <div>
        <slot name="action"> </slot>
      </div>
    </div>
    <div class="pt-10" v-if="$slots.nav">
      <slot name="nav"><p>nav</p></slot>
    </div>
  </v-card>
</template>

<script>
export default {
  name: "Banner",
  props: {
    overline: {
      type: String,
      default: "",
    },
    headline: {
      type: String,
      default: "",
    },
    caption: {
      type: String,
      default: "",
    },
  },
};
</script>

<style scoped lang="scss">
.banner-card {
  border-radius: $b-radius !important;
  .text-overline {
    font-size: 0.8rem !important;
    font-family: "Khula", sans-serif;
  }
  .text-h2 {
    font-family: "Khula", sans-serif !important;
    font-weight: 700;
    font-size: 2.1rem !important;
  }
  .text-caption {
    font-family: "Khula", sans-serif !important;
    font-size: 1rem !important;
  }
}
</style>
