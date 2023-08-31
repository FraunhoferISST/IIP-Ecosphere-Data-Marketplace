<template>
  <div>
    <LazyHydrate when-visible>
      <div>
        <TopBar class="desktop-only" />
      </div>
    </LazyHydrate>

    <AppHeader />

    <div id="layout">
      <nuxt :key="route.fullPath"/>

      <BottomNavigation />
      <CartSidebar />
      <WishlistSidebar />
      <LoginModal />
      <Notification />
    </div>
    <LazyHydrate when-visible>
      <AppFooter />
    </LazyHydrate>
  </div>
</template>

<script>
import AppHeader from "~/components/AppHeader.vue";
import BottomNavigation from "~/components/BottomNavigation.vue";
import AppFooter from "~/components/AppFooter.vue";
import TopBar from "~/components/TopBar.vue";
import CartSidebar from "~/components/CartSidebar.vue";
import WishlistSidebar from "~/components/WishlistSidebar.vue";
import LoginModal from "~/components/LoginModal.vue";
import LazyHydrate from "vue-lazy-hydration";
import Notification from "~/components/Notification";
import { onSSR } from "@vue-storefront/core";
import { useRoute } from "@nuxtjs/composition-api";
import {useCart, useShop, useUser, useWishlist} from "@vue-storefront/iiepmarket";

export default {
  name: "DefaultLayout",

  components: {
    LazyHydrate,
    TopBar,
    AppHeader,
    BottomNavigation,
    AppFooter,
    CartSidebar,
    WishlistSidebar,
    LoginModal,
    Notification,
  },

  setup() {
    const route = useRoute();
    const { load: loadUser } = useUser();
    const { shop, load: loadShop } = useShop();
    const { cart, load: loadCart } = useCart();
    const { load: loadWishlist } = useWishlist();

    onSSR(async () => {
      await Promise.all([
        loadUser(),
        loadCart.execute(),
        loadWishlist(),
        loadShop.execute()
      ]);
    });

    return {
      cart,
      route,
      loadUser,
      shop,
    };
  },
};
</script>

<style lang="scss">
@tailwind base;
@tailwind components;
@tailwind utilities;
@import "~@storefront-ui/vue/styles";

#layout {
  box-sizing: border-box;
  @include for-desktop {
    max-width: 1240px;
    margin: auto;
  }
}

.no-scroll {
  overflow: hidden;
  height: 100vh;
}

// Reset CSS
html {
  width: auto;
  @include for-mobile {
    overflow-x: hidden;
  }
}
body {
  overflow-x: hidden;
  color: var(--c-text);
  font-size: var(--font-size--base);
  font-family: var(--font-family--primary);
  margin: 0;
  padding: 0;
}
a {
  text-decoration: none;
  color: var(--c-link);
  &:hover {
    color: var(--c-link-hover);
  }
}
h1 {
  font-family: var(--font-family--secondary);
  font-size: var(--h1-font-size);
  line-height: 1.6;
  margin: 0;
}
h2 {
  font-family: var(--font-family--secondary);
  font-size: var(--h2-font-size);
  line-height: 1.6;
  margin: 0;
}
h3 {
  font-family: var(--font-family--secondary);
  font-size: var(--h3-font-size);
  line-height: 1.6;
  margin: 0;
}
h4 {
  font-family: var(--font-family--secondary);
  font-size: var(--h4-font-size);
  line-height: 1.6;
  margin: 0;
}
</style>
