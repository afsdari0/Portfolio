<template>
  <v-container class="mainContainer w-100 d-flex flex-column pa-0 align-center">
    <SiteNav />

    <v-container class="indexContainer pa-0">
      <main class="index-main">

        <!-- ===== HERO ===== -->
        <section
          id="inicio"
          aria-labelledby="heading-hero"
          class="site-section site-section--hero pa-0"
        >
          <div
            aria-hidden="true"
            class="hero-orb hero-orb--teal"
            :style="{ transform: `translateY(${scrollY * 0.15}px)` }"
          />
          <div
            aria-hidden="true"
            class="hero-orb hero-orb--blue"
            :style="{ transform: `translateY(${scrollY * -0.1}px)` }"
          />
          <div
            aria-hidden="true"
            class="hero-orb hero-orb--purple"
            :style="{ transform: `translateY(${scrollY * 0.08}px)` }"
          />

          <div class="hero-panel">
            <div class="hero-content">
              <div class="hero-logo">
                <AppLogo animated size="xl" />
              </div>
              <p class="hero-role">{{ $t('hero.role') }}</p>
              <h1 id="heading-hero" class="hero-title gradient-text">
                <span class="hero-title--typing">{{ $t('hero.name') }}</span>
              </h1>
              <p class="hero-lead" v-html="$t('hero.lead')" />
              <div aria-hidden="true" class="hero-divider" />
              <div class="hero-actions">
                <v-btn class="hero-btn hero-btn--primary" rounded="lg" size="large" @click="scrollToSection('projetos')">
                  {{ $t('hero.viewProjects') }}
                </v-btn>
                <v-btn
                  class="hero-btn hero-btn--ghost"
                  rounded="lg"
                  size="large"
                  variant="text"
                  @click="scrollToSection('contato')"
                >
                  {{ $t('hero.contact') }}
                </v-btn>
              </div>
            </div>
          </div>

          <div aria-hidden="true" class="hero-status">
            <span class="hero-status__dot" />
            <span>{{ $t('hero.status') }}</span>
          </div>

          <div aria-hidden="true" class="hero-scroll-hint">
            <span>{{ $t('hero.scrollHint') }}</span>
            <v-icon class="hero-scroll-hint__arrow" size="22">mdi-chevron-down</v-icon>
          </div>
        </section>

        <div aria-hidden="true" class="section-separator section-separator--hero" />

        <!-- ===== PROJETOS ===== -->
        <section
          id="projetos"
          v-intersect="{ handler: onProjectsIntersect, options: { threshold: 0.12 } }"
          aria-labelledby="heading-projetos"
          class="site-section containerProjects pa-0 section-animate"
          :class="{ 'is-visible': projectsVisible }"
        >
          <h2 id="heading-projetos" class="h1IndexTitless section-heading--secondary">{{ $t('projects.title') }}</h2>
          <p class="section-lead" v-html="$t('projects.lead')" />
          <div class="divIndexProjects d-flex justify-center align-center flex-column">
            <carouselProjects :visible="projectsVisible" />
            <v-btn
              class="glow-btn glow-btn--primary mb-5 mt-4"
              @click="$router.push('/allProjects')"
            >
              {{ $t('projects.exploreWork') }}
              <v-icon class="ml-2" size="18">mdi-arrow-right</v-icon>
            </v-btn>
          </div>
        </section>

        <div aria-hidden="true" class="section-separator" />

        <!-- ===== SOBRE ===== -->
        <section
          id="sobre"
          v-intersect="{ handler: onAboutIntersect, options: { threshold: 0.12 } }"
          aria-labelledby="heading-sobre"
          class="site-section containerAbout pa-0 section-animate section-animate--left"
          :class="{ 'is-visible': aboutVisible }"
        >
          <div aria-hidden="true" class="section-deco section-deco--circle" />

          <h2 id="heading-sobre" class="h1IndexTitless section-heading--secondary">{{ $t('about.title') }}</h2>
          <p class="section-lead" v-html="$t('about.lead')" />

          <v-container class="w-100 pa-3">
            <v-row align="start" class="about-row" justify="center">
              <v-col class="d-flex justify-center" cols="12" md="5">
                <div class="about-visual">
                  <div class="about-visual__card">
                    <div aria-hidden="true" class="about-visual__avatar">
                      <AppLogo :animated="aboutVisible" size="lg" />
                    </div>
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

        <div aria-hidden="true" class="section-separator" />

        <!-- ===== HABILIDADES ===== -->
        <section
          id="habilidades"
          v-intersect="{ handler: onSkillsIntersect, options: { threshold: 0.1 } }"
          aria-labelledby="heading-skills"
          class="site-section containerskill pa-0 section-animate section-animate--scale"
          :class="{ 'is-visible': skillsVisible }"
        >
          <div aria-hidden="true" class="section-deco section-deco--hexagon" />

          <h2 id="heading-skills" class="h1IndexTitless section-heading--secondary">{{ $t('skills.title') }}</h2>
          <p class="section-lead" v-html="$t('skills.lead')" />

          <v-container class="skills-section py-8 py-md-12">
            <!-- SVG gradient definition -->
            <svg aria-hidden="true" style="position:absolute;width:0;height:0;pointer-events:none;opacity:0">
              <defs>
                <linearGradient
                  id="skillGrad"
                  x1="0%"
                  x2="100%"
                  y1="0%"
                  y2="100%"
                >
                  <stop offset="0%" stop-color="var(--accent-teal)" />
                  <stop offset="100%" stop-color="var(--accent-blue)" />
                </linearGradient>
              </defs>
            </svg>

            <div v-for="tier in skillTiers" :key="tier.key" class="skill-tier">
              <p class="skill-tier-label">{{ tier.label }}</p>
              <v-row class="skills-grid" justify="center">
                <v-col
                  v-for="(skill, id) in tier.skills"
                  :key="skill.name"
                  class="skill-col-animate"
                  :class="{ 'is-visible': skillsVisible }"
                  cols="6"
                  lg="2"
                  md="3"
                  sm="4"
                  :style="{ transitionDelay: skillsVisible ? id * 80 + 'ms' : '0ms' }"
                >
                  <v-card
                    class="skill-preview d-flex flex-column align-center justify-center"
                  >
                    <div class="skill-ring-wrap">
                      <svg class="skill-ring" viewBox="0 0 80 80">
                        <circle
                          cx="40"
                          cy="40"
                          fill="none"
                          r="36"
                          stroke="var(--border-subtle)"
                          stroke-width="3"
                        />
                        <circle
                          class="skill-ring__progress"
                          cx="40"
                          cy="40"
                          fill="none"
                          r="36"
                          stroke="url(#skillGrad)"
                          :stroke-dasharray="226.2"
                          :stroke-dashoffset="skillsVisible ? 226.2 - (226.2 * skill.level / 100) : 226.2"
                          stroke-linecap="round"
                          stroke-width="3"
                        />
                      </svg>
                      <v-icon class="skill-icon" :icon="skill.icon" size="36" />
                    </div>
                    <span class="skill-name">{{ skill.name }}</span>
                  </v-card>
                </v-col>
              </v-row>
            </div>

          </v-container>
        </section>

        <div aria-hidden="true" class="section-separator" />

        <!-- ===== CONTATO ===== -->
        <section
          id="contato"
          v-intersect="{ handler: onContactIntersect, options: { threshold: 0.1 } }"
          aria-labelledby="heading-contato"
          class="site-section site-section--contact containercontact pa-0 section-animate section-animate--blur"
          :class="{ 'is-visible': contactVisible }"
        >
          <h2 id="heading-contato" class="h1IndexTitless section-heading--secondary">{{ $t('contact.title') }}</h2>
          <p class="section-lead" v-html="$t('contact.lead')" />

          <v-container class="contact-wrapper">
            <v-row align="stretch" class="ga-4" justify="center">
              <v-col cols="12" md="5">
                <div class="contact-info-card">
                  <div aria-hidden="true" class="contact-info__icon-wrap">
                    <v-icon color="var(--accent-teal)" size="36">mdi-email-outline</v-icon>
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
                    autocomplete="name"
                    class="glow-input mb-3"
                    color="primary"
                    density="comfortable"
                    hide-details="auto"
                    :label="$t('contact.nameLabel')"
                    variant="outlined"
                  />
                  <v-text-field
                    v-model="form.email"
                    autocomplete="email"
                    class="glow-input mb-3"
                    color="primary"
                    density="comfortable"
                    hide-details="auto"
                    :label="$t('contact.emailLabel')"
                    required
                    type="email"
                    variant="outlined"
                  />
                  <v-textarea
                    v-model="form.message"
                    class="glow-input"
                    color="primary"
                    density="comfortable"
                    hide-details="auto"
                    :label="$t('contact.messageLabel')"
                    required
                    rows="4"
                    variant="outlined"
                  />
                  <v-btn
                    block
                    class="glow-btn mt-4 contact-submit-btn"
                    :disabled="sending"
                    :loading="sending"
                    type="submit"
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
      :color="snackbar.color"
      :message="snackbar.message"
    />
  </v-container>
</template>

<script setup>
  import emailjs from '@emailjs/browser'
  import { computed, ref } from 'vue'
  import { useI18n } from 'vue-i18n'
  import AppLogo from '@/components/AppLogo.vue'
  import AppToast from '@/components/AppToast.vue'
  import carouselProjects from '@/components/carouselProjects.vue'
  import { useScrollAnimation } from '@/composables/useScrollAnimation'

  const { t } = useI18n()
  const { scrollY } = useScrollAnimation()

  const NAV_OFFSET = 80

  function scrollToSection (id) {
    const el = document.querySelector(`#${id}`)
    if (!el) return
    const y = el.getBoundingClientRect().top + window.pageYOffset - NAV_OFFSET
    window.scrollTo({ top: y, behavior: 'smooth' })
  }

  /* ---- Visibilidade das seções (v-intersect one-shot) ---- */
  const projectsVisible = ref(false)
  const aboutVisible = ref(false)
  const skillsVisible = ref(false)
  const contactVisible = ref(false)

  function onProjectsIntersect (isIntersecting) {
    if (isIntersecting) projectsVisible.value = true
  }
  function onAboutIntersect (isIntersecting) {
    if (isIntersecting) aboutVisible.value = true
  }
  function onSkillsIntersect (isIntersecting) {
    if (isIntersecting) skillsVisible.value = true
  }
  function onContactIntersect (isIntersecting) {
    if (isIntersecting) contactVisible.value = true
  }

  /* ---- Skills ---- */
  const skills = [
    { name: 'Vue.js', icon: 'mdi-vuejs', level: 90 },
    { name: 'Vuetify', icon: 'mdi-vuetify', level: 85 },
    { name: 'JavaScript', icon: 'mdi-language-javascript', level: 95 },
    { name: 'Python', icon: 'mdi-language-python', level: 70 },
    { name: 'SCSS', icon: 'mdi-sass', level: 88 },
    { name: 'Git', icon: 'mdi-git', level: 80 },
  ]

  const skillTiers = computed(() => {
    const tiers = []
    const advanced = skills.filter(s => s.level >= 80)
    const intermediate = skills.filter(s => s.level >= 60 && s.level < 80)
    const familiar = skills.filter(s => s.level < 60)
    if (advanced.length > 0) tiers.push({ key: 'advanced', label: t('skills.tierAdvanced'), skills: advanced })
    if (intermediate.length > 0) tiers.push({ key: 'intermediate', label: t('skills.tierIntermediate'), skills: intermediate })
    if (familiar.length > 0) tiers.push({ key: 'familiar', label: t('skills.tierFamiliar'), skills: familiar })
    return tiers
  })

  /* ---- Formulário ---- */
  const valid = ref(false)
  const sending = ref(false)
  const snackbar = ref({ show: false, message: '', color: '' })
  const form = ref({
    name: '',
    email: '',
    message: '',
  })

  async function sendMessage () {
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
        '_rvV2tsfCMC841Ccf',
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
