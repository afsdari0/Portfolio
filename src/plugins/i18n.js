import { createI18n } from 'vue-i18n'
import ptBR from '@/locales/pt-BR.json'

const savedLocale = localStorage.getItem('portfolio-locale') || 'pt-BR'

const i18n = createI18n({
  legacy: false,
  locale: savedLocale,
  fallbackLocale: 'pt-BR',
  messages: { 'pt-BR': ptBR },
})

// Load English locale on demand
export async function loadEnLocale () {
  if (i18n.global.availableLocales.includes('en')) return
  const en = await import('@/locales/en.json')
  i18n.global.setLocaleMessage('en', en.default)
}

// If user previously selected English, load it immediately
if (savedLocale === 'en') {
  loadEnLocale()
}

export default i18n
