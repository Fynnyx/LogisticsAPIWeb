// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  devtools: {
    enabled: true,

    timeline: {
      enabled: true
    }
  },
  css: [
    '~/assets/scss/global.scss',
    '@fortawesome/fontawesome-svg-core/styles.css',

  ],
  modules: [
    '@pinia/nuxt'
  ],
  pinia: {
    autoImports: [
      'defineStore',
      'acceptHMRUpdate'
    ],
  },
  imports: {
    dirs: [
      '~/store'
    ]
  },
  // Set Runtime Config
  publicRuntimeConfig: {
    API_BASE_URL: process.env.API_BASE_URL || 'http://localhost:8080'
  },
})