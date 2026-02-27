<script setup lang="ts">
import { data as posts } from '../utils/posts.data.mts'
import { computed } from 'vue'

// 按年份分组
const groupedByYear = computed(() => {
  const groups = new Map<string, typeof posts>()
  posts.forEach(post => {
    const year = post.date.slice(0, 4) || '未知'
    if (!groups.has(year)) groups.set(year, [])
    groups.get(year)!.push(post)
  })
  // 按年份降序
  return Array.from(groups.entries()).sort((a, b) => b[0].localeCompare(a[0]))
})

const totalPosts = computed(() => posts.length)
</script>

<template>
  <div class="blog-archives">
    <h1 class="blog-archives__title">归档</h1>
    <p class="blog-posts__count" style="margin-top: -20px; margin-bottom: 32px;">
      共 {{ totalPosts }} 篇文章
    </p>

    <div v-for="[year, yearPosts] in groupedByYear" :key="year" class="blog-archives__year">
      <h2 class="blog-archives__year-title">
        {{ year }} <span style="font-size: 0.85rem; font-weight: 400; margin-left: 8px;">{{ yearPosts.length }} 篇</span>
      </h2>
      <ul class="blog-archives__list">
        <li v-for="post in yearPosts" :key="post.url" class="blog-archives__item">
          <span class="blog-archives__item-date">{{ post.date.slice(5) }}</span>
          <a :href="post.url" class="blog-archives__item-link">{{ post.title }}</a>
        </li>
      </ul>
    </div>
  </div>
</template>
