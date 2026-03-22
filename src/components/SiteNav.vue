<template>
  <header class="site-nav" role="banner">
    <div class="site-nav__bar">
      <div class="site-nav__inner">
        <button
          type="button"
          class="site-nav__brand"
          aria-label="Ir para o início"
          @click="onBrandClick"
        >
          <span class="site-nav__mark" aria-hidden="true">DR</span>
          <span class="site-nav__brand-text">Dario Ramos</span>
        </button>

        <!-- Desktop: links + ação secundária -->
        <nav v-if="isDesktop" class="site-nav__desktop" aria-label="Seções do portfólio">
          <ul class="site-nav__list">
            <li v-for="item in navItems" :key="item.id">
              <button type="button" class="site-nav__link" @click="navigateTo(item.id)">
                {{ item.label }}
              </button>
            </li>
          </ul>
          <v-btn
            class="site-nav__cta"
            variant="flat"
            size="small"
            rounded="lg"
            :to="'/allProjects'"
          >
            <v-icon start size="18">mdi-view-grid-outline</v-icon>
            Lista completa
          </v-btn>
        </nav>

        <!-- Mobile: menu -->
        <v-btn
          v-if="!isDesktop"
          class="site-nav__fab"
          icon
          variant="text"
          aria-label="Abrir menu de navegação"
          :aria-expanded="drawer"
          @click="drawer = true"
        >
          <v-icon size="28">mdi-menu</v-icon>
        </v-btn>
      </div>
    </div>

    <v-navigation-drawer
      v-model="drawer"
      location="end"
      temporary
      width="320"
      class="site-nav-drawer"
      scrim-opacity="0.55"
    >
      <div class="site-nav-drawer__header">
        <div>
          <p class="site-nav-drawer__eyebrow">Navegação</p>
          <p class="site-nav-drawer__title">Onde ir</p>
        </div>
        <v-btn icon variant="text" aria-label="Fechar menu" @click="drawer = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </div>

      <v-list class="site-nav-drawer__list" lines="two" nav>
        <v-list-item
          v-for="item in navItems"
          :key="item.id"
          :prepend-icon="item.icon"
          :title="item.label"
          :subtitle="item.subtitle"
          rounded="lg"
          class="site-nav-drawer__item"
          @click="onDrawerNavigate(item.id)"
        />
        <v-divider class="my-3 opacity-25" />
        <v-list-item
          prepend-icon="mdi-folder-multiple-outline"
          title="Todos os projetos"
          subtitle="Página com filtros"
          rounded="lg"
          class="site-nav-drawer__item site-nav-drawer__item--accent"
          @click="goAllProjects"
        />
      </v-list>
    </v-navigation-drawer>
  </header>
</template>

<script setup>
import { computed, nextTick, ref } from "vue"
import { useRoute, useRouter } from "vue-router"
import { useDisplay } from "vuetify"

const NAV_OFFSET = 80

const route = useRoute()
const router = useRouter()
const { mdAndUp } = useDisplay()
/** Desktop: barra horizontal; tablet/phone: menu drawer */
const isDesktop = computed(() => mdAndUp.value)

const drawer = ref(false)

const navItems = [
  { id: "projetos", label: "Projetos", subtitle: "Destaques e carrossel", icon: "mdi-folder-outline" },
  { id: "sobre", label: "Sobre mim", subtitle: "Trajetória e foco", icon: "mdi-account-outline" },
  { id: "habilidades", label: "Habilidades", subtitle: "Skills e certificações", icon: "mdi-code-tags" },
  { id: "contato", label: "Contato", subtitle: "Mensagem e redes", icon: "mdi-email-outline" },
]

function scrollToSection(id) {
  const el = document.getElementById(id)
  if (!el) return
  const y = el.getBoundingClientRect().top + window.pageYOffset - NAV_OFFSET
  window.scrollTo({ top: y, behavior: "smooth" })
}

async function navigateTo(id) {
  if (route.path === "/") {
    scrollToSection(id)
    return
  }
  await router.push({ path: "/"})
  await nextTick()
  requestAnimationFrame(() => {
    scrollToSection(id)
  })
}

function onDrawerNavigate(id) {
  drawer.value = false
  navigateTo(id)
}

function goAllProjects() {
  drawer.value = false
  router.push("/allProjects")
}

function onBrandClick() {
  if (route.path === "/") {
    window.scrollTo({ top: 0, behavior: "smooth" })
  } else {
    router.push("/")
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
  background: rgba(10, 14, 24, 0.78);
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.35);
  backdrop-filter: blur(16px);
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

.site-nav__mark {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.25rem;
  height: 2.25rem;
  border-radius: 10px;
  font-size: 0.7rem;
  font-weight: 800;
  letter-spacing: 0.06em;
  color: #061018;
  background: linear-gradient(135deg, #4ecca3, #3db892);
  flex-shrink: 0;
}

.site-nav__brand-text {
  font-size: clamp(0.85rem, 2vw, 0.95rem);
  font-weight: 650;
  letter-spacing: -0.02em;
  color: rgba(255, 255, 255, 0.95);
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
  color: rgba(255, 255, 255, 0.78);
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
    background: linear-gradient(90deg, #4ecca3, #5b6fff);
    transform: translateX(-50%);
    transition: width 0.22s ease;
    opacity: 0;
  }

  &:hover {
    color: #fff;
    background: rgba(78, 204, 163, 0.08);

    &::after {
      width: 60%;
      opacity: 1;
    }
  }
}

.site-nav__cta {
  text-transform: none !important;
  letter-spacing: 0.02em;
  font-weight: 600 !important;
  background: rgba(78, 204, 163, 0.14) !important;
  color: #c8f7e8 !important;
  border: 1px solid rgba(78, 204, 163, 0.28) !important;
}

.site-nav__cta:hover {
  background: rgba(78, 204, 163, 0.22) !important;
}

.site-nav__fab {
  color: rgba(255, 255, 255, 0.92) !important;
}

.site-nav-drawer__header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
  padding: 1.25rem 1rem 0.5rem;
}

.site-nav-drawer__eyebrow {
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: rgba(78, 204, 163, 0.85);
  margin: 0 0 0.2rem;
}

.site-nav-drawer__title {
  font-size: 1.15rem;
  font-weight: 700;
  color: #fff;
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
  color: #4ecca3 !important;
}

@media (max-width: 380px) {
  .site-nav__brand-text {
    display: none;
  }
}
</style>
