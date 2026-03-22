<template>
  <v-defaults-provider :defaults="{ VBtn: { variant: 'outlined', color: '#eee' } }">
    <v-sheet
      class="carousel-projects-shell overflow-hidden"
      rounded="xl"
      elevation="8"
    >
      <v-carousel
        v-model="currentIndex"
        direction="vertical"
        vertical-arrows="left"
        vertical-delimiters="right"
        hide-delimiter-background
        class="carouselProjects carousel-projects"
        show-arrows="hover"
      >
        <v-carousel-item
          v-for="(item, i) in carouselItems"
          :key="i"
          :src="item.img"
          cover
          class="carousel-projects__slide"
          @click="dialog.openDialog(item)"
        />

        <v-overlay
          :scrim="false"
          content-class="carousel-projects__overlay-inner"
          contained
          model-value
          no-click-animation
          persistent
        >
          <div class="carousel-projects__layout d-flex flex-column h-100 w-100">
            <div class="carousel-projects__spacer flex-grow-1" />
            <v-scroll-x-transition mode="out-in" appear>
              <v-sheet
                :key="currentIndex"
                class="carousel-projects__info-sheet"
                rounded="lg"
                elevation="4"
              >
                <v-list-item
                  :subtitle="currentItem?.tecno"
                  :title="currentItem?.name"
                  class="titleTechCarousel carousel-projects__list-item"
                />
              </v-sheet>
            </v-scroll-x-transition>

            <div
              class="carousel-projects__hint"
              aria-hidden="true"
            >
              <span class="carousel-projects__hint-pulse" />
              <v-icon
                class="carousel-projects__hint-icon"
                size="18"
              >
                mdi-gesture-tap
              </v-icon>
              <span class="carousel-projects__hint-text">Toque para ver o projeto</span>
              <v-icon
                class="carousel-projects__hint-chevron"
                size="16"
              >
                mdi-chevron-right
              </v-icon>
            </div>
          </div>
        </v-overlay>
      </v-carousel>
    </v-sheet>
  </v-defaults-provider>
</template>

<script setup>
import { computed, shallowRef } from "vue"
import { projects } from "@/data/projects"
import { useDialogStore } from "@/stores/dialogProjects"

const currentIndex = shallowRef(0)
const dialog = useDialogStore()
const carouselItems = computed(() => projects.slice(0, 5))
const currentItem = computed(() => carouselItems.value[currentIndex.value] ?? null)
</script>

<style scoped lang="scss">
.carousel-projects-shell {
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(15, 20, 40, 0.4);
  backdrop-filter: blur(12px);
  cursor: pointer;
  transition: box-shadow 0.35s ease, border-color 0.35s ease, transform 0.35s ease;

  &:hover {
    border-color: rgba(78, 204, 163, 0.45);
    box-shadow:
      0 0 0 1px rgba(91, 111, 255, 0.2),
      0 12px 40px rgba(0, 0, 0, 0.45);
  }

  &:focus-within {
    outline: 2px solid rgba(78, 204, 163, 0.5);
    outline-offset: 2px;
  }
}

.carousel-projects__slide {
  cursor: pointer;
}

.carousel-projects__overlay-inner {
  width: 100% !important;
  height: 100% !important;
  display: flex !important;
  flex-direction: column !important;
  align-items: stretch !important;
  justify-content: flex-end !important;
  padding: 0.75rem !important;
  pointer-events: none !important;
}

.carousel-projects__info-sheet {
  background: rgba(13, 17, 28, 0.72) !important;
  backdrop-filter: blur(14px);
  border: 1px solid rgba(255, 255, 255, 0.12);
  pointer-events: none;
}

.carousel-projects__list-item {
  min-height: auto !important;
}

.carousel-projects__hint {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.35rem;
  margin-top: 0.65rem;
  padding: 0.45rem 0.85rem;
  border-radius: 999px;
  background: linear-gradient(
    90deg,
    rgba(78, 204, 163, 0.2),
    rgba(91, 111, 255, 0.25)
  );
  border: 1px solid rgba(255, 255, 255, 0.15);
  color: rgba(255, 255, 255, 0.95);
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.02em;
  position: relative;
  overflow: hidden;
}

.carousel-projects__hint-pulse {
  position: absolute;
  inset: -2px;
  border-radius: inherit;
  background: linear-gradient(90deg, rgba(78, 204, 163, 0.35), rgba(91, 111, 255, 0.35));
  opacity: 0.45;
  z-index: 0;
}

.carousel-projects__hint-icon,
.carousel-projects__hint-text,
.carousel-projects__hint-chevron {
  position: relative;
  z-index: 1;
}

.carousel-projects__hint-text {
  text-shadow: 0 1px 8px rgba(0, 0, 0, 0.4);
}

@media (max-width: 600px) {
  .carousel-projects__hint-text {
    font-size: 0.7rem;
  }
}
</style>
