<template>
  <v-app>
    <main class="mainApp" :style="{ backgroundImage: `url(${bg})` }">
      <router-view />
    </main>
  </v-app>
</template>

<style scoped>

</style>
<script setup>
  //
  import bg from '@/assets/futuristic_black_bg.png'
</script>
