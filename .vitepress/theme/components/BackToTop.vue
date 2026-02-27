<script setup lang="ts">
/**
 * 回到顶部按钮（借鉴 @sugarat/theme 的 backToTop 功能）
 */
import { ref, onMounted, onUnmounted } from 'vue'

const show = ref(false)
const threshold = 450

function handleScroll() {
  show.value = window.scrollY > threshold
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <Transition name="back-to-top">
    <button
      v-show="show"
      class="back-to-top"
      @click="scrollToTop"
      title="回到顶部"
      aria-label="回到顶部"
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="18 15 12 9 6 15" />
      </svg>
    </button>
  </Transition>
</template>

<style scoped>
.back-to-top {
  position: fixed;
  right: 24px;
  bottom: 40px;
  z-index: 100;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: 1px solid var(--blog-border);
  background: var(--blog-card-bg);
  color: var(--blog-text-secondary);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
}

.back-to-top:hover {
  color: var(--blog-brand);
  border-color: var(--blog-brand);
  transform: translateY(-3px);
  box-shadow: 0 4px 16px rgba(60, 135, 114, 0.2);
}

.back-to-top-enter-active,
.back-to-top-leave-active {
  transition: all 0.3s ease;
}

.back-to-top-enter-from,
.back-to-top-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

@media (max-width: 768px) {
  .back-to-top {
    right: 16px;
    bottom: 24px;
    width: 38px;
    height: 38px;
  }
}
</style>
