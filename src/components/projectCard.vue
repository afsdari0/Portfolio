<template>
  <v-container class="w-100 d-flex flex-column pa-0 align-center">
    <div class="d-flex w-100 justify-center align-center">
      <v-chip-group
        v-model="selectedCategory"
        mandatory
        color="primary"
        class="display-1"
        column
      >
        <v-chip value="all" variant="outlined" class="ma-1">Todos</v-chip>
        <v-chip value="web" variant="outlined" class="ma-1">Web</v-chip>
        <v-chip value="Python" variant="outlined" class="ma-1">Python</v-chip>
      </v-chip-group>
    </div>
    <div class="project-card-grid d-flex flex-row w-100 flex-wrap justify-center ga-4 mt-8 mb-8">
      <div
        v-for="project in filteredProjects"
        :key="project.id"
        class="project-card"
        role="button"
        tabindex="0"
        @click="dialog.openDialog(project)"
        @keydown.enter="dialog.openDialog(project)"
        @keydown.space.prevent="dialog.openDialog(project)"
      >
        <div class="project-card__media">
          <v-parallax :src="project.img" class="project-card__parallax" />
          <div class="project-card__shine" aria-hidden="true" />
          <div class="project-card__gradient" aria-hidden="true" />
          <div class="project-card__interactive">
            <span class="project-card__badge">Projeto</span>
            <div class="project-card__cta-row">
              <span class="project-card__cta-label">Ver detalhes</span>
              <v-icon class="project-card__cta-icon" size="20">mdi-arrow-right-circle</v-icon>
            </div>
          </div>
        </div>
        <div class="project-card__body">
          <h4 class="project-card__title">{{ project.name }}</h4>
          <p class="project-card__meta">{{ project.tecno }}</p>
        </div>
      </div>
    </div>
  </v-container>
</template>

<script setup>
import { ref, computed } from "vue"
import { projects } from "@/data/projects"
import { useDialogStore } from "@/stores/dialogProjects"

const selectedCategory = ref("all")
const dialog = useDialogStore()
const projectItems = ref(projects)

const filteredProjects = computed(() => {
  if (selectedCategory.value === "all") return projectItems.value
  return projectItems.value.filter((p) => p.category === selectedCategory.value)
})
</script>

<style scoped lang="scss">
.project-card-grid {
  gap: 1.25rem !important;
}

.project-card {
  position: relative;
  height: 15rem;
  width: 10rem;
  border-radius: 14px;
  overflow: hidden;
  cursor: pointer;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(15, 20, 40, 0.35);
  box-shadow: 0 10px 28px rgba(0, 0, 0, 0.45);
  transition:
    transform 0.4s cubic-bezier(0.34, 1.2, 0.64, 1),
    box-shadow 0.4s ease,
    border-color 0.35s ease;

  &:hover,
  &:focus-visible {
    transform: translateY(-8px) scale(1.02);
    border-color: rgba(78, 204, 163, 0.45);
    box-shadow:
      0 0 0 1px rgba(91, 111, 255, 0.25),
      0 18px 36px rgba(0, 0, 0, 0.55),
      0 0 28px rgba(78, 204, 163, 0.12);

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

  &:focus-visible {
    outline: 2px solid rgba(78, 204, 163, 0.7);
    outline-offset: 3px;
  }
}

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

.project-card__interactive {
  position: absolute;
  inset: 0;
  z-index: 3;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  padding: 0.65rem;
  opacity: 0;
  transform: translateY(8px);
  transition: opacity 0.35s ease, transform 0.35s ease;
  pointer-events: none;
}

.project-card__badge {
  font-size: 0.65rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  padding: 0.2rem 0.5rem;
  border-radius: 6px;
  background: rgba(13, 13, 13, 0.65);
  backdrop-filter: blur(8px);
  color: #4ecca3;
  border: 1px solid rgba(78, 204, 163, 0.35);
}

.project-card__cta-row {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  align-self: flex-end;
  margin-top: auto;
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

.project-card__body {
  height: 35%;
  padding: 0.65rem 0.75rem;
  background: linear-gradient(180deg, #0d0d0d 0%, #0a0c12 100%);
  border-top: 1px solid rgba(255, 255, 255, 0.06);
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.project-card__title {
  font-size: 0.95rem;
  font-weight: 700;
  color: #fff;
  margin: 0 0 0.2rem;
  line-height: 1.2;
}

.project-card__meta {
  font-size: 0.7rem;
  color: rgba(255, 255, 255, 0.55);
  margin: 0;
  font-weight: 500;
}
</style>
