<template>
    <v-parallax src="@/assets/bgPortfolio.png">
        <v-container max-width="lg" fluid class="mainContainer d-flex flex-column p-0 align-center"> 
            <v-container fluid class="navBar pa-0 ma-0 w-75 d-flex justify-center">
                <nav class="navNavbar d-flex h-100 w-75 d-flex justify-space-evenly align-center ">
                    <a class="navbarItens "> Projetos</a>
                    <a class="navbarItens "> Sobre Mim</a>
                    <a class="navbarItens "> Habilidades</a>
                    <a class="navbarItens "> Contato</a>
                </nav>
            </v-container>
            <v-container class="indexContainer">
                <v-container grid-list-md class="containerProjects">
                    <v-carousel height="400" width="80%" show-arrows="hover" cycle hide-delimiter-background>
                        <v-carousel-item v-for="(slide, i) in slides" :key="i">
                            <v-sheet :color="colors[i]" height="100%" >
                                <div class="d-flex fill-height justify-center align-center">
                                    <div class="text-h2">
                                        {{ slide }} Slide
                                    </div>
                                </div>
                            </v-sheet>
                        </v-carousel-item>
                    </v-carousel>
                </v-container>
            </v-container>
        </v-container>
    </v-parallax>
</template>
<script setup>
import navigation from '@/components/navigation.vue';

const colors = [
    'indigo',
    'warning',
]
const slides = [
    'First',
    'Second',
]
</script>