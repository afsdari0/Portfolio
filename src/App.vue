<template>
  <v-app class="appBg">
    <!-- Partículas flutuantes CSS -->
    <div class="app-particles" aria-hidden="true">
      <div class="app-particles__layer" />
      <div class="app-particles__layer app-particles__layer--fast" />
    </div>

    <router-view v-slot="{ Component, route }">
      <transition name="page-stack">
        <component :is="Component" :key="route.path" />
      </transition>
    </router-view>
    <DialogProjects />
  </v-app>
</template>

<script setup>
import { watch } from "vue"
import { useTheme } from "vuetify"
import { useThemeStore } from "@/stores/theme"

const vuetifyTheme = useTheme()
const themeStore = useThemeStore()

watch(() => themeStore.isDark, (dark) => {
  vuetifyTheme.global.name.value = dark ? 'portfolioDark' : 'portfolioLight'
}, { immediate: true })
</script>
