<template>
  <nav
    ref="barRef"
    aria-label="Filtros de categoria"
    class="sticky-filter"
  >
    <div class="sticky-filter__inner">
      <button
        v-for="cat in categoriesWithCount"
        :key="cat.value"
        :ref="(el) => { if (el) buttonRefs[cat.value] = el }"
        :aria-pressed="modelValue === cat.value"
        class="sticky-filter__btn"
        :class="{ 'is-active': modelValue === cat.value }"
        @click="$emit('update:modelValue', cat.value)"
      >
        <!-- Animated gradient border -->
        <span class="sticky-filter__border" aria-hidden="true" />
        <!-- Shimmer sweep -->
        <span class="sticky-filter__shimmer" aria-hidden="true" />
        <!-- Pulse ring on click -->
        <span class="sticky-filter__pulse" aria-hidden="true" />

        <span class="sticky-filter__label">{{ cat.label }}</span>
        <span class="sticky-filter__count">{{ cat.count }}</span>
      </button>

      <!-- Sliding pill indicator -->
      <div
        class="sticky-filter__indicator"
        :style="indicatorStyle"
      />
    </div>
  </nav>
</template>

<script setup>
  import { computed, nextTick, onMounted, onUnmounted, reactive, ref, watch } from 'vue'
  import { useI18n } from 'vue-i18n'

  const props = defineProps({
    categories: { type: Array, required: true },
    modelValue: { type: String, required: true },
    totalCount: { type: Number, default: 0 },
  })

  defineEmits(['update:modelValue'])

  const { t } = useI18n()
  const barRef = ref(null)
  const buttonRefs = reactive({})
  const indicatorStyle = ref({})

  const categoriesWithCount = computed(() => {
    return [
      { value: 'all', label: t('filters.all'), count: props.totalCount },
      ...props.categories,
    ]
  })

  function updateIndicator () {
    const activeBtn = buttonRefs[props.modelValue]
    if (!activeBtn) return
    const bar = barRef.value?.querySelector('.sticky-filter__inner')
    if (!bar) return
    const barRect = bar.getBoundingClientRect()
    const btnRect = activeBtn.getBoundingClientRect()
    indicatorStyle.value = {
      width: btnRect.width + 'px',
      transform: `translateX(${btnRect.left - barRect.left}px)`,
    }
  }

  watch(() => props.modelValue, () => {
    nextTick(updateIndicator)
  })

  let resizeTimer
  function debouncedUpdateIndicator () {
    clearTimeout(resizeTimer)
    resizeTimer = setTimeout(updateIndicator, 150)
  }

  onMounted(() => {
    nextTick(updateIndicator)
    window.addEventListener('resize', debouncedUpdateIndicator, { passive: true })
  })

  onUnmounted(() => {
    window.removeEventListener('resize', debouncedUpdateIndicator)
    clearTimeout(resizeTimer)
  })
</script>

<style scoped lang="scss">
.sticky-filter {
  padding: 0.85rem 0;
}

.sticky-filter__inner {
  position: relative;
  display: flex;
  gap: 0.65rem;
  justify-content: center;
  overflow: visible;
  padding: 0.5rem 1rem;
}

/* ════════════════════════════
   BUTTON — futuristic floating
   ════════════════════════════ */
.sticky-filter__btn {
  position: relative;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.6rem 1.25rem;
  border: none;
  border-radius: 12px;
  background: var(--bg-card);
  color: var(--text-secondary);
  font-family: var(--font-body);
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
  white-space: nowrap;
  z-index: 1;
  overflow: hidden;
  isolation: isolate;
  transform: translateY(0) scale(1);
  transition:
    color 0.3s ease,
    transform 0.45s cubic-bezier(0.34, 1.56, 0.64, 1),
    box-shadow 0.4s ease;

  /* ── Hover — float + tri-color shadow ── */
  &:hover {
    color: var(--text-primary);
    transform: translateY(-4px) scale(1.03);
    box-shadow:
      0 4px 16px rgba(78, 204, 163, 0.1),
      0 6px 24px rgba(91, 111, 255, 0.08),
      0 8px 32px rgba(168, 85, 247, 0.06);

    .sticky-filter__border {
      opacity: 1;
    }

    .sticky-filter__shimmer {
      animation: filterShimmer 0.7s ease-out forwards;
    }
  }

  /* ── Active — gradient border visible + elevated ── */
  &.is-active {
    color: #fff;
    transform: translateY(-2px);
    box-shadow:
      0 4px 20px rgba(78, 204, 163, 0.12),
      0 6px 28px rgba(91, 111, 255, 0.1),
      0 8px 36px rgba(168, 85, 247, 0.08);

    .sticky-filter__border {
      opacity: 1;
      animation: filterBorderSpin 3s linear infinite;
    }

    .sticky-filter__label {
      background: linear-gradient(135deg, var(--accent-teal), var(--accent-blue), var(--accent-purple));
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
      background-size: 200% 200%;
      animation: filterTextShift 4s ease-in-out infinite;
    }

    .sticky-filter__count {
      background: rgba(78, 204, 163, 0.12);
      border-color: rgba(78, 204, 163, 0.25);
      color: var(--accent-teal);
      opacity: 1;
    }
  }

  /* ── Active + hover ── */
  &.is-active:hover {
    transform: translateY(-5px) scale(1.04);
    box-shadow:
      0 6px 24px rgba(78, 204, 163, 0.16),
      0 8px 32px rgba(91, 111, 255, 0.12),
      0 10px 40px rgba(168, 85, 247, 0.1);

    .sticky-filter__border {
      animation-duration: 1.5s;
    }
  }

  /* ── Press ── */
  &:active {
    transform: translateY(0) scale(0.96);
    transition-duration: 0.1s;

    .sticky-filter__pulse {
      animation: filterPulse 0.4s ease-out forwards;
    }
  }

  &:focus-visible {
    outline: 2px solid var(--accent-blue);
    outline-offset: 3px;
  }
}

/* ──── Animated gradient border ──── */
.sticky-filter__border {
  position: absolute;
  inset: 0;
  border-radius: inherit;
  padding: 1px;
  background: linear-gradient(
    135deg,
    var(--accent-teal),
    var(--accent-blue),
    var(--accent-purple),
    var(--accent-blue),
    var(--accent-teal)
  );
  background-size: 300% 300%;
  -webkit-mask:
    linear-gradient(#fff 0 0) content-box,
    linear-gradient(#fff 0 0);
  mask:
    linear-gradient(#fff 0 0) content-box,
    linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  opacity: 0;
  transition: opacity 0.35s ease;
  pointer-events: none;
  z-index: 2;
}

/* ──── Shimmer sweep (teal → blue → purple) ──── */
.sticky-filter__shimmer {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    105deg,
    transparent 0%,
    rgba(78, 204, 163, 0.08) 25%,
    rgba(91, 111, 255, 0.1) 50%,
    rgba(168, 85, 247, 0.08) 75%,
    transparent 100%
  );
  transform: translateX(-110%);
  pointer-events: none;
  z-index: -1;
}

/* ──── Pulse ring on click ──── */
.sticky-filter__pulse {
  position: absolute;
  inset: 0;
  border-radius: inherit;
  border: 2px solid transparent;
  pointer-events: none;
  z-index: 3;
}

/* ──── Label ──── */
.sticky-filter__label {
  position: relative;
  letter-spacing: 0.02em;
  transition: all 0.3s ease;
}

/* ──── Count badge ──── */
.sticky-filter__count {
  font-family: var(--font-mono);
  font-size: 0.6rem;
  font-weight: 700;
  opacity: 0.5;
  padding: 0.12rem 0.4rem;
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.06);
  transition: all 0.3s ease;
}

/* ──── Sliding pill indicator ──── */
.sticky-filter__indicator {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 100%;
  border-radius: 12px;
  background: linear-gradient(
    135deg,
    rgba(78, 204, 163, 0.05),
    rgba(91, 111, 255, 0.04),
    rgba(168, 85, 247, 0.03)
  );
  transition:
    transform 0.45s cubic-bezier(0.34, 1.56, 0.64, 1),
    width 0.45s cubic-bezier(0.34, 1.56, 0.64, 1);
  pointer-events: none;
  z-index: 0;
}

/* ════════════════
   KEYFRAMES
   ════════════════ */
@keyframes filterBorderSpin {
  0%   { background-position: 0% 50%; }
  50%  { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

@keyframes filterShimmer {
  0% {
    transform: translateX(-110%);
    opacity: 1;
  }
  100% {
    transform: translateX(110%);
    opacity: 0;
  }
}

@keyframes filterTextShift {
  0%, 100% { background-position: 0% 50%; }
  50%      { background-position: 100% 50%; }
}

@keyframes filterPulse {
  0% {
    border-color: var(--accent-teal);
    transform: scale(1);
    opacity: 0.6;
  }
  50% {
    border-color: var(--accent-blue);
  }
  100% {
    border-color: var(--accent-purple);
    transform: scale(1.15);
    opacity: 0;
  }
}

/* ──── Mobile ──── */
@media (max-width: 599px) {
  .sticky-filter__inner {
    justify-content: flex-start;
    overflow-x: auto;
    overflow-y: visible;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;
    padding: 0.5rem 1rem 0.5rem;

    &::-webkit-scrollbar {
      display: none;
    }
  }

  .sticky-filter__btn {
    padding: 0.5rem 1rem;
    font-size: 0.75rem;
  }
}

/* ──── Reduced motion ──── */
@media (prefers-reduced-motion: reduce) {
  .sticky-filter__indicator,
  .sticky-filter__btn,
  .sticky-filter__border,
  .sticky-filter__shimmer,
  .sticky-filter__pulse {
    transition: none !important;
    animation: none !important;
  }
}
</style>
