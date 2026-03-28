<template>
  <v-defaults-provider :defaults="{ VBtn: { variant: 'outlined', color: '#eee' } }">
    <v-sheet
      class="carousel-projects-shell overflow-hidden"
      elevation="8"
      rounded="xl"
    >
      <v-carousel
        v-model="currentIndex"
        class="carouselProjects carousel-projects"
        direction="vertical"
        hide-delimiter-background
        show-arrows="hover"
        vertical-arrows="left"
        vertical-delimiters="right"
      >
        <v-carousel-item
          v-for="(item, i) in carouselItems"
          :key="i"
          class="carousel-projects__slide"
          cover
          :src="item.img"
          @click="dialog.openDialog(item)"
        />

        <v-overlay
          contained
          content-class="carousel-projects__overlay-inner"
          model-value
          no-click-animation
          persistent
          :scrim="false"
        >
          <div class="carousel-projects__layout d-flex flex-column h-100 w-100">
            <div class="carousel-projects__spacer flex-grow-1" />
            <v-scroll-x-transition appear mode="out-in">
              <v-sheet
                :key="currentIndex"
                class="carousel-projects__info-sheet"
                elevation="4"
                rounded="lg"
              >
                <v-list-item
                  class="titleTechCarousel carousel-projects__list-item"
                  :subtitle="currentItem?.tecno"
                  :title="currentItem?.name"
                />
              </v-sheet>
            </v-scroll-x-transition>

            <div
              aria-hidden="true"
              class="carousel-projects__hint"
            >
              <span class="carousel-projects__hint-pulse" />
              <v-icon
                class="carousel-projects__hint-icon"
                size="18"
              >
                mdi-gesture-tap
              </v-icon>
              <span class="carousel-projects__hint-text">{{ $t('carousel.hint') }}</span>
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
  import { computed, shallowRef } from 'vue'
  import { useI18n } from 'vue-i18n'
  import { projects } from '@/data/projects'
  import { useDialogStore } from '@/stores/dialogProjects'

  const { t } = useI18n()

  const currentIndex = shallowRef(0)
  const dialog = useDialogStore()
  const carouselItems = computed(() => projects.slice(0, 5))
  const currentItem = computed(() => carouselItems.value[currentIndex.value] ?? null)
</script>

<style scoped lang="scss">
.carousel-projects-shell {
  border: 1px solid var(--border-subtle);
  background: var(--bg-card);
  backdrop-filter: blur(12px);
  cursor: pointer;
  transition: box-shadow 0.35s ease, border-color 0.35s ease, transform 0.35s ease;
  position: relative;

  /* Rotating glow border */
  &::after {
    content: '';
    position: absolute;
    inset: -2px;
    border-radius: inherit;
    background: conic-gradient(
      from 0deg,
      transparent 0%,
      var(--accent-teal) 8%,
      transparent 16%,
      transparent 50%,
      var(--accent-blue) 58%,
      transparent 66%
    );
    z-index: -1;
    opacity: 0;
    animation: carouselGlowSpin 5s linear infinite;
    transition: opacity 0.4s ease;
  }

  &:hover {
    border-color: var(--border-accent);
    box-shadow:
      0 0 0 1px var(--glow-blue),
      0 12px 40px var(--shadow-heavy);

    &::after {
      opacity: 0.6;
    }
  }

  &:focus-within {
    outline: 2px solid var(--border-accent);
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
  background: var(--bg-glass) !important;
  backdrop-filter: blur(14px);
  border: 1px solid var(--border-subtle);
  pointer-events: none;
}

@keyframes carouselGlowSpin {
  0%   { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
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
