<template>
  <v-container class="mainContainer w-100 d-flex flex-column pa-0 align-center">
    <SiteNav />

    <v-container class="indexContainer pa-0">
      <main class="index-main">
        <!-- Hero: primeira dobra com foco e menos “ruído” visual -->
        <section
          id="inicio"
          class="site-section site-section--hero pa-0"
          aria-labelledby="heading-hero"
        >
          <div class="hero-panel">
            <p class="hero-eyebrow">Portfólio</p>
            <h1 id="heading-hero" class="hero-title">Dario Ramos</h1>
            <p class="hero-lead">
              Desenvolvedor front-end — interfaces claras com <strong>Vue</strong> e <strong>Vuetify</strong>, com foco em
              performance e boa experiência para quem usa.
            </p>
            <div class="hero-actions">
              <v-btn class="hero-btn hero-btn--primary" size="large" rounded="lg" @click="scrollToSection('projetos')">
                Ver projetos
              </v-btn>
              <v-btn
                class="hero-btn hero-btn--ghost"
                size="large"
                variant="text"
                rounded="lg"
                @click="scrollToSection('contato')"
              >
                Contato
              </v-btn>
            </div>
          </div>
        </section>

        <!-- Projetos -->
        <section id="projetos" class="site-section containerProjects pa-0" aria-labelledby="heading-projetos">
          <h2 id="heading-projetos" class="h1IndexTitless section-heading--secondary">Projetos</h2>
          <p class="section-lead">
            Destaques no carrossel; a lista completa reúne todos os trabalhos.
          </p>
          <div class="divIndexProjects d-flex justify-center align-center flex-column">
            <div class="divCarroselProjects">
              <carouselProjects />
            </div>
            <v-btn
              class="glow-btn mb-5 mt-4 d-flex justify-center align-center"
              @click="$router.push('/allProjects')"
            >
              Listagem completa
            </v-btn>
          </div>
        </section>

        <!-- Sobre -->
        <section id="sobre" class="site-section containerAbout pa-0" aria-labelledby="heading-sobre">
          <h2 id="heading-sobre" class="h1IndexTitless section-heading--secondary">Sobre mim</h2>
          <p class="section-lead">Um pouco da minha trajetória e do que busco em cada projeto.</p>
          <div class="site-section__inner">
            <v-container class="w-100 d-flex justify-center align-center pa-3">
              <div class="about-content">
                <p>
                  Sou um desenvolvedor front-end apaixonado por criar interfaces modernas, responsivas e funcionais.
                  Tenho experiência em <strong>Vue.js</strong>, <strong>Vuetify</strong> e outras tecnologias do
                  ecossistema web, sempre buscando unir performance, design e usabilidade.
                </p>
                <p>
                  Meu foco é transformar ideias em experiências digitais profissionais, combinando
                  <strong>boas práticas de desenvolvimento</strong> com <strong>design inovador</strong>. Gosto de
                  trabalhar em projetos que tragam impacto real para as pessoas e empresas.
                </p>
                <p>
                  Além de programar, valorizo a aprendizagem contínua e o trabalho em equipe, acreditando que
                  compartilhar conhecimento é essencial para crescer na área de tecnologia.
                </p>
              </div>
            </v-container>
          </div>
        </section>

        <!-- Habilidades -->
        <section id="habilidades" class="site-section containerskill pa-0" aria-labelledby="heading-skills">
          <h2 id="heading-skills" class="h1IndexTitless section-heading--secondary">Habilidades</h2>
          <p class="section-lead">Toque em uma skill para ver nível e referências.</p>
          <v-container class="skills-section py-8 py-md-12">
            <v-row justify="center" class="skills-grid">
              <v-col cols="6" sm="4" md="3" lg="2" v-for="(skill, id) in skills" :key="id">
                <v-card
                  class="skill-preview d-flex flex-column align-center justify-center"
                  @click="openSkill(skill)"
                >
                  <v-icon :icon="skill.icon" size="48" class="skill-icon" />
                  <span class="skill-name">{{ skill.name }}</span>
                </v-card>
              </v-col>
            </v-row>

            <v-dialog
              v-model="dialogSkills"
              :max-width="520"
              :fullscreen="smAndDown"
              scrollable
              transition="dialog-bottom-transition"
              @update:model-value="onSkillsDialogToggle"
            >
              <v-card v-if="selectedSkill" class="skill-dialog pa-6">
                <div class="skill-dialog__header">
                  <div class="skill-dialog__headline">
                    <v-icon :icon="selectedSkill.icon" size="48" class="mr-3 dialog-skill-icon" />
                    <h3 class="skill-title">{{ selectedSkill.name }}</h3>
                  </div>
                  <v-btn icon variant="text" size="small" aria-label="Fechar" @click="closeSkillDialog">
                    <v-icon>mdi-close</v-icon>
                  </v-btn>
                </div>
                <v-progress-linear
                  :model-value="selectedSkill.level"
                  height="10"
                  rounded
                  class="skill-bar mb-6"
                  color="primary"
                />
                <p class="text-caption text-medium-emphasis mb-4">Nível estimado: {{ selectedSkill.level }}%</p>
                <div class="cert-buttons d-flex flex-wrap ga-3">
                  <v-btn
                    v-for="(cert, i) in selectedSkill.certifications"
                    :key="i"
                    :href="cert.link"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="cert-btn"
                  >
                    {{ cert.name }}
                  </v-btn>
                </div>
              </v-card>
            </v-dialog>
          </v-container>
        </section>

        <!-- Contato -->
        <section
          id="contato"
          class="site-section site-section--contact containercontact pa-0"
          aria-labelledby="heading-contato"
        >
          <h2 id="heading-contato" class="h1IndexTitless section-heading--secondary">Contato</h2>
          <p class="section-lead">Envie uma mensagem ou fale comigo pelas redes.</p>
          <v-container class="contact-wrapper">
            <v-form v-model="valid" class="contact-form" @submit.prevent="sendMessage">
              <v-text-field
                v-model="form.name"
                label="Seu nome"
                variant="outlined"
                density="comfortable"
                color="primary"
                class="glow-input mb-3"
                hide-details="auto"
                autocomplete="name"
              />
              <v-text-field
                v-model="form.email"
                label="Seu e-mail"
                variant="outlined"
                density="comfortable"
                color="primary"
                class="glow-input mb-3"
                type="email"
                hide-details="auto"
                autocomplete="email"
                required
              />
              <v-textarea
                v-model="form.message"
                label="Mensagem"
                variant="outlined"
                density="comfortable"
                color="primary"
                class="glow-input"
                rows="4"
                hide-details="auto"
                required
              />
              <div class="contact-actions">
                <v-btn type="submit" class="glow-btn mt-4 contact-submit-btn" block>
                  Enviar
                </v-btn>
                <div class="contact-social-wrap">
                  <social-icons />
                </div>
              </div>
            </v-form>
          </v-container>
        </section>
      </main>
    </v-container>
    <Footer />
  </v-container>
</template>

<script setup>
import carouselProjects from "@/components/carouselProjects.vue"
import { ref } from "vue"
import { useDisplay } from "vuetify"

const { smAndDown } = useDisplay()

const NAV_OFFSET = 80

const scrollToSection = (id) => {
  const el = document.getElementById(id)
  if (!el) return
  const y = el.getBoundingClientRect().top + window.pageYOffset - NAV_OFFSET
  window.scrollTo({ top: y, behavior: "smooth" })
}

const dialogSkills = ref(false)
const selectedSkill = ref(null)

const skills = [
  {
    name: "Vue.js",
    icon: "mdi-vuejs",
    level: 90,
    certifications: [
      { name: "Vue Mastery", link: "https://vuemastery.com" },
      { name: "Frontend Mentor", link: "https://frontendmentor.io" },
    ],
  },
  {
    name: "Vuetify",
    icon: "mdi-vuetify",
    level: 85,
    certifications: [{ name: "Vuetify Pro", link: "#" }],
  },
  {
    name: "JavaScript",
    icon: "mdi-language-javascript",
    level: 95,
    certifications: [{ name: "FreeCodeCamp", link: "https://freecodecamp.org" }],
  },
]

const openSkill = (skill) => {
  selectedSkill.value = skill
  dialogSkills.value = true
}

const closeSkillDialog = () => {
  dialogSkills.value = false
}

function onSkillsDialogToggle(open) {
  if (!open) selectedSkill.value = null
}

const valid = ref(false)
const form = ref({
  name: "",
  email: "",
  message: "",
  replyEmail: "",
})

function sendMessage() {
  if (!form.value.name || !form.value.email || !form.value.message) {
    alert("Por favor, preencha todos os campos obrigatórios!")
    return
  }
  console.log("Mensagem enviada:", form.value)
  alert("Mensagem enviada com sucesso!")
}
</script>
