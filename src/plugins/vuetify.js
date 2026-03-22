/**
 * plugins/vuetify.js
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Composables
import { createVuetify } from 'vuetify'

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  theme: {
    defaultTheme: 'system',
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
