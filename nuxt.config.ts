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
    '@pinia/nuxt',
    // 'nuxt-storage'
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
})