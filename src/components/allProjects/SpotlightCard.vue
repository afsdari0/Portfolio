<template>
  <div class="spotlight-wrap">
    <article
      :aria-label="`Spotlight: ${project.name}`"
      class="spotlight-card"
      role="button"
      tabindex="0"
      @click="dialog.openDialog(project)"
      @keydown.enter="dialog.openDialog(project)"
      @keydown.space.prevent="dialog.openDialog(project)"
      @mousemove="onMouseMove"
      @mouseleave="onMouseLeave"
    >
      <div ref="mediaRef" class="spotlight-card__media">
        <img
          :alt="project.name"
          class="spotlight-card__img"
          loading="lazy"
          :src="project.img"
        >
        <div aria-hidden="true" class="spotlight-card__scrim" />
        <div aria-hidden="true" class="spotlight-card__shine" />
        <div aria-hidden="true" class="spotlight-card__ambient" />
      </div>

      <div class="spotlight-card__content">
        <!-- Tech-themed animated background -->
        <div aria-hidden="true" class="spotlight-card__techbg" />

        <div
          :aria-label="`Rank ${RANK_META.S.label}`"
          class="rank-badge"
        >
          <v-icon :icon="RANK_META.S.icon" size="16" />
          <span>{{ RANK_META.S.label }}</span>
        </div>

        <h3 class="spotlight-card__title">{{ project.name }}</h3>

        <p class="spotlight-card__about">
          {{ localizedAbout }}
        </p>

        <div class="spotlight-card__chips">
          <span
            v-for="tech in project.techStack"
            :key="tech"
            class="spotlight-card__chip"
          >{{ tech }}</span>
        </div>

        <button class="glow-btn spotlight-card__cta" tabindex="-1">
          <v-icon size="16">mdi-arrow-right-circle</v-icon>
          {{ t('allProjects.viewDetails') }}
        </button>
      </div>
    </article>
  </div>
</template>

<script setup>
  import { computed, ref } from 'vue'
  import { useI18n } from 'vue-i18n'
  import { RANK_META } from '@/data/rankMeta'
  import { useCardTilt } from '@/composables/useCardTilt'
  import { useDialogStore } from '@/stores/dialogProjects'
  import { useLocaleStore } from '@/stores/locale'

  const props = defineProps({
    project: { type: Object, required: true },
    index: { type: Number, default: 0 },
  })

  const { t } = useI18n()
  const dialog = useDialogStore()
  const localeStore = useLocaleStore()
  const mediaRef = ref(null)

  const localizedAbout = computed(() => {
    const about = props.project.about
    if (typeof about === 'string') return about
    return about?.[localeStore.locale] || about?.['pt-BR'] || ''
  })

  const { onMouseMove, onMouseLeave } = useCardTilt({
    maxDeg: 3,
    perspective: 1000,
    extraTransform: 'translateY(-8px)',
  })
</script>

<style scoped lang="scss">
/* ══════════════════════════════════════
   S-RANK BORDER WRAPPER — rainbow animated
   ══════════════════════════════════════ */
.spotlight-wrap {
  position: relative;
  border-radius: 22px;
  padding: 2px;

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: inherit;
    background: linear-gradient(
      135deg,
      #ffd700, #ff6b35, #ff0080, #a855f7, #4ecca3, #5b6fff, #ffd700
    );
    background-size: 400% 400%;
    animation: spotBorderSpin 3s linear infinite, spotBorderPulse 2s ease-in-out infinite;
    animation-play-state: paused;
    z-index: 0;
  }

  &:hover::before {
    animation-play-state: running;
    animation-duration: 1.2s, 1s;
  }
}

/* ══════════════════════════════════════
   CARD
   ══════════════════════════════════════ */
.spotlight-card {
  position: relative;
  display: grid;
  grid-template-columns: 1.4fr 1fr;
  gap: 0;
  min-height: 360px;
  border-radius: 20px;
  overflow: hidden;
  background: var(--bg-card);
  box-shadow: 0 12px 40px var(--shadow-heavy);
  cursor: pointer;
  z-index: 1;
  transition:
    transform 0.5s cubic-bezier(0.22, 1, 0.36, 1),
    box-shadow 0.5s ease;

  &:hover {
    box-shadow:
      0 16px 50px rgba(255, 215, 0, 0.12),
      0 8px 30px rgba(168, 85, 247, 0.08),
      0 20px 60px var(--shadow-heavy);

    .spotlight-card__img { transform: scale(1.06); }

    .spotlight-card__shine {
      opacity: 1;
      transform: translateX(120%) skewX(-12deg);
    }

    .spotlight-card__ambient { opacity: 0.5; }
    .spotlight-card__title { background-size: 100% 2px; }
    .spotlight-card__cta { transform: translateX(4px); }
    .spotlight-card__techbg { opacity: 0.18; }
  }

  &:focus-visible {
    outline: 2px solid #ffd700;
    outline-offset: 4px;
  }
}

/* ══════════════════════════════════════
   MEDIA
   ══════════════════════════════════════ */
.spotlight-card__media {
  position: relative;
  overflow: hidden;
}

.spotlight-card__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s cubic-bezier(0.22, 1, 0.36, 1);
}

.spotlight-card__scrim {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    135deg,
    rgba(10, 15, 30, 0.3) 0%,
    rgba(255, 215, 0, 0.04) 100%
  );
  pointer-events: none;
}

.spotlight-card__shine {
  position: absolute;
  inset: 0;
  width: 50%;
  background: linear-gradient(
    105deg,
    transparent 0%,
    rgba(255, 215, 0, 0.08) 25%,
    rgba(168, 85, 247, 0.1) 50%,
    rgba(78, 204, 163, 0.07) 75%,
    transparent 100%
  );
  opacity: 0;
  transform: translateX(-80%) skewX(-12deg);
  transition: transform 0.7s ease, opacity 0.35s ease;
  pointer-events: none;
  z-index: 1;
}

/* Ambient glow on image */
.spotlight-card__ambient {
  position: absolute;
  bottom: -15%;
  left: 25%;
  width: 50%;
  height: 50%;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(255, 215, 0, 0.25), rgba(168, 85, 247, 0.15), transparent 70%);
  filter: blur(40px);
  opacity: 0.25;
  animation: spotAmbientDrift 5s ease-in-out infinite alternate;
  pointer-events: none;
  z-index: 1;
}

/* ══════════════════════════════════════
   SOFT COLOR FADE — S tier (gold/warm)
   ══════════════════════════════════════ */
.spotlight-card__techbg {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 0;
  opacity: 0.1;
  transition: opacity 0.5s ease;
  background:
    radial-gradient(ellipse 55% 50% at 25% 35%, rgba(255, 215, 0, 0.18), transparent 70%),
    radial-gradient(ellipse 45% 55% at 75% 65%, rgba(168, 85, 247, 0.12), transparent 70%),
    radial-gradient(ellipse 50% 40% at 50% 50%, rgba(78, 204, 163, 0.08), transparent 70%);
  animation: softColorDrift 10s ease-in-out infinite alternate;
}

/* ══════════════════════════════════════
   RANK BADGE — S tier
   ══════════════════════════════════════ */
.rank-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  width: fit-content;
  padding: 0.4rem 0.8rem;
  font-family: var(--font-mono);
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: #ffd700;
  background: rgba(255, 215, 0, 0.35);
  clip-path: polygon(50% 0%, 100% 15%, 100% 85%, 50% 100%, 0% 85%, 0% 15%);
  border: none;
  animation: spotBadgeGlow 2s ease-in-out infinite;
  position: relative;
  z-index: 1;
}

/* ══════════════════════════════════════
   CONTENT
   ══════════════════════════════════════ */
.spotlight-card__content {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  padding: 2rem;
  overflow: hidden;
}

.spotlight-card__title {
  position: relative;
  z-index: 1;
  font-family: var(--font-heading);
  font-size: clamp(1.5rem, 3vw, 2.2rem);
  font-weight: 800;
  color: var(--text-primary);
  line-height: 1.15;
  margin: 0;
  background-image: linear-gradient(90deg, #ffd700, #ff6b35, #a855f7, #4ecca3);
  background-size: 0% 2px;
  background-position: left bottom;
  background-repeat: no-repeat;
  padding-bottom: 4px;
  transition: background-size 0.5s cubic-bezier(0.22, 1, 0.36, 1);
}

.spotlight-card__about {
  position: relative;
  z-index: 1;
  font-family: var(--font-body);
  font-size: 0.9rem;
  color: var(--text-secondary);
  line-height: 1.6;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.spotlight-card__chips {
  position: relative;
  z-index: 1;
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
}

.spotlight-card__chip {
  font-family: var(--font-mono);
  font-size: 0.65rem;
  font-weight: 600;
  padding: 0.2rem 0.5rem;
  border-radius: 6px;
  background: rgba(255, 215, 0, 0.08);
  color: rgba(255, 215, 0, 0.85);
  border: 1px solid rgba(255, 215, 0, 0.2);
  white-space: nowrap;
  transition: background 0.3s ease, border-color 0.3s ease;

  .spotlight-card:hover & {
    background: rgba(255, 215, 0, 0.14);
    border-color: rgba(255, 215, 0, 0.4);
  }
}

.spotlight-card__cta {
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
@keyframes spotBorderSpin {
  0%   { background-position: 0% 50%; }
  100% { background-position: 400% 50%; }
}

@keyframes spotBorderPulse {
  0%, 100% { opacity: 0.65; }
  50%       { opacity: 1; }
}

@keyframes spotBadgeGlow {
  0%, 100% {
    box-shadow: 0 0 0 0 rgba(255, 215, 0, 0);
    filter: brightness(1);
  }
  50% {
    box-shadow: 0 0 16px 4px rgba(255, 215, 0, 0.25);
    filter: brightness(1.2);
  }
}

@keyframes spotAmbientDrift {
  0%   { transform: translate(0, 0) scale(1); }
  50%  { transform: translate(8%, -12%) scale(1.15); }
  100% { transform: translate(-4%, -4%) scale(0.9); }
}

@keyframes softColorDrift {
  0%   { transform: translate(0, 0) scale(1); }
  50%  { transform: translate(4%, -3%) scale(1.06); }
  100% { transform: translate(-3%, 4%) scale(0.97); }
}

/* ══════════════════════════════════════
   RESPONSIVE
   ══════════════════════════════════════ */
@media (max-width: 768px) {
  .spotlight-card {
    grid-template-columns: 1fr;
  }

  .spotlight-card__media {
    height: clamp(200px, 40vw, 320px);
  }

  .spotlight-card__content {
    padding: 1.5rem;
  }
}

/* ══════════════════════════════════════
   REDUCED MOTION
   ══════════════════════════════════════ */
@media (prefers-reduced-motion: reduce) {
  .spotlight-card,
  .spotlight-card__img,
  .spotlight-card__shine,
  .spotlight-card__ambient,
  .spotlight-card__techbg,
  .spotlight-card__title,
  .spotlight-wrap::before,
  .rank-badge {
    transition: none !important;
    animation: none !important;
  }

}
</style>
