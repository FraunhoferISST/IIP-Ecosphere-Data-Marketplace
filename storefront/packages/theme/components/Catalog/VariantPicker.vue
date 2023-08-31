<template>
  <div class="variant-selector">
    <div  v-for="variant in variants" :key="variant._id" >
      <SfLink :link="getVariantLink(variant)" class="decoration-transparent">
        <div class="transition flex flex-row gap-4 p-3 hover:bg-slate-50 cursor-pointer"
             :class="{'bg-slate-100': selected === getName(variant)}">
          <div class="w-full">
            <h5 class="mt-0 mb-1 flex flex-row justify-between">
              {{ variant.title}}
              <span>{{ variant.pricing.displayPrice}}</span>
            </h5>
            <div>
              <span class="text-xs text-slate-500 decoration-transparent">
                {{ variant.optionTitle}}
              </span>
            </div>
          </div>
        </div>
      </SfLink>
    </div>
  </div>
</template>
<script>
import {SfLink} from "@storefront-ui/vue";
import EntityAvatar from "@/components/Base/EntityAvatar";
import {productGetters} from "@vue-storefront/iiepmarket";
export default {
  name: "VariantPicker",
  components: {
    EntityAvatar,
    SfLink,
  },
  props: {
    variants: {
      type: Array,
      required: true,
    },
    selected: {
      type: String,
      default: "",
    },
  },
  setup() {
    return {
      getVariantLink: (variant) => `/p/${variant._id}/${variant.slug}`,
      ...productGetters,
    };
  },
};
</script>

<style scoped>

</style>
