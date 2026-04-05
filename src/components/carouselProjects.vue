<template>
  <div class="featured-projects" :class="{ 'is-visible': visible }">
    <div ref="trackRef" class="featured-projects__track" @scroll="onTrackScroll">
      <div
        v-for="(item, i) in featuredItems"
        :key="item.id"
        class="featured-border-wrap"
        :class="`featured-border-wrap--${item.rank}`"
        :style="{ animationDelay: visible ? `${i * 100}ms` : '0ms' }"
        role="button"
        tabindex="0"
        @click="dialog.openDialog(item)"
        @keydown.enter="dialog.openDialog(item)"
        @keydown.space.prevent="dialog.openDialog(item)"
      >
        <div
          class="featured-card"
          @mouseleave="onMouseLeave"
          @mousemove="onMouseMove"
        >
          <div class="featured-card__media">
            <img
              :alt="item.name"
              class="featured-card__img"
              loading="lazy"
              :src="item.img"
            >
            <div aria-hidden="true" class="featured-card__shine" />
            <div aria-hidden="true" class="featured-card__gradient" />

            <div
              class="featured-card__rank-badge"
              :class="`featured-card__rank-badge--${item.rank}`"
            >
              <v-icon :icon="rankIcon(item.rank)" size="14" />
              <span>{{ RANK_META[item.rank].label }}</span>
            </div>
          </div>

          <div class="featured-card__body">
            <h3 class="featured-card__name">{{ item.name }}</h3>
            <p class="featured-card__tech">{{ item.tecno }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Dots indicator — mobile only -->
    <div v-if="featuredItems.length > 1" class="featured-projects__dots">
      <span
        v-for="(_, i) in featuredItems"
        :key="i"
        class="featured-projects__dot"
        :class="{ 'is-active': i === activeIndex }"
      />
    </div>
  </div>
</template>

<script setup>
  import { computed, ref } from 'vue'
  import { projects } from '@/data/projects'
  import { RANK_META } from '@/data/rankMeta'
  import { useCardTilt } from '@/composables/useCardTilt'
  import { useDialogStore } from '@/stores/dialogProjects'

  defineProps({
    visible: { type: Boolean, default: false },
  })

  const dialog = useDialogStore()
  const featuredItems = computed(() => projects.filter(p => p.featured).slice(0, 5))

  function rankIcon (rank) {
    return RANK_META[rank]?.icon ?? 'mdi-shield'
  }

  const { onMouseMove, onMouseLeave } = useCardTilt({ maxDeg: 8 })

  /* ---- Mobile scroll tracking for dots ---- */
  const trackRef = ref(null)
  const activeIndex = ref(0)

  function onTrackScroll () {
    const el = trackRef.value
    if (!el) return
    const cards = el.querySelectorAll('.featured-border-wrap')
    if (!cards.length) return

    const trackCenter = el.scrollLeft + el.clientWidth / 2
    let closest = 0
    let minDist = Infinity

    cards.forEach((card, i) => {
      const cardCenter = card.offsetLeft + card.offsetWidth / 2
      const dist = Math.abs(trackCenter - cardCenter)
      if (dist < minDist) {
        minDist = dist
        closest = i
      }
    })

    activeIndex.value = closest
  }
</script>

<style scoped lang="scss">
.featured-projects {
  width: 100%;
}

/* ---- Track: grid no desktop, scroll-snap no mobile ---- */
.featured-projects__track {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.25rem;
  width: 100%;
  max-width: 880px;
  margin: 0 auto;
}

@media (max-width: 599px) {
  .featured-projects__track {
    display: flex;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    scroll-padding: 0 1rem;
    gap: 1rem;
    padding-bottom: 0.5rem;

    scrollbar-width: none;
    -ms-overflow-style: none;
    &::-webkit-scrollbar { display: none; }
  }
}

/* ---- Rank border wrapper (animated gradient border) ---- */
.featured-border-wrap {
  position: relative;
  border-radius: 16px;
  padding: 2px;
  cursor: pointer;
  scroll-snap-align: center;
  overflow: hidden;

  /* Entrada animada */
  opacity: 0;
  transform: translateY(24px);

  .is-visible & {
    animation: featuredCardIn 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards;
  }

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: inherit;
    background-size: 400% 400%;
    animation: rankBorderSpin 4s linear infinite, rankGlowPulse 2s ease-in-out infinite;
    z-index: 0;
    opacity: 0;
    transition: opacity 0.4s ease;
  }

  &:hover::before,
  &:focus-visible::before {
    opacity: 1;
  }

  &:focus-visible {
    outline: 2px solid var(--border-accent);
    outline-offset: 4px;
  }

  @media (max-width: 599px) {
    min-width: 72vw;
    max-width: 72vw;
    flex-shrink: 0;

    &:first-child { margin-left: 0.5rem; }
    &:last-child { margin-right: 0.5rem; }

    /* Borda sempre visível no mobile (sem hover) */
    &::before { opacity: 0.6; }
  }
}

/* Rank-specific border gradients */
.featured-border-wrap--S::before {
  background: linear-gradient(135deg, #ffd700, #ff6b35, #ff0080, #a855f7, #4ecca3, #5b6fff, #ffd700);
}
.featured-border-wrap--A::before {
  background: linear-gradient(135deg, #c084fc, #818cf8, #6366f1, #c084fc);
}
.featured-border-wrap--B::before {
  background: linear-gradient(135deg, #38bdf8, #4ecca3, #0ea5e9, #38bdf8);
}
.featured-border-wrap--C::before {
  background: linear-gradient(135deg, #94a3b8, #64748b, #475569, #94a3b8);
  animation-duration: 8s;
}

/* Rank-specific hover glow */
.featured-border-wrap--S:hover::before { animation-duration: 1.5s; }
.featured-border-wrap--S:hover .featured-card { filter: drop-shadow(0 0 16px rgba(255, 215, 0, 0.45)); }
.featured-border-wrap--A:hover .featured-card { box-shadow: 0 0 28px rgba(192, 132, 252, 0.35); }
.featured-border-wrap--B:hover .featured-card { box-shadow: 0 0 22px rgba(56, 189, 248, 0.3); }
.featured-border-wrap--C:hover .featured-card { box-shadow: 0 0 16px rgba(148, 163, 184, 0.2); }

/* ---- Card ---- */
.featured-card {
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
  border-radius: 14px;
  overflow: hidden;
  background: var(--bg-card);
  box-shadow: 0 8px 24px var(--shadow-heavy);
  z-index: 1;
  transition: transform 0.4s cubic-bezier(0.34, 1.2, 0.64, 1), box-shadow 0.4s ease, filter 0.4s ease;

  .featured-border-wrap:hover &,
  .featured-border-wrap:focus-visible & {
    .featured-card__shine {
      opacity: 1;
      transform: translateX(120%) skewX(-12deg);
    }

    .featured-card__gradient {
      opacity: 1;
    }

    .featured-card__img {
      transform: scale(1.05);
    }
  }
}

/* ---- Media ---- */
.featured-card__media {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 10;
  overflow: hidden;
}

.featured-card__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s cubic-bezier(0.22, 1, 0.36, 1);
}

/* Shine sweep */
.featured-card__shine {
  position: absolute;
  inset: 0;
  width: 45%;
  background: linear-gradient(
    105deg,
    transparent 0%,
    rgba(255, 255, 255, 0.18) 45%,
    transparent 70%
  );
  opacity: 0;
  transform: translateX(-80%) skewX(-12deg);
  transition: transform 0.65s ease, opacity 0.35s ease;
  pointer-events: none;
  z-index: 3;
}

/* Gradient overlay */
.featured-card__gradient {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to top,
    rgba(10, 15, 30, 0.8) 0%,
    rgba(78, 204, 163, 0.06) 50%,
    transparent 100%
  );
  opacity: 0.5;
  transition: opacity 0.35s ease;
  z-index: 1;
  pointer-events: none;
}

/* ---- Rank badge ---- */
.featured-card__rank-badge {
  position: absolute;
  top: 0.6rem;
  right: 0.6rem;
  z-index: 4;
  display: flex;
  align-items: center;
  gap: 0.3rem;
  padding: 0.25rem 0.55rem;
  border-radius: 8px;
  font-family: var(--font-mono);
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  border: 1px solid;

  span { line-height: 1; }
}

.featured-card__rank-badge--S {
  color: #ffd700;
  background: rgba(255, 215, 0, 0.35);
  border-color: rgba(255, 215, 0, 0.45);
  clip-path: polygon(50% 0%, 100% 15%, 100% 85%, 50% 100%, 0% 85%, 0% 15%);
  border: none;
  padding: 0.35rem 0.7rem;
}
.featured-card__rank-badge--A {
  color: #c084fc;
  background: rgba(192, 132, 252, 0.35);
  border-color: rgba(192, 132, 252, 0.4);
  clip-path: polygon(8% 0%, 92% 0%, 100% 50%, 92% 100%, 8% 100%, 0% 50%);
  border: none;
  padding: 0.3rem 0.65rem;
}
.featured-card__rank-badge--B {
  color: #38bdf8;
  background: rgba(56, 189, 248, 0.35);
  border-color: rgba(56, 189, 248, 0.4);
  box-shadow: inset 0 0 0 1px rgba(56, 189, 248, 0.2);
}
.featured-card__rank-badge--C {
  color: #94a3b8;
  background: rgba(148, 163, 184, 0.3);
  border-color: rgba(148, 163, 184, 0.35);
}

/* ---- Body ---- */
.featured-card__body {
  padding: 0.85rem 1rem 1rem;
  background: var(--card-body-bg);
  border-top: 1px solid var(--border-subtle);
}

.featured-card__name {
  font-family: var(--font-heading);
  font-size: 0.95rem;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0 0 0.2rem;
  line-height: 1.3;
}

.featured-card__tech {
  font-family: var(--font-mono);
  font-size: 0.72rem;
  color: var(--text-muted);
  margin: 0;
  letter-spacing: 0.02em;
}

/* ---- Keyframes ---- */
@keyframes featuredCardIn {
  from {
    opacity: 0;
    transform: translateY(24px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes rankBorderSpin {
  0%   { background-position: 0% 50%; }
  100% { background-position: 400% 50%; }
}

@keyframes rankGlowPulse {
  0%, 100% { opacity: 0.7; }
  50%       { opacity: 1; }
}

/* ---- Dots indicator (mobile only) ---- */
.featured-projects__dots {
  display: none;
}

@media (max-width: 599px) {
  .featured-projects__dots {
    display: flex;
    justify-content: center;
    gap: 0.5rem;
    margin-top: 0.85rem;
  }
}

.featured-projects__dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--border-subtle);
  transition: background 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;

  &.is-active {
    background: var(--accent-teal);
    transform: scale(1.35);
    box-shadow: 0 0 8px var(--glow-teal);
  }
}

@media (prefers-reduced-motion: reduce) {
  .featured-border-wrap {
    opacity: 1;
    transform: none;
    animation: none !important;

    &::before { animation: none !important; }
  }

  .featured-card {
    transition: none !important;
  }

  .featured-card__shine,
  .featured-card__gradient {
    display: none;
  }
}
</style>
