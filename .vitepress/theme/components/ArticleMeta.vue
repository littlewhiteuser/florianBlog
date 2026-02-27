<script setup lang="ts">
/**
 * 文章元信息组件（借鉴 @sugarat/theme 的文章元信息展示）
 * 显示作者、日期、阅读时间、字数统计、标签
 */
import { useData, withBase } from 'vitepress'
import { computed, onMounted, ref } from 'vue'
import { formatRelativeDate, estimateReadingTime } from '../utils/index'

const { frontmatter, page } = useData()

const readingInfo = ref({ words: 0, minutes: 0 })

onMounted(() => {
  const content = document.querySelector('.vp-doc')?.textContent || ''
  readingInfo.value = estimateReadingTime(content)
})

const date = computed(() => frontmatter.value.date || '')
const relativeDate = computed(() => formatRelativeDate(date.value))
const author = computed(() => frontmatter.value.author || 'Florian')
const tags = computed(() => frontmatter.value.tags || [])
const category = computed(() => frontmatter.value.category || '')

const showMeta = computed(() => date.value || tags.value.length > 0)
</script>

<template>
  <div class="article-meta" v-if="showMeta">
    <div class="article-meta__row">
      <span class="article-meta__item" v-if="author">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
          <circle cx="12" cy="7" r="4"/>
        </svg>
        {{ author }}
      </span>
      <span class="article-meta__item" v-if="date" :title="date">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
          <line x1="16" y1="2" x2="16" y2="6"/>
          <line x1="8" y1="2" x2="8" y2="6"/>
          <line x1="3" y1="10" x2="21" y2="10"/>
        </svg>
        {{ relativeDate }}
      </span>
      <span class="article-meta__item" v-if="readingInfo.words > 0">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
          <polyline points="14 2 14 8 20 8"/>
        </svg>
        {{ readingInfo.words }} 字
      </span>
      <span class="article-meta__item" v-if="readingInfo.minutes > 0">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="10"/>
          <polyline points="12 6 12 12 16 14"/>
        </svg>
        {{ readingInfo.minutes }} 分钟阅读
      </span>
    </div>
    <div class="article-meta__tags" v-if="tags.length || category">
      <a v-if="category" class="blog-tag" :href="withBase(`/tags?tag=${category}`)">
        📂 {{ category }}
      </a>
      <a
        v-for="tag in tags"
        :key="tag"
        :href="withBase(`/tags?tag=${tag}`)"
        class="blog-tag"
      >
        {{ tag }}
      </a>
    </div>
  </div>
</template>

<style scoped>
.article-meta {
  margin: 16px 0 24px;
  padding: 16px 20px;
  background: var(--blog-bg-soft);
  border-radius: var(--blog-radius-sm);
  border: 1px solid var(--blog-border);
}

.article-meta__row {
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
  margin-bottom: 10px;
}

.article-meta__row:last-child {
  margin-bottom: 0;
}

.article-meta__item {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 0.85rem;
  color: var(--blog-text-secondary);
}

.article-meta__item svg {
  opacity: 0.7;
}

.article-meta__tags {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
}
</style>
