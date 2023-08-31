<template>
  <div>
    <SfProperty
      name="Name"
      :value="userGetters.getFullName(user)"
      class="product__property my-3"
    >
    </SfProperty>
    <SfProperty
      name="Email"
      :value="userGetters.getEmailAddress(user)"
      class="product__property my-3"
    >
    </SfProperty>
  </div>
</template>

<script>
import {
  SfProperty
} from "@storefront-ui/vue";
import { useUser, userGetters } from "@vue-storefront/iiepmarket";
export default {
  name: "ProfileUpdateForm",
  components: {
    SfProperty,
  },
  setup() {
    const { user } = useUser();
    return {
      user,
      userGetters,
    };
  },
};
</script>
