import { createVuetify, ThemeDefinition } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import { aliases, md } from "vuetify/iconsets/md";
import { en, de } from "vuetify/locale";

const customTheme: ThemeDefinition = {
  dark: false,
  colors: {
    background: "#FFFFFF",
    surface: "#FFFFFF",
    primary: "#2f2f2f",
    secondary: "#8a8a8a",
    "bg-secondary": "#f3f3f3",
    "secondary-darken-1": "#018786",
    error: "#EC7063",
    info: "#2196F3",
    success: "#58D68D",
    warning: "#FB8C00",
    accent: "#4246f5",
    // misc
    "slate-50": "#f8fafc",
    "slate-100": "#f1f5f9",
    "slate-200": "#e2e8f0",
    "slate-300": "#cbd5e1",
    "slate-400": "#94a3b8",
    "slate-500": "#64748B",
    "slate-600": "#475569",
    link: "#004cff",
    "link-hover": "#6600ff",
  },
};

export default defineNuxtPlugin((nuxtApp) => {
  const vuetify = createVuetify({
    ssr: true,
    locale: {
      locale: "de",
      fallback: "en",
      messages: { en, de },
    },
    icons: {
      defaultSet: "md",
      aliases,
      sets: {
        md,
      },
    },
    theme: {
      defaultTheme: "customTheme",
      themes: {
        customTheme,
      },
    },
    components,
    directives,
  });
  nuxtApp.vueApp.use(vuetify);
});
