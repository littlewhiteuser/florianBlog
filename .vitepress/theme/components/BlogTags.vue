<script setup lang="ts">
import { data as posts } from '../utils/posts.data.mts'
import ArticleCard from './ArticleCard.vue'
import { ref, computed, onMounted } from 'vue'

const selectedTag = ref<string>('')

// 获取所有标签及其文章数
const tagsWithCount = computed(() => {
  const map = new Map<string, number>()
  posts.forEach(post => {
    post.tags.forEach(tag => {
      map.set(tag, (map.get(tag) || 0) + 1)
    })
  })
  return Array.from(map.entries()).sort((a, b) => b[1] - a[1])
})

// 按标签筛选文章
const filteredPosts = computed(() => {
  if (!selectedTag.value) return posts
  return posts.filter(post => post.tags.includes(selectedTag.value))
})

function selectTag(tag: string) {
  selectedTag.value = selectedTag.value === tag ? '' : tag
}

// 从 URL 参数读取标签
onMounted(() => {
  const params = new URLSearchParams(window.location.search)
  const tag = params.get('tag')
  if (tag) selectedTag.value = tag
})
</script>

<template>
  <div class="blog-tags">
    <h1 class="blog-tags__title">标签</h1>

    <div class="blog-tags__cloud">
      <button
        v-for="[tag, count] in tagsWithCount"
        :key="tag"
        class="blog-tag"
        :class="{ 'blog-tag--active': selectedTag === tag }"
        @click="selectTag(tag)"
      >
        {{ tag }} ({{ count }})
      </button>
    </div>

    <div class="blog-posts__list">
      <ArticleCard v-for="post in filteredPosts" :key="post.url" :post="post" />
    </div>

    <p v-if="filteredPosts.length === 0" style="text-align: center; color: var(--blog-text-muted); padding: 40px 0;">
      暂无文章
    </p>
  </div>
</template>
