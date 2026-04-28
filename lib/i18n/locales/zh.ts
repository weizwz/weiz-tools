interface ToolLocale {
  name: string
  description: string
}

export interface Locale {
  common: {
    getStarted: string
    learnMore: string
    enter: string
    allRightsReserved: string
  }
  nav: {
    home: string
    resources: string
    docs: string
    about: string
    tools: string
  }
  home: {
    heroTitle: string
    heroSubtitle: string
    heroDescription: string
    exploreAll: string
    featuredTools: string
    featuredToolsDesc: string
    imgPreview: string
    newFeature: string
    snippetTitle: string
    snippetDesc: string
    cloudSync: string
    teamLibrary: string
    markdownReady: string
    tryDemo: string
    documentation: string
    searchPlaceholder: string
    popularTools: string
    recommendedProjects: string
    allTools: string
    pinTool: string
  }
  about: {
    title: string
    subtitle: string
    missionTitle: string
    missionDesc: string
    speedTitle: string
    speedDesc: string
    designTitle: string
    designDesc: string
    privacyTitle: string
    privacyDesc: string
    responsiveTitle: string
    responsiveDesc: string
    techStackTitle: string
    contactTitle: string
    contactDesc: string
  }
  search: {
    placeholder: string
    clearLabel: string
  }
  footer: {
    copyright: string
  }
  tools: Record<string, ToolLocale>
  categories: Record<string, string>
  metadata: {
    title: string
    description: string
  }
}

const zh: Locale = {
  // 通用
  common: {
    getStarted: '开始使用',
    learnMore: '了解更多',
    enter: '进入',
    allRightsReserved: '版权所有'
  },

  // 网页元数据
  metadata: {
    title: '知了工具箱 | 在线实用小工具',
    description: '我是一只小知了 | 为大家精心准备的实用小工具集合'
  },

  // 导航栏
  nav: {
    home: '首页',
    resources: '资源',
    docs: '文档',
    about: '关于',
    tools: '工具'
  },

  // 首页
  home: {
    heroTitle: '一站式实用工具工作台',
    heroSubtitle: '为开发者而生',
    heroDescription: '整体实用工具，提升开发效率。探索、交流、提升您的技能，让工作更加高效便捷。',
    exploreAll: '探索',
    featuredTools: '精选工具',
    featuredToolsDesc: '社区最常用的工具',
    imgPreview: '图片预览',
    newFeature: '新功能',
    snippetTitle: '代码片段管理器 Pro',
    snippetDesc: '管理跨项目的常用代码块。与工作区同步，与团队分享，并通过轻量级 CLI 工具访问。',
    cloudSync: '云端同步',
    teamLibrary: '团队库',
    markdownReady: 'Markdown 支持',
    tryDemo: '在线演示',
    documentation: '使用文档',
    searchPlaceholder: '搜索工具、快捷工具搜索、时间、JSON、图片...',
    popularTools: '使用量最多',
    recommendedProjects: '推荐项目',
    allTools: '精选工具',
    pinTool: '置顶工具'
  },

  // 关于页
  about: {
    title: '关于我们',
    subtitle: '打造最简洁高效的在线工具集',
    missionTitle: '🎯 我们的使命',
    missionDesc: '为开发者和创作者提供简洁、快速、无广告的在线工具, 让日常工作更加高效便捷。所有工具完全免费,无需注册, 即开即用。',
    speedTitle: '⚡ 极速体验',
    speedDesc: '所有工具均在浏览器本地运行,无需上传数据,保护隐私的同时提供极速体验',
    designTitle: '🎨 现代设计',
    designDesc: '采用简约清爽的设计风格,蓝白灰配色,流畅的交互体验',
    privacyTitle: '🔒 隐私优先',
    privacyDesc: '不收集任何用户数据,所有处理均在本地完成,保护你的隐私安全',
    responsiveTitle: '📱 响应式设计',
    responsiveDesc: '完美适配桌面、平板和手机,随时随地使用你需要的工具',
    techStackTitle: '🛠️ 技术栈',
    contactTitle: '📬 联系我们',
    contactDesc: '有任何建议或反馈?欢迎通过以下方式联系我们:'
  },

  // 搜索栏
  search: {
    placeholder: '搜索工具...',
    clearLabel: '清除搜索'
  },

  // 底部
  footer: {
    copyright: '版权所有'
  },

  // 工具数据
  tools: {
    'oppo-widget-cover': {
      name: 'OPPO 组件封面',
      description: 'OPPO 手机桌面小组件封面图生成器'
    },
    'json-formatter': {
      name: 'JSON 格式化',
      description: '美化和验证 JSON 数据,支持压缩和展开'
    },
    base64: {
      name: 'Base64 编解码',
      description: '快速进行 Base64 编码和解码操作'
    },
    'color-picker': {
      name: '颜色选择器',
      description: '选择颜色并获取 HEX、RGB、HSL 等格式'
    },
    timestamp: {
      name: '时间戳转换',
      description: 'Unix 时间戳与日期时间相互转换'
    },
    'markdown-preview': {
      name: 'Markdown 预览',
      description: '实时预览 Markdown 渲染效果'
    },
    'url-encoder': {
      name: 'URL 编解码',
      description: 'URL 编码和解码工具'
    },
    'uuid-generator': {
      name: 'UUID 生成器',
      description: '生成标准的 UUID/GUID'
    },
    'hash-generator': {
      name: 'Hash 生成器',
      description: '生成 MD5、SHA-1、SHA-256 等哈希值'
    },
    'unit-converter': {
      name: '单位转换',
      description: 'PX, REM, EM 和 Viewport 单位互转'
    }
  },

  // 分类
  categories: {
    全部: '全部',
    编码工具: '编码工具',
    格式化: '格式化',
    转换器: '转换器',
    生成器: '生成器',
    图像处理: '图像处理',
    all: '全部',
    codingTools: '编码工具',
    formatting: '格式化',
    converters: '转换器',
    generators: '生成器',
    imageProcessing: '图像处理'
  }
}

export default zh
