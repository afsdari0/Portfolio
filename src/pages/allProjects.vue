<template>
  <v-container class="mainContainer w-100 d-flex flex-column pa-0 align-center">
    <SiteNav />

    <v-container class="indexContainer all-projects-page pa-0">
      <main class="index-main all-projects-main">

        <section
          aria-labelledby="all-projects-heading"
          class="all-projects-hero section-animate is-visible"
        >
          .          <h1 id="all-projects-heading" class="h1IndexTitless all-projects-title">Meus projetos</h1>
          <p class="textSubtitleProjectsPage text-body-2 text-medium-emphasis mt-2 mb-4">
            Explore todos os trabalhos e filtre por categoria.
          </p>

          <!-- Stats de rank -->
          <div aria-label="Distribuição por rank" class="rank-stats">
            <span class="all-projects-total">
              {{ projects.length }} projeto{{ projects.length !== 1 ? 's' : '' }}
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
  import { computed } from 'vue'
  import { projects } from '@/data/projects'

  const RANK_META = {
    S: { icon: 'mdi-crown', label: 'Lendário' },
    A: { icon: 'mdi-star', label: 'Épico' },
    B: { icon: 'mdi-diamond-stone', label: 'Raro' },
    C: { icon: 'mdi-shield', label: 'Comum' },
  }

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
  color: rgba(255, 255, 255, 0.55);
  letter-spacing: 0.04em;
}
</style>
