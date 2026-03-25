import { defineStore } from 'pinia'
import { ref } from 'vue'
import i18n from '@/plugins/i18n'

export const useLocaleStore = defineStore('locale', () => {
  const locale = ref(i18n.global.locale.value)

  function toggle() {
    const next = locale.value === 'pt-BR' ? 'en' : 'pt-BR'
    locale.value = next
    i18n.global.locale.value = next
    localStorage.setItem('portfolio-locale', next)
  }

  return { locale, toggle }
})
