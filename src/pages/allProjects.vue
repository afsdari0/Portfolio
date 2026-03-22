<template>
  <v-container class="mainContainer w-100 d-flex flex-column pa-0 align-center">
    <SiteNav />

    <v-container class="indexContainer all-projects-page pa-0">
      <main class="index-main all-projects-main">
        <section class="all-projects-hero" aria-labelledby="all-projects-heading">
          <h1 id="all-projects-heading" class="h1IndexTitless all-projects-title">Meus projetos</h1>
          <p class="textSubtitleProjectsPage text-body-2 text-medium-emphasis mt-2 mb-8">
            Explore todos os trabalhos e filtros por categoria.
          </p>
        </section>
        <ProjectCard />
      </main>
    </v-container>
  </v-container>
  <Footer />
</template>

<script setup></script>
