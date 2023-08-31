//  import webpack from 'webpack';

export default {
  server: {
    port: process.env.SF_PORT ?? 8080,
    host: '0.0.0.0'
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'IIPE Marketplace',
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},
      {hid: 'description', name: 'description', content: process.env.npm_package_description || ''}
    ],
    link: [
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: '/favicon.png'
      },
      {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com',
        crossorigin: 'crossorigin'
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css?family=Raleway:300,400,400i,500,600,700|Roboto:300,300i,400,400i,500,700&display=swap'
      }
    ]
  },

  loading: {color: '#fff'},

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    {
      src: '~/plugins/veProgress.js',
      mode: 'client'
    },
    {
      src: '~/plugins/starRating.js',
      mode: 'client'
    }
  ],

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // to core
    '@nuxtjs/composition-api/module',
    '@pinia/nuxt',
    '@nuxt/typescript-build',
    '@nuxtjs/style-resources',
    ['@vue-storefront/nuxt', {
      // @core-development-only-start
      coreDevelopment: true,
      // @core-development-only-end
      useRawSource: {
        dev: [
          '@vue-storefront/iiepmarket',
          '@vue-storefront/core'
        ],
        prod: [
          '@vue-storefront/iiepmarket',
          '@vue-storefront/core'
        ]
      },
      logger: {
        verbosity: process.env.NODE_ENV === "production" ? "error" : "debug"
      }
    }],
    // @core-development-only-start
    ['@vue-storefront/nuxt-theme', {
      generate: {
        replace: {
          apiClient: '@vue-storefront/iiepmarket-api',
          composables: '@vue-storefront/iiepmarket'
        }
      }
    }],
    // @core-development-only-end
    /* project-only-start
    ['@vue-storefront/nuxt-theme'],
    project-only-end */
    ['@vue-storefront/iiepmarket/nuxt', {}],
    '@nuxt/postcss8',
  ],

  css: [
    '~assets/styles/main.scss',
    "~assets/styles/colors.scss",
    "~assets/styles/common.scss"
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    ['nuxt-i18n', {
      baseUrl: process.env.BASE_URL || 'http://localhost:8080'
    }],
    'cookie-universal-nuxt',
    'vue-scrollto/nuxt',
    '@vue-storefront/middleware/nuxt'
  ],

  i18n: {
    currency: 'USD',
    country: 'US',
    countries: [
      {name: 'US', label: 'United States', states: ['California', 'Nevada']},
      {name: 'AT', label: 'Austria'},
      {name: 'DE', label: 'Germany'},
      {name: 'NL', label: 'Netherlands'}
    ],
    currencies: [
      {name: 'EUR', label: 'Euro'},
      {name: 'USD', label: 'Dollar'}
    ],
    locales: [
      {code: 'en', label: 'English', file: 'en.js', iso: 'en'},
      {code: 'de', label: 'German', file: 'de.js', iso: 'de'}
    ],
    defaultLocale: 'en',
    lazy: true,
    seo: true,
    langDir: 'lang/',
    vueI18n: {
      fallbackLocale: 'en',
      numberFormats: {
        en: {
          currency: {
            style: 'currency', currency: 'USD', currencyDisplay: 'symbol'
          }
        },
        de: {
          currency: {
            style: 'currency', currency: 'EUR', currencyDisplay: 'symbol'
          }
        }
      }
    },
    detectBrowserLanguage: false
  },

  styleResources: {
    scss: [
      "~assets/styles/common.scss",
      "~assets/styles/colors.scss",
      "~assets/styles/dashboard.scss",
      require.resolve('@storefront-ui/shared/styles/_helpers.scss', {paths: [process.cwd()]})
    ]
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    extend(config) {
      config.module.rules.push({
        test: /\.mjs$/,
        include: /node_modules/,
        type: 'javascript/auto',
      })
    },
    babel: {
      plugins: [
        ['@babel/plugin-proposal-private-methods', {loose: true}]
      ]
    },
    transpile: [
      'vee-validate/dist/rules'
    ],
    postcss: {
      plugins: {
        tailwindcss: {},
        autoprefixer: {},
      },
    },
    plugins: [
      /*new webpack.DefinePlugin({
        'process.VERSION': JSON.stringify({
          // eslint-disable-next-line global-require
          version: require('./package.json').version,
          lastCommit: process.env.LAST_COMMIT || ''
        })
      })*/
    ]
  },
  publicRuntimeConfig: {
  },
  pwa: {
    meta: {
      theme_color: '#0A0A0A'
    }
  },
};
