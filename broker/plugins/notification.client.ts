import Toast, { PluginOptions, POSITION } from "vue-toastification";
// Import the CSS or use your own!
import "vue-toastification/dist/index.css";

const options: PluginOptions = {
  position: POSITION.TOP_LEFT,
};

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(Toast, options);
});
