<template>
  <div aria-label="Distribuição por rank" class="rank-bar" role="navigation">
    <div class="rank-bar__track">
      <button
        v-for="rank in ranks"
        :key="rank.key"
        :aria-label="`${rank.label}: ${rank.count} projeto${rank.count !== 1 ? 's' : ''}`"
        class="rank-bar__segment"
        :class="{ 'is-visible': visible }"
        :style="{
          '--segment-color': rank.color,
          '--segment-width': rank.percent + '%',
          transitionDelay: rank.delay + 'ms',
        }"
        @click="$emit('scroll-to-rank', rank.key)"
      >
        <v-icon :icon="rank.icon" size="14" />
        <span class="rank-bar__count">{{ rank.count }}</span>
      </button>
    </div>
    <div class="rank-bar__legend">
      <span
        v-for="rank in ranks"
        :key="rank.key"
        class="rank-bar__legend-item"
        :style="{ color: rank.color }"
      >
        <v-icon :icon="rank.icon" size="10" />
        {{ rank.label }}
      </span>
    </div>
  </div>
</template>

<script setup>
  import { computed, ref } from 'vue'
  import { RANK_META } from '@/data/rankMeta'

  const props = defineProps({
    projects: { type: Array, required: true },
  })

  defineEmits(['scroll-to-rank'])

  const visible = ref(false)

  const ranks = computed(() => {
    const total = props.projects.length || 1
    const order = ['S', 'A', 'B', 'C']
    let delay = 0

    return order
      .map(key => {
        const count = props.projects.filter(p => p.rank === key).length
        if (count === 0) return null
        const item = {
          key,
          count,
          percent: (count / total) * 100,
          icon: RANK_META[key].icon,
          color: RANK_META[key].color,
          label: RANK_META[key].label,
          delay,
        }
        delay += 120
        return item
      })
      .filter(Boolean)
  })

  function onIntersect (isIntersecting) {
    if (isIntersecting) visible.value = true
  }

  defineExpose({ onIntersect })
</script>

<style scoped lang="scss">
.rank-bar {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  width: 100%;
  max-width: 480px;
}

.rank-bar__track {
  display: flex;
  gap: 3px;
  height: 36px;
  border-radius: 10px;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid var(--border-subtle);
}

.rank-bar__segment {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.3rem;
  width: 0;
  background: color-mix(in srgb, var(--segment-color) 20%, transparent);
  border: none;
  cursor: pointer;
  transition: width 0.8s cubic-bezier(0.22, 1, 0.36, 1),
              background 0.3s ease;
  color: var(--segment-color);
  font-family: var(--font-mono);
  font-size: 0.7rem;
  font-weight: 700;
  overflow: hidden;
  white-space: nowrap;

  &.is-visible {
    width: var(--segment-width);
  }

  &:hover {
    background: color-mix(in srgb, var(--segment-color) 35%, transparent);
  }

  &:focus-visible {
    outline: 2px solid var(--segment-color);
    outline-offset: -2px;
  }
}

.rank-bar__count {
  line-height: 1;
}

.rank-bar__legend {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.rank-bar__legend-item {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-family: var(--font-mono);
  font-size: 0.6rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  opacity: 0.7;
}

@media (prefers-reduced-motion: reduce) {
  .rank-bar__segment {
    transition: none !important;

    &.is-visible {
      width: var(--segment-width);
    }
  }
}
</style>
