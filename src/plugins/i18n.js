import { createI18n } from 'vue-i18n'
import ptBR from '@/locales/pt-BR.json'
import en from '@/locales/en.json'

const savedLocale = localStorage.getItem('portfolio-locale') || 'pt-BR'

const i18n = createI18n({
  legacy: false,
  locale: savedLocale,
  fallbackLocale: 'pt-BR',
  messages: { 'pt-BR': ptBR, en },
})

export default i18n
