// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  css: ['vuetify/lib/styles/main.sass'],
  build: {
    transpile: ['vee-validate/dist/rules', 'vuetify'],
    extend(_config: any, _ctx: any) {},
  },
  modules: [
    '@vueuse/nuxt',
    [
      '@pinia/nuxt',
      {
        autoImports: ['defineStore'],
      },
    ],
  ],
  vite: {
    define: {
      'process.env.DEBUG': 'false',
    },
  },

  imports: {
    dirs: [
      'store',
      'store/*/index.{ts,js}',
    ],
  },
})
