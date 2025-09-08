<template>
    <v-container class="mainContainer d-flex">
        <div class="divNavColumn">
            <v-container class="navColumn indexContainerConfig">
                <navigation />
            </v-container>
        </div>
        <v-container class="indexContainer indexContainerConfig">
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