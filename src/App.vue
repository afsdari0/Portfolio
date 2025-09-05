<template>
  <v-app>
    <main class="mainApp" :style="{ backgroundImage: `url(${bg})` }">
      <div class="mainAppDivEffect">
        <router-view />
      </div>
    </main>
  </v-app>
</template>

<style scoped>

</style>
<script setup>
  //
  import bg from '@/assets/bgFuturistaRepeat.png'
</script>
