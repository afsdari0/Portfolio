import { onMounted, ref } from 'vue'

/**
 * Composable for RAF-throttled 3D card tilt effect.
 * Skips on touch devices and prefers-reduced-motion.
 *
 * @param {Object} opts
 * @param {number} opts.maxDeg - Max rotation degrees (default 8)
 * @param {number} opts.perspective - CSS perspective value (default 600)
 * @param {string} opts.extraTransform - Extra transform appended on move (e.g. 'translateY(-8px) scale(1.02)')
 */
export function useCardTilt (opts = {}) {
  const {
    maxDeg = 8,
    perspective = 600,
    extraTransform = '',
  } = opts

  const skip = ref(true)
  let cachedRect = null
  let ticking = false
  let lastEvent = null

  onMounted(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const isTouch = window.matchMedia('(pointer: coarse)').matches
    skip.value = reducedMotion || isTouch
  })

  function onMouseMove (event) {
    if (skip.value) return
    if (!cachedRect) {
      cachedRect = event.currentTarget.getBoundingClientRect()
    }
    lastEvent = event
    if (!ticking) {
      ticking = true
      requestAnimationFrame(() => {
        if (lastEvent && lastEvent.currentTarget && cachedRect) {
          const x = (lastEvent.clientX - cachedRect.left) / cachedRect.width - 0.5
          const y = (lastEvent.clientY - cachedRect.top) / cachedRect.height - 0.5
          const extra = extraTransform ? ` ${extraTransform}` : ''
          lastEvent.currentTarget.style.transform =
            `perspective(${perspective}px) rotateY(${x * maxDeg}deg) rotateX(${-y * maxDeg}deg)${extra}`
        }
        ticking = false
      })
    }
  }

  function onMouseLeave (event) {
    cachedRect = null
    lastEvent = null
    event.currentTarget.style.transform = ''
  }

  return { onMouseMove, onMouseLeave }
}
