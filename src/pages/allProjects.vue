<template>
    <v-container class="mainContainer w-100 d-flex flex-column pa-0 align-center">  
        <nav class="navBar pa-0 ma-0 d-flex justify-center align-center">
                <ul class="d-flex h-100 d-flex justify-space-evenly align-center ">
                    <v-btn class="ulBtn pa-2 " :to="{path:'/', hash:'#projetos'}">
                        Projetos
                    </v-btn>
                    <v-btn class="ulBtn pa-2" :to="{path:'/', hash:'#sobre'}">
                        Sobre Mim
                    </v-btn>
                    <v-btn class="ulBtn pa-2" :to="{path:'/', hash:'#habilidades'}">
                        Habilidades
                    </v-btn>
                    <v-btn class="ulBtn pa-2" :to="{path:'/', hash:'#contato'}">
                        Contato
                    </v-btn>
                </ul>
            </nav>
            <v-container class="indexContainer pa-0">
                <div class="text-center mb-6 mt-6">
                    <h1 class="text-h3 font-weight-bold text-white">Meus Projetos</h1>
                    <p class="textSubtitleProjectsPage text-grey-lighten-1">
                        Explore todos os meus trabalhos
                    </p>
                </div>
                
                <ProjectCard/>
                
            </v-container> 
    </v-container>
    <Footer/>
</template>
<script setup>
</script>