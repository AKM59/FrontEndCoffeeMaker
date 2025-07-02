// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  modules: [
    'vuetify-nuxt-module',
    'nuxt-lodash',
    'nuxt-toast',
  ],
  app: {
    head: {
      title: 'Coffee Mek - Management',
    }
  },
  build: {
    transpile: ['@vuepic/vue-datepicker']
  },
  runtimeConfig: {
    nodeUrl: '',
  },

})
