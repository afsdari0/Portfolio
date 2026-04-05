<template>
  <v-app class="appBg">
    <!-- Partículas flutuantes CSS -->
    <div aria-hidden="true" class="app-particles">
      <div class="app-particles__layer" />
      <div class="app-particles__layer app-particles__layer--fast" />
      <div class="app-particles__layer app-particles__layer--large" />
    </div>

    <router-view v-slot="{ Component, route }">
      <transition name="page-stack">
        <component :is="Component" :key="route.path" />
      </transition>
    </router-view>
    <DialogProjects v-if="dialogStore.isOpen" />
  </v-app>
</template>

<script setup>
  import { defineAsyncComponent, watch } from 'vue'
  import { useTheme } from 'vuetify'
  import { useDialogStore } from '@/stores/dialogProjects'
  import { useThemeStore } from '@/stores/theme'

  const DialogProjects = defineAsyncComponent(() => import('@/components/DialogProjects.vue'))
  const dialogStore = useDialogStore()

  const vuetifyTheme = useTheme()
  const themeStore = useThemeStore()

  watch(() => themeStore.isDark, dark => {
    vuetifyTheme.global.name.value = dark ? 'portfolioDark' : 'portfolioLight'
  }, { immediate: true })
</script>
