import { createContentLoader } from 'vitepress'
import type { ContentData, SiteConfig } from 'vitepress'

export interface Post {
  title: string
  url: string
  date: {
    time: number
    string: string
  }
  excerpt?: string
  category: string
  tags: string[]
  readTime: string
  image?: string
}

declare const data: Post[]
export { data }

export default createContentLoader('posts/*.md', {
  excerpt: true,
  transform(raw): Post[] {
    return raw
      .map(({ url, frontmatter, excerpt }) => ({
        title: frontmatter.title || 'Untitled',
        url,
        excerpt: excerpt || frontmatter.excerpt || '',
        date: formatDate(frontmatter.date),
        category: frontmatter.category || 'Uncategorized',
        tags: frontmatter.tags || [],
        readTime: frontmatter.readTime || calculateReadTime(excerpt || ''),
        image: frontmatter.image
      }))
      .sort((a, b) => b.date.time - a.date.time)
  }
})

function formatDate(raw: string | number | Date): { time: number; string: string } {
  const date = new Date(raw)
  date.setUTCHours(12)
  return {
    time: +date,
    string: date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }
}

function calculateReadTime(content: string): string {
  // 简单的阅读时间计算
  // 中文：约 300 字/分钟
  // 英文：约 200 词/分钟
  const chineseChars = (content.match(/[\u4e00-\u9fa5]/g) || []).length
  const words = content.split(/\s+/).length
  const minutes = Math.ceil((chineseChars / 300 + words / 200))
  return `${minutes} min`
}
