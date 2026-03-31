<template>
  <div
    :aria-label="`${t('allProjects.viewDetails')} - ${project.name}`"
    class="rank-border-wrap"
    :class="`rank-border-wrap--${project.rank}`"
    role="button"
    tabindex="0"
    @click="dialog.openDialog(project)"
    @keydown.enter="dialog.openDialog(project)"
    @keydown.space.prevent="dialog.openDialog(project)"
  >
    <article
      class="catalog-card"
      @mouseleave="onCardMouseLeave"
      @mousemove="onCardMouseMove"
    >
      <div class="catalog-card__media">
        <img
          :alt="project.name"
          class="catalog-card__img"
          loading="lazy"
          :src="project.img"
        >
        <div aria-hidden="true" class="catalog-card__gradient" />
        <div aria-hidden="true" class="catalog-card__shine" />

        <div
          :aria-label="`Rank ${RANK_META[project.rank]?.label}`"
          class="rank-badge"
          :class="`rank-badge--${project.rank}`"
        >
          <v-icon :icon="RANK_META[project.rank]?.icon" size="12" />
          <span>{{ RANK_META[project.rank]?.label }}</span>
        </div>

        <div class="catalog-card__overlay">
          <div class="catalog-card__cta-row">
            <span class="catalog-card__cta-label">{{ t('allProjects.viewDetails') }}</span>
            <v-icon size="18">mdi-arrow-right-circle</v-icon>
          </div>
        </div>
      </div>

      <!-- Soft color fade background -->
      <div aria-hidden="true" class="catalog-card__fade" />

      <div class="catalog-card__body">
        <h4 class="catalog-card__title">{{ project.name }}</h4>
        <div class="catalog-card__chips">
          <span
            v-for="tech in project.techStack"
            :key="tech"
            class="catalog-card__chip"
          >{{ tech }}</span>
        </div>
      </div>
    </article>
  </div>
</template>

<script setup>
  import { onMounted, ref } from 'vue'
  import { useI18n } from 'vue-i18n'
  import { RANK_META } from '@/data/rankMeta'
  import { useDialogStore } from '@/stores/dialogProjects'

  defineProps({
    project: { type: Object, required: true },
    index: { type: Number, default: 0 },
  })

  const { t } = useI18n()
  const dialog = useDialogStore()
  const prefersReducedMotion = ref(false)

  onMounted(() => {
    prefersReducedMotion.value = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  })

  function onCardMouseMove (event) {
    if (prefersReducedMotion.value) return
    const el = event.currentTarget
    const rect = el.getBoundingClientRect()
    const x = (event.clientX - rect.left) / rect.width - 0.5
    const y = (event.clientY - rect.top) / rect.height - 0.5
    el.style.transform = `perspective(600px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) translateY(-8px) scale(1.02)`
  }

  function onCardMouseLeave (event) {
    event.currentTarget.style.transform = ''
  }
</script>

<style scoped lang="scss">
/* ---- Rank border wrapper ---- */
.rank-border-wrap {
  position: relative;
  border-radius: 16px;
  padding: 2px;
  cursor: pointer;

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: inherit;
    background-size: 400% 400%;
    animation: rankBorderSpin 4s linear infinite, rankGlowPulse 2s ease-in-out infinite;
    z-index: 0;
  }

  &:focus-visible {
    outline: 2px solid var(--border-accent);
    outline-offset: 4px;
  }
}

.rank-border-wrap--S::before {
  background: linear-gradient(135deg, #ffd700, #ff6b35, #ff0080, #a855f7, #4ecca3, #5b6fff, #ffd700);
}
.rank-border-wrap--A::before {
  background: linear-gradient(135deg, #c084fc, #818cf8, #6366f1, #c084fc);
}
.rank-border-wrap--B::before {
  background: linear-gradient(135deg, #38bdf8, #4ecca3, #0ea5e9, #38bdf8);
}
.rank-border-wrap--C::before {
  background: linear-gradient(135deg, #94a3b8, #64748b, #475569, #94a3b8);
  animation-duration: 8s;
}

.rank-border-wrap--S:hover::before { animation-duration: 1.5s; }
.rank-border-wrap--S:hover .catalog-card { filter: drop-shadow(0 0 16px rgba(255, 215, 0, 0.5)); }
.rank-border-wrap--A:hover .catalog-card { box-shadow: 0 0 30px rgba(192, 132, 252, 0.4); }
.rank-border-wrap--B:hover .catalog-card { box-shadow: 0 0 25px rgba(56, 189, 248, 0.35); }
.rank-border-wrap--C:hover .catalog-card { box-shadow: 0 0 18px rgba(148, 163, 184, 0.25); }

/* ---- Card ---- */
.catalog-card {
  position: relative;
  height: 100%;
  width: 100%;
  border-radius: 14px;
  overflow: hidden;
  background: var(--bg-card);
  box-shadow: 0 10px 28px var(--shadow-heavy);
  transition: transform 0.4s cubic-bezier(0.34, 1.2, 0.64, 1),
              box-shadow 0.4s ease;
  z-index: 1;

  &:hover,
  .rank-border-wrap:hover & {
    .catalog-card__shine {
      opacity: 1;
      transform: translateX(120%) skewX(-12deg);
    }

    .catalog-card__gradient {
      opacity: 1;
    }

    .catalog-card__overlay {
      opacity: 1;
      transform: translateY(0);
    }
  }
}

/* ---- Media ---- */
.catalog-card__media {
  position: relative;
  aspect-ratio: 16 / 9;
  overflow: hidden;
}

.catalog-card__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.rank-border-wrap:hover .catalog-card__img {
  transform: scale(1.05);
}

.catalog-card__gradient {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to top,
    rgba(10, 15, 30, 0.85) 0%,
    rgba(78, 204, 163, 0.08) 50%,
    transparent 100%
  );
  opacity: 0.65;
  transition: opacity 0.35s ease;
  z-index: 1;
  pointer-events: none;
}

.catalog-card__shine {
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
  z-index: 2;
}

/* ---- Rank badge ---- */
.rank-badge {
  position: absolute;
  top: 0.6rem;
  left: 0.6rem;
  z-index: 4;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.22rem 0.5rem;
  border-radius: 7px;
  font-family: var(--font-mono);
  font-size: 0.6rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  backdrop-filter: blur(10px);
  border: 1px solid;
  span { line-height: 1; }
}

.rank-badge--S {
  color: #ffd700;
  background: rgba(255, 215, 0, 0.15);
  border-color: rgba(255, 215, 0, 0.45);
  clip-path: polygon(50% 0%, 100% 15%, 100% 85%, 50% 100%, 0% 85%, 0% 15%);
  border: none;
  padding: 0.3rem 0.6rem;
}
.rank-badge--A {
  color: #c084fc;
  background: rgba(192, 132, 252, 0.15);
  border-color: rgba(192, 132, 252, 0.4);
  clip-path: polygon(8% 0%, 92% 0%, 100% 50%, 92% 100%, 8% 100%, 0% 50%);
  border: none;
}
.rank-badge--B {
  color: #38bdf8;
  background: rgba(56, 189, 248, 0.15);
  border-color: rgba(56, 189, 248, 0.4);
}
.rank-badge--C {
  color: #94a3b8;
  background: rgba(148, 163, 184, 0.12);
  border-color: rgba(148, 163, 184, 0.35);
}

/* ---- Overlay ---- */
.catalog-card__overlay {
  position: absolute;
  inset: 0;
  z-index: 3;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  padding: 0.65rem;
  opacity: 0;
  transform: translateY(8px);
  transition: opacity 0.35s ease, transform 0.35s ease;
  pointer-events: none;
}

.catalog-card__cta-row {
  display: flex;
  align-items: center;
  gap: 0.3rem;
}

.catalog-card__cta-label {
  font-size: 0.72rem;
  font-weight: 700;
  color: #fff;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.6);
}

.catalog-card__cta-row .v-icon {
  color: var(--accent-blue);
  filter: drop-shadow(0 0 8px rgba(91, 111, 255, 0.5));
}

/* ---- Soft color fade ---- */
.catalog-card__fade {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 0;
  opacity: 0.1;
  transition: opacity 0.5s ease;
  background:
    radial-gradient(ellipse 55% 50% at 25% 35%, var(--tier-fade-a, rgba(78, 204, 163, 0.12)), transparent 70%),
    radial-gradient(ellipse 45% 55% at 75% 65%, var(--tier-fade-b, rgba(91, 111, 255, 0.08)), transparent 70%);
  animation: softFadeDrift var(--tier-drift-speed, 14s) ease-in-out infinite alternate;
}

.rank-border-wrap:hover .catalog-card__fade {
  opacity: 0.18;
}

.rank-border-wrap--S .catalog-card {
  --tier-fade-a: rgba(255, 215, 0, 0.18);
  --tier-fade-b: rgba(168, 85, 247, 0.12);
  --tier-drift-speed: 12s;
}

.rank-border-wrap--A .catalog-card {
  --tier-fade-a: rgba(192, 132, 252, 0.16);
  --tier-fade-b: rgba(91, 111, 255, 0.1);
  --tier-drift-speed: 12s;
}

.rank-border-wrap--B .catalog-card {
  --tier-fade-a: rgba(56, 189, 248, 0.14);
  --tier-fade-b: rgba(78, 204, 163, 0.09);
  --tier-drift-speed: 18s;
}

.rank-border-wrap--C .catalog-card {
  --tier-fade-a: rgba(148, 163, 184, 0.1);
  --tier-fade-b: rgba(100, 116, 139, 0.07);
  --tier-drift-speed: 25s;
}

@keyframes softFadeDrift {
  0%   { transform: translate(0, 0) scale(1); }
  50%  { transform: translate(4%, -3%) scale(1.06); }
  100% { transform: translate(-3%, 4%) scale(0.97); }
}

/* ---- Body ---- */
.catalog-card__body {
  padding: 0.75rem;
  background: var(--bg-card);
  border-top: 1px solid var(--border-subtle);
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
}

.catalog-card__title {
  font-family: var(--font-heading);
  font-size: 0.9rem;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0;
  line-height: 1.2;
}

.catalog-card__chips {
  display: flex;
  flex-wrap: wrap;
  gap: 0.25rem;
}

.catalog-card__chip {
  font-family: var(--font-mono);
  font-size: 0.6rem;
  font-weight: 600;
  padding: 0.15rem 0.4rem;
  border-radius: 5px;
  background: rgba(78, 204, 163, 0.1);
  color: rgba(78, 204, 163, 0.85);
  border: 1px solid rgba(78, 204, 163, 0.2);
  white-space: nowrap;
}

/* ---- Keyframes ---- */
@keyframes rankBorderSpin {
  0%   { background-position: 0% 50%; }
  100% { background-position: 400% 50%; }
}

@keyframes rankGlowPulse {
  0%, 100% { opacity: 0.7; }
  50%       { opacity: 1; }
}

@media (prefers-reduced-motion: reduce) {
  .catalog-card,
  .catalog-card__img,
  .catalog-card__shine,
  .rank-border-wrap::before {
    transition: none !important;
    animation: none !important;
  }
}
</style>
