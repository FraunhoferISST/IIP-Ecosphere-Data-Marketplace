import { cookiesNames } from "~/helpers/cookies";

export default defineNuxtRouteMiddleware(async (to) => {
  if (to.name !== "login") {
    const { $api, $cookies } = useNuxtApp();
    const authToken = $cookies.get(cookiesNames.userTokenCookieName);
    const navigateToLogin = () =>
      useRoute().name !== "login" &&
      navigateTo({
        name: "login",
      });
    if (!authToken) {
      console.log("REDIRECTING to LOGIN");
      return navigateToLogin();
    }
    try {
      const user = await $api.handle("getViewer");
      if (!user) {
        console.log("REDIRECTING to LOGIN BECAUSE OF USER");
        return navigateToLogin();
      }
    } catch {
      console.log("REDIRECTING to LOGIN BECAUSE OF USER LOAD ERROR");
      try {
        navigateToLogin();
      } catch (e) {
        console.error("WFT", e);
      }
    }
  }
});
