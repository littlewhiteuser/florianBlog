<script setup lang="ts">
/**
 * 友情链接组件（借鉴 @sugarat/theme 的 friend 功能）
 */

interface FriendLink {
  nickname: string
  des: string
  avatar: string
  url: string
}

const props = withDefaults(defineProps<{
  list?: FriendLink[]
  random?: boolean
}>(), {
  random: false,
  list: () => [],
})

import { computed } from 'vue'

const displayList = computed(() => {
  if (props.random) {
    return [...props.list].sort(() => Math.random() - 0.5)
  }
  return props.list
})
</script>

<template>
  <div class="friend-links" v-if="displayList.length">
    <h2 class="friend-links__title">🔗 友情链接</h2>
    <div class="friend-links__grid">
      <a
        v-for="friend in displayList"
        :key="friend.url"
        :href="friend.url"
        target="_blank"
        rel="noopener noreferrer"
        class="friend-card"
      >
        <img
          :src="friend.avatar"
          :alt="friend.nickname"
          class="friend-card__avatar"
          loading="lazy"
        />
        <div class="friend-card__info">
          <span class="friend-card__name">{{ friend.nickname }}</span>
          <span class="friend-card__des">{{ friend.des }}</span>
        </div>
      </a>
    </div>
  </div>
</template>

<style scoped>
.friend-links {
  padding: 0 24px 40px;
  max-width: 780px;
  margin: 0 auto;
}

.friend-links__title {
  font-size: 1.4rem;
  font-weight: 600;
  color: var(--blog-text-primary);
  margin-bottom: 20px;
}

.friend-links__grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 12px;
}

.friend-card {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 16px;
  background: var(--blog-card-bg);
  border: 1px solid var(--blog-border);
  border-radius: var(--blog-radius-sm);
  text-decoration: none !important;
  transition: var(--blog-transition);
}

.friend-card:hover {
  border-color: var(--blog-brand);
  box-shadow: var(--blog-card-hover-shadow);
  transform: translateY(-2px);
}

.friend-card__avatar {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  object-fit: cover;
  flex-shrink: 0;
  border: 2px solid var(--blog-border);
}

.friend-card__info {
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
}

.friend-card__name {
  font-size: 0.92rem;
  font-weight: 600;
  color: var(--blog-text-primary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.friend-card__des {
  font-size: 0.78rem;
  color: var(--blog-text-muted);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

@media (max-width: 768px) {
  .friend-links__grid {
    grid-template-columns: 1fr;
  }
}
</style>
