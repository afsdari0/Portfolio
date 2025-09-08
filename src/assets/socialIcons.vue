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
import {mdiLinkedin, mdiWhatsapp, mdiGmail } from "@mdi/js";

export default {
  name: "SocialIcons",
  components: { SvgIcon },
  data() {
    return {
      socialLinks: [
        { name: "Whatsapp", icon: mdiWhatsapp, url: "https://instagram.com" },
        { name: "Gmail", icon: mdiGmail , url: "https://facebook.com" },
        { name: "LinkedIn", icon: mdiLinkedin, url: "https://linkedin.com/company" },
      ]
    };
  }
};
</script>

<style scoped>
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
  opacity: 0.8 ;
  transition: opacity 0.3s ease;
}

.social-link:hover .icon {
  opacity: 1 ;
}


</style>
