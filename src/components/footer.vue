<template>
  <footer class="site-footer w-100">
    <v-container class="footerContainer w-100 d-flex justify-center align-center pa-3">
      <span class="footer-terminal">
        <span class="footer-terminal__prompt">&gt;</span>
        {{ $t('footer.copyright') }}
        <span class="footer-terminal__cursor">_</span>
      </span>
    </v-container>
  </footer>
</template>

<script setup>
import { useI18n } from "vue-i18n"
const { t } = useI18n()
</script>

<style scoped lang="scss">
.site-footer {
  background: var(--footer-bg);
  border-top: 1px solid var(--border-subtle);
}

.footer-terminal {
  font-family: 'Courier New', monospace;
  font-size: 0.85rem;
  color: var(--text-muted);
  letter-spacing: 0.03em;
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
}

.footer-terminal__prompt {
  color: var(--accent-teal);
  font-weight: 700;
}

.footer-terminal__cursor {
  display: inline-block;
  color: var(--accent-teal);
  animation: footerCursorBlink 0.9s steps(1) infinite;
}

@keyframes footerCursorBlink {
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
}
</style>
