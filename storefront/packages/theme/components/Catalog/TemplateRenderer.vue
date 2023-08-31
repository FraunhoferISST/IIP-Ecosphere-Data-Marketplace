<template>
  <div v-if="hasValues">
    <h4 class="text-sm">{{ template.title}}</h4>
    <div class="block md:grid grid-cols-2 mt-5 gap-x-4">
      <div v-for="field in fields" :key="field.attributeName">
        <SfProperty
          v-if="getValue(field.attributeName)"
          :name="field.title"
          :value="getValue(field.attributeName)"
          class="product__property my-3"
        >
        </SfProperty>
      </div>
    </div>
  </div>
</template>

<script>
import {
  SfProperty,
  SfHeading
} from "@storefront-ui/vue";
import {computed} from "@nuxtjs/composition-api";
export default {
  name: "TemplateRenderer",
  components: {SfProperty, SfHeading},
  props: {
    template: {
      type: Object,
      required: true,
    },
    item: {
      type: Object,
      required: true,
    },
  },
  setup(props) {

    const templateFields = props.item.templatesFields?.[props.template.id];
    const hasValues = computed(() => Object.keys(templateFields ?? {}).length > 0);

    const getValue = (attributeName) => {
      const rawValue = templateFields[attributeName] ?? "";
      if (Array.isArray(rawValue)) {
        return rawValue.join(", ");
      }
      return rawValue;
    };

    return {
      fields: computed(() => props.template.fields.filter(field => field.attributeName in templateFields)),
      getValue,
      hasValues,
    };
  },
};
</script>

<style scoped>

</style>
