<template>
  <v-container fluid class="pa-0">
    <v-row>
      <v-col cols="12">
        <v-expansion-panels class="mb-6">
          <v-expansion-panel
            elevation="0"
            rounded="lg"
            bg-color="transparent"
            color="red"
          >
            <v-expansion-panel-title expand-icon="add" color="white">
              <h3>
                {{ template.title }}
              </h3>
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <v-container class="pa-0" fluid>
                <v-row>
                  <v-col
                    cols="12"
                    :md="field.fullWidth ? 12 : 6"
                    v-for="field in template.fields"
                    :key="field.attributeName"
                  >
                    <component
                      :is="componentsMap[field.type]"
                      v-model="patch[field.attributeName]"
                      :label="field.title"
                      hide-details
                      variant="outlined"
                      density="compact"
                      color="accent"
                      inset
                      :items="field.enum"
                      :multiple="field.multiple"
                      :chips="field.multiple"
                      closable-chips
                      clearable
                      :menu-props="{ maxHeight: 300, eager: true }"
                      @update:modelValue="
                        () => emit('update:modelValue', patch)
                      "
                    />
                  </v-col>
                </v-row>
              </v-container>
            </v-expansion-panel-text>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { VTextField } from "vuetify/components/VTextField";
import { VTextarea } from "vuetify/components/VTextarea";
import { VSelect } from "vuetify/components/VSelect";
import { VAutocomplete } from "vuetify/components/VAutocomplete";
import { VCombobox } from "vuetify/components/VCombobox";
import { VSwitch } from "vuetify/components/VSwitch";
import { FieldsTemplate } from "../../../shared/types";

const { template, modelValue } = defineProps<{
  template: FieldsTemplate;
  modelValue: object | null;
}>();
const emit = defineEmits<{
  (e: "update:modelValue", val: object): void;
}>();

const { patch } = useEditState<object>(modelValue ?? {});

const componentsMap = {
  text: VTextField,
  textarea: VTextarea,
  select: VAutocomplete,
  boolean: VSwitch,
  customSelect: VCombobox,
};
</script>

<style lang="scss">
.v-expansion-panel-title {
  padding-right: 0 !important;
  padding-left: 0 !important;
}
.v-expansion-panel-title--active > .v-expansion-panel-title__overlay {
  background-color: transparent;
}
.v-expansion-panel-text__wrapper {
  padding: 0 0 !important;
}
</style>
