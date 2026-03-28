<template>
  <div class="d-flex justify-center ga-6 mt-4">
    <a
      v-for="(item, i) in socialLinks"
      :key="i"
      class="social-link"
      :class="`social-link--${item.brand}`"
      :href="item.url"
      rel="noopener noreferrer"
      target="_blank"
    >
      <svg-icon class="icon" :path="item.icon" type="mdi" />
    </a>
  </div>
</template>

<script>
  import SvgIcon from '@jamescoyle/vue-icon'
  import { mdiGithub, mdiLinkedin, mdiWhatsapp } from '@mdi/js'

  export default {
    name: 'SocialIcons',
    components: { SvgIcon },
    data () {
      return {
        socialLinks: [
          { name: 'Whatsapp', brand: 'whatsapp', icon: mdiWhatsapp, url: 'https://wa.me/5582987560451?Olahttps://wa.me/+5555829875604?text=Ol%C3%A1!%20Vi%20seu%20portf%C3%B3lio%20e%20gostaria%20de%20saber%20mais%20sobre%20seu%20trabalho.' },
          { name: 'Github', brand: 'github', icon: mdiGithub, url: 'https://github.com/afsdari0' },
          { name: 'LinkedIn', brand: 'linkedin', icon: mdiLinkedin, url: 'https://www.linkedin.com/in/dario-ramos/' },
        ],
      }
    },
  }
</script>

<style scoped lang="scss">
.social-link {
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: transform 0.3s ease;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    inset: -6px;
    border-radius: 50%;
    opacity: 0;
    transition: opacity 0.3s ease;
  }
}

.icon {
  width: 32px;
  height: 32px;
  color: var(--text-secondary);
  transition: color 0.3s ease, filter 0.3s ease, transform 0.3s ease;
  position: relative;
  z-index: 1;
}

.social-link:hover {
  .icon {
    filter: drop-shadow(0 0 8px var(--glow-teal));
    animation: socialBounce 0.5s ease;
  }

  &::before {
    opacity: 0.15;
  }
}

/* Brand-specific hover colors */
.social-link--whatsapp:hover .icon { color: #25d366; }
.social-link--whatsapp::before { background: radial-gradient(circle, #25d366, transparent); }

.social-link--github:hover .icon { color: var(--text-primary); }
.social-link--github::before { background: radial-gradient(circle, var(--text-primary), transparent); }

.social-link--linkedin:hover .icon { color: #0a66c2; }
.social-link--linkedin::before { background: radial-gradient(circle, #0a66c2, transparent); }

@keyframes socialBounce {
  0%, 100% { transform: translateY(0); }
  40%      { transform: translateY(-6px); }
  60%      { transform: translateY(-3px); }
}
</style>
