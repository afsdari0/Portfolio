import { defineStore } from 'pinia'
import { ref } from 'vue'
import i18n, { loadEnLocale } from '@/plugins/i18n'

export const useLocaleStore = defineStore('locale', () => {
  const locale = ref(i18n.global.locale.value)

  async function toggle () {
    const next = locale.value === 'pt-BR' ? 'en' : 'pt-BR'
    if (next === 'en') await loadEnLocale()
    locale.value = next
    i18n.global.locale.value = next
    localStorage.setItem('portfolio-locale', next)
  }

  return { locale, toggle }
})
