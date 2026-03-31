<template>
  <v-container class="mainContainer w-100 d-flex flex-column pa-0 align-center">
    <SiteNav />

    <v-container class="indexContainer all-projects-page pa-0">
      <main class="all-projects-main">

        <!-- ═══════ HERO ═══════ -->
        <section
          aria-labelledby="ap-hero-heading"
          class="ap-hero"
        >
          <!-- Parallax orbs -->
          <div
            aria-hidden="true"
            class="ap-hero__orb ap-hero__orb--teal"
            :style="{ transform: `translateY(${scrollY * 0.12}px)` }"
          />
          <div
            aria-hidden="true"
            class="ap-hero__orb ap-hero__orb--blue"
            :style="{ transform: `translateY(${scrollY * -0.08}px)` }"
          />
          <div
            aria-hidden="true"
            class="ap-hero__orb ap-hero__orb--purple"
            :style="{ transform: `translateY(${scrollY * 0.06}px)` }"
          />

          <!-- Decorative shapes -->
          <div aria-hidden="true" class="section-deco--circle ap-hero__deco ap-hero__deco--1" />
          <div aria-hidden="true" class="section-deco--hexagon ap-hero__deco ap-hero__deco--2" />

          <div class="ap-hero__content">
            <span class="ap-hero__label">{{ t('nav.allProjects') }}</span>

            <h1 id="ap-hero-heading" class="ap-hero__title gradient-text">
              {{ t('allProjects.title') }}
            </h1>

            <p class="ap-hero__subtitle">
              {{ t('allProjects.subtitle') }}
            </p>

            <!-- Animated counter -->
            <div class="ap-hero__counter">
              <span class="ap-hero__counter-number">{{ animatedCount }}</span>
              <span class="ap-hero__counter-label">{{ t('allProjects.statsTotal') }}</span>
            </div>

            <!-- Rank distribution bar -->
            <RankDistributionBar
              ref="rankBarRef"
              :projects="projects"
              @scroll-to-rank="scrollToRank"
            />
          </div>

          <!-- No fade/scroll-hint — seamless flow into content -->
        </section>

        <!-- ═══════ STICKY FILTER BAR ═══════ -->
        <StickyFilterBar
          v-model="selectedCategory"
          :categories="categoryList"
          :total-count="projects.length"
        />

        <!-- ═══════ ALL PROJECTS GRID ═══════ -->
        <section class="ap-projects">
          <div class="ap-projects__grid">
            <div
              v-for="(project, i) in filteredProjects"
              :key="project.id"
              v-intersect="{ handler: onSectionIntersect, options: { threshold: 0.1 } }"
              class="ap-card-slot section-animate--scale"
              :class="`ap-card-slot--${project.rank}`"
              :style="{ transitionDelay: i * 80 + 'ms' }"
            >
              <CatalogCard :index="i" :project="project" />
            </div>
          </div>
        </section>

        <!-- ═══════ NO RESULTS ═══════ -->
        <Transition name="fade">
          <div
            v-if="filteredProjects.length === 0"
            class="ap-no-results"
          >
            <v-icon color="secondary" size="48">mdi-magnify-close</v-icon>
            <p>{{ t('allProjects.noResults') }}</p>
          </div>
        </Transition>

        <!-- ═══════ STATS FOOTER ═══════ -->
        <section
          v-intersect="{ handler: onStatsIntersect, options: { threshold: 0.3 } }"
          class="ap-stats section-animate--blur"
        >
          <div class="ap-stats__grid">
            <div class="ap-stats__item">
              <span class="ap-stats__number">{{ animatedStatsTotal }}</span>
              <span class="ap-stats__label">{{ t('allProjects.statsTotal') }}</span>
            </div>
            <div class="ap-stats__item">
              <span class="ap-stats__number">{{ topTierLabel }}</span>
              <span class="ap-stats__label">{{ t('allProjects.statsTopTier') }}</span>
            </div>
            <div class="ap-stats__item">
              <span class="ap-stats__number">{{ uniqueCategories }}</span>
              <span class="ap-stats__label">{{ t('allProjects.statsCategories') }}</span>
            </div>
          </div>

          <button class="glow-btn ap-stats__cta" @click="$router.push('/')">
            <v-icon size="18">mdi-home-variant-outline</v-icon>
            {{ t('allProjects.backToHub') }}
          </button>
        </section>

      </main>
    </v-container>
  </v-container>
  <Footer />
</template>

<script setup>
  import { computed, nextTick, onMounted, ref } from 'vue'
  import { useI18n } from 'vue-i18n'
  import CatalogCard from '@/components/allProjects/CatalogCard.vue'
  import RankDistributionBar from '@/components/allProjects/RankDistributionBar.vue'
  import StickyFilterBar from '@/components/allProjects/StickyFilterBar.vue'
  import { useScrollAnimation } from '@/composables/useScrollAnimation'
  import { projects } from '@/data/projects'
  import { RANK_META } from '@/data/rankMeta'

  const { t } = useI18n()
  const { scrollY } = useScrollAnimation()

  /* ── State ── */
  const selectedCategory = ref('all')
  const animatedCount = ref(0)
  const animatedStatsTotal = ref(0)
  const rankBarRef = ref(null)

  /* ── Filtered data ── */
  const filteredProjects = computed(() => {
    if (selectedCategory.value === 'all') return projects
    return projects.filter(p => p.category === selectedCategory.value)
  })

  /* ── Categories for filter bar ── */
  const categoryList = computed(() => {
    const cats = [...new Set(projects.map(p => p.category))]
    return cats.map(cat => ({
      value: cat,
      label: t(`filters.${cat.toLowerCase()}`, cat),
      count: projects.filter(p => p.category === cat).length,
    }))
  })

  /* ── Stats ── */
  const topTierLabel = computed(() => {
    for (const rank of ['S', 'A', 'B', 'C']) {
      if (projects.some(p => p.rank === rank)) return RANK_META[rank].label
    }
    return '—'
  })

  const uniqueCategories = computed(() => new Set(projects.map(p => p.category)).size)

  /* ── Count-up animation ── */
  function animateCount (target, setter, duration = 800) {
    const start = performance.now()
    function step (now) {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setter(Math.round(eased * target))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }

  onMounted(() => {
    animateCount(projects.length, v => {
      animatedCount.value = v
    })
    nextTick(() => {
      rankBarRef.value?.onIntersect(true)
    })
  })

  /* ── v-intersect handlers ── */
  function onSectionIntersect (isIntersecting, entries) {
    if (isIntersecting && entries[0]) {
      entries[0].target.classList.add('is-visible')
    }
  }

  function onStatsIntersect (isIntersecting, entries) {
    if (isIntersecting && entries[0]) {
      entries[0].target.classList.add('is-visible')
      animateCount(projects.length, v => {
        animatedStatsTotal.value = v
      }, 1000)
    }
  }

  /* ── Scroll to rank tier ── */
  function scrollToRank (rank) {
    const targetId = rank === 'B' || rank === 'C' ? 'tier-BC' : `tier-${rank}`
    const el = document.querySelector(`#${targetId}`)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }
</script>

<style scoped lang="scss">
/* ════════════════════════════════════════
   ALL PROJECTS PAGE — SPOTLIGHT THEATER
   ════════════════════════════════════════ */

.all-projects-main {
  width: 100%;
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

/* ──── HERO ──── */
.ap-hero {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  min-height: 55vh;
  padding: 7rem 1rem 3rem;
  overflow: visible;
}

.ap-hero__content {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  animation: heroFadeIn 0.8s cubic-bezier(0.22, 1, 0.36, 1) both;
}

.ap-hero__label {
  font-family: var(--font-mono);
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--accent-teal);
  opacity: 0.8;
}

.ap-hero__title {
  font-family: var(--font-heading);
  font-size: clamp(1.8rem, 5vw, 3rem);
  font-weight: 800;
  line-height: 1.1;
  margin: 0;
}

.ap-hero__subtitle {
  font-family: var(--font-body);
  font-size: clamp(0.9rem, 2vw, 1.1rem);
  color: var(--text-secondary);
  max-width: 480px;
  line-height: 1.6;
}

.ap-hero__counter {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
  margin-top: 0.5rem;
}

.ap-hero__counter-number {
  font-family: var(--font-heading);
  font-size: clamp(2rem, 4vw, 2.8rem);
  font-weight: 800;
  background: linear-gradient(135deg, var(--accent-teal), var(--accent-blue));
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  line-height: 1;
}

.ap-hero__counter-label {
  font-family: var(--font-mono);
  font-size: 0.65rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--text-secondary);
  opacity: 0.7;
}

/* Orbs — subtle, bleed into content */
.ap-hero__orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(90px);
  opacity: 0.2;
  pointer-events: none;
  will-change: transform;
}

.ap-hero__orb--teal {
  width: clamp(180px, 26vw, 340px);
  height: clamp(180px, 26vw, 340px);
  background: var(--accent-teal);
  top: 15%;
  left: -5%;
  animation: orbFloat 9s ease-in-out infinite alternate;
}

.ap-hero__orb--blue {
  width: clamp(140px, 20vw, 260px);
  height: clamp(140px, 20vw, 260px);
  background: var(--accent-blue);
  top: 30%;
  right: -3%;
  animation: orbFloat 11s ease-in-out infinite alternate-reverse;
}

.ap-hero__orb--purple {
  width: clamp(110px, 16vw, 200px);
  height: clamp(110px, 16vw, 200px);
  background: var(--accent-purple);
  bottom: 20%;
  left: 12%;
  animation: orbFloat 8s ease-in-out infinite alternate;
}

/* Decorative shapes */
.ap-hero__deco {
  position: absolute;
  opacity: 0.04;
  pointer-events: none;
}

.ap-hero__deco--1 {
  width: 180px;
  height: 180px;
  top: 8%;
  right: 10%;
}

.ap-hero__deco--2 {
  width: 120px;
  height: 120px;
  bottom: 20%;
  left: 8%;
}

/* Scroll hint + fade removed for seamless flow */

/* ──── PROJECTS GRID ──── */
.ap-projects {
  padding: 2rem 0 1.5rem;
}

.ap-projects__grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.25rem;
  position: relative;
}

/* ── Card slots — tier size scaling ── */
.ap-card-slot {
  /* B and C: base size — no overrides needed */
}

.ap-card-slot--A {
  :deep(.catalog-card__media) { aspect-ratio: 16 / 9.5; }
  :deep(.catalog-card__body) { padding: 0.8rem; }
  :deep(.catalog-card__title) { font-size: 0.925rem; }
}

.ap-card-slot--S {
  :deep(.catalog-card__media) { aspect-ratio: 16 / 10; }
  :deep(.catalog-card__body) { padding: 0.85rem; }
  :deep(.catalog-card__title) { font-size: 0.95rem; }
}

@media (max-width: 599px) {
  .ap-projects__grid {
    grid-template-columns: 1fr;
  }
}

/* ──── NO RESULTS ──── */
.ap-no-results {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  padding: 4rem 1rem;
  text-align: center;
  color: var(--text-secondary);
  font-family: var(--font-body);
  font-size: 0.95rem;
}

/* ──── STATS FOOTER ──── */
.ap-stats {
  padding: 2.5rem 0 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
}

.ap-stats__grid {
  display: flex;
  gap: 3rem;
  justify-content: center;
  flex-wrap: wrap;
}

.ap-stats__item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.3rem;
  padding: 1.5rem 2rem;
  border-radius: 16px;
  background: var(--bg-glass);
  border: 1px solid var(--border-subtle);
  backdrop-filter: blur(12px);
  transition: border-color 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    border-color: var(--border-accent);
    box-shadow: 0 8px 24px var(--shadow-medium);
  }
}

.ap-stats__number {
  font-family: var(--font-heading);
  font-size: clamp(1.8rem, 4vw, 2.5rem);
  font-weight: 800;
  background: linear-gradient(135deg, var(--accent-teal), var(--accent-blue), var(--accent-purple));
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  line-height: 1.1;
}

.ap-stats__label {
  font-family: var(--font-mono);
  font-size: 0.6rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--text-secondary);
  opacity: 0.7;
}

.ap-stats__cta {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.85rem;
}

/* ──── TRANSITIONS ──── */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* ──── RESPONSIVE ──── */
@media (max-width: 768px) {
  .ap-hero {
    min-height: 45vh;
    padding: 5rem 1rem 2rem;
  }

  .ap-stats__grid {
    gap: 1rem;
  }

  .ap-stats__item {
    padding: 1rem 1.5rem;
  }
}

@media (max-width: 599px) {
  .all-projects-main {
    padding: 0 1rem;
  }

  .ap-hero__title {
    font-size: clamp(1.8rem, 8vw, 2.5rem);
  }
}

@media (prefers-reduced-motion: reduce) {
  .ap-hero__orb {
    animation: none !important;
  }

  .ap-hero__content {
    animation: none !important;
  }
}
</style>
