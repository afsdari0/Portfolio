<template>
  <v-dialog
    v-model="isOpen"
    :max-width="560"
    :fullscreen="smAndDown"
    scrollable
    transition="dialog-bottom-transition"
    content-class="project-dialog-content"
  >
    <v-card
      v-if="project"
      class="project-dialog-card"
      rounded="xl"
      elevation="12"
    >
      <div class="project-dialog__hero">
        <v-img
          :src="project.img"
          cover
          height="220"
          class="project-dialog__img"
        />
        <div class="project-dialog__scrim" />
        <v-btn
          class="project-dialog__close"
          icon
          variant="text"
          size="small"
          :aria-label="$t('dialog.close')"
          @click="close"
        >
          <v-icon color="white">mdi-close</v-icon>
        </v-btn>
        <div class="project-dialog__hero-text">
          <div class="project-dialog__rank-row">
            <div
              v-if="project.rank"
              class="dialog-rank-badge"
              :class="`dialog-rank-badge--${project.rank}`"
              :aria-label="`Rank ${rankMeta?.label}`"
            >
              <v-icon :icon="rankMeta?.icon" size="13" />
              <span>{{ rankMeta?.label }}</span>
            </div>
          </div>
          <h2 class="project-dialog__title">{{ project.name }}</h2>
          <div class="project-dialog__chips">
            <v-chip
              v-for="(tag, i) in techTags"
              :key="i"
              size="small"
              variant="flat"
              class="project-dialog__chip"
            >
              {{ tag }}
            </v-chip>
          </div>
        </div>
      </div>

      <v-card-text class="project-dialog__body">
        <p class="project-dialog__about">
          {{ projectAbout }}
        </p>

        <div class="project-dialog__actions">
          <v-btn
            v-if="project.link"
            block
            size="large"
            rounded="lg"
            class="project-dialog__cta"
            :href="project.link"
            target="_blank"
            rel="noopener noreferrer"
          >
            <v-icon start size="20">mdi-open-in-new</v-icon>
            {{ projectCtaLabel }}
          </v-btn>
          <p v-else class="project-dialog__empty-link">
            {{ $t('dialog.linkSoon') }}
          </p>
        </div>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { computed } from "vue"
import { storeToRefs } from "pinia"
import { useDisplay } from "vuetify"
import { useI18n } from "vue-i18n"
import { useDialogStore } from "@/stores/dialogProjects"
import { RANK_META } from "@/data/rankMeta"
import { useLocaleStore } from "@/stores/locale"

const { t } = useI18n()
const dialog = useDialogStore()
const { isOpen, project } = storeToRefs(dialog)
const { smAndDown } = useDisplay()
const localeStore = useLocaleStore()

const techTags = computed(() => {
  if (!project.value?.tecno) return []
  return project.value.tecno
    .split(/[\/,|]/)
    .map((s) => s.trim())
    .filter(Boolean)
})

const rankMeta = computed(() => project.value?.rank ? RANK_META[project.value.rank] : null)

const projectAbout = computed(() => {
  const about = project.value?.about
  if (!about) return ''
  if (typeof about === 'string') return about
  return about[localeStore.locale] || about['pt-BR'] || ''
})

const projectCtaLabel = computed(() => {
  const label = project.value?.ctaLabel
  if (!label) return t('dialog.openProject')
  if (typeof label === 'string') return label
  return label[localeStore.locale] || label['pt-BR'] || t('dialog.openProject')
})

function close() {
  dialog.closeDialog()
}
</script>

<style scoped lang="scss">
.project-dialog-card {
  background: var(--dialog-bg) !important;
  border: 1px solid var(--border-subtle);
  overflow: hidden;
}

.project-dialog__hero {
  position: relative;
}

.project-dialog__img :deep(.v-img__img) {
  filter: saturate(1.05);
}

.project-dialog__scrim {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to top,
    rgba(10, 15, 30, 0.95) 0%,
    rgba(10, 15, 30, 0.35) 45%,
    transparent 70%
  );
  pointer-events: none;
}

.project-dialog__close {
  position: absolute !important;
  top: 8px;
  right: 8px;
  z-index: 2;
  background: rgba(0, 0, 0, 0.35) !important;
  backdrop-filter: blur(8px);
}

.project-dialog__hero-text {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 1rem 1.25rem 1.25rem;
  z-index: 1;
}

.project-dialog__rank-row {
  margin-bottom: 0.5rem;
}

.dialog-rank-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  padding: 0.25rem 0.6rem;
  border-radius: 8px;
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  backdrop-filter: blur(10px);
  border: 1px solid;

  span { line-height: 1; }
}

.dialog-rank-badge--S {
  color: #ffd700;
  background: rgba(255, 215, 0, 0.15);
  border-color: rgba(255, 215, 0, 0.45);
}
.dialog-rank-badge--A {
  color: #c084fc;
  background: rgba(192, 132, 252, 0.15);
  border-color: rgba(192, 132, 252, 0.4);
}
.dialog-rank-badge--B {
  color: #38bdf8;
  background: rgba(56, 189, 248, 0.15);
  border-color: rgba(56, 189, 248, 0.4);
}
.dialog-rank-badge--C {
  color: #94a3b8;
  background: rgba(148, 163, 184, 0.12);
  border-color: rgba(148, 163, 184, 0.35);
}

.project-dialog__title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #fff;
  line-height: 1.25;
  margin: 0 0 0.5rem;
  text-shadow: 0 2px 12px rgba(0, 0, 0, 0.5);
}

.project-dialog__chips {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
}

.project-dialog__chip {
  background: var(--glow-teal) !important;
  color: var(--accent-teal) !important;
  border: 1px solid var(--border-accent) !important;
  font-weight: 600;
  font-size: 0.75rem;
}

.project-dialog__body {
  padding: 1.25rem 1.5rem 1.5rem !important;
}

.project-dialog__about {
  color: var(--text-secondary);
  font-size: 0.95rem;
  line-height: 1.65;
  margin: 0 0 1.25rem;
}

.project-dialog__actions {
  margin-top: 0.25rem;
}

.project-dialog__cta {
  font-weight: 600 !important;
  text-transform: none !important;
  letter-spacing: 0.02em;
  color: #fff !important;
  background: linear-gradient(90deg, #4ecca3, #5b6fff) !important;
  background-size: 200% 100%;
  transition: filter 0.2s ease, transform 0.2s ease;

  &:hover {
    filter: brightness(1.08);
    transform: translateY(-1px);
  }
}

.project-dialog__empty-link {
  text-align: center;
  color: rgba(255, 255, 255, 0.5);
  font-size: 0.875rem;
  margin: 0;
}
</style>
