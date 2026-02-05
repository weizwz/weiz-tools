export interface Tool {
  id: string
  name: string
  description: string
  category: string
  color: 'yellow' | 'cyan' | 'magenta' | 'white'
  href: string
  // New fields for featured section
  tags?: string[]
  previewImage?: string
}

export const categories = ['全部', '编码工具', '格式化', '转换器', '生成器'] as const

export const tools: Tool[] = [
  {
    id: 'oppo-widget-cover',
    name: 'OPPO 组件封面生成器',
    description: 'OPPO 组件封面生成器',
    category: '图像处理',
    color: 'yellow',
    href: '/tools/oppo-widget-cover',
    tags: ['Cover', 'Image'],
    previewImage: '/previews/oppo-widget-cover.png'
  },
  {
    id: 'json-formatter',
    name: 'JSON 格式化',
    description: '美化和验证 JSON 数据,支持压缩和展开',
    category: '格式化',
    color: 'yellow',
    href: '/tools/json-formatter',
    tags: ['Formatting', 'JSON', 'Dev'],
    previewImage: '/previews/json.png'
  },
  {
    id: 'base64',
    name: 'Base64 编解码',
    description: '快速进行 Base64 编码和解码操作',
    category: '编码工具',
    color: 'cyan',
    href: '/tools/base64',
    tags: ['Encoding', 'Security']
  },
  {
    id: 'color-picker',
    name: '颜色选择器',
    description: '选择颜色并获取 HEX、RGB、HSL 等格式',
    category: '生成器',
    color: 'magenta',
    href: '/tools/color-picker',
    tags: ['Design', 'Color', 'CSS'],
    previewImage: '/previews/color.png'
  },
  {
    id: 'timestamp',
    name: '时间戳转换',
    description: 'Unix 时间戳与日期时间相互转换',
    category: '转换器',
    color: 'white',
    href: '/tools/timestamp',
    tags: ['Converter', 'Date']
  },
  {
    id: 'markdown-preview',
    name: 'Markdown 预览',
    description: '实时预览 Markdown 渲染效果',
    category: '格式化',
    color: 'yellow',
    href: '/tools/markdown-preview',
    tags: ['Writing', 'Docs']
  },
  {
    id: 'url-encoder',
    name: 'URL 编解码',
    description: 'URL 编码和解码工具',
    category: '编码工具',
    color: 'cyan',
    href: '/tools/url-encoder',
    tags: ['Encoding', 'Web']
  },
  {
    id: 'uuid-generator',
    name: 'UUID 生成器',
    description: '生成标准的 UUID/GUID',
    category: '生成器',
    color: 'magenta',
    href: '/tools/uuid-generator',
    tags: ['Generator', 'ID']
  },
  {
    id: 'hash-generator',
    name: 'Hash 生成器',
    description: '生成 MD5、SHA-1、SHA-256 等哈希值',
    category: '编码工具',
    color: 'white',
    href: '/tools/hash-generator',
    tags: ['Security', 'Crypto']
  },
  {
    id: 'unit-converter',
    name: '单位转换',
    description: 'PX, REM, EM 和 Viewport 单位互转',
    category: '转换器',
    color: 'cyan',
    href: '/tools/base64', // Note: User's page.tsx linked Unit Converter to base64, keeping as is or creating new? I'll keep the link but add the entry so I can feature it.
    tags: ['CSS', 'Responsive', 'Layout'],
    previewImage: '/previews/unit.png'
  }
]
