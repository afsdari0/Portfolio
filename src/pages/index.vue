<template>
  <v-container class="mainContainer w-100 d-flex flex-column pa-0 align-center">
    <SiteNav />

    <v-container class="indexContainer pa-0">
      <main class="index-main">

        <!-- ===== HERO ===== -->
        <section
          id="inicio"
          class="site-section site-section--hero pa-0"
          aria-labelledby="heading-hero"
        >
          <div
            class="hero-orb hero-orb--teal"
            aria-hidden="true"
            :style="{ transform: `translateY(${scrollY * 0.15}px)` }"
          />
          <div
            class="hero-orb hero-orb--blue"
            aria-hidden="true"
            :style="{ transform: `translateY(${scrollY * -0.1}px)` }"
          />
          <div
            class="hero-orb hero-orb--purple"
            aria-hidden="true"
            :style="{ transform: `translateY(${scrollY * 0.08}px)` }"
          />

          <div class="hero-panel">
            <div class="hero-content">
              <span class="hero-badge">{{ $t('hero.badge') }}</span>
              <h1 id="heading-hero" class="hero-title gradient-text">
                <span class="hero-title--typing">{{ $t('hero.name') }}</span>
              </h1>
              <p class="hero-lead" v-html="$t('hero.lead')" />
              <div class="hero-divider" aria-hidden="true" />
              <div class="hero-actions">
                <v-btn class="hero-btn hero-btn--primary" size="large" rounded="lg" @click="scrollToSection('projetos')">
                  {{ $t('hero.viewProjects') }}
                </v-btn>
                <v-btn
                  class="hero-btn hero-btn--ghost"
                  size="large"
                  variant="text"
                  rounded="lg"
                  @click="scrollToSection('contato')"
                >
                  {{ $t('hero.contact') }}
                </v-btn>
              </div>
            </div>
          </div>

          <div class="hero-scroll-hint" aria-hidden="true">
            <span>{{ $t('hero.scrollHint') }}</span>
            <v-icon class="hero-scroll-hint__arrow" size="22">mdi-chevron-down</v-icon>
          </div>
        </section>

        <!-- ===== PROJETOS ===== -->
        <section
          id="projetos"
          class="site-section containerProjects pa-0 section-animate"
          :class="{ 'is-visible': projectsVisible }"
          aria-labelledby="heading-projetos"
          v-intersect="{ handler: onProjectsIntersect, options: { threshold: 0.12 } }"
        >
          <h2 id="heading-projetos" class="h1IndexTitless section-heading--secondary">{{ $t('projects.title') }}</h2>
          <p class="section-lead">
            {{ $t('projects.lead') }}
          </p>
          <div class="divIndexProjects d-flex justify-center align-center flex-column">
            <div class="divCarroselProjects">
              <carouselProjects />
            </div>
            <v-btn
              class="glow-btn mb-5 mt-4 d-flex justify-center align-center"
              @click="$router.push('/allProjects')"
            >
              {{ $t('projects.exploreWork') }}
            </v-btn>
          </div>
        </section>

        <!-- ===== SOBRE ===== -->
        <section
          id="sobre"
          class="site-section containerAbout pa-0 section-animate section-animate--left"
          :class="{ 'is-visible': aboutVisible }"
          aria-labelledby="heading-sobre"
          v-intersect="{ handler: onAboutIntersect, options: { threshold: 0.12 } }"
        >
          <div class="section-deco section-deco--circle" aria-hidden="true" />

          <h2 id="heading-sobre" class="h1IndexTitless section-heading--secondary">{{ $t('about.title') }}</h2>
          <p class="section-lead">{{ $t('about.lead') }}</p>

          <v-container class="w-100 pa-3">
            <v-row align="start" justify="center" class="about-row">
              <v-col cols="12" md="5" class="d-flex justify-center">
                <div class="about-visual">
                  <div class="about-visual__card">
                    <div class="about-visual__avatar" aria-hidden="true">DR</div>
                    <p class="about-visual__name">Dario Ramos</p>
                    <p class="about-visual__role">{{ $t('about.role') }}</p>
                    <div class="about-visual__tags">
                      <span class="about-visual__tag">Vue.js</span>
                      <span class="about-visual__tag">Vuetify</span>
                      <span class="about-visual__tag">JavaScript</span>
                      <span class="about-visual__tag">SCSS</span>
                      <span class="about-visual__tag">Python</span>
                      <span class="about-visual__tag">Git</span>
                    </div>
                  </div>
                </div>
              </v-col>

              <v-col cols="12" md="7">
                <div class="about-content about-text">
                  <p v-html="$t('about.p1')" />
                  <p v-html="$t('about.p2')" />
                  <p>{{ $t('about.p3') }}</p>
                </div>
              </v-col>
            </v-row>
          </v-container>
        </section>

        <!-- ===== HABILIDADES ===== -->
        <section
          id="habilidades"
          class="site-section containerskill pa-0 section-animate section-animate--scale"
          :class="{ 'is-visible': skillsVisible }"
          aria-labelledby="heading-skills"
          v-intersect="{ handler: onSkillsIntersect, options: { threshold: 0.1 } }"
        >
          <div class="section-deco section-deco--hexagon" aria-hidden="true" />

          <h2 id="heading-skills" class="h1IndexTitless section-heading--secondary">{{ $t('skills.title') }}</h2>
          <p class="section-lead">{{ $t('skills.lead') }}</p>

          <v-container class="skills-section py-8 py-md-12">
            <v-row justify="center" class="skills-grid">
              <v-col
                v-for="(skill, id) in skills"
                :key="id"
                cols="6" sm="4" md="3" lg="2"
                class="skill-col-animate"
                :class="{ 'is-visible': skillsVisible }"
                :style="{ transitionDelay: skillsVisible ? id * 80 + 'ms' : '0ms' }"
              >
                <v-card
                  class="skill-preview d-flex flex-column align-center justify-center"
                  @click="openSkill(skill)"
                >
                  <v-icon :icon="skill.icon" size="64" class="skill-icon" />
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
                  <v-btn icon variant="text" size="small" :aria-label="$t('skills.close')" @click="closeSkillDialog">
                    <v-icon>mdi-close</v-icon>
                  </v-btn>
                </div>
                <v-progress-linear
                  :model-value="animatedLevel"
                  height="10"
                  rounded
                  class="skill-bar mb-6"
                  color="primary"
                />
                <p class="text-caption text-medium-emphasis mb-4">{{ $t('skills.estimatedLevel', { level: Math.round(animatedLevel) }) }}</p>
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

        <!-- ===== CONTATO ===== -->
        <section
          id="contato"
          class="site-section site-section--contact containercontact pa-0 section-animate section-animate--blur"
          :class="{ 'is-visible': contactVisible }"
          aria-labelledby="heading-contato"
          v-intersect="{ handler: onContactIntersect, options: { threshold: 0.1 } }"
        >
          <h2 id="heading-contato" class="h1IndexTitless section-heading--secondary">{{ $t('contact.title') }}</h2>
          <p class="section-lead">{{ $t('contact.lead') }}</p>

          <v-container class="contact-wrapper">
            <v-row align="stretch" justify="center" class="ga-4">
              <v-col cols="12" md="5">
                <div class="contact-info-card">
                  <div class="contact-info__icon-wrap" aria-hidden="true">
                    <v-icon size="36" color="var(--accent-teal)">mdi-email-outline</v-icon>
                  </div>
                  <p class="contact-info__title">{{ $t('contact.cta') }}</p>
                  <p class="contact-info__lead">
                    {{ $t('contact.ctaLead') }}
                  </p>
                  <social-icons />
                </div>
              </v-col>

              <v-col cols="12" md="7">
                <v-form v-model="valid" class="contact-form" @submit.prevent="sendMessage">
                  <v-text-field
                    v-model="form.name"
                    :label="$t('contact.nameLabel')"
                    variant="outlined"
                    density="comfortable"
                    color="primary"
                    class="glow-input mb-3"
                    hide-details="auto"
                    autocomplete="name"
                  />
                  <v-text-field
                    v-model="form.email"
                    :label="$t('contact.emailLabel')"
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
                    :label="$t('contact.messageLabel')"
                    variant="outlined"
                    density="comfortable"
                    color="primary"
                    class="glow-input"
                    rows="4"
                    hide-details="auto"
                    required
                  />
                  <v-btn
                    type="submit"
                    class="glow-btn mt-4 contact-submit-btn"
                    block
                    :loading="sending"
                    :disabled="sending"
                  >
                    {{ $t('contact.send') }}
                  </v-btn>
                </v-form>
              </v-col>
            </v-row>
          </v-container>
        </section>

      </main>
    </v-container>
    <Footer />

    <AppToast
      v-model="snackbar.show"
      :message="snackbar.message"
      :color="snackbar.color"
    />
  </v-container>
</template>

<script setup>
import carouselProjects from "@/components/carouselProjects.vue"
import AppToast from "@/components/AppToast.vue"
import { ref, watch } from "vue"
import { useDisplay } from "vuetify"
import { useI18n } from "vue-i18n"
import { useScrollAnimation } from "@/composables/useScrollAnimation"
import emailjs from "@emailjs/browser"

const { t } = useI18n()
const { smAndDown } = useDisplay()
const { scrollY } = useScrollAnimation()

const NAV_OFFSET = 80

const scrollToSection = (id) => {
  const el = document.getElementById(id)
  if (!el) return
  const y = el.getBoundingClientRect().top + window.pageYOffset - NAV_OFFSET
  window.scrollTo({ top: y, behavior: "smooth" })
}

/* ---- Visibilidade das seções (v-intersect one-shot) ---- */
const projectsVisible = ref(false)
const aboutVisible    = ref(false)
const skillsVisible   = ref(false)
const contactVisible  = ref(false)

function onProjectsIntersect(isIntersecting) { if (isIntersecting) projectsVisible.value = true }
function onAboutIntersect(isIntersecting)    { if (isIntersecting) aboutVisible.value    = true }
function onSkillsIntersect(isIntersecting)   { if (isIntersecting) skillsVisible.value   = true }
function onContactIntersect(isIntersecting)  { if (isIntersecting) contactVisible.value  = true }

/* ---- Skills ---- */
const dialogSkills = ref(false)
const selectedSkill = ref(null)
const animatedLevel = ref(0)

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
  {
    name: "Python",
    icon: "mdi-language-python",
    level: 70,
    certifications: [{ name: "Python.org", link: "https://python.org" }],
  },
  {
    name: "SCSS",
    icon: "mdi-sass",
    level: 88,
    certifications: [{ name: "CSS-Tricks", link: "https://css-tricks.com" }],
  },
  {
    name: "Git",
    icon: "mdi-git",
    level: 80,
    certifications: [{ name: "GitHub Docs", link: "https://docs.github.com" }],
  },
]

const openSkill = (skill) => {
  selectedSkill.value = skill
  animatedLevel.value = 0
  dialogSkills.value = true
}

const closeSkillDialog = () => {
  dialogSkills.value = false
}

function onSkillsDialogToggle(open) {
  if (!open) selectedSkill.value = null
}

/* ---- Animated skill level counter ---- */
watch(dialogSkills, (open) => {
  if (open && selectedSkill.value) {
    animatedLevel.value = 0
    const target = selectedSkill.value.level
    const duration = 600
    const start = performance.now()

    function step(now) {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      animatedLevel.value = target * eased
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }
})

/* ---- Formulário ---- */
const valid = ref(false)
const sending = ref(false)
const snackbar = ref({ show: false, message: '', color: '' })
const form = ref({
  name: "",
  email: "",
  message: "",
})

async function sendMessage() {
  if (!form.value.name || !form.value.email || !form.value.message) {
    snackbar.value = { show: true, message: t('contact.fillAll'), color: 'warning' }
    return
  }
  sending.value = true
  try {
    await emailjs.send(
      'service_x89w4ls',
      'template_s5i5rv7',
      {
        from_name: form.value.name,
        from_email: form.value.email,
        message: form.value.message,
      },
      '_rvV2tsfCMC841Ccf'
    )
    snackbar.value = { show: true, message: t('contact.sent'), color: 'success' }
    form.value = { name: '', email: '', message: '' }
  } catch {
    snackbar.value = { show: true, message: t('contact.error'), color: 'error' }
  } finally {
    sending.value = false
  }
}
</script>
