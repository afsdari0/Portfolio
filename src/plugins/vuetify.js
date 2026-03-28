/**
 * plugins/vuetify.js
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Composables
import { createVuetify } from 'vuetify'
// Styles
import '@mdi/font/css/materialdesignicons.css'

import 'vuetify/styles'

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  theme: {
    defaultTheme: 'portfolioDark',
    themes: {
      portfolioDark: {
        dark: true,
        colors: {
          'background': '#080c14',
          'surface': '#0e1524',
          'surface-variant': '#1a2235',
          'primary': '#4ecca3',
          'secondary': '#5b6fff',
          'on-background': '#e8eaed',
          'on-surface': '#e8eaed',
        },
      },
      portfolioLight: {
        dark: false,
        colors: {
          'background': '#f5f7fa',
          'surface': '#ffffff',
          'surface-variant': '#e8ecf2',
          'primary': '#0d9b6e',
          'secondary': '#4a5aef',
          'on-background': '#1a1f2e',
          'on-surface': '#1a1f2e',
        },
      },
    },
  },
  defaults: {
    VDialog: {
      scrollable: true,
      /** Garante escurecimento do fundo (navbar + conteúdo ficam atrás do scrim) */
      scrim: true,
    },
    VOverlay: {
      /** Comportamento consistente para qualquer overlay */
      persistent: false,
    },
  },
})
