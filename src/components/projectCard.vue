<template>
    <v-container class="w-100 d-flex flex-column pa-0 align-center">
        <v-row justify="center" class="mb-8">
            <v-chip-group
                v-model="selectedCategory"
                mandatory
                color="primary"
                class="d-flex flex-wrap justify-center"
                column
            >
                <v-chip value="all" variant="outlined" class="ma-2">Todos</v-chip>
                <v-chip value="web" variant="outlined" class="ma-2">Web</v-chip>
                <v-chip value="mobile" variant="outlined" class="ma-2">Mobile</v-chip>
                <v-chip value="uiux" variant="outlined" class="ma-2">UI/UX</v-chip>
                <v-chip value="outros" variant="outlined" class="ma-2">Outros</v-chip>
            </v-chip-group>
        </v-row>
        <v-row justify="center">
            <v-col v-for="project in filteredProjects" :key="project.id">
                <v-container class="cardContainer d-flex flex-column justify-center align-center pa-0 ma-0 " >
                    <div class="cardImg w-100">
                        <v-parallax :src="project.img">
            
                        </v-parallax>
                    </div>
                    <div class="cardInfo w-100 pa-2">
                        <h4>{{project.name}}</h4>
                        <h6>{{project.tecno }}</h6>
                    </div>           
        </v-container>
            </v-col>
        </v-row>
    </v-container>
</template>
<script setup>
import { ref, computed } from "vue";

const selectedCategory = ref("all");

const projects = ref([
    { id: 1, name: "Portfolio Website", tecno: "javascript/vue.js", img: new URL('@/assets/logo.png', import.meta.url).href, category: "web" },
    { id: 2, name: "App de Viagem", tecno: "a", img: new URL('@/assets/logo.png', import.meta.url).href, category: "mobile" },
    { id: 3, name: "Landing Page", tecno: "b", img: new URL('@/assets/logo.png', import.meta.url).href, category: "uiux" },
]);

const filteredProjects = computed(() => {
    if (selectedCategory.value === "all") return projects.value;
    return projects.value.filter(p => p.category === selectedCategory.value);
});
</script>
