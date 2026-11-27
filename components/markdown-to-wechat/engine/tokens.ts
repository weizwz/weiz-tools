import { ArticleMeta, ColorPalette, CustomColors, LayoutTheme, PaletteColorKey, PaletteColors } from './types'

export const DEFAULT_ARTICLE_META: ArticleMeta = {
  avatar: '',
  author: '唯知AI',
  date: new Date().toISOString().slice(0, 7),
  category: 'KEEP SHARE • 资源',
  tags: ' 实战经验,Skill',
  ending: `我是 唯知AI，持续分享一线实践与长期观察
如果觉得今天这篇有收获，欢迎关注、点赞、转发，我们下篇见`
}

export const PALETTE_COLOR_FIELDS: { key: PaletteColorKey; label: string }[] = [
  { key: 'bg', label: '正文底色' },
  { key: 'heading', label: '标题' },
  { key: 'strong', label: '重点加粗' },
  { key: 'headingDecor', label: '标题装饰' },
  { key: 'divider', label: '分割线' },
  { key: 'listMarker', label: '列表标记' },
  { key: 'tableAccent', label: '表格' },
  { key: 'inlineCodeText', label: '行内代码文字' },
  { key: 'inlineCodeBg', label: '行内代码底色/阴影' },
  { key: 'blockquoteAccent', label: '引用' }
]

export const POPULAR_PALETTES: ColorPalette[] = [
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
      tableAccent: '#f5f3ff',
      inlineCodeText: '#6d28d9',
      inlineCodeBg: '#f5f3ff',
      blockquoteAccent: '#7c3aed'
    }
  }
]

export function getThemePalettes(theme: LayoutTheme): ColorPalette[] {
  return [
    {
      ...theme.defaultPalette,
      name: `默认•${theme.name}`
    },
    ...POPULAR_PALETTES
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

export function resolveTagList(tags: string, limit = 3): string[] {
  const parse = (raw: string) =>
    raw
      .split(/[,，]/)
      .map((t) => t.trim())
      .filter(Boolean)
      .slice(0, limit)
  const list = parse(tags)
  return list.length > 0 ? list : parse(DEFAULT_ARTICLE_META.tags)
}

export const SAMPLE_MARKDOWN = `# AI 时代，如何打造一款好看的公众号排版工具

> 好的排版工具，不是把样式硬塞给作者，而是把克制的审美、工程化的规则与实时预览能力融为一体。

在 AI 辅助开发普及的今天，独立打造一款轻量好用的**公众号排版工具**，早已不再需要从零造轮子。只要选对设计基准、善用 \`Codex\` 与 \`Antigravity\` 等工具，过去繁琐的样式调试完全可以~~手动硬写~~高效自动化。

![封面示意：AI 时代公众号排版工具构建路径]()

## 参考优秀的版面设计

动手写代码前，先确立视觉基准。优秀的阅读体验往往来自克制的留白、清晰的层级与稳定的字号节奏。

- **字体与行距**：正文保持舒适行高，中英文混排留出呼吸感。
- **色彩克制**：主色只用于标题装饰与重点强调，避免大面积高饱和色块。
- **结构统一**：卡片、引用与分割线维持一致的圆角与边距规范。

## 合理利用 AI 工具

借助 \`Codex\`、\`Antigravity\` 等 AI 编程助手，可以把*重复的样式适配*和*微信内联 CSS 兼容*交给模型快速生成与迭代。

## 安装优秀的 Skill，参考项目架构排版

与其每次靠长 Prompt 临时描述规则，不如安装成熟的排版 Skill，直接复用经过验证的项目架构与主题 Token 设计：

### 安装 Skill

引入专注公众号内联样式与设计规范的 Skill。

### 对齐架构

参考成熟项目的 \`tokens\` 分层，将颜色、字号与版式解耦。

### 稳定输出

让 AI 严格按规范编译 Markdown，减少样式漂移。

## 实时调整方案与主题 Token 示例

通过可配置的颜色与版式 Token，边写边看、即时微调，才能快速找到最顺眼的呈现效果：

\`\`\`ts
export const themeToken = {
  heading: '#0f172a',
  accent: '#2563eb',
  inlineCodeBg: '#eff6ff',
  realtimePreview: true
}
\`\`\`

| 阶段 | 核心动作 | 关键产出 |
| :--- | :--- | :--- |
| 版面参考 | 提炼留白、字号与配色比例 | 视觉基准规范 |
| 工具协同 | 使用 Codex / Antigravity 生成样式 | 内联 HTML 引擎 |
| Skill 复用 | 安装排版 Skill 与参考项目架构 | 主题 Token 体系 |
| 实时调整 | 所见即所得微调配色与间距 | 稳定可发布的成稿 |

---

如果你也想快速打磨自己的公众号排版工作流，可以关注微信公众号 **唯知AI**，后续分享更多优秀、有趣的公众号工具。
`
