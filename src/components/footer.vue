<template>
  <footer class="site-footer w-100">
    <v-container class="footer-inner w-100 pa-4 d-flex align-center justify-center">
      <span class="footer-terminal">
        <span class="footer-terminal__prompt">&gt;</span>
        {{ $t('footer.copyright') }}
        <span class="footer-terminal__cursor">_</span>
      </span>
      <span class="footer-sep">·</span>
      <span class="footer-made">{{ $t('footer.madeWith') }}</span>
    </v-container>
  </footer>
</template>

<script setup>
  import { useI18n } from 'vue-i18n'

  useI18n()
</script>

<style scoped lang="scss">
.site-footer {
  background: var(--footer-bg);
}

.footer-inner {
  gap: 0.5rem;
  flex-wrap: wrap;
}

.footer-terminal {
  font-family: var(--font-mono);
  font-size: clamp(0.72rem, 2vw, 0.8rem);
  color: var(--text-muted);
  letter-spacing: 0.02em;
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

.footer-sep {
  color: var(--text-muted);
  opacity: 0.3;
  font-size: 0.8rem;
}

.footer-made {
  font-family: var(--font-mono);
  font-size: 0.68rem;
  color: var(--text-muted);
  opacity: 0.6;
}

@keyframes footerCursorBlink {
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
}
</style>
