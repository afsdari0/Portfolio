<template>
  <div class="d-flex justify-center ga-6 mt-4">
    <a
      v-for="(item, i) in socialLinks"
      :key="i"
      :href="item.url"
      target="_blank"
      rel="noopener noreferrer"
      class="social-link"
    >
      <svg-icon type="mdi" :path="item.icon" class="icon" />
    </a>
  </div>
</template>

<script >
import SvgIcon from "@jamescoyle/vue-icon";
import {mdiLinkedin, mdiWhatsapp, mdiGmail, mdiGithub } from "@mdi/js";

export default {
  name: "SocialIcons",
  components: { SvgIcon },
  data() {
    return {
      socialLinks: [
        { name: "Whatsapp", icon: mdiWhatsapp, url: "https://wa.me/5582987560451?Olahttps://wa.me/+5555829875604?text=Ol%C3%A1!%20Vi%20seu%20portf%C3%B3lio%20e%20gostaria%20de%20saber%20mais%20sobre%20seu%20trabalho." },
        { name: "Github", icon: mdiGithub , url: "https://github.com/afsdari0" },
        { name: "LinkedIn", icon: mdiLinkedin, url: "https://www.linkedin.com/in/dario-ramos/" },
      ]
    };
  }
};
</script>

<style scoped lang="scss">
.social-link {
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.icon {
  width: 32px;
  height: 32px;
  color: var(--text-secondary);
  transition: color 0.3s ease, filter 0.3s ease, transform 0.3s ease;
}

.social-link:hover {
  .icon {
    color: var(--accent-teal);
    filter: drop-shadow(0 0 8px var(--glow-teal));
    animation: socialBounce 0.5s ease;
  }
}

@keyframes socialBounce {
  0%, 100% { transform: translateY(0); }
  40%      { transform: translateY(-6px); }
  60%      { transform: translateY(-3px); }
}
</style>
