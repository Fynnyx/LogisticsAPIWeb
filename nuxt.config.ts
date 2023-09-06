// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  devtools: {
    enabled: true,

    timeline: {
      enabled: true
    }
  }, 
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import "@/assets/scss/global.scss";`
        }
      }
    }
  },
  css: [
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