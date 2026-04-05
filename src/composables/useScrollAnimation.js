import { onMounted, onUnmounted, ref } from 'vue'

export function useScrollAnimation () {
  const scrollY = ref(0)
  let ticking = false

  function onScroll () {
    if (!ticking) {
      ticking = true
      requestAnimationFrame(() => {
        scrollY.value = window.scrollY
        ticking = false
      })
    }
  }

  onMounted(() => {
    window.addEventListener('scroll', onScroll, { passive: true })
  })

  onUnmounted(() => {
    window.removeEventListener('scroll', onScroll)
  })

  return { scrollY }
}
