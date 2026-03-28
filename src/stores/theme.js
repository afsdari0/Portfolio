import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useThemeStore = defineStore('theme', () => {
  const isDark = ref(localStorage.getItem('portfolio-theme') !== 'light')

  function toggle () {
    isDark.value = !isDark.value
    localStorage.setItem('portfolio-theme', isDark.value ? 'dark' : 'light')
  }

  return { isDark, toggle }
})
