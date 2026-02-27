import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "Florian's Blog",
  description: '一个简约风格的个人技术博客',
  lang: 'zh-CN',
  cleanUrls: true,
  lastUpdated: true,
  base: '/florianBlog/',

  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/logo.svg' }],
    ['meta', { name: 'theme-color', content: '#3c8772' }],
    ['meta', { name: 'og:type', content: 'website' }],
    ['meta', { name: 'og:locale', content: 'zh-CN' }],
    ['meta', { name: 'og:site_name', content: "Florian's Blog" }],
  ],

  markdown: {
    theme: {
      light: 'vitesse-light',
      dark: 'vitesse-dark',
    },
    lineNumbers: true,
  },

  themeConfig: {
    logo: '/logo.svg',
    nav: [
      { text: '首页', link: '/' },
      { text: '文章', link: '/blog/' },
      { text: '标签', link: '/tags' },
      { text: '归档', link: '/archives' },
      { text: '关于', link: '/about' },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/littlewhiteuser' },
    ],

    search: {
      provider: 'local',
      options: {
        translations: {
          button: {
            buttonText: '搜索文章',
            buttonAriaLabel: '搜索文章',
          },
          modal: {
            noResultsText: '没有找到结果',
            resetButtonTitle: '清除查询条件',
            footer: {
              selectText: '选择',
              navigateText: '切换',
              closeText: '关闭',
            },
          },
        },
      },
    },

    footer: {
      message: 'Built with <a href="https://vitepress.dev/" target="_blank">VitePress</a>',
      copyright: `© 2024-${new Date().getFullYear()} Florian | MIT License`,
    },

    outline: {
      level: [2, 3],
      label: '目录',
    },

    lastUpdated: {
      text: '最后更新于',
    },

    docFooter: {
      prev: '上一篇',
      next: '下一篇',
    },

    returnToTopLabel: '回到顶部',
    sidebarMenuLabel: '菜单',
    darkModeSwitchLabel: '主题',
  },
})
