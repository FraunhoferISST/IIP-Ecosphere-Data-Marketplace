import ElementPlus from 'unplugin-element-plus/vite'
import IconsResolver from "unplugin-icons/resolver";
import Components from "unplugin-vue-components/vite";

export default defineNuxtConfig({
    app: {
        baseURL: process.env.NUXT_BROKER_APP_BASE_URL ?? "",
        //buildAssetsDir: process.env.NUXT_BROKER_APP_BASE_URL + "/_nuxt/"  ?? "/_nuxt/",
        head: {
            charset: 'utf-16',
            title: 'IIPE Marketplace broker',
            meta: [
                { name: 'description', content: `IIP-Ecosphere Marketplace broker connecting several trusted marketplaces` }
            ],
            link: [{ rel: "icon", type: "image/png", href: "/favicon.png" }],
        }
    },
    build: {
        transpile: ['element-plus/es'],
    },
    runtimeConfig: {
        knownNodesConfig:
            process.env.NUXT_KNOWN_NODES_CONFIG || `
                [
                  {
                    "apiEndpoint": "http://localhost:3000/graphql",
                    "storefront": "http://localhost:8080"
                  }
                ]
                `,
        brokerApiEndpoint: process.env.NUXT_BROKER_API_ENDPOINT || "http://localhost:4000/api/",
        public: {
            frontendBaseUrl:
                process.env.NUXT_BROKER_FRONTEND_BASE_URL || "http://localhost:4000",
        },
    },
    modules: [
        "@vueuse/nuxt",
        "unplugin-icons/nuxt",
    ],
    css: ['~/assets/styles/main.scss'],
    postcss: {
        plugins: {
            tailwindcss: {},
            autoprefixer: {},
        },
    },
    vite: {
        vue: {
            reactivityTransform: true,
        },
        plugins: [ElementPlus(),
            Components({
                dts: true,
                resolvers: [IconsResolver({})],
            }),],
    },
})
