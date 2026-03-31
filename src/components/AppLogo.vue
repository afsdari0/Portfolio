<template>
  <div
    class="app-logo"
    :class="[`app-logo--${size}`, { 'app-logo--animated': animated }]"
    :style="cssVars"
  >
    <svg
      class="app-logo__svg"
      :height="pxSize"
      viewBox="0 0 200 200"
      :width="pxSize"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient
          :id="`logo-grad-${uid}`"
          x1="0%"
          x2="100%"
          y1="0%"
          y2="100%"
        >
          <stop offset="0%" :stop-color="colors.primary" />
          <stop offset="100%" :stop-color="colors.secondary" />
        </linearGradient>
        <linearGradient
          :id="`logo-grad2-${uid}`"
          x1="0%"
          x2="100%"
          y1="0%"
          y2="100%"
        >
          <stop offset="0%" :stop-color="colors.secondary" />
          <stop offset="100%" :stop-color="colors.primary" />
        </linearGradient>
      </defs>
      <!-- Lines -->
      <line
        class="app-logo__line app-logo__line--1"
        :stroke="`url(#logo-grad-${uid})`"
        stroke-linecap="round"
        stroke-width="5.5"
        x1="68"
        x2="116"
        y1="48"
        y2="108"
      />
      <line
        class="app-logo__line app-logo__line--2"
        :stroke="`url(#logo-grad2-${uid})`"
        stroke-linecap="round"
        stroke-width="2.8"
        x1="116"
        x2="52"
        y1="108"
        y2="136"
      />
      <line
        class="app-logo__line app-logo__line--3"
        :stroke="colors.primary"
        stroke-linecap="round"
        stroke-width="2"
        x1="68"
        x2="152"
        y1="48"
        y2="66"
      />
      <line
        class="app-logo__line app-logo__line--4"
        :stroke="colors.secondary"
        stroke-linecap="round"
        stroke-width="1.5"
        x1="152"
        x2="116"
        y1="66"
        y2="108"
      />
      <!-- Nodes -->
      <circle
        class="app-logo__node app-logo__node--main"
        cx="116"
        cy="108"
        :fill="`url(#logo-grad-${uid})`"
        r="30"
      />
      <circle
        class="app-logo__node app-logo__node--secondary"
        cx="68"
        cy="48"
        :fill="colors.primary"
        r="15"
      />
      <circle
        class="app-logo__node app-logo__node--tertiary"
        cx="52"
        cy="136"
        :fill="colors.secondary"
        r="9"
      />
      <circle
        class="app-logo__node app-logo__node--dot"
        cx="152"
        cy="66"
        :fill="colors.primary"
        opacity="0.8"
        r="5.5"
      />
    </svg>
  </div>
</template>

<script setup>
  import { computed } from 'vue'
  import { useThemeStore } from '@/stores/theme'

  const props = defineProps({
    size: { type: String, default: 'md', validator: v => ['xs', 'sm', 'md', 'lg', 'xl'].includes(v) },
    animated: { type: Boolean, default: false },
  })

  const themeStore = useThemeStore()

  const uid = Math.random().toString(36).slice(2, 8)

  const sizeMap = { xs: 24, sm: 32, md: 48, lg: 80, xl: 120 }
  const pxSize = computed(() => sizeMap[props.size])

  const colors = computed(() =>
    themeStore.isDark
      ? { primary: '#4ecca3', secondary: '#5b6fff' }
      : { primary: '#0d9b6e', secondary: '#4a5aef' },
  )

  const cssVars = computed(() => ({
    '--logo-size': `${pxSize.value}px`,
  }))
</script>

<style scoped lang="scss">
.app-logo {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: var(--logo-size);
  height: var(--logo-size);
}

.app-logo__svg {
  display: block;
  width: 100%;
  height: 100%;
}

/* Animated variant — nodes first, then lines */
.app-logo--animated {
  .app-logo__node {
    opacity: 0;
    transform-origin: center;
    animation: logoNodePop 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
  }

  .app-logo__node--main { animation-delay: 0.1s; }
  .app-logo__node--secondary { animation-delay: 0.35s; }
  .app-logo__node--tertiary { animation-delay: 0.55s; }
  .app-logo__node--dot { animation-delay: 0.7s; }

  .app-logo__line {
    stroke-dasharray: 200;
    stroke-dashoffset: 200;
    animation: logoLineDraw 1.6s cubic-bezier(0.22, 1, 0.36, 1) forwards;
  }

  .app-logo__line--1 { animation-delay: 0.8s; }
  .app-logo__line--2 { animation-delay: 1.05s; }
  .app-logo__line--3 { animation-delay: 1.25s; }
  .app-logo__line--4 { animation-delay: 1.4s; }
}

@keyframes logoLineDraw {
  to { stroke-dashoffset: 0; }
}

@keyframes logoNodePop {
  0% {
    opacity: 0;
    transform: scale(0);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

@media (prefers-reduced-motion: reduce) {
  .app-logo--animated .app-logo__line,
  .app-logo--animated .app-logo__node {
    animation: none;
    stroke-dashoffset: 0;
    opacity: 1;
    transform: none;
  }
}
</style>
