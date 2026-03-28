<template>
  <v-container class="w-100 d-flex flex-column pa-0 align-center">
    <div class="filter-chips d-flex w-100 justify-center align-center">
      <v-chip-group
        v-model="selectedCategory"
        class="display-1"
        color="primary"
        column
        mandatory
      >
        <v-chip class="ma-1" value="all" variant="outlined">{{ $t('filters.all') }}</v-chip>
        <v-chip class="ma-1" value="web" variant="outlined">{{ $t('filters.web') }}</v-chip>
        <v-chip class="ma-1" value="Python" variant="outlined">{{ $t('filters.python') }}</v-chip>
      </v-chip-group>
    </div>

    <TransitionGroup
      class="project-card-grid mt-8 mb-8"
      name="card-filter"
      tag="div"
    >
      <div
        v-for="(project, index) in filteredProjects"
        :key="project.id"
        :aria-label="`${$t('projects.viewDetails')} - ${project.name}`"
        class="rank-border-wrap"
        :class="`rank-border-wrap--${project.rank}`"
        role="button"
        :style="{ transitionDelay: index * 60 + 'ms' }"
        tabindex="0"
        @click="dialog.openDialog(project)"
        @keydown.enter="dialog.openDialog(project)"
        @keydown.space.prevent="dialog.openDialog(project)"
      >
        <div
          class="project-card"
          @mouseleave="onCardMouseLeave"
          @mousemove="onCardMouseMove"
        >
          <div class="project-card__media">
            <v-parallax class="project-card__parallax" :src="project.img" />
            <div aria-hidden="true" class="project-card__shine" />
            <div aria-hidden="true" class="project-card__gradient" />

            <div
              :aria-label="`Rank ${RANK_META[project.rank].label}`"
              class="rank-badge"
              :class="`rank-badge--${project.rank}`"
            >
              <v-icon :icon="RANK_META[project.rank].icon" size="14" />
              <span>{{ RANK_META[project.rank].label }}</span>
            </div>

            <div class="project-card__interactive">
              <div class="project-card__cta-row">
                <span class="project-card__cta-label">{{ $t('projects.viewDetails') }}</span>
                <v-icon class="project-card__cta-icon" size="20">mdi-arrow-right-circle</v-icon>
              </div>
            </div>
          </div>
          <div class="project-card__body">
            <h4 class="project-card__title">{{ project.name }}</h4>
            <div class="project-card__chips">
              <span
                v-for="tech in project.techStack"
                :key="tech"
                class="project-card__tech-chip"
              >{{ tech }}</span>
            </div>
          </div>
        </div>
      </div>
    </TransitionGroup>
  </v-container>
</template>

<script setup>
  import { computed, onMounted, ref } from 'vue'
  import { useI18n } from 'vue-i18n'
  import { projects } from '@/data/projects'
  import { RANK_META } from '@/data/rankMeta'
  import { useDialogStore } from '@/stores/dialogProjects'

  const { t } = useI18n()
  const selectedCategory = ref('all')
  const dialog = useDialogStore()
  const projectItems = ref(projects)
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

  const filteredProjects = computed(() => {
    if (selectedCategory.value === 'all') return projectItems.value
    return projectItems.value.filter(p => p.category === selectedCategory.value)
  })
</script>

<style scoped lang="scss">
/* ---- Bento Grid ---- */
.project-card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 1.5rem;
  width: 100%;
  position: relative;
}

@media (max-width: 599px) {
  .project-card-grid {
    grid-template-columns: 1fr;
  }
}

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

/* Hover: glow especial por rank */
.rank-border-wrap--S:hover::before { animation-duration: 1.5s; }
.rank-border-wrap--S:hover .project-card { filter: drop-shadow(0 0 16px rgba(255, 215, 0, 0.5)); }
.rank-border-wrap--A:hover .project-card { box-shadow: 0 0 30px rgba(192, 132, 252, 0.4); }
.rank-border-wrap--B:hover .project-card { box-shadow: 0 0 25px rgba(56, 189, 248, 0.35); }
.rank-border-wrap--C:hover .project-card { box-shadow: 0 0 18px rgba(148, 163, 184, 0.25); }

/* ---- Bento rank sizing ---- */
.rank-border-wrap--S {
  grid-column: span 2;
  grid-row: span 2;

  @media (max-width: 599px) {
    grid-column: span 1;
    grid-row: span 1;
  }
}

.rank-border-wrap--A {
  grid-row: span 2;

  @media (max-width: 599px) {
    grid-row: span 1;
  }
}

/* ---- Card ---- */
.project-card {
  position: relative;
  height: 100%;
  width: 100%;
  min-height: clamp(18rem, 26vw, 24rem);
  border-radius: 14px;
  overflow: hidden;
  border: none;
  background: var(--bg-card);
  box-shadow: 0 10px 28px var(--shadow-heavy);
  transition:
    transform 0.4s cubic-bezier(0.34, 1.2, 0.64, 1),
    box-shadow 0.4s ease;
  z-index: 1;

  &:hover,
  .rank-border-wrap:hover & {
    transform: translateY(-8px) scale(1.02);

    .project-card__shine {
      opacity: 1;
      transform: translateX(120%) skewX(-12deg);
    }

    .project-card__gradient {
      opacity: 1;
    }

    .project-card__interactive {
      opacity: 1;
      transform: translateY(0);
    }

    .project-card__cta-icon {
      transform: translateX(4px);
    }
  }
}

/* ---- Media ---- */
.project-card__media {
  position: relative;
  height: 65%;
  overflow: hidden;
}

.project-card__parallax {
  height: 100% !important;
}

.project-card__shine {
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

.project-card__gradient {
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

/* ---- Rank badge ---- */
.rank-badge {
  position: absolute;
  top: 0.6rem;
  left: 0.6rem;
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
  padding: 0.35rem 0.7rem;
}
.rank-badge--A {
  color: #c084fc;
  background: rgba(192, 132, 252, 0.15);
  border-color: rgba(192, 132, 252, 0.4);
  clip-path: polygon(8% 0%, 92% 0%, 100% 50%, 92% 100%, 8% 100%, 0% 50%);
  border: none;
  padding: 0.3rem 0.65rem;
}
.rank-badge--B {
  color: #38bdf8;
  background: rgba(56, 189, 248, 0.15);
  border-color: rgba(56, 189, 248, 0.4);
  box-shadow: inset 0 0 0 1px rgba(56, 189, 248, 0.2);
}
.rank-badge--C {
  color: #94a3b8;
  background: rgba(148, 163, 184, 0.12);
  border-color: rgba(148, 163, 184, 0.35);
}

/* ---- Interactive overlay ---- */
.project-card__interactive {
  position: absolute;
  inset: 0;
  z-index: 3;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-end;
  padding: 0.65rem;
  opacity: 0;
  transform: translateY(8px);
  transition: opacity 0.35s ease, transform 0.35s ease;
  pointer-events: none;
}

.project-card__cta-row {
  display: flex;
  align-items: center;
  gap: 0.35rem;
}

.project-card__cta-label {
  font-size: 0.75rem;
  font-weight: 700;
  color: #fff;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.6);
}

.project-card__cta-icon {
  color: #5b6fff;
  filter: drop-shadow(0 0 8px rgba(91, 111, 255, 0.5));
  transition: transform 0.35s ease;
}

/* ---- Body ---- */
.project-card__body {
  height: 35%;
  padding: 0.75rem;
  background: var(--card-body-bg);
  border-top: 1px solid var(--border-subtle);
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.5rem;
}

.project-card__title {
  font-family: var(--font-heading);
  font-size: 0.95rem;
  font-weight: 700;
  color: #fff;
  margin: 0;
  line-height: 1.2;
}

.project-card__chips {
  display: flex;
  flex-wrap: wrap;
  gap: 0.3rem;
}

.project-card__tech-chip {
  font-family: var(--font-mono);
  font-size: 0.62rem;
  font-weight: 600;
  padding: 0.15rem 0.45rem;
  border-radius: 5px;
  background: rgba(78, 204, 163, 0.1);
  color: rgba(78, 204, 163, 0.85);
  border: 1px solid rgba(78, 204, 163, 0.2);
  white-space: nowrap;
}

/* ---- Filter chips ---- */
.filter-chips :deep(.v-chip--selected) {
  transform: scale(1.06);
  transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1),
              background 0.2s ease;
}

/* ---- TransitionGroup ---- */
.card-filter-enter-active {
  transition:
    opacity 0.45s cubic-bezier(0.22, 1, 0.36, 1),
    transform 0.45s cubic-bezier(0.22, 1, 0.36, 1);
}

.card-filter-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
  position: absolute;
}

.card-filter-enter-from {
  opacity: 0;
  transform: scale(0.88) translateY(20px) rotate(-1deg);
}

.card-filter-leave-to {
  opacity: 0;
  transform: scale(0.88) translateY(-10px);
}

.card-filter-move {
  transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1);
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
</style>
