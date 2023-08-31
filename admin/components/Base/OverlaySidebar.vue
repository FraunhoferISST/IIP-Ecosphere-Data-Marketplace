<template>
  <v-navigation-drawer
    v-model="computedShow"
    bottom
    temporary
    location="right"
    color="transparent"
    class="elevation-0"
    floating
    style="
      position: fixed;
      top: 0;
      right: 0;
      height: 100vh;
      z-index: 9999;
      width: 45vw;
      min-width: 375px;
    "
    :style="styles"
  >
    <div class="overlay-sidebar fill-height pa-4">
      <div class="overlay-sidebar-content fill-height d-flex flex-column">
        <div class="pa-4">
          <slot name="close" :close="close">
            <v-btn icon="close" color="error" variant="text" @click="close">
            </v-btn>
          </slot>
        </div>
        <slot></slot>
      </div>
    </div>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
const { show, styles = {} } = defineProps<{
  show: boolean;
  styles?: object;
}>();
const emit = defineEmits(["update:show"]);
const computedShow = computed({
  get: () => show,
  set: (val) => emit("update:show", val),
});
const close = () => {
  computedShow.value = false;
};
</script>

<style scoped lang="scss">
.overlay-sidebar-content {
  border-radius: $b-radius;
  background-color: $bg;
  max-height: 100% !important;
  overflow-y: auto;
  //min-width: 700px;
}
</style>
