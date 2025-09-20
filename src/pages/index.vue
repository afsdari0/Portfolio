<template>
        <v-container class="mainContainer w-100 d-flex flex-column pa-0 align-center"> 
            <nav class="navBar pl-5 pr-5 ma-0 w-100 d-flex justify-center">
                <ul class="d-flex h-100 d-flex justify-space-evenly align-center ">
                    <v-btn class="ulBtn pa-2">
                        Button
                    </v-btn>
                    <v-btn class="ulBtn pa-2">
                        Sobre Mim
                    </v-btn>
                    <v-btn class="ulBtn pa-2">
                        Habilidades
                    </v-btn>
                    <v-btn class="ulBtn pa-2">
                        Contato
                    </v-btn>
                </ul>
            </nav>
            <v-container class="indexContainer pa-0">
                <v-container class="containerProjects h-100vh pa-0">
                    <div class="d-flex justify-center">
                        <h1 class="h1IndexTitles">Projetos</h1>
                    </div>
                    <v-container class="containerCardsProjects pt-7 d-flex w100% justify-center align-center">
                        <div class="d-flex">
                            <project-card/>
                        </div>
                        <div class="d-flex secondCard">
                            <project-card/>
                        </div>
                        <div class="d-flex">
                            <project-card/>
                        </div>
                    </v-container>
                </v-container>
                <v-container class="containerAbout h-100vh pa-0">
                    <div class="d-flex justify-center">
                        <h1 class="h1IndexTitles">Sobre Min</h1>
                    </div>
                    <v-container>
                        <div class="about-content">
                            <p>
                              Sou um desenvolvedor front-end apaixonado por criar interfaces modernas, 
                              responsivas e funcionais. Tenho experiência em <strong>Vue.js</strong>, 
                              <strong>Vuetify</strong> e outras tecnologias do ecossistema web, sempre 
                              buscando unir performance, design e usabilidade.
                            </p>
                            <p>
                              Meu foco é transformar ideias em experiências digitais profissionais, 
                              combinando <strong>boas práticas de desenvolvimento</strong> com 
                              <strong>design inovador</strong>. Gosto de trabalhar em projetos que 
                              tragam impacto real para as pessoas e empresas.
                            </p>
                            <p>
                              Além de programar, valorizo a aprendizagem contínua e o trabalho em equipe, 
                              acreditando que compartilhar conhecimento é essencial para crescer na área 
                              de tecnologia.
                            </p>
                        </div>
                    </v-container>
                </v-container>
                <v-container class="containerskill h-100vh pa-0">
                    <div class="d-flex justify-center">
                        <h1 class="h1IndexTitles">Habilidades</h1>
                    </div>
                    <v-container>
                        
                    </v-container>
                </v-container>
                <v-container class="containercontact h-100vh pa-0">
                    <div class="d-flex justify-center">
                        <h1 class="h1IndexTitles">Contato</h1>
                    </div>
                    <v-container>
                        
                    </v-container>
                </v-container>
            </v-container>
        </v-container>
</template>
<script setup>



</script>