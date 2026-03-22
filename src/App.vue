<template>
  <v-app class="appBg">
    <router-view v-slot="{ Component, route }">
      <!-- Sem mode out-in: evita frame em branco entre rotas (ex.: /allProjects → /) -->
      <transition name="page-stack">
        <component :is="Component" :key="route.path" />
      </transition>
    </router-view>
    <DialogProjects />
  </v-app>
</template>

<script setup></script>
