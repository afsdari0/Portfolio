<template>
  <div
    class="editorial-wrap"
    :class="[
      `editorial-wrap--${project.rank}`,
      { 'editorial-wrap--reversed': reversed },
    ]"
  >
    <article
      :aria-label="`${project.name}`"
      class="editorial-card"
      role="button"
      tabindex="0"
      @click="dialog.openDialog(project)"
      @keydown.enter="dialog.openDialog(project)"
      @keydown.space.prevent="dialog.openDialog(project)"
      @mousemove="onMouseMove"
      @mouseleave="onMouseLeave"
    >
      <div class="editorial-card__media">
        <img
          :alt="project.name"
          class="editorial-card__img"
          loading="lazy"
          :src="project.img"
        >
        <div aria-hidden="true" class="editorial-card__scrim" />
        <div aria-hidden="true" class="editorial-card__shine" />
        <div aria-hidden="true" class="editorial-card__ambient" />

        <div
          :aria-label="`Rank ${RANK_META[project.rank]?.label}`"
          class="rank-badge"
          :class="`rank-badge--${project.rank}`"
        >
          <v-icon :icon="RANK_META[project.rank]?.icon" size="14" />
          <span>{{ RANK_META[project.rank]?.label }}</span>
        </div>
      </div>

      <div class="editorial-card__content">
        <!-- Tech-themed animated background -->
        <div aria-hidden="true" class="editorial-card__techbg" />

        <h3 class="editorial-card__title">{{ project.name }}</h3>

        <p class="editorial-card__about">
          {{ localizedAbout }}
        </p>

        <div class="editorial-card__chips">
          <span
            v-for="tech in project.techStack"
            :key="tech"
            class="editorial-card__chip"
          >{{ tech }}</span>
        </div>

        <button class="glow-btn editorial-card__cta" tabindex="-1">
          <v-icon size="16">mdi-arrow-right-circle</v-icon>
          {{ t('allProjects.viewDetails') }}
        </button>
      </div>
    </article>
  </div>
</template>

<script setup>
  import { computed } from 'vue'
  import { useI18n } from 'vue-i18n'
  import { RANK_META } from '@/data/rankMeta'
  import { useCardTilt } from '@/composables/useCardTilt'
  import { useDialogStore } from '@/stores/dialogProjects'
  import { useLocaleStore } from '@/stores/locale'

  const props = defineProps({
    project: { type: Object, required: true },
    index: { type: Number, default: 0 },
    reversed: { type: Boolean, default: false },
  })

  const { t } = useI18n()
  const dialog = useDialogStore()
  const localeStore = useLocaleStore()

  const localizedAbout = computed(() => {
    const about = props.project.about
    if (typeof about === 'string') return about
    return about?.[localeStore.locale] || about?.['pt-BR'] || ''
  })

  const { onMouseMove, onMouseLeave } = useCardTilt({
    maxDeg: 4,
    perspective: 800,
    extraTransform: 'translateY(-6px)',
  })
</script>

<style scoped lang="scss">
/* ══════════════════════════════════════
   BORDER WRAPPER — color by tier
   ══════════════════════════════════════ */
.editorial-wrap {
  position: relative;
  border-radius: 20px;
  padding: 2px;

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: inherit;
    background-size: 400% 400%;
    z-index: 0;
  }
}

/* ── S tier border ── */
.editorial-wrap--S::before {
  background: linear-gradient(
    135deg, #ffd700, #ff6b35, #ff0080, #a855f7, #4ecca3, #5b6fff, #ffd700
  );
  animation: borderSpin 3s linear infinite, borderPulse 2s ease-in-out infinite;
  animation-play-state: paused;
}
.editorial-wrap--S:hover::before { animation-play-state: running; }
.editorial-wrap--S:hover::before { animation-duration: 1.2s, 1s; }

/* ── A tier border ── */
.editorial-wrap--A::before {
  background: linear-gradient(
    135deg, #c084fc, #818cf8, #5b6fff, #4ecca3, #818cf8, #c084fc
  );
  animation: borderSpin 5s linear infinite, borderPulse 3s ease-in-out infinite;
  animation-play-state: paused;
}
.editorial-wrap--A:hover::before { animation-play-state: running; }
.editorial-wrap--A:hover::before { animation-duration: 2s, 1.5s; }

/* ── B tier border ── */
.editorial-wrap--B::before {
  background: linear-gradient(
    135deg, #38bdf8, #4ecca3, #0ea5e9, #5b6fff, #38bdf8
  );
  animation: borderSpin 7s linear infinite, borderPulse 4s ease-in-out infinite;
  animation-play-state: paused;
}
.editorial-wrap--B:hover::before { animation-play-state: running; }
.editorial-wrap--B:hover::before { animation-duration: 3s, 2s; }

/* ── C tier border ── */
.editorial-wrap--C::before {
  background: linear-gradient(
    135deg, #94a3b8, #64748b, #475569, #94a3b8
  );
  animation: borderSpin 10s linear infinite, borderPulse 5s ease-in-out infinite;
  animation-play-state: paused;
}
.editorial-wrap--C:hover::before { animation-play-state: running; }
.editorial-wrap--C:hover::before { animation-duration: 5s, 3s; }

/* Reversed layout */
.editorial-wrap--reversed .editorial-card {
  grid-template-columns: 1fr var(--card-img-ratio, 1.1fr);

  .editorial-card__media { order: 2; }
  .editorial-card__content { order: 1; }
}

/* ══════════════════════════════════════
   CARD
   ══════════════════════════════════════ */
.editorial-card {
  position: relative;
  display: grid;
  grid-template-columns: var(--card-img-ratio, 1.1fr) 1fr;
  gap: 0;
  border-radius: 18px;
  overflow: hidden;
  background: var(--bg-card);
  box-shadow: 0 8px 32px var(--shadow-medium);
  cursor: pointer;
  z-index: 1;
  transition:
    transform 0.5s cubic-bezier(0.22, 1, 0.36, 1),
    box-shadow 0.5s ease;

  &:hover {
    box-shadow:
      0 12px 40px var(--shadow-heavy),
      0 4px 20px var(--shadow-medium);

    .editorial-card__img { transform: scale(1.06); }

    .editorial-card__shine {
      opacity: 1;
      transform: translateX(120%) skewX(-12deg);
    }

    .editorial-card__ambient { opacity: 0.45; }
    .editorial-card__title { background-size: 100% 2px; }
    .editorial-card__cta { transform: translateX(4px); }
    .editorial-card__techbg { opacity: 0.18; }
  }

  &:focus-visible {
    outline: 2px solid var(--border-accent);
    outline-offset: 4px;
  }
}

/* ══════════════════════════════════════
   SOFT COLOR FADE — tier-based colors
   ══════════════════════════════════════ */
.editorial-card__techbg {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 0;
  opacity: 0.1;
  transition: opacity 0.5s ease;
  background:
    radial-gradient(ellipse 55% 50% at 25% 35%, var(--tier-fade-a, rgba(192, 132, 252, 0.15)), transparent 70%),
    radial-gradient(ellipse 45% 55% at 75% 65%, var(--tier-fade-b, rgba(91, 111, 255, 0.1)), transparent 70%),
    radial-gradient(ellipse 50% 40% at 50% 50%, var(--tier-fade-c, rgba(78, 204, 163, 0.06)), transparent 70%);
  animation: softColorDrift var(--tier-drift-speed, 14s) ease-in-out infinite alternate;
}

/* ── Tier color overrides ── */
/* ── Tier: size + color + speed ── */
.editorial-wrap--S .editorial-card {
  --card-img-ratio: 1.2fr;
  --card-media-height: 280px;
  --tier-fade-a: rgba(255, 215, 0, 0.18);
  --tier-fade-b: rgba(168, 85, 247, 0.12);
  --tier-fade-c: rgba(78, 204, 163, 0.08);
  --tier-drift-speed: 12s;
}

.editorial-wrap--A .editorial-card {
  --card-img-ratio: 1.15fr;
  --card-media-height: 265px;
  --tier-fade-a: rgba(192, 132, 252, 0.16);
  --tier-fade-b: rgba(91, 111, 255, 0.1);
  --tier-fade-c: rgba(78, 204, 163, 0.06);
  --tier-drift-speed: 12s;
}

.editorial-wrap--B .editorial-card {
  --card-img-ratio: 1.08fr;
  --card-media-height: 240px;
  --tier-fade-a: rgba(56, 189, 248, 0.14);
  --tier-fade-b: rgba(78, 204, 163, 0.09);
  --tier-fade-c: rgba(91, 111, 255, 0.06);
  --tier-drift-speed: 18s;
}

.editorial-wrap--C .editorial-card {
  --card-img-ratio: 1fr;
  --card-media-height: 220px;
  --tier-fade-a: rgba(148, 163, 184, 0.1);
  --tier-fade-b: rgba(100, 116, 139, 0.07);
  --tier-fade-c: rgba(71, 85, 105, 0.04);
  --tier-drift-speed: 25s;
}

/* ══════════════════════════════════════
   MEDIA
   ══════════════════════════════════════ */
.editorial-card__media {
  position: relative;
  overflow: hidden;
  min-height: var(--card-media-height, 260px);
}

.editorial-card__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s cubic-bezier(0.22, 1, 0.36, 1);
}

.editorial-card__scrim {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    135deg,
    rgba(10, 15, 30, 0.25) 0%,
    rgba(192, 132, 252, 0.06) 100%
  );
  pointer-events: none;
}

.editorial-card__shine {
  position: absolute;
  inset: 0;
  width: 50%;
  background: linear-gradient(
    105deg,
    transparent 0%,
    rgba(192, 132, 252, 0.1) 30%,
    rgba(91, 111, 255, 0.12) 50%,
    rgba(78, 204, 163, 0.08) 70%,
    transparent 100%
  );
  opacity: 0;
  transform: translateX(-80%) skewX(-12deg);
  transition: transform 0.7s ease, opacity 0.35s ease;
  pointer-events: none;
  z-index: 1;
}

.editorial-card__ambient {
  position: absolute;
  bottom: -20%;
  left: 20%;
  width: 60%;
  height: 60%;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(192, 132, 252, 0.3), rgba(91, 111, 255, 0.15), transparent 70%);
  filter: blur(40px);
  opacity: 0.2;
  animation: ambientDrift 6s ease-in-out infinite alternate;
  pointer-events: none;
  z-index: 1;
}

/* ══════════════════════════════════════
   RANK BADGE — dynamic per tier
   ══════════════════════════════════════ */
.rank-badge {
  position: absolute;
  top: 0.8rem;
  left: 0.8rem;
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  padding: 0.3rem 0.65rem;
  font-family: var(--font-mono);
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  z-index: 2;
  border: none;
}

.rank-badge--S {
  color: #ffd700;
  background: rgba(255, 215, 0, 0.35);
  clip-path: polygon(50% 0%, 100% 15%, 100% 85%, 50% 100%, 0% 85%, 0% 15%);
  padding: 0.35rem 0.7rem;
  animation: badgeGlow 2s ease-in-out infinite;
  --badge-glow-color: rgba(255, 215, 0, 0.25);
}

.rank-badge--A {
  color: #c084fc;
  background: rgba(192, 132, 252, 0.35);
  clip-path: polygon(8% 0%, 92% 0%, 100% 50%, 92% 100%, 8% 100%, 0% 50%);
  animation: badgeGlow 2.5s ease-in-out infinite;
  --badge-glow-color: rgba(192, 132, 252, 0.2);
}

.rank-badge--B {
  color: #38bdf8;
  background: rgba(56, 189, 248, 0.35);
  border-radius: 8px;
  border: 1px solid rgba(56, 189, 248, 0.3) !important;
  animation: badgeGlow 3s ease-in-out infinite;
  --badge-glow-color: rgba(56, 189, 248, 0.15);
}

.rank-badge--C {
  color: #94a3b8;
  background: rgba(148, 163, 184, 0.3);
  border-radius: 8px;
  border: 1px solid rgba(148, 163, 184, 0.25) !important;
}

/* ══════════════════════════════════════
   CONTENT
   ══════════════════════════════════════ */
.editorial-card__content {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.85rem;
  padding: 2rem;
  overflow: hidden;
}

.editorial-card__title {
  position: relative;
  z-index: 1;
  font-family: var(--font-heading);
  font-size: clamp(1.2rem, 2.5vw, 1.8rem);
  font-weight: 700;
  color: var(--text-primary);
  line-height: 1.2;
  margin: 0;
  background-image: linear-gradient(90deg, #c084fc, #5b6fff, #4ecca3);
  background-size: 0% 2px;
  background-position: left bottom;
  background-repeat: no-repeat;
  padding-bottom: 4px;
  transition: background-size 0.5s cubic-bezier(0.22, 1, 0.36, 1);
}

.editorial-card__about {
  position: relative;
  z-index: 1;
  font-family: var(--font-body);
  font-size: 0.85rem;
  color: var(--text-secondary);
  line-height: 1.65;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.editorial-card__chips {
  position: relative;
  z-index: 1;
  display: flex;
  flex-wrap: wrap;
  gap: 0.3rem;
}

.editorial-card__chip {
  font-family: var(--font-mono);
  font-size: 0.62rem;
  font-weight: 600;
  padding: 0.18rem 0.45rem;
  border-radius: 5px;
  background: rgba(192, 132, 252, 0.08);
  color: rgba(192, 132, 252, 0.85);
  border: 1px solid rgba(192, 132, 252, 0.2);
  white-space: nowrap;
  transition: background 0.3s ease, border-color 0.3s ease;

  .editorial-card:hover & {
    background: rgba(192, 132, 252, 0.12);
    border-color: rgba(192, 132, 252, 0.35);
  }
}

.editorial-card__cta {
  position: relative;
  z-index: 1;
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  width: fit-content;
  font-size: 0.8rem;
  transition: transform 0.3s ease;
}

/* ══════════════════════════════════════
   KEYFRAMES
   ══════════════════════════════════════ */

/* Border */
@keyframes borderSpin {
  0%   { background-position: 0% 50%; }
  100% { background-position: 400% 50%; }
}

@keyframes borderPulse {
  0%, 100% { opacity: 0.6; }
  50%       { opacity: 1; }
}

/* Badge */
@keyframes badgeGlow {
  0%, 100% {
    box-shadow: 0 0 0 0 var(--badge-glow-color, transparent);
    filter: brightness(1);
  }
  50% {
    box-shadow: 0 0 14px 3px var(--badge-glow-color, transparent);
    filter: brightness(1.15);
  }
}

/* Ambient image glow */
@keyframes ambientDrift {
  0%   { transform: translate(0, 0) scale(1); }
  50%  { transform: translate(10%, -15%) scale(1.1); }
  100% { transform: translate(-5%, -5%) scale(0.95); }
}

/* Soft color fade drift */
@keyframes softColorDrift {
  0%   { transform: translate(0, 0) scale(1); }
  50%  { transform: translate(4%, -3%) scale(1.06); }
  100% { transform: translate(-3%, 4%) scale(0.97); }
}

/* ══════════════════════════════════════
   RESPONSIVE
   ══════════════════════════════════════ */
@media (max-width: 768px) {
  .editorial-wrap .editorial-card,
  .editorial-wrap--reversed .editorial-card {
    grid-template-columns: 1fr;
  }

  .editorial-card__media {
    min-height: 200px;
    order: 0 !important;
  }

  .editorial-card__content {
    order: 1 !important;
    padding: 1.5rem;
  }
}

/* ══════════════════════════════════════
   REDUCED MOTION
   ══════════════════════════════════════ */
@media (prefers-reduced-motion: reduce) {
  .editorial-card,
  .editorial-card__img,
  .editorial-card__shine,
  .editorial-card__ambient,
  .editorial-card__techbg,
  .editorial-card__title,
  .editorial-wrap::before,
  .rank-badge {
    transition: none !important;
    animation: none !important;
  }

}
</style>
