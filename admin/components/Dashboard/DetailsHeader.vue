<template>
  <div
    class="details-heading pb-0 pb-md-10 d-block d-md-flex justify-space-between"
  >
    <div class="text-truncate">
      <slot name="heading">
        <section-heading class="text-truncate">
          {{ title }}
        </section-heading>
        <span class="asset-id d-none d-md-inline-block">
          {{ id }}
        </span>
      </slot>
    </div>
    <div class="d-flex justify-end">
      <nav class="details-navigation d-flex">
        <div
          class="details-navigation-item px-2"
          :class="{ active: p === page }"
          v-for="p in pages"
          :key="p"
          @click="() => setPage(p)"
        >
          <span>
            {{ p }}
          </span>
        </div>
      </nav>
      <slot name="action"> </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import SectionHeading from "~/components/Base/SectionHeading.vue";

const {
  title,
  id = "",
  pages = [],
  page = "",
} = defineProps<{
  title: string;
  id?: string;
  pages?: string[];
  page?: string;
}>();

const emit = defineEmits(["update:page"]);

const computedPage = computed<string>({
  get: () => page,
  set: (val) => emit("update:page", val),
});

const setPage = (p) => (computedPage.value = p);
</script>

<style scoped lang="scss">
.details-heading {
  height: 100px;
}
.asset-id {
  color: $text-slate-400;
  font-size: 0.75rem;
  position: relative;
  top: -10px;
  margin-left: 75px;
}
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
@media screen and (max-width: 959px) {
  .details-heading {
    height: unset;
  }
}
</style>
