<template>
  <div>
    <SfTabs>
      <SfTab title="My inquiries">
        <div v-if="createMode">
          <h4 class="mb-6">
            Create new inquiry
          </h4>
          <inquiry-form :inquiry.sync="newInquiry" @submit="createInquiry">
            <template #action>
              <SfButton class="btn color-light ml-6" @click="createMode = false">Cancel</SfButton>
              <SfButton type="submit" :loading="create.loading.value" id="form-create-inquiry">
                {{ $t("Create inquiry") }}
              </SfButton>
            </template>
          </inquiry-form>
          <SfAlert type="danger" v-if="create.error.value">
            <template #message>
              <p class="pl-4">
                {{create.error.value.message}}
              </p>
            </template>
          </SfAlert>
        </div>
        <div v-else-if="currentInquiry">
          <SfButton class="sf-button--text all-orders mb-10" @click="currentInquiry = null">Back</SfButton>
          <inquiry-details :inquiry="currentInquiry"/>
        </div>
        <div v-else>
          <div class="flex justify-center pb-10" style="border-bottom: 2px solid rgb(241 245 249)">
            <SfButton @click="createMode = true" id="create-inquiry">{{ $t("Create new inquiry") }}</SfButton>
          </div>
          <div v-if="inquiries.length === 0" class="no-orders">
            <p class="no-orders__title">You currently have no inquiries.</p>
          </div>
          <div id="account-inquiries">
            <inquiry-card v-for="inquiry in inquiries" :key="inquiry._id" :inquiry="inquiry">
              <template #action>
                <SfButton class="btn color-light" @click="currentInquiry = inquiry">{{ $t("View details") }}</SfButton>
              </template>
            </inquiry-card>
          </div>
        </div>
      </SfTab>
    </SfTabs>
  </div>
</template>

<script>
import {
  SfTabs,
  SfTable,
  SfButton,
  SfProperty,
  SfModal,
  SfAlert,
  SfLink
} from "@storefront-ui/vue";
import { ref } from "@nuxtjs/composition-api";
import {useAccountInquiries} from "@vue-storefront/iiepmarket";
import OrderDetails from "@/components/MyAccount/OrderDetails";
import InquiryCard from "~/components/Inquiries/InquiryCard";
import InquiryDetails from "~/components/MyAccount/InquiryDetails";
import InquiryForm from "~/components/Inquiries/InquiryForm";

export default {
  name: "Inquiries",
  components: {
    InquiryForm,
    InquiryDetails,
    InquiryCard,
    OrderDetails,
    SfTabs,
    SfTable,
    SfButton,
    SfProperty,
    SfLink,
    SfAlert,
    SfModal,
  },
  setup() {
    const { inquiries, load, create } = useAccountInquiries();

    const currentInquiry = ref(null);
    const createMode = ref(false);
    const newInquiry = ref({
      title: "New inquiry",
      published: true,
    });

    load.execute({});

    return {
      createMode,
      newInquiry,
      inquiries,
      currentInquiry,
      create,
      createInquiry: () => create.execute(newInquiry.value)
        .then(() => load.execute())
        .then(() => createMode.value = false)
        .catch(() => {}),
    };
  },
};
</script>

<style lang='scss' scoped>
.property {
  margin: 10px;
}
</style>
