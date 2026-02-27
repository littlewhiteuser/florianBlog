<script setup lang="ts">
import { useData, withBase } from 'vitepress'
import { data as posts } from '../utils/posts.data.mts'
import ArticleCard from './ArticleCard.vue'
import BlogInfoCard from './BlogInfoCard.vue'
import HotArticles from './HotArticles.vue'
import FriendLinks from './FriendLinks.vue'
import { computed } from 'vue'

const { site } = useData()

// 首页每页显示文章数
const pageSize = 6
const latestPosts = computed(() => posts.slice(0, pageSize))

// 获取所有标签
const allTags = computed(() => {
  const tagMap = new Map<string, number>()
  posts.forEach(post => {
    post.tags.forEach(tag => {
      tagMap.set(tag, (tagMap.get(tag) || 0) + 1)
    })
  })
  return Array.from(tagMap.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 15)
})

// 友情链接配置
const friends = [
  {
    nickname: 'VitePress',
    des: 'Vite & Vue Powered Static Site Generator',
    avatar: 'https://vitepress.dev/vitepress-logo-mini.svg',
    url: 'https://vitepress.dev/',
  },
  {
    nickname: 'Vue.js',
    des: '渐进式 JavaScript 框架',
    avatar: 'https://vuejs.org/logo.svg',
    url: 'https://vuejs.org/',
  },
]
</script>

<template>
  <div class="blog-home">
    <!-- 顶部 Banner：站名 + Slogan（紧凑） -->
    <section class="blog-banner">
      <h1 class="blog-banner__title">Florian's Blog</h1>
      <p class="blog-banner__motto">记录技术成长，分享编程心得</p>
    </section>

    <!-- 主体：左侧文章列表 + 右侧侧边栏 -->
    <div class="blog-home__body">
      <!-- 左侧：文章列表 -->
      <section class="blog-home__main">
        <div class="blog-posts__list">
          <ArticleCard v-for="post in latestPosts" :key="post.url" :post="post" />
        </div>
        <div v-if="posts.length > pageSize" style="text-align: center; margin-top: 32px;">
          <a :href="withBase('/blog/')" class="blog-tag" style="font-size: 0.92rem; padding: 8px 24px;">
            查看全部文章 →
          </a>
        </div>
      </section>

      <!-- 右侧：侧边栏 -->
      <aside class="blog-home__sidebar">
        <!-- 个人信息卡片 -->
        <div class="profile-card">
          <div class="profile-card__avatar">
            <img :src="withBase('/avatar.jpg')" alt="avatar" />
          </div>
          <h2 class="profile-card__name">Florian</h2>
          <p class="profile-card__desc">专注于前端开发与全栈技术探索</p>
          <div class="profile-card__social">
            <a href="https://github.com/littlewhiteuser" target="_blank" title="GitHub">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
          </div>
        </div>

        <!-- 博客统计 -->
        <BlogInfoCard />

        <!-- 精选文章 -->
        <HotArticles />

        <!-- 标签云 -->
        <div class="sidebar-tags" v-if="allTags.length">
          <h3 class="sidebar-tags__title">🏷️ 标签</h3>
          <div class="sidebar-tags__cloud">
            <a
              v-for="([tag, count], idx) in allTags"
              :key="tag"
              :href="withBase(`/tags?tag=${tag}`)"
              class="blog-tag color-tag"
              :class="`color-tag--${idx % 8}`"
            >
              {{ tag }} ({{ count }})
            </a>
          </div>
        </div>
      </aside>
    </div>

    <!-- 友情链接 -->
    <FriendLinks :list="friends" />
  </div>
</template>

<style scoped>
.blog-home {
  max-width: 1100px;
  margin: 0 auto;
}

/* Banner 紧凑 */
.blog-banner {
  text-align: center;
  padding: 36px 24px 20px;
}

.blog-banner__title {
  font-size: 1.8rem;
  font-weight: 700;
  color: var(--blog-text-primary);
  margin: 0 0 6px;
  letter-spacing: -0.02em;
}

.blog-banner__motto {
  font-size: 0.95rem;
  color: var(--blog-text-muted);
  margin: 0;
}

/* 主体双栏 */
.blog-home__body {
  display: flex;
  gap: 24px;
  padding: 16px 24px 40px;
  align-items: flex-start;
}

.blog-home__main {
  flex: 1;
  min-width: 0;
}

.blog-home__sidebar {
  width: 300px;
  flex-shrink: 0;
  position: sticky;
  top: calc(var(--vp-nav-height) + 16px);
  max-height: calc(100vh - var(--vp-nav-height) - 32px);
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

/* 隐藏侧边栏滚动条 */
.blog-home__sidebar::-webkit-scrollbar {
  width: 0;
  display: none;
}

/* 个人信息卡片 */
.profile-card {
  background: var(--blog-card-bg);
  border: 1px solid var(--blog-border);
  border-radius: var(--blog-radius);
  padding: 28px 20px 22px;
  text-align: center;
}

.profile-card__avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin: 0 auto 14px;
  border: 3px solid var(--blog-brand);
  padding: 3px;
  transition: var(--blog-transition);
}

.profile-card__avatar:hover {
  transform: scale(1.08);
}

.profile-card__avatar img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
}

.profile-card__name {
  font-size: 1.15rem;
  font-weight: 700;
  color: var(--blog-text-primary);
  margin: 0 0 6px;
}

.profile-card__desc {
  font-size: 0.82rem;
  color: var(--blog-text-muted);
  margin: 0 0 14px;
  line-height: 1.5;
}

.profile-card__social {
  display: flex;
  gap: 10px;
  justify-content: center;
}

.profile-card__social a {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background: var(--blog-bg-soft);
  color: var(--blog-text-secondary);
  transition: var(--blog-transition);
  border: 1px solid var(--blog-border);
}

.profile-card__social a:hover {
  color: var(--blog-brand);
  border-color: var(--blog-brand);
  transform: translateY(-2px);
}

/* 侧边栏标签 */
.sidebar-tags {
  background: var(--blog-card-bg);
  border: 1px solid var(--blog-border);
  border-radius: var(--blog-radius);
  padding: 18px 20px;
}

.sidebar-tags__title {
  font-size: 1rem;
  font-weight: 600;
  color: var(--blog-text-primary);
  margin: 0 0 14px;
}

.sidebar-tags__cloud {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

/* 移动端响应式 */
@media (max-width: 960px) {
  .blog-home__body {
    flex-direction: column;
  }

  .blog-home__sidebar {
    width: 100%;
    position: static;
    max-height: none;
    flex-direction: row;
    flex-wrap: wrap;
  }

  .blog-home__sidebar > * {
    flex: 1 1 280px;
  }

  .profile-card {
    flex: 1 1 100%;
  }
}
</style>
