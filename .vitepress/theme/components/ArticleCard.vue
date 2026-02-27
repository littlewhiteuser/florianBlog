<script setup lang="ts">
import type { Post } from '../utils/posts.data.mts'
import { formatRelativeDate } from '../utils/index'
import { withBase } from 'vitepress'
import { computed } from 'vue'

const props = defineProps<{
  post: Post
}>()

const relativeDate = computed(() => formatRelativeDate(props.post.date))
</script>

<template>
  <a :href="withBase(post.url)" class="article-card" :class="{ 'article-card--has-cover': post.cover }">
    <div class="article-card__content">
      <div class="article-card__top">
        <!-- <span v-if="post.sticky" class="article-card__sticky">📌 置顶</span> -->
        <p class="article-card__title">{{ post.title }}</p>
      </div>
      <div v-if="post.excerpt" class="article-card__excerpt" v-html="post.excerpt" />
      <div class="article-card__footer">
        <div class="article-card__meta">
          <span class="article-card__date" :title="post.date">📅 {{ relativeDate }}</span>
          <span v-if="post.category" class="article-card__category">📂 {{ post.category }}</span>
        </div>
        <div class="article-card__tags">
          <span
            v-for="(tag, idx) in post.tags"
            :key="tag"
            class="blog-tag color-tag"
            :class="`color-tag--${idx % 8}`"
          >
            {{ tag }}
          </span>
        </div>
      </div>
    </div>
    <div v-if="post.cover" class="article-card__cover">
      <img :src="post.cover" :alt="post.title" loading="lazy" />
    </div>
  </a>
</template>
