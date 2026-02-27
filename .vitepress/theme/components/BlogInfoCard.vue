<script setup lang="ts">
/**
 * 博客信息统计卡片（紧凑侧边栏样式）
 */
import { data as posts } from '../utils/posts.data.mts'
import { computed } from 'vue'

const totalPosts = computed(() => posts.length)

const thisMonthPosts = computed(() => {
  const now = new Date()
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1)
  return posts.filter(p => new Date(p.date) >= monthStart).length
})

const thisWeekPosts = computed(() => {
  const now = new Date()
  const weekStart = new Date(now)
  weekStart.setDate(now.getDate() - now.getDay())
  weekStart.setHours(0, 0, 0, 0)
  return posts.filter(p => new Date(p.date) >= weekStart).length
})
</script>

<template>
  <div class="blog-info-card">
    <div class="blog-info-card__stats">
      <div class="blog-info-card__stat">
        <span class="blog-info-card__stat-value">{{ totalPosts }}</span>
        <span class="blog-info-card__stat-label">博客文章</span>
      </div>
      <div class="blog-info-card__divider" />
      <div class="blog-info-card__stat">
        <span class="blog-info-card__stat-value">+{{ thisMonthPosts }}</span>
        <span class="blog-info-card__stat-label">本月更新</span>
      </div>
      <div class="blog-info-card__divider" />
      <div class="blog-info-card__stat">
        <span class="blog-info-card__stat-value">+{{ thisWeekPosts }}</span>
        <span class="blog-info-card__stat-label">本周更新</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.blog-info-card {
  background: var(--blog-card-bg);
  border: 1px solid var(--blog-border);
  border-radius: var(--blog-radius);
  padding: 16px 12px;
}

.blog-info-card__stats {
  display: flex;
  align-items: center;
  justify-content: space-around;
  text-align: center;
}

.blog-info-card__stat {
  display: flex;
  flex-direction: column;
  gap: 2px;
  flex: 1;
}

.blog-info-card__divider {
  width: 1px;
  height: 32px;
  background: var(--blog-border);
  flex-shrink: 0;
}

.blog-info-card__stat-value {
  font-size: 1.2rem;
  font-weight: 700;
  color: var(--blog-brand);
  font-family: 'SF Mono', 'Fira Code', monospace;
}

.blog-info-card__stat-label {
  font-size: 0.72rem;
  color: var(--blog-text-muted);
}
</style>
