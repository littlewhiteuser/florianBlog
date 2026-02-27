<script setup lang="ts">
import { withBase } from 'vitepress'

defineProps<{
  tags: string[]
}>()
</script>

<template>
  <div class="tag-list">
    <a
      v-for="tag in tags"
      :key="tag"
      :href="withBase(`/tags?tag=${tag}`)"
      class="blog-tag"
    >
      {{ tag }}
    </a>
  </div>
</template>

<style scoped>
.tag-list {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}
</style>
