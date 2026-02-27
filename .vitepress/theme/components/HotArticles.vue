<script setup lang="ts">
/**
 * 精选文章侧边栏（借鉴 @sugarat/theme 的 hotArticle 和 recommend 功能）
 */
import { data as posts } from '../utils/posts.data.mts'
import { computed, ref } from 'vue'

const pageSize = 5

const stickyPosts = computed(() =>
  posts.filter(p => p.sticky > 0).slice(0, 10)
)

const currentPage = ref(0)

const pagedPosts = computed(() => {
  const start = currentPage.value * pageSize
  return stickyPosts.value.slice(start, start + pageSize)
})

const hasNext = computed(() =>
  (currentPage.value + 1) * pageSize < stickyPosts.value.length
)

function nextPage() {
  if (hasNext.value) {
    currentPage.value++
  } else {
    currentPage.value = 0
  }
}
</script>

<template>
  <div class="hot-articles" v-if="stickyPosts.length">
    <div class="hot-articles__header">
      <h3 class="hot-articles__title">🔥 精选文章</h3>
      <button
        v-if="stickyPosts.length > pageSize"
        class="hot-articles__next"
        @click="nextPage"
      >
        换一组
      </button>
    </div>
    <ol class="hot-articles__list">
      <li
        v-for="(post, index) in pagedPosts"
        :key="post.url"
        class="hot-articles__item"
      >
        <a :href="post.url" class="hot-articles__link">
          <span class="hot-articles__rank">{{ currentPage * pageSize + index + 1 }}</span>
          <span class="hot-articles__text">{{ post.title }}</span>
        </a>
        <span class="hot-articles__date">{{ post.date }}</span>
      </li>
    </ol>
  </div>
</template>

<style scoped>
.hot-articles {
  background: var(--blog-card-bg);
  border: 1px solid var(--blog-border);
  border-radius: var(--blog-radius);
  padding: 18px 20px;
  margin-bottom: 20px;
}

.hot-articles__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 14px;
}

.hot-articles__title {
  font-size: 1rem;
  font-weight: 600;
  color: var(--blog-text-primary);
  margin: 0;
}

.hot-articles__next {
  font-size: 0.78rem;
  color: var(--blog-brand);
  background: none;
  border: none;
  cursor: pointer;
  padding: 2px 8px;
  border-radius: 4px;
  transition: var(--blog-transition);
}

.hot-articles__next:hover {
  background: var(--vp-c-brand-soft);
}

.hot-articles__list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.hot-articles__item {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 8px;
  padding: 8px 0;
  border-bottom: 1px dashed var(--blog-border);
}

.hot-articles__item:last-child {
  border-bottom: none;
  padding-bottom: 0;
}

.hot-articles__link {
  display: flex;
  align-items: baseline;
  gap: 8px;
  text-decoration: none;
  flex: 1;
  min-width: 0;
}

.hot-articles__rank {
  font-size: 0.78rem;
  font-weight: 700;
  color: var(--blog-brand);
  background: var(--vp-c-brand-soft);
  width: 20px;
  height: 20px;
  border-radius: 4px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.hot-articles__item:nth-child(1) .hot-articles__rank { color: #fff; background: #f56c6c; }
.hot-articles__item:nth-child(2) .hot-articles__rank { color: #fff; background: #e6a23c; }
.hot-articles__item:nth-child(3) .hot-articles__rank { color: #fff; background: #67c23a; }

.hot-articles__text {
  font-size: 0.88rem;
  color: var(--blog-text-primary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  transition: color 0.2s;
}

.hot-articles__link:hover .hot-articles__text {
  color: var(--blog-brand);
}

.hot-articles__date {
  font-size: 0.75rem;
  color: var(--blog-text-muted);
  flex-shrink: 0;
  font-family: 'SF Mono', 'Fira Code', monospace;
}
</style>
