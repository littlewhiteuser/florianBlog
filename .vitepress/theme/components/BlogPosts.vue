<script setup lang="ts">
import { data as posts } from '../utils/posts.data.mts'
import ArticleCard from './ArticleCard.vue'
import { ref, computed } from 'vue'

const pageSize = 8
const currentPage = ref(1)

const totalPages = computed(() => Math.ceil(posts.length / pageSize))

const paginatedPosts = computed(() => {
  const start = (currentPage.value - 1) * pageSize
  return posts.slice(start, start + pageSize)
})

function goToPage(page: number) {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}
</script>

<template>
  <div class="blog-posts">
    <div class="blog-posts__header">
      <h1 class="blog-posts__title">所有文章</h1>
      <p class="blog-posts__count">共 {{ posts.length }} 篇文章</p>
    </div>

    <div class="blog-posts__list">
      <ArticleCard v-for="post in paginatedPosts" :key="post.url" :post="post" />
    </div>

    <!-- 分页 -->
    <div v-if="totalPages > 1" class="blog-pagination">
      <button
        class="blog-pagination__btn"
        :disabled="currentPage === 1"
        @click="goToPage(currentPage - 1)"
      >
        ← 上一页
      </button>
      <button
        v-for="page in totalPages"
        :key="page"
        class="blog-pagination__btn"
        :class="{ 'blog-pagination__btn--active': page === currentPage }"
        @click="goToPage(page)"
      >
        {{ page }}
      </button>
      <button
        class="blog-pagination__btn"
        :disabled="currentPage === totalPages"
        @click="goToPage(currentPage + 1)"
      >
        下一页 →
      </button>
    </div>
  </div>
</template>
