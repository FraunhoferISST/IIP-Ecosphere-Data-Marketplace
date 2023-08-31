import { computed, ref, watch } from "vue";
import { useDisplay } from "vuetify";
import type { Ref, ComputedRef } from "vue";
import type { NavItem } from "@/types";

interface NavigationComposable {
  readonly navItems: Ref<NavItem[]>;
  readonly sideNavState: ComputedRef<boolean>;
  toggleSideNav(): void;
}

const sideNav = ref<boolean>(true);

export const useNavigation = (): NavigationComposable => {
  const { smAndDown } = useDisplay();
  sideNav.value = !smAndDown.value;

  watch(smAndDown, () => {
    sideNav.value = !smAndDown.value;
  });

  const navItems = ref<Array<NavItem>>([
    {
      title: "Overview",
      path: "/overview",
      icon: "dashboard",
    },
    {
      title: "Shop",
      path: "/shop/overview",
      icon: "store",
    },
    {
      title: "Assets",
      path: "/assets",
      icon: "article",
    },
    {
      title: "Accounts",
      path: "/accounts",
      icon: "manage_accounts",
    },
    {
      title: "Orders",
      path: "/orders",
      icon: "shopping_basket",
    },
    {
      title: "Reviews",
      path: "/reviews",
      icon: "feedback",
    },
    {
      title: "Inquiries",
      path: "/inquiries",
      icon: "manage_search",
    },
  ]);

  const toggleSideNav = (): void => {
    sideNav.value = !sideNav.value;
  };
  return {
    navItems,
    sideNavState: computed(() => sideNav.value),
    toggleSideNav,
  };
};
