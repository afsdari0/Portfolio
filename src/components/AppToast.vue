<template>
  <Teleport to="body">
    <Transition name="toast">
      <div v-if="visible" class="app-toast" :class="`app-toast--${color}`" role="alert">
        <div class="app-toast__icon-wrap">
          <v-icon class="app-toast__icon" size="20">{{ icon }}</v-icon>
        </div>
        <span class="app-toast__message">{{ message }}</span>
        <button aria-label="Fechar" class="app-toast__close" @click="visible = false">
          <v-icon size="16">mdi-close</v-icon>
        </button>
        <div class="app-toast__progress">
          <div class="app-toast__progress-bar" :style="{ animationDuration: timeout + 'ms' }" />
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
  import { computed, ref, watch } from 'vue'

  const props = defineProps({
    modelValue: { type: Boolean, default: false },
    message: { type: String, default: '' },
    color: { type: String, default: 'success' },
    timeout: { type: Number, default: 4000 },
  })

  const emit = defineEmits(['update:modelValue'])

  const visible = ref(props.modelValue)
  let timer = null

  const icon = computed(() => {
    if (props.color === 'success') return 'mdi-check-circle-outline'
    if (props.color === 'error') return 'mdi-alert-circle-outline'
    if (props.color === 'warning') return 'mdi-alert-outline'
    return 'mdi-information-outline'
  })

  watch(() => props.modelValue, val => {
    visible.value = val
    if (val) {
      clearTimeout(timer)
      timer = setTimeout(() => {
        visible.value = false
        emit('update:modelValue', false)
      }, props.timeout)
    }
  })

  watch(visible, val => {
    if (!val) emit('update:modelValue', false)
  })
</script>

<style scoped>
.app-toast {
  position: fixed;
  bottom: 32px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 9999;
  min-width: 320px;
  max-width: 480px;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 16px;
  border-radius: 14px;
  background: var(--bg-glass);
  backdrop-filter: blur(18px);
  -webkit-backdrop-filter: blur(18px);
  border: 1px solid var(--border-subtle);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.35), 0 2px 8px rgba(0, 0, 0, 0.2);
  overflow: hidden;
}

/* Barra lateral colorida */
.app-toast::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 3px;
  border-radius: 14px 0 0 14px;
}

.app-toast--success::before { background: linear-gradient(to bottom, var(--accent-teal), var(--accent-blue)); }
.app-toast--error::before   { background: linear-gradient(to bottom, #f43f5e, #a855f7); }
.app-toast--warning::before { background: linear-gradient(to bottom, #f59e0b, #f97316); }

/* Ícone */
.app-toast__icon-wrap {
  flex-shrink: 0;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.app-toast--success .app-toast__icon-wrap { background: rgba(78, 204, 163, 0.15); }
.app-toast--error   .app-toast__icon-wrap { background: rgba(244, 63, 94, 0.15); }
.app-toast--warning .app-toast__icon-wrap { background: rgba(245, 158, 11, 0.15); }

.app-toast--success .app-toast__icon { color: var(--accent-teal); }
.app-toast--error   .app-toast__icon { color: #f43f5e; }
.app-toast--warning .app-toast__icon { color: #f59e0b; }

/* Mensagem */
.app-toast__message {
  flex: 1;
  font-size: 0.88rem;
  font-weight: 500;
  color: var(--text-primary);
  line-height: 1.4;
}

/* Fechar */
.app-toast__close {
  flex-shrink: 0;
  background: none;
  border: none;
  cursor: pointer;
  color: var(--text-muted);
  display: flex;
  align-items: center;
  padding: 4px;
  border-radius: 6px;
  transition: color 0.2s, background 0.2s;
}
.app-toast__close:hover {
  color: var(--text-primary);
  background: var(--border-subtle);
}

/* Barra de progresso */
.app-toast__progress {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: var(--border-subtle);
}

.app-toast__progress-bar {
  height: 100%;
  animation: toastProgress linear forwards;
}

.app-toast--success .app-toast__progress-bar { background: linear-gradient(to right, var(--accent-teal), var(--accent-blue)); }
.app-toast--error   .app-toast__progress-bar { background: linear-gradient(to right, #f43f5e, #a855f7); }
.app-toast--warning .app-toast__progress-bar { background: linear-gradient(to right, #f59e0b, #f97316); }

@keyframes toastProgress {
  from { width: 100%; }
  to   { width: 0%; }
}

/* Transição de entrada/saída */
.toast-enter-active {
  animation: toastIn 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.toast-leave-active {
  animation: toastOut 0.25s ease-in forwards;
}

@keyframes toastIn {
  from { opacity: 0; transform: translateX(-50%) translateY(20px) scale(0.95); }
  to   { opacity: 1; transform: translateX(-50%) translateY(0)    scale(1); }
}

@keyframes toastOut {
  from { opacity: 1; transform: translateX(-50%) translateY(0)    scale(1); }
  to   { opacity: 0; transform: translateX(-50%) translateY(12px) scale(0.96); }
}

@media (prefers-reduced-motion: reduce) {
  .toast-enter-active, .toast-leave-active { animation: none; }
}
</style>
