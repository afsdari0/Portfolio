/**
 * plugins/index.js
 *
 * Automatically included in `./src/main.js`
 */

// Plugins
import { createPinia } from 'pinia'
import router from '@/router'
import i18n from './i18n'
import vuetify from './vuetify'

export function registerPlugins (app) {
  app
    .use(createPinia())
    .use(i18n)
    .use(vuetify)
    .use(router)
}
