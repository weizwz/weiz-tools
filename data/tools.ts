export interface Tool {
  id: string
  name: string
  description: string
  category: string
  icon: string
  color: 'yellow' | 'cyan' | 'magenta' | 'white'
  href: string
}

export const categories = ['全部', '编码工具', '格式化', '转换器', '生成器'] as const

export const tools: Tool[] = [
  {
    id: 'json-formatter',
    name: 'JSON 格式化',
    description: '美化和验证 JSON 数据,支持压缩和展开',
    category: '格式化',
    icon: '{}',
    color: 'yellow',
    href: '/tools/json-formatter'
  },
  {
    id: 'base64',
    name: 'Base64 编解码',
    description: '快速进行 Base64 编码和解码操作',
    category: '编码工具',
    icon: '🔐',
    color: 'cyan',
    href: '/tools/base64'
  },
  {
    id: 'color-picker',
    name: '颜色选择器',
    description: '选择颜色并获取 HEX、RGB、HSL 等格式',
    category: '生成器',
    icon: '🎨',
    color: 'magenta',
    href: '/tools/color-picker'
  },
  {
    id: 'timestamp',
    name: '时间戳转换',
    description: 'Unix 时间戳与日期时间相互转换',
    category: '转换器',
    icon: '⏰',
    color: 'white',
    href: '/tools/timestamp'
  },
  {
    id: 'markdown-preview',
    name: 'Markdown 预览',
    description: '实时预览 Markdown 渲染效果',
    category: '格式化',
    icon: '📝',
    color: 'yellow',
    href: '/tools/markdown-preview'
  },
  {
    id: 'url-encoder',
    name: 'URL 编解码',
    description: 'URL 编码和解码工具',
    category: '编码工具',
    icon: '🔗',
    color: 'cyan',
    href: '/tools/url-encoder'
  },
  {
    id: 'uuid-generator',
    name: 'UUID 生成器',
    description: '生成标准的 UUID/GUID',
    category: '生成器',
    icon: '🆔',
    color: 'magenta',
    href: '/tools/uuid-generator'
  },
  {
    id: 'hash-generator',
    name: 'Hash 生成器',
    description: '生成 MD5、SHA-1、SHA-256 等哈希值',
    category: '编码工具',
    icon: '#️⃣',
    color: 'white',
    href: '/tools/hash-generator'
  }
]
