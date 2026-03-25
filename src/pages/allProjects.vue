<template>
  <v-container class="mainContainer w-100 d-flex flex-column pa-0 align-center">
    <SiteNav />

    <v-container class="indexContainer all-projects-page pa-0">
      <main class="index-main all-projects-main">

        <section
          class="all-projects-hero section-animate is-visible"
          aria-labelledby="all-projects-heading"
        >
          <h1 id="all-projects-heading" class="h1IndexTitless all-projects-title">{{ $t('allProjects.title') }}</h1>
          <p class="textSubtitleProjectsPage text-body-2 text-medium-emphasis mt-2 mb-4">
            {{ $t('allProjects.subtitle') }}
          </p>

          <!-- Stats de rank -->
          <div class="rank-stats" aria-label="Distribuição por rank">
            <span class="all-projects-total">
              {{ projects.length }} {{ projects.length !== 1 ? $t('allProjects.projectCount', { count: projects.length }).split('|')[1]?.trim() || 'projects' : $t('allProjects.projectCount', { count: 1 }).split('|')[0]?.trim() || 'project' }}
            </span>
            <template v-for="(meta, rank) in RANK_META" :key="rank">
              <span
                v-if="rankCount[rank]"
                class="rank-stat-badge"
                :class="`rank-stat-badge--${rank}`"
              >
                <v-icon :icon="meta.icon" size="12" />
                {{ rankCount[rank] }} {{ meta.label }}
              </span>
            </template>
          </div>
        </section>

        <ProjectCard />
      </main>
    </v-container>
  </v-container>
  <Footer />
</template>

<script setup>
import { computed } from "vue"
import { useI18n } from "vue-i18n"
import { projects } from "@/data/projects"
import { RANK_META } from "@/data/rankMeta"

const { t } = useI18n()

const rankCount = computed(() => {
  return projects.reduce((acc, p) => {
    if (p.rank) acc[p.rank] = (acc[p.rank] || 0) + 1
    return acc
  }, {})
})
</script>

<style scoped lang="scss">
.all-projects-total {
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--text-muted);
  letter-spacing: 0.04em;
}

.all-projects-title {
  color: var(--text-primary);
}

.textSubtitleProjectsPage {
  color: var(--text-secondary);
}
</style>
