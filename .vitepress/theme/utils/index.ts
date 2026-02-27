/**
 * 格式化日期为相对时间（借鉴 @sugarat/theme 的日期显示）
 */
export function formatRelativeDate(dateStr: string): string {
  if (!dateStr) return ''
  const date = new Date(dateStr)
  const now = new Date()
  const diff = now.getTime() - date.getTime()

  const seconds = Math.floor(diff / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)

  if (seconds < 60) return `${seconds}秒前`
  if (minutes < 60) return `${minutes}分钟前`
  if (hours < 24) return `${hours}小时前`
  if (days < 7) return `${days}天前`

  return dateStr
}

/**
 * 估算文章阅读时间（借鉴 @sugarat/theme 的阅读时间功能）
 */
export function estimateReadingTime(content: string): { words: number; minutes: number } {
  // 移除 HTML 标签
  const text = content.replace(/<[^>]*>/g, '')
  // 中文字符
  const cnChars = (text.match(/[\u4e00-\u9fa5]/g) || []).length
  // 英文单词
  const enWords = (text.replace(/[\u4e00-\u9fa5]/g, ' ').match(/[a-zA-Z]+/g) || []).length
  // 代码块近似
  const codeBlocks = (text.match(/```[\s\S]*?```/g) || []).length

  const totalWords = cnChars + enWords
  // 中文阅读速度约 300 字/分钟，代码块按 40 字/分钟
  const minutes = Math.ceil(totalWords / 300 + codeBlocks * 0.5)

  return {
    words: totalWords,
    minutes: Math.max(1, minutes),
  }
}

/**
 * 格式化数字（如 1200 → 1.2k）
 */
export function formatNumber(num: number): string {
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'k'
  }
  return String(num)
}
