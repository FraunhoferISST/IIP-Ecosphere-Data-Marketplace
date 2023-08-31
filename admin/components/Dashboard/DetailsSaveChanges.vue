<template>
  <div
    class="details-save-changes"
    :class="{ 'has-changes': show }"
    :style="{ paddingLeft: smAndDown ? '0px' : '280px' }"
  >
    <v-container class="" fluid>
      <div
        class="details-save-changes-container pa-4 pa-md-10 d-flex justify-end"
      >
        <v-btn
          variant="tonal"
          rounded="lg"
          color="primary"
          @click="emitDiscard"
        >
          discard
        </v-btn>
        <slot :close="close">
          <v-btn
            class="ml-4"
            flat
            color="success"
            variant="flat"
            rounded="lg"
            @click="emitSave"
          >
            Save changes
          </v-btn>
        </slot>
      </div>
    </v-container>
  </div>
</template>

<script setup lang="ts">
import { useDisplay } from "vuetify";

const { show = true } = defineProps<{
  show: boolean;
}>();
const emit = defineEmits(["update:show", "discard", "save"]);

const { smAndDown } = useDisplay();

const computedShow = computed<boolean>({
  get: () => show,
  set: (val) => emit("update:show", val),
});

const close = () => (computedShow.value = false);
const emitDiscard = () => emit("discard");
const emitSave = () => emit("save");
</script>

<style scoped lang="scss">
.details-save-changes {
  z-index: 1999;
  transition: 0.3s;
  position: fixed;
  left: 0;
  width: 100%;
  top: -150px;
  &.has-changes {
    top: 0;
  }
}
.details-save-changes-container {
  backdrop-filter: blur(3px);
  background-color: rgba($accent, 0.1);
  border-radius: $b-radius;
}
</style>
