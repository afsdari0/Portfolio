import { onMounted, onUnmounted, ref } from 'vue'

export function useScrollAnimation () {
  const scrollY = ref(0)

  function onScroll () {
    scrollY.value = window.scrollY
  }

  onMounted(() => {
    window.addEventListener('scroll', onScroll, { passive: true })
  })

  onUnmounted(() => {
    window.removeEventListener('scroll', onScroll)
  })

  return { scrollY }
}
