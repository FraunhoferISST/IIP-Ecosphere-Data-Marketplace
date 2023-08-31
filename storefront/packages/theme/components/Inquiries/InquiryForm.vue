<template>
  <form @submit.prevent="handleSubmit">
    <SfInput
      v-for="prop in properties"
      :key="prop.property"
      :name="prop.id"
      v-model="state[prop.property]"
      :label="prop.title"
      class="form__element form__element--half my-2"
    />
    <div class="flex justify-end items-center gap-x-4">
      <SfCheckbox
        label="Publish"
        valid
        v-model="state.published"
      />
      <slot name="action">
        <SfButton
          class="form__action-button"
          type="submit"
        >
          {{ $t("Update inquiry") }}
        </SfButton>
      </slot>
    </div>
  </form>
</template>

<script>
import {
  SfInput,
  SfSelect,
  SfButton,
  SfCheckbox,
  SfProperty,
  SfLink,
  SfAlert,
  SfIcon
} from "@storefront-ui/vue";
import {useInquiry} from "@vue-storefront/iiepmarket";
import { required, min, digits } from "vee-validate/dist/rules";
import { ValidationProvider, ValidationObserver, extend } from "vee-validate";
import {ref, watch} from "@nuxtjs/composition-api";
import InquiryReplies from "@/components/MyAccount/InquiryReplies";

extend("required", {
  ...required,
  message: "This field is required",
});
extend("min", {
  ...min,
  message: "The field should have at least {length} characters",
});
extend("digits", {
  ...digits,
  message: "Please provide a valid phone number",
});

export default {
  name: "InquiryForm",
  components: {
    InquiryReplies,
    SfInput,
    SfSelect,
    SfButton,
    SfProperty,
    SfLink,
    SfAlert,
    SfIcon,
    ValidationProvider,
    ValidationObserver,
    SfCheckbox,
  },
  props: {
    inquiry: {
      type: Object,
      required: true,
    },
  },
  setup(props, { emit }) {
    const { update } = useInquiry(props.inquiry._id);

    const updated = ref(false);
    const state = ref({
      ...props.inquiry,
      sourceTypes: props.inquiry.sourceTypes?.join(",") ?? "",
      categories: props.inquiry.categories?.join(",") ?? "",
    });

    watch(state.value, () => {
      emit("update:inquiry", {
        ...state.value,
        sourceTypes: (state.value.sourceTypes?.split(",") ?? []).filter(v => Boolean(v?.trim())),
        categories: (state.value.categories?.split(",") ?? []).filter(v => Boolean(v?.trim())),
      });
    });

    return {
      state,
      update,
      updated,
      properties: [
        {
          title: "Title",
          property: "title",
          id: "title",
        },
        {
          title: "Description",
          property: "description",
          id: "description",
        },
        {
          title: "Use case",
          property: "useCase",
          id: "useCase",
        },
        {
          title: "Source types (coma separated)",
          property: "sourceTypes",
          id: "sourceTypes",
        },
        {
          title: "Categories (coma separated)",
          property: "categories",
          id: "categories",
        },
        {
          title: "Expected consumption volume",
          property: "expectedConsumptionVolume",
          id: "expectedConsumptionVolume",
        },
        {
          title: "Desired pricing",
          property: "desiredPricing",
          id: "desiredPricing",
        }
      ],
      handleSubmit: () => emit("submit"),
    };
  },
};
</script>

<style scoped lang="scss">
</style>
