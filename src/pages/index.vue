<template>
    <v-parallax src="@/assets/bgPortfolio.png">
        <v-container class="mainContainer w-100 d-flex flex-column pa-0 align-center"> 
            <nav class="navBar pl-5 pr-5 ma-0 w-100 d-flex justify-center">
                <ul class="d-flex h-100 d-flex justify-space-evenly align-center ">
                    <li class="firstLi">
                        <a class="navbarItens "> Projetos</a>
                    </li>
                    <li>
                        <a class="navbarItens "> Sobre Mim</a>
                    </li>
                    <li class="thirdLi">
                        <a class="navbarItens "> Habilidades</a>
                    </li>
                    <li>
                        <a class="navbarItens "> Contato</a>
                    </li>
                </ul>
            </nav>
            <v-container class="indexContainer">
                <v-container class="containerProjects pa-0">
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
            </v-container>
        </v-container>
    </v-parallax>
</template>
<script setup>



</script>