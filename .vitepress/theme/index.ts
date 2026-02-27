// 自定义主题入口
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import { h } from 'vue'
import { useData } from 'vitepress'
import BlogHome from './components/BlogHome.vue'
import BlogPosts from './components/BlogPosts.vue'
import BlogTags from './components/BlogTags.vue'
import BlogArchives from './components/BlogArchives.vue'
import ArticleCard from './components/ArticleCard.vue'
import TagList from './components/TagList.vue'
import BlogInfoCard from './components/BlogInfoCard.vue'
import FriendLinks from './components/FriendLinks.vue'
import HotArticles from './components/HotArticles.vue'
import BackToTop from './components/BackToTop.vue'
import ArticleMeta from './components/ArticleMeta.vue'
import './styles/custom.css'

// 防止 HMR 重复加载 Live2D
let oml2dLoaded = false

export default {
  extends: DefaultTheme,
  Layout() {
    return h(DefaultTheme.Layout, null, {
      'layout-bottom': () => h(BackToTop),
    })
  },
  async enhanceApp({ app }) {
    // 注册全局组件
    app.component('BlogHome', BlogHome)
    app.component('BlogPosts', BlogPosts)
    app.component('BlogTags', BlogTags)
    app.component('BlogArchives', BlogArchives)
    app.component('ArticleCard', ArticleCard)
    app.component('TagList', TagList)
    app.component('BlogInfoCard', BlogInfoCard)
    app.component('FriendLinks', FriendLinks)
    app.component('HotArticles', HotArticles)
    app.component('ArticleMeta', ArticleMeta)

    // 客户端加载 Live2D 看板娘
    if (!import.meta.env.SSR && !oml2dLoaded) {
      oml2dLoaded = true
      // 清理可能残留的 oml2d DOM 元素（HMR 场景）
      document.querySelectorAll('[id^="oml2d"]').forEach(el => el.remove())

      const { loadOml2d } = await import('oh-my-live2d')
      const base = import.meta.env.BASE_URL || '/'
      loadOml2d({
        dockedPosition: 'left',
        mobileDisplay: false,
        primaryColor: '#3c8772',
        menus: {
          style: { primaryColor: '#3c8772' },
        },
        statusBar: {
          style: { primaryColor: '#3c8772' },
        },
        models: [
          {
            path: `${base}live2d/Senko_Normals/senko.model3.json`,
            position: [-10, 20],
            scale: 0.08,
            stageStyle: {
              width: 220,
              height: 240,
            },
          },
        ],
      })
    }
  },
} satisfies Theme
