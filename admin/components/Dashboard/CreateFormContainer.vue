<template>
  <v-row class="fill-height" align="center">
    <v-col cols="12">
      <v-row>
        <v-col cols="12">
          <slot name="heading"></slot>
        </v-col>
        <v-col cols="12">
          <card padding="pa-0 pa-md-4">
            <div class="create-form-container">
              <div class="create-content pa-4 pa-md-16">
                <slot name="form"></slot>
              </div>
              <div class="pa-4 pa-md-16">
                <h3 class="d-none d-md-block mb-4">
                  <slot name="title"></slot>
                </h3>
                <p class="mb-10 d-none d-md-block">
                  <slot name="body"></slot>
                </p>
                <slot name="action">
                  <v-btn
                    size="x-large"
                    color="primary"
                    block
                    variant="flat"
                    rounded="lg"
                    @click="emitCreate"
                  >
                    Create
                  </v-btn>
                </slot>
                <v-alert class="ma-0 mt-4" v-if="error" color="error">
                  {{ error }}
                </v-alert>
              </div>
            </div>
          </card>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import Card from "~/components/Base/Card.vue";

defineProps<{
  error?: object | undefined;
}>();
const emit = defineEmits(["create"]);
const emitCreate = () => emit("create");
</script>

<style scoped lang="scss">
.create-form-container {
  display: grid;
  grid-template-columns: 1fr 400px;
}
.create-content {
  background-color: $bg;
  border-radius: $b-radius;
}

@media screen and (max-width: 959px) {
  .create-form-container {
    display: block;
  }
}
</style>
