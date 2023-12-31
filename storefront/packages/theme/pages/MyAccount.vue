<template>
  <div id="my-account">
    <SfBreadcrumbs
      class="breadcrumbs desktop-only"
      :breadcrumbs="breadcrumbs"
    />
    <SfContentPages
      v-e2e="'my-account-content-pages'"
      title="My Account"
      :active="activePage"
      class="my-account"
      @click:change="changeActivePage"
    >
      <SfContentCategory title="Personal Details">
        <SfContentPage title="My profile">
          <MyProfile />
        </SfContentPage>

        <SfContentPage title="Billing details">
          <BillingDetails />
        </SfContentPage>

        <SfContentPage title="Order history">
          <OrderHistory />
        </SfContentPage>
        <SfContentPage title="My inquiries">
          <Inquiries/>
        </SfContentPage>
      </SfContentCategory>

      <SfContentPage title="Log out" />
    </SfContentPages>
  </div>
</template>
<script>
import { SfBreadcrumbs, SfContentPages } from "@storefront-ui/vue";
import { computed, useRoute, useRouter, ref } from "@nuxtjs/composition-api";
import { useUser } from "@vue-storefront/iiepmarket";
import MyProfile from "./MyAccount/MyProfile";
import ShippingDetails from "./MyAccount/ShippingDetails";
import BillingDetails from "./MyAccount/BillingDetails";
import MyNewsletter from "./MyAccount/MyNewsletter";
import OrderHistory from "./MyAccount/OrderHistory";
import Inquiries from "~/pages/MyAccount/Inquiries";

export default {
  name: "MyAccount",
  components: {
    Inquiries,
    SfBreadcrumbs,
    SfContentPages,
    MyProfile,
    ShippingDetails,
    BillingDetails,
    MyNewsletter,
    OrderHistory,
  },
  middleware: [
    "is-authenticated"
  ],
  setup(props, context) {
    const route = useRoute();
    const router = useRouter();

    const { logout } = useUser();
    const isMobile = ref(false);
    const activePage = computed(() => {
      const { pageName } = route.value.params;

      if (pageName) {
        return (pageName.charAt(0).toUpperCase() + pageName.slice(1)).replace("-", " ");
      } else if (!isMobile.value) {
        return "My profile";
      } else {
        return "";
      }
    });

    const changeActivePage = async (title) => {
      if (title === "Log out") {
        await logout();
        router.push(context.root.localePath({ name: "home" }));
        return;
      }

      const slugifiedTitle = (title || "").toLowerCase().replace(" ", "-");
      const transformedPath = `/my-account/${slugifiedTitle}`;
      const localeTransformedPath = context.root.localePath(transformedPath);

      router.push(localeTransformedPath);
    };

    return { changeActivePage, activePage };
  },

  data() {
    return {
      breadcrumbs: [
        {
          text: "Home",
          route: { link: "#" },
        },
        {
          text: "My Account",
          route: { link: "#" },
        }
      ],
    };
  },
};
</script>

<style lang='scss'>
#my-account {
  box-sizing: border-box;
  @include for-desktop {
    max-width: 1240px;
    margin: 0 auto;
  }
}
.my-account {
  height: auto!important;
  .sf-content-pages__content {
    height: auto!important;
  }
  @include for-mobile {
    --content-pages-sidebar-category-title-font-weight: var(
      --font-weight--normal
    );
    --content-pages-sidebar-category-title-margin: var(--spacer-sm)
      var(--spacer-sm) var(--spacer-sm) var(--spacer-base);
  }
  @include for-desktop {
    --content-pages-sidebar-category-title-margin: var(--spacer-xl) 0 0 0;
  }
}
.breadcrumbs {
  margin: var(--spacer-base) 0 var(--spacer-lg);
}
</style>
