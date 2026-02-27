// 文章数据加载工具
import { createContentLoader } from 'vitepress'

export interface Post {
  title: string
  url: string
  date: string
  excerpt: string | undefined
  tags: string[]
  category: string
  cover?: string
  sticky?: number
}

declare const data: Post[]
export { data }

export default createContentLoader('blog/posts/*.md', {
  excerpt: true,
  transform(raw): Post[] {
    return raw
      .map(({ url, frontmatter, excerpt }) => ({
        title: frontmatter.title || '未命名文章',
        url,
        date: formatDate(frontmatter.date),
        excerpt: excerpt || frontmatter.description || '',
        tags: frontmatter.tags || [],
        category: frontmatter.category || '未分类',
        cover: frontmatter.cover || '',
        sticky: frontmatter.sticky || 0,
      }))
      .sort((a, b) => {
        // 置顶文章优先
        if (a.sticky !== b.sticky) return b.sticky - a.sticky
        return new Date(b.date).getTime() - new Date(a.date).getTime()
      })
  },
})

function formatDate(raw: string | Date): string {
  if (!raw) return ''
  const date = new Date(raw)
  return date.toISOString().slice(0, 10)
}

export function createBlogConfig() {
  return {}
}
