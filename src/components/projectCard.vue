<template>
    <v-container class="w-100 d-flex flex-column pa-0 align-center">
        <div  class="d-flex w-100 justify-center align-center">
            <v-chip-group
                v-model="selectedCategory"
                mandatory
                color="primary"
                class="display-1"
                column
            >
                <v-chip value="all" variant="outlined" class="ma-1">Todos</v-chip>
                <v-chip value="web" variant="outlined" class="ma-1">Web</v-chip>
                <v-chip value="Python" variant="outlined" class="ma-1">Python</v-chip>
            </v-chip-group>
        </div>
        <div class="d-flex flex-row w-100 flex-wrap justify-center ga-4 mt-8 mb-8" >
            <v-container class="cardContainer d-flex flex-column justify-center align-center pa-0 ma-0 " v-for="project in filteredProjects" :key="project.id">
                <div class="cardImg w-100">
                    <v-parallax :src="project.img">
        
                    </v-parallax>
                </div>
                <div class="cardInfo w-100 pa-2">
                    <h4>{{project.name}}</h4>
                    <h6>{{project.tecno }}</h6>
                </div>           
            </v-container>
        </div>
    </v-container>
</template>
<script setup>
import { ref, computed } from "vue";

const selectedCategory = ref("all");

const projects = ref([
    { id: 1, name: "Tibia Bot", tecno: "Python", img: new URL('@/assets/tibiaBot.png', import.meta.url).href, category: "Python" },
    { id: 2, name: "Gerador De Senha", tecno: "JavaScript/Css", img: new URL('@/assets/geradorDeSenha.png', import.meta.url).href, category: "web" },
]);

const filteredProjects = computed(() => {
    if (selectedCategory.value === "all") return projects.value;
    return projects.value.filter(p => p.category === selectedCategory.value);
});
</script>
