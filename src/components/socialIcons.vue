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
}

.icon {
  width: 32px;
  height: 32px;
  color: white;
  opacity: 1 ;
  transition: opacity 0.3s ease;
}

.social-link:hover {
  .icon {
    color:#4ECCA3; 
  }
}

@keyframes gradientMove {
  from {
    background-position: 0% 0%;
  }
  to {
    background-position: 200% 0%;
  }
}

</style>
