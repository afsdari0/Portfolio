<template>
  <header class="site-nav" role="banner">
    <div v-show="scrollPercent > 0" class="scroll-progress" :style="{ width: scrollPercent + '%' }" />
    <div class="site-nav__bar">
      <div class="site-nav__inner" :class="{ 'site-nav__inner--scrolled': scrolled }">
        <button
          :aria-label="$t('nav.goToStart')"
          class="site-nav__brand"
          type="button"
          @click="onBrandClick"
        >
          <AppLogo aria-hidden="true" class="site-nav__logo" size="xs" />
          <span class="site-nav__brand-text">Dario Ramos</span>
        </button>

        <!-- Desktop: links + toggles + CTA -->
        <nav v-if="isDesktop" :aria-label="$t('nav.navigation')" class="site-nav__desktop">
          <ul class="site-nav__list">
            <li v-for="item in navItems" :key="item.id">
              <button class="site-nav__link" type="button" @click="navigateTo(item.id)">
                {{ item.label }}
              </button>
            </li>
          </ul>

          <!-- Locale toggle -->
          <v-btn
            :aria-label="localeStore.locale === 'pt-BR' ? 'Switch to English' : 'Mudar para Português'"
            class="site-nav__locale-toggle"
            icon
            size="small"
            variant="text"
            @click="localeStore.toggle()"
          >
            <span class="site-nav__locale-label">{{ localeStore.locale === 'pt-BR' ? 'EN' : 'PT' }}</span>
          </v-btn>

          <!-- Theme toggle -->
          <v-btn
            :aria-label="themeStore.isDark ? $t('nav.switchToLight') : $t('nav.switchToDark')"
            class="site-nav__theme-toggle"
            icon
            size="small"
            variant="text"
            @click="themeStore.toggle()"
          >
            <v-icon
              class="site-nav__theme-icon"
              :class="{ 'site-nav__theme-icon--spin': themeAnimating }"
              size="20"
            >
              {{ themeStore.isDark ? 'mdi-weather-sunny' : 'mdi-weather-night' }}
            </v-icon>
          </v-btn>

          <v-btn
            class="site-nav__cta"
            :class="{ 'site-nav__cta--back': isAllProjects }"
            rounded="lg"
            size="small"
            :to="isAllProjects ? '/' : '/allProjects'"
            variant="flat"
          >
            <v-icon size="18" start>{{ isAllProjects ? 'mdi-home-variant-outline' : 'mdi-view-grid-outline' }}</v-icon>
            {{ $t(isAllProjects ? 'nav.backHub' : 'nav.exploreWork') }}
          </v-btn>
        </nav>

        <!-- Mobile: toggles + menu -->
        <div v-if="!isDesktop" class="d-flex align-center ga-1">
          <!-- Locale toggle mobile -->
          <v-btn
            :aria-label="localeStore.locale === 'pt-BR' ? 'Switch to English' : 'Mudar para Português'"
            class="site-nav__locale-toggle"
            icon
            size="small"
            variant="text"
            @click="localeStore.toggle()"
          >
            <span class="site-nav__locale-label">{{ localeStore.locale === 'pt-BR' ? 'EN' : 'PT' }}</span>
          </v-btn>

          <v-btn
            :aria-label="themeStore.isDark ? $t('nav.switchToLight') : $t('nav.switchToDark')"
            class="site-nav__theme-toggle"
            icon
            size="small"
            variant="text"
            @click="themeStore.toggle()"
          >
            <v-icon
              class="site-nav__theme-icon"
              :class="{ 'site-nav__theme-icon--spin': themeAnimating }"
              size="20"
            >
              {{ themeStore.isDark ? 'mdi-weather-sunny' : 'mdi-weather-night' }}
            </v-icon>
          </v-btn>

          <v-btn
            :aria-expanded="drawer"
            :aria-label="$t('nav.openMenu')"
            class="site-nav__fab"
            icon
            variant="text"
            @click="drawer = true"
          >
            <v-icon size="28">mdi-menu</v-icon>
          </v-btn>
        </div>
      </div>
    </div>

    <v-navigation-drawer
      v-model="drawer"
      class="site-nav-drawer"
      location="end"
      scrim-opacity="0.55"
      temporary
      width="320"
    >
      <div class="site-nav-drawer__header">
        <div>
          <p class="site-nav-drawer__title">{{ $t('nav.navigation') }}</p>
        </div>
        <v-btn :aria-label="$t('nav.closeMenu')" icon variant="text" @click="drawer = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </div>

      <v-list class="site-nav-drawer__list" lines="two" nav>
        <v-list-item
          v-for="item in navItems"
          :key="item.id"
          class="site-nav-drawer__item"
          rounded="lg"
          :subtitle="item.subtitle"
          :title="item.label"
          @click="onDrawerNavigate(item.id)"
        >
          <template #prepend>
            <component :is="phosphorIcons[item.id]" class="mr-3" :size="22" weight="duotone" />
          </template>
        </v-list-item>
        <v-divider class="my-3 opacity-25" />
        <v-list-item
          class="site-nav-drawer__item site-nav-drawer__item--accent"
          :prepend-icon="isAllProjects ? 'mdi-home-variant-outline' : 'mdi-folder-multiple-outline'"
          rounded="lg"
          :subtitle="isAllProjects ? $t('nav.backHubSub') : $t('nav.allProjectsSub')"
          :title="isAllProjects ? $t('nav.backHub') : $t('nav.allProjects')"
          @click="goCtaPage"
        />
      </v-list>
    </v-navigation-drawer>

    <Transition name="fab-fade">
      <button
        v-if="scrolled"
        aria-label="Scroll to top"
        class="scroll-top-fab"
        @click="scrollToTop"
      >
        <v-icon size="20">mdi-chevron-up</v-icon>
      </button>
    </Transition>
  </header>
</template>

<script setup>
  import { PhCode, PhEnvelope, PhFolder, PhUser } from '@phosphor-icons/vue'
  import { computed, nextTick, onMounted, onUnmounted, ref, watch } from 'vue'
  import { useI18n } from 'vue-i18n'
  import { useRoute, useRouter } from 'vue-router'
  import { useDisplay } from 'vuetify'
  import AppLogo from '@/components/AppLogo.vue'
  import { useLocaleStore } from '@/stores/locale'
  import { useThemeStore } from '@/stores/theme'

  const phosphorIcons = { projetos: PhFolder, sobre: PhUser, habilidades: PhCode, contato: PhEnvelope }

  const NAV_OFFSET = 80

  const { t } = useI18n()
  const route = useRoute()
  const router = useRouter()
  const { mdAndUp } = useDisplay()
  const themeStore = useThemeStore()
  const localeStore = useLocaleStore()

  const isDesktop = computed(() => mdAndUp.value)
  const isAllProjects = computed(() => route.path === '/allProjects')
  const drawer = ref(false)
  const themeAnimating = ref(false)
  const scrolled = ref(false)
  const scrollPercent = ref(0)

  // Scroll-aware navbar
  function onScroll () {
    scrolled.value = window.scrollY > 100
    const docHeight = document.documentElement.scrollHeight - window.innerHeight
    scrollPercent.value = docHeight > 0 ? (window.scrollY / docHeight) * 100 : 0
  }

  function scrollToTop () {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  onMounted(() => {
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
  })

  onUnmounted(() => {
    window.removeEventListener('scroll', onScroll)
  })

  // Animação de spin ao trocar tema
  watch(() => themeStore.isDark, () => {
    themeAnimating.value = true
    setTimeout(() => {
      themeAnimating.value = false
    }, 500)
  })

  const navItems = computed(() => [
    { id: 'projetos', label: t('nav.projects'), subtitle: t('nav.projectsSub') },
    { id: 'sobre', label: t('nav.about'), subtitle: t('nav.aboutSub') },
    { id: 'habilidades', label: t('nav.skills'), subtitle: t('nav.skillsSub') },
    { id: 'contato', label: t('nav.contact'), subtitle: t('nav.contactSub') },
  ])

  function scrollToSection (id) {
    const el = document.getElementById(id)
    if (!el) return
    const y = el.getBoundingClientRect().top + window.pageYOffset - NAV_OFFSET
    window.scrollTo({ top: y, behavior: 'smooth' })
  }

  async function navigateTo (id) {
    if (route.path === '/') {
      scrollToSection(id)
      return
    }
    await router.push({ path: '/' })
    await nextTick()
    requestAnimationFrame(() => {
      scrollToSection(id)
    })
  }

  function onDrawerNavigate (id) {
    drawer.value = false
    navigateTo(id)
  }

  function goCtaPage () {
    drawer.value = false
    router.push(isAllProjects.value ? '/' : '/allProjects')
  }

  function onBrandClick () {
    if (route.path === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      router.push('/')
    }
  }
</script>

<style scoped lang="scss">
.site-nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  pointer-events: none;
}

.site-nav__bar {
  pointer-events: auto;
  padding: 0.75rem clamp(1rem, 4vw, 2rem) 0.5rem;
}

.site-nav__inner {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  min-height: 3.25rem;
  padding: 0.5rem 1rem;
  border-radius: 16px;
  background: var(--bg-glass);
  border: 1px solid var(--border-subtle);
  box-shadow: 0 8px 32px var(--shadow-heavy);
  backdrop-filter: blur(16px);
  transition: background 0.4s ease, border-color 0.4s ease, padding 0.3s ease, backdrop-filter 0.3s ease;
}

.site-nav__inner--scrolled {
  padding: 0.35rem 1rem;
  backdrop-filter: blur(24px);
  border-color: var(--border-accent);
  box-shadow: 0 4px 20px var(--shadow-heavy);
}

.site-nav__brand {
  display: flex;
  align-items: center;
  gap: 0.65rem;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.15rem 0;
  text-align: left;
  color: inherit;
}

.site-nav__logo {
  flex-shrink: 0;
  transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), filter 0.3s ease;

  &:hover {
    transform: scale(1.12);
    filter: drop-shadow(0 0 6px var(--accent-teal));
  }
}

.site-nav__brand-text {
  font-family: var(--font-heading);
  font-size: clamp(0.85rem, 2vw, 0.95rem);
  font-weight: 700;
  letter-spacing: -0.02em;
  color: var(--text-primary);
  opacity: 0.95;
}

.site-nav__desktop {
  display: flex;
  align-items: center;
  gap: clamp(0.5rem, 2vw, 1.25rem);
}

.site-nav__list {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  list-style: none;
  margin: 0;
  padding: 0;
}

.site-nav__link {
  position: relative;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0.45rem 0.85rem;
  border-radius: 10px;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--text-secondary);
  transition:
    color 0.2s ease,
    background 0.2s ease;

  &::after {
    content: "";
    position: absolute;
    left: 50%;
    bottom: 0.2rem;
    width: 0;
    height: 2px;
    border-radius: 2px;
    background: linear-gradient(90deg, var(--accent-teal), var(--accent-blue));
    transform: translateX(-50%);
    transition: width 0.22s ease;
    opacity: 0;
  }

  &:hover {
    color: var(--text-primary);
    background: var(--glow-teal);

    &::after {
      width: 60%;
      opacity: 1;
    }
  }
}

/* Locale toggle */
.site-nav__locale-toggle {
  color: var(--text-secondary) !important;
  transition: color 0.3s ease;

  &:hover {
    color: var(--accent-teal) !important;
  }
}

.site-nav__locale-label {
  font-size: 0.7rem;
  font-weight: 800;
  letter-spacing: 0.06em;
}

/* Theme toggle */
.site-nav__theme-toggle {
  color: var(--text-secondary) !important;
  transition: color 0.3s ease;

  &:hover {
    color: var(--accent-teal) !important;
  }
}

.site-nav__theme-icon {
  transition: transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.site-nav__theme-icon--spin {
  transform: rotate(360deg);
}

.site-nav__cta {
  text-transform: none !important;
  letter-spacing: 0.02em;
  font-weight: 600 !important;
  background: var(--glow-teal) !important;
  color: var(--accent-teal) !important;
  border: 1px solid var(--border-accent) !important;
}

.site-nav__cta:hover {
  filter: brightness(1.15);
}

.site-nav__fab {
  color: var(--text-primary) !important;
  opacity: 0.92;
}

.site-nav-drawer__header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
  padding: 1.25rem 1rem 0.5rem;
}

.site-nav-drawer__eyebrow {
  font-family: var(--font-mono);
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--accent-teal);
  opacity: 0.85;
  margin: 0 0 0.2rem;
}

.site-nav-drawer__title {
  font-family: var(--font-heading);
  font-size: 1.15rem;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0;
  letter-spacing: -0.02em;
}

.site-nav-drawer__list {
  padding: 0.5rem 0.75rem 1.5rem !important;
}

.site-nav-drawer__item {
  margin-bottom: 0.35rem;
  border-radius: 12px !important;
  min-height: 56px !important;
}

.site-nav-drawer__item :deep(.v-list-item-title) {
  font-weight: 600 !important;
  font-size: 0.95rem !important;
}

.site-nav-drawer__item :deep(.v-list-item-subtitle) {
  opacity: 0.65 !important;
  font-size: 0.75rem !important;
}

.site-nav-drawer__item--accent :deep(.v-list-item-title) {
  color: var(--accent-teal) !important;
}

@media (max-width: 380px) {
  .site-nav__brand-text {
    display: none;
  }
}

/* ---- Scroll progress bar ---- */
.scroll-progress {
  position: fixed;
  top: 0;
  left: 0;
  height: 2px;
  background: linear-gradient(90deg, var(--accent-teal), var(--accent-blue), var(--accent-purple));
  z-index: 101;
  transition: width 0.1s linear;
  pointer-events: none;
}

/* ---- Scroll-to-top FAB ---- */
.scroll-top-fab {
  position: fixed;
  bottom: 1.5rem;
  right: 1.5rem;
  z-index: 90;
  width: 40px;
  height: 40px;
  border-radius: 12px;
  border: 1px solid var(--border-subtle);
  background: var(--bg-glass);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  color: var(--accent-teal);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 4px 16px var(--shadow-medium);
  transition: transform 0.25s ease, box-shadow 0.25s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px var(--shadow-heavy);
  }
}

.fab-fade-enter-active {
  transition: opacity 0.3s ease, transform 0.3s cubic-bezier(0.22, 1, 0.36, 1);
}
.fab-fade-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.fab-fade-enter-from {
  opacity: 0;
  transform: scale(0.8) translateY(8px);
}
.fab-fade-leave-to {
  opacity: 0;
  transform: scale(0.8) translateY(8px);
}
</style>
