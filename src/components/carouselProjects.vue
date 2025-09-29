<template>
  <v-defaults-provider :defaults="{ VBtn: { variant: 'outlined', color: '#eee' } }">
    <v-sheet class="overflow-hidden" rounded="xl">
      <v-carousel
        v-model="currentIndex"
        direction="vertical"
        vertical-arrows="left"
        vertical-delimiters="right"
        hide-delimiter-background
        class="carouselProjects"
      >
        <v-carousel-item
          v-for="(item, i) in items"
          :key="i"
          :src="item.src"
          cover
        ></v-carousel-item>

        <v-overlay
          :scrim="false"
          content-class="w-100 h-100 d-flex flex-column align-center justify-space-between pointer-pass-through py-3"
          contained
          model-value
          no-click-animation
          persistent
        >
          <v-scroll-x-transition mode="out-in" appear>
            <v-sheet
              :key="currentIndex"
              rounded="lg"
            >
              <v-list-item
                :subtitle="currentItem.tech"
                :title="currentItem.projectTitle"
                class="titleTechCarousel"
              ></v-list-item>
            </v-sheet>
          </v-scroll-x-transition>
        </v-overlay>
      </v-carousel>
    </v-sheet>
  </v-defaults-provider>
</template>

<script setup>
import { shallowRef, toRef } from 'vue'

  const currentIndex = shallowRef(0)
  const currentItem = toRef(() => items[currentIndex.value])
  const items = [
    {
      projectTitle: 'Bettany Nichols',
      tech: '31k followers',
      src: 'https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg',
    },
    {
      projectTitle: 'Greg Kovalsky',
      tech: '412 followers',
      src: 'https://cdn.vuetifyjs.com/images/carousel/sky.jpg',
    },
    {
      projectTitle: 'Emma Kathleen',
      tech: '521 followers',
      src: 'https://cdn.vuetifyjs.com/images/carousel/bird.jpg',
    },
    {
      projectTitle: 'Anthony McKenzie',
      tech: '6k followers',
      src: 'https://cdn.vuetifyjs.com/images/carousel/planet.jpg',
    },
  ]
</script>