# weiz-tools

## 项目简介

`weiz-tools` 是一个基于 Next.js 的轻量工具合集网站，汇总常用开发与设计辅助工具，提供快速搜索、分类筛选、置顶收藏和多语言支持。

该项目目标是构建一个现代 Web 端工具库，具备简洁的交互体验、响应式布局、深色模式支持以及 Cloudflare 部署能力。

## 技术架构

- 框架：Next.js 16
- 语言：TypeScript + React 19
- 样式：Tailwind CSS v4
- UI 工具：Radix UI、Lucide Icons、clsx、class-variance-authority
- 国际化：自定义 `lib/i18n` 本地化方案
- 部署平台：Cloudflare Workers / OpenNext
- 包管理：pnpm

## 目录结构

- `app/`：Next.js 应用入口，包含页面路由与布局
- `components/`：可复用 UI 组件与工具页面组件
- `data/`：工具数据定义与配置项
- `lib/`：工具函数与国际化逻辑
- `public/`：静态资源
- `wrangler.toml`：Cloudflare Worker 部署配置

## 核心功能

- 首页工具展示与搜索
- 工具按分类筛选
- 置顶收藏工具（localStorage 保存）
- 推荐工具列表显示
- 单独工具详情页面
- 响应式、深色模式适配
- 简单可扩展的数据驱动工具配置

## 当前功能点

- `OPPO 组件封面`：图像封面生成器
- `JSON 格式化`：JSON 美化、压缩与验证
- `Base64 编解码`
- `颜色选择器`
- `时间戳转换`
- `Markdown 预览`
- `URL 编解码`
- `UUID 生成器`
- `Hash 生成器`
- `单位转换`

## 本地开发

```bash
pnpm install
pnpm dev
```

打开浏览器访问 `http://localhost:3000`。

## 构建与部署

### 本地预览

```bash
pnpm dev
```

### Cloudflare OpenNext 本地预览

```bash
pnpm cf:preview
```

### 构建

```bash
pnpm build
```

### 部署到 Cloudflare

```bash
pnpm cf:deploy
```

## 运行脚本

- `pnpm dev`：本地开发服务器
- `pnpm build`：Next.js 生产构建
- `pnpm start`：生产构建运行
- `pnpm lint`：ESLint 检查
- `pnpm cf:build`：OpenNext Cloudflare 构建
- `pnpm cf:preview`：构建并启动 Wrangler 本地预览
- `pnpm cf:deploy`：构建并部署到 Cloudflare

## 部署说明

本项目使用 `wrangler.toml` 配置 Cloudflare Worker，目前入口设置为 `.open-next/worker.js`，静态资源绑定为 `.open-next/assets`。部署前请确保 Cloudflare 账户与 `wrangler` 已完成认证。

## 贡献与扩展

你可以在 `data/tools.ts` 中新增工具配置，或在 `app/tools/[id]/page.tsx` 基于 `ToolPageHeader` 扩展每个工具页面内容。

