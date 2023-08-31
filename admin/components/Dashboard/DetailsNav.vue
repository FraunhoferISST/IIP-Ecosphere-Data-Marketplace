<template>
  <nav class="details-navigation d-flex">
    <div
      class="details-navigation-item px-2"
      :style="{ height: height }"
      :class="{ active: p.toLowerCase() === page.toLowerCase() }"
      v-for="p in pages"
      :key="p"
      @click="() => setPage(p)"
    >
      <span>
        {{ p }}
      </span>
    </div>
  </nav>
</template>

<script setup lang="ts">
const {
  pages = [],
  page = "",
  height = "",
} = defineProps<{
  pages: string[];
  page?: string;
  height?: string;
}>();

const emit = defineEmits(["update:page"]);

const computedPage = computed<string>({
  get: () => page,
  set: (val) => emit("update:page", val),
});

const setPage = (p) => (computedPage.value = p);
</script>

<style scoped lang="scss">
.details-navigation-item {
  transition: 0.3s;
  position: relative;
  color: $text-slate-500;
  cursor: pointer;
  &:after {
    opacity: 0.4;
    transition: 0.3s;
    content: "";
    display: block;
    width: 0;
    height: 3px;
    left: 0;
    right: 0;
    margin: auto;
    position: absolute;
    bottom: 0;
    background-color: $accent;
    border-radius: 5px 5px 0 0;
  }
  &:hover {
    &:after {
      height: 3px;
      width: 80%;
    }
  }
  &.active {
    color: $color_primary;
    font-weight: bold;
    &:after {
      width: 80%;
      opacity: 1;
      height: 3px;
    }
  }
}
</style>
