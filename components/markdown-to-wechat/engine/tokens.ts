import { ArticleMeta, ColorPalette, CustomColors, LayoutTheme, PaletteColorKey, PaletteColors, VisualCapabilities, VisualLevel } from './types'

export const DEFAULT_ARTICLE_META: ArticleMeta = {
  avatar: '',
  author: '唯知AI',
  date: new Date().toISOString().slice(0, 7),
  category: 'KEEP SHARE • 资源',
  tags: ' 实战经验,Skill',
  ending: `我是 唯知AI，持续分享一线实践与长期观察

如果觉得今天这篇有收获，欢迎点赞、在看、转发三连，我们下篇见`
}

export const VISUAL_LEVELS: { level: VisualLevel; badge: string; name: string; desc: string }[] = [
  { level: 'basic', badge: '基础', name: '基础排版', desc: '保留主题配色、标题层级与引用/代码高亮' },
  { level: 'decorated', badge: '增强', name: '装饰增强', desc: '开启主题首图卡、篇幅导览卡与静态分隔装饰' },
  { level: 'motion', badge: '动效', name: '主题动效', desc: '全套卡片排版 + 主题专属 SVG 微动效' }
]

export const PALETTE_COLOR_FIELDS: { key: PaletteColorKey; label: string }[] = [
  { key: 'bg', label: '正文底色' },
  { key: 'heading', label: '标题' },
  { key: 'strong', label: '重点加粗' },
  { key: 'headingDecor', label: '标题装饰' },
  { key: 'divider', label: '分割线' },
  { key: 'listMarker', label: '列表标记' },
  { key: 'codeBlockBg', label: '代码块' },
  { key: 'tableAccent', label: '表格' },
  { key: 'inlineCodeText', label: '行内代码文字' },
  { key: 'inlineCodeBg', label: '行内代码底色/阴影' },
  { key: 'blockquoteAccent', label: '引用' }
]

export const POPULAR_PALETTES: Omit<ColorPalette, 'subtitle'>[] = [
  {
    id: 'tech-blue',
    name: '科技蓝',
    colors: {
      bg: '#ffffff',
      heading: '#0f172a',
      strong: '#1d4ed8',
      headingDecor: '#2563eb',
      divider: '#bfdbfe',
      listMarker: '#2563eb',
      codeBlockBg: '#0f172a',
      tableAccent: '#eff6ff',
      inlineCodeText: '#1e40af',
      inlineCodeBg: '#eff6ff',
      blockquoteAccent: '#2563eb'
    }
  },
  {
    id: 'emerald-green',
    name: '翡翠绿',
    colors: {
      bg: '#ffffff',
      heading: '#064e3b',
      strong: '#059669',
      headingDecor: '#10b981',
      divider: '#a7f3d0',
      listMarker: '#059669',
      codeBlockBg: '#1e293b',
      tableAccent: '#ecfdf5',
      inlineCodeText: '#047857',
      inlineCodeBg: '#ecfdf5',
      blockquoteAccent: '#059669'
    }
  },
  {
    id: 'graphite-black',
    name: '石墨黑',
    colors: {
      bg: '#ffffff',
      heading: '#18181b',
      strong: '#18181b',
      headingDecor: '#52525b',
      divider: '#e4e4e7',
      listMarker: '#3f3f46',
      codeBlockBg: '#18181b',
      tableAccent: '#f4f4f5',
      inlineCodeText: '#27272a',
      inlineCodeBg: '#f4f4f5',
      blockquoteAccent: '#3f3f46'
    }
  },
  {
    id: 'vibrant-orange',
    name: '活力橙',
    colors: {
      bg: '#fffdf9',
      heading: '#431407',
      strong: '#ea580c',
      headingDecor: '#f97316',
      divider: '#fed7aa',
      listMarker: '#ea580c',
      codeBlockBg: '#1c1917',
      tableAccent: '#fff7ed',
      inlineCodeText: '#c2410c',
      inlineCodeBg: '#ffedd5',
      blockquoteAccent: '#ea580c'
    }
  },
  {
    id: 'lavender-purple',
    name: '薰衣紫',
    colors: {
      bg: '#ffffff',
      heading: '#2e1065',
      strong: '#7c3aed',
      headingDecor: '#8b5cf6',
      divider: '#ddd6fe',
      listMarker: '#7c3aed',
      codeBlockBg: '#1e1b4b',
      tableAccent: '#f5f3ff',
      inlineCodeText: '#6d28d9',
      inlineCodeBg: '#f5f3ff',
      blockquoteAccent: '#7c3aed'
    }
  }
]

export function getThemePalettes(theme: LayoutTheme): ColorPalette[] {
  return [
    theme.defaultPalette,
    ...POPULAR_PALETTES.map((p) => ({
      ...p,
      subtitle: `${theme.name} · 流行配色`
    }))
  ]
}

export function resolvePaletteColors(theme: LayoutTheme, paletteId: string, customColors: CustomColors): PaletteColors {
  const palettes = getThemePalettes(theme)
  const base = palettes.find((p) => p.id === paletteId) || theme.defaultPalette
  if (paletteId === 'custom') {
    return { ...base.colors, ...customColors }
  }
  return base.colors
}

export function resolveVisualCapabilities(level: VisualLevel): VisualCapabilities {
  if (level === 'basic') {
    return {
      showBanner: false,
      showToc: false,
      showCodeHeader: false,
      useFancyDivider: false,
      useMotion: false
    }
  }
  if (level === 'decorated') {
    return {
      showBanner: true,
      showToc: true,
      showCodeHeader: true,
      useFancyDivider: true,
      useMotion: false
    }
  }
  return {
    showBanner: true,
    showToc: true,
    showCodeHeader: true,
    useFancyDivider: true,
    useMotion: true
  }
}

export function hexToRgba(hex: string, alpha: number): string {
  const clean = hex.replace('#', '')
  const normalized =
    clean.length === 3
      ? clean
          .split('')
          .map((c) => c + c)
          .join('')
      : clean
  const intVal = parseInt(normalized, 16)
  if (Number.isNaN(intVal)) return `rgba(37, 99, 235, ${alpha})`
  const r = (intVal >> 16) & 255
  const g = (intVal >> 8) & 255
  const b = intVal & 255
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

export function escapeHtml(text: string): string {
  return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;')
}

export const SAMPLE_MARKDOWN = `# 从 Prompt 到 Context，再到 Skills：把经验变成可复用的能力

> 通用 Agent 过去有两个老毛病：上下文容易越堆越长，以及经验难以复用与共享。Skills 的价值点，恰好对着这两个痛点打。

大家其实会明显感觉到，圈子里的关键词换得越来越快。前几年大家讲 \`Prompt\`，后来讲 \`Context Engineering\`。再后来，MCP、Tool Use、Workflow 一起上桌。到了最近，**Skills** 变成了高频词。

## 从 Prompt 到 Context，再到 Skills

我观察到一个很有意思的变化：大家讨论 Skills 时，表面在聊怎么写一个 Skill，底层其实在聊**怎么把经验变成可复用的能力**。

- **Prompt 时代**：你在写一段话，让模型配合你。
- **Context 时代**：你在经营一个信息场，让模型更像你想要的那样工作。
- **Skills 时代**：我们在打包一个能力包，让通用 Agent 在特定任务上稳定发挥。

## 为什么 Skills 会突然爆火？

通用 Agent 过去有两个核心痛点。第一，上下文容易越堆越长；第二，经验难以复用与共享。

### 三层信息分级与按需加载

我们把它讲得更工程一点，核心文件其实就是 \`SKILL.md\` 这个文件，通过分层加载控制上下文体积：

\`\`\`yaml
name: gzh-design
description: 将 Markdown 排版为符合微信公众号规范的内联 HTML
\`\`\`

| 层级 | 触发时机 | 作用范围 |
| :--- | :--- | :--- |
| Level 1 元数据 | 常驻上下文 | 决定什么时候触发 |
| Level 2 指令正文 | 触发后加载 | 规定 SOP 与输出规范 |
| Level 3 资源脚本 | 按需读取 | 提供模板与校验脚本 |

---

如果你也在找一款轻量、纯粹、无需折腾的 Markdown 公众号排版工具，欢迎直接将本文复制到公众号后台草稿箱体验。
`
