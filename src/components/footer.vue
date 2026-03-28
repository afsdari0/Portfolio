<template>
  <footer class="site-footer w-100">
    <v-container class="footer-inner w-100 pa-5 d-flex flex-column align-center">
      <div class="footer-brand">
        <span aria-hidden="true" class="footer-logo">DR</span>
        <p class="footer-tagline">{{ $t('footer.tagline') }}</p>
      </div>

      <div class="footer-bottom">
        <span class="footer-terminal">
          <span class="footer-terminal__prompt">&gt;</span>
          {{ $t('footer.copyright') }}
          <span class="footer-terminal__cursor">_</span>
        </span>
        <span class="footer-made">{{ $t('footer.madeWith') }}</span>
      </div>
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
  border-top: 1px solid var(--border-subtle);
}

.footer-brand {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1.25rem;
}

.footer-logo {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.25rem;
  height: 2.25rem;
  border-radius: 10px;
  font-family: var(--font-heading);
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  color: #061018;
  background: linear-gradient(135deg, var(--accent-teal), var(--accent-blue));
}

.footer-tagline {
  font-size: 0.8rem;
  color: var(--text-muted);
  line-height: 1.5;
  text-align: center;
}

.footer-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 32rem;
  padding-top: 1rem;
  border-top: 1px solid var(--border-subtle);

  @media (max-width: 480px) {
    flex-direction: column;
    gap: 0.4rem;
    text-align: center;
  }
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
