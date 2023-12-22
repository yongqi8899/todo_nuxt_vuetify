import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { createVuetify } from 'vuetify'
import { defineNuxtPlugin } from '#app'
import '@mdi/font/css/materialdesignicons.css'

export default defineNuxtPlugin((nuxtApp) => {
  const vuetify = createVuetify({
    components,
    directives,
    theme: {
      themes: {
        light: {
          dark: false,
          colors: {
            primary: '#00BCD4',
            info: '#1e81b0',
            success: '#8BC34A',
            warning: '#fec90f',
            error: '#E91E63',
            secondary: '#4DD0E1',
          },
        },
      },
    },
    icons: {
      iconfont: 'mdi',
    },
  })
  nuxtApp.vueApp.use(vuetify)
})
