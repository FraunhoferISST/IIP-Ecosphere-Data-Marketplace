export default defineNuxtRouteMiddleware((to) => {
  if (
    to.name !== "index-shop" &&
    useRoute().name !== "index-shop" &&
    useRoute().name !== "index-login"
  ) {
    const { $cookies } = useNuxtApp();
    const shopId = $cookies.get("vsf-shop");
    const navigateToShop = () =>
      navigateTo({
        name: "index-shop",
      });
    if (!shopId) {
      navigateToShop();
    }
  }
});
