<template>
  <div>
    <inquiry-form :inquiry.sync="state" @submit="handleSubmit"/>
    <SfAlert type="info" v-if="updated && !update.error.value && !update.loading.value">
      <template #message>
        <p class="pl-4">
          Successfully updated!
        </p>
      </template>
    </SfAlert>
    <SfAlert type="danger" v-if="update.error.value">
      <template #message>
        <p class="pl-4">
          {{update.error.value}}
        </p>
      </template>
    </SfAlert>
    <div class="mt-10">
      <b>
        {{inquiry.repliesCount}} repl{{ inquiry.repliesCount === 1 ? "y" : "ies" }}
      </b>
      <div class="bg-slate-100 mt-5" style="height: 2px"></div>
    </div>
    <div>
      <inquiry-replies class="mt-10" v-for="reply in inquiry.replies" :key="reply._id" :reply="reply" :inquiry-id="inquiry._id"/>
    </div>
  </div>
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
import {ref} from "@nuxtjs/composition-api";
import InquiryReplies from "@/components/MyAccount/InquiryReplies";
import InquiryForm from "~/components/Inquiries/InquiryForm";

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
  name: "InquiryDetails",
  components: {
    InquiryForm,
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
  setup(props) {
    const { update } = useInquiry(props.inquiry._id);
    const updated = ref(false);
    const state = ref({ ...props.inquiry });
    return {
      state,
      update,
      updated,
      properties: [
        {
          title: "Title",
          property: "title",
        },
        {
          title: "Description",
          property: "description",
        },
        {
          title: "Use case",
          property: "useCase",
        },
        {
          title: "Source types (coma separated)",
          property: "sourceTypes",
        },
        {
          title: "categories (coma separated)",
          property: "categories",
        },
        {
          title: "expectedConsumptionVolume",
          property: "expectedConsumptionVolume",
        },
        {
          title: "Desired pricing",
          property: "desiredPricing",
        }
      ],
      handleSubmit: () => update.execute(state.value).then(() => updated.value = true),
    };
  },
};
</script>

<style scoped lang="scss">
</style>
