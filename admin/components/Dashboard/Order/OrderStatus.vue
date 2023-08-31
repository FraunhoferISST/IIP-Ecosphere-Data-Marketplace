<template>
  <div class="status-timeline d-flex">
    <div
      class="__item-container position-relative"
      :class="{ 'text-center': item.id > 0, 'flex-grow-1': !isLast(item.id) }"
      v-for="item in items"
      :key="item.id"
    >
      <div class="d-flex align-center">
        <div
          class="__item d-flex justify-center align-center"
          :class="{ __done: item.id <= lastDoneId }"
          :style="{
            height: size,
            width: size,
            borderRadius: size,
            ...(item.id <= lastDoneId && isSelectedStyle),
          }"
        >
          <v-icon
            :color="item.id <= lastDoneId ? doneColor : '#cbd5e1ff'"
            size="30px"
          >
            {{ item.icon }}
          </v-icon>
        </div>
        <div
          class="__connector flex-grow-1"
          v-if="items.length > 1 && item.id < items.length - 1"
          :style="item.id < lastDoneId && isSelectedStyle"
        ></div>
      </div>
      <div
        class="__legend position-absolute text-center"
        :style="{ width: '100%', width: size }"
        :class="{ __done: item.id === lastDoneId }"
      >
        <span class="d-block mt-2">
          {{ item.title }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { useTheme } from "vuetify";
type Props = {
  items: {
    id: number;
    title: string;
    icon: string;
    done: boolean;
  }[];
  size?: string;
};
const { items, size = "40px" } = defineProps<Props>();
const doneColor = ref<string>(
  useTheme().computedThemes.value.customTheme.colors.accent
);
const lastDoneId = computed<number>(
  () => items.filter(({ done }) => done).slice(-1)[0].id
);
const isSelectedStyle = computed<object>(() => ({
  "border-color": doneColor.value,
}));

const isLast = (id: number) => id === items.length - 1;
</script>

<style scoped lang="scss">
.status-timeline {
  .__legend {
    transition: opacity 0.3s;
    opacity: 0;
    font-size: 0.7rem;
    &.__done {
      opacity: 1 !important;
    }
  }
  .__item-container {
    &:hover {
      .__legend {
        opacity: 1;
      }
    }
  }
  .__item {
    border: 2px solid #cbd5e1ff;
  }
  .__connector {
    height: 0px;
    //width: 15px;
    border: 1px solid #cbd5e1ff;
  }
}
</style>
