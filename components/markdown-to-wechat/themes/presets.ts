import { WechatTheme } from './types'

export const WECHAT_THEMES: WechatTheme[] = [
  {
    id: 'blueprint',
    name: '蓝图网格',
    badge: 'BP',
    description: '工程制图网格 + 导览目录卡片，适合技术深度文章',
    primary: '#2563eb',
    primarySoft: '#eff6ff',
    primaryBorder: '#bfdbfe',
    text: '#27272a',
    textMuted: '#64748b',
    headingColor: '#0f172a',
    bg: '#ffffff',
    gridBg:
      'linear-gradient(to right, rgba(37, 99, 235, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(37, 99, 235, 0.05) 1px, transparent 1px)',
    blockquoteBg: '#eff6ff',
    blockquoteBorder: '#2563eb',
    codeBg: '#f1f5f9',
    codeText: '#1e40af',
    preBg: '#0f172a',
    preHeaderBg: '#1e293b',
    hrColor: '#dbeafe'
  },
  {
    id: 'minimal-tech',
    name: '极简科技',
    badge: 'MT',
    description: '清爽留白与高对比排版，适配通用科技专栏',
    primary: '#409eff',
    primarySoft: '#f0f7ff',
    primaryBorder: '#c6e2ff',
    text: '#303133',
    textMuted: '#909399',
    headingColor: '#1f2937',
    bg: '#ffffff',
    blockquoteBg: '#f5f7fa',
    blockquoteBorder: '#409eff',
    codeBg: '#f4f4f5',
    codeText: '#2563eb',
    preBg: '#1e293b',
    preHeaderBg: '#334155',
    hrColor: '#e4e7ed'
  },
  {
    id: 'editorial',
    name: '杂志刊物',
    badge: 'ED',
    description: '温润纸感与刊物眉标，适合随笔、复盘与人物专访',
    primary: '#b45309',
    primarySoft: '#fffbeb',
    primaryBorder: '#fde68a',
    text: '#292524',
    textMuted: '#78716c',
    headingColor: '#1c1917',
    bg: '#fffdf9',
    blockquoteBg: '#fef3c7',
    blockquoteBorder: '#d97706',
    codeBg: '#f5f5f4',
    codeText: '#92400e',
    preBg: '#1c1917',
    preHeaderBg: '#292524',
    hrColor: '#e7e5e4'
  },
  {
    id: 'geek-dark',
    name: '极客紫调',
    badge: 'GK',
    description: '高识别度紫靛强调色，适合开源发布与产品更新',
    primary: '#6366f1',
    primarySoft: '#eef2ff',
    primaryBorder: '#c7d2fe',
    text: '#1f2937',
    textMuted: '#6b7280',
    headingColor: '#111827',
    bg: '#ffffff',
    blockquoteBg: '#eef2ff',
    blockquoteBorder: '#6366f1',
    codeBg: '#f3f4f6',
    codeText: '#4338ca',
    preBg: '#111827',
    preHeaderBg: '#1f2937',
    hrColor: '#e5e7eb'
  }
]

export const COLOR_PRESETS = [
  { label: '主题默认', value: '' },
  { label: '工程蓝', value: '#2563eb' },
  { label: '晴空蓝', value: '#409eff' },
  { label: '翡翠绿', value: '#10b981' },
  { label: '琥珀橙', value: '#d97706' },
  { label: '极客紫', value: '#6366f1' },
  { label: '珊瑚红', value: '#e11d48' }
]

export const SAMPLE_MARKDOWN = `# 在 Obsidian 中全面适配 VitePress 语法，VitePress Theme 插件史诗级更新

> 用 VitePress 写文档或博客时，平时编辑和预览经常会在 Obsidian 和本地预览服务之间来回切。为了在 Obsidian 里直接获得接近 VitePress 站点的阅读观感，我做了 VitePress Theme for Obsidian 这个插件，最近重构了整个项目，使之功能更强，性能消耗更低。

这次重构把 \`VitePress\` 的常用扩展语法和排版样式做了一次比较完整的适配，主要集中在三块：

1. **对齐 VitePress 的基础排版规范**，包括标题层级与列表、行高等阅读样式。
2. 在阅读模式下**解析并渲染 VitePress 扩展语法**，覆盖 frontmatter 属性与徽章组件，同时适配了代码块、代码高亮以及链接增强。
3. **优化代码块顶栏、容器和基础界面样式**，减少 Obsidian 默认主题和最终站点效果之间的割裂感。

## 功能展示

下面按功能模块展示插件在阅读模式下的实际渲染效果。

### 核心排版能力

支持自动提取文章目录结构，生成编号导览卡片，并对行内代码、引用块与列表进行公众号内联样式兼容处理。

\`\`\`ts
export function formatWechatArticle(markdown: string) {
  const tokens = parseMarkdown(markdown)
  return inlineStyles(tokens, {
    theme: 'blueprint',
    enableMotion: true
  })
}
\`\`\`

### 为什么需要内联样式？

| 特性 | 普通网页 CSS | 微信公众号富文本 |
| :--- | :--- | :--- |
| \`<style>\` 标签 | 原生支持 | 会被自动过滤 |
| CSS 变量 | 原生支持 | 粘贴后失效 |
| 行内 \`style="..."\` | 原生支持 | 完整保留 |

---

如果你也在找一款轻量、纯粹、无需折腾 AI 配置的 Markdown 公众号排版工具，欢迎直接将本文复制到公众号后台草稿箱体验。
`
