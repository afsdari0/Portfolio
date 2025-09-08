<template>
    <v-container class="navbarContainer d-flex flex-column align-center justify-sm-space-between">
        <div>
            <h1>Dario Ramos</h1>
            <h6>Software Developer</h6>
        </div>
        <nav class="d-flex flex-column ">
            <a class="navbarItens mb-2"> Projetos</a>
            <a class="navbarItens mb-2"> Sobre Mim</a>
            <a class="navbarItens m"> Habilidades</a>
            <a class="navbarItens mt-2"> Contato</a>
        </nav>
        <socialIcons />
    </v-container>
</template>
<script setup>
import socialIcons from '@/assets/socialIcons.vue';
</script>