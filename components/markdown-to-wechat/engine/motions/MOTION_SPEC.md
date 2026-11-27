# 动效模块（motions）设计方案

## 1. 动效与排版的边界及三种互动模式

### 核心边界
- **动效层（Motion）负责**：视觉母题（准星/枝叶/印章/蓝图/声呐）、SVG 装饰图形、SMIL 动画轨迹、`animated` 静态/动态双态切换。
- **禁止越界**：不硬编码任何业务文案（如 `FULL ARTICLE`、动效皮肤名称）、不自行编排作者/日期/标签、不覆盖排版层的外层卡片样式。

### 三种标准互动模式
1. **包裹型（Frame）** — 用于 **Banner 大标题**、**空白图占位**、**Tail 底部收束**
   - 动效提供外框与对称画框；排版层不再叠加同质边框或重复顶栏，仅向动效传入纯语义内容（如 `{ eyebrow, titleHtml }` 或 `{ label }`）。
2. **伴随型（Companion）** — 用于 **TOC 右上角**、**H2 右侧**、**H3 左侧**、**引用块**、**代码块**、**作者名片**
   - 排版层在固定锚点预留标准尺寸槽位，动效 SVG 严格贴合尺寸，不撑破原有行高与边距。
3. **独立型（Standalone）** — 用于 **H2 下方轨道（Section Rail）**、**分割线（Divider）**
   - 排版层仅控制上下 `margin`，动效输出 `width: 100%` 自适应 SVG。

---

## 2. 槽位体系契约（MotionPreset）

### 核心主槽位
1. **大标题包裹框（`renderBannerFrame`）**
   - 入参：`{ eyebrow, titleHtml }`、`colors`、`animated`（`eyebrow` 由排版层传入文章分类，不再显示动效名）。
   - 结构：顶部双色块与左右延展线 + 四角 L 形边角 + 右侧主题徽章与点阵 + 底部对称动效簇与流动脊线；适当增加上下留白以保持呼吸感。
   - 兼容：保留 `renderBannerMotion` 作为纯底部动效条供轻量场景复用。

2. **引言 / 导览右上角装饰（`renderTocDecor`）**
   - 用途：固定放置于 TOC 导览、引言卡片**右上角**（与标题行对齐）。

3. **二级标题组合装饰（`renderSectionBadge` + `renderSectionRail`）**
   - `renderSectionBadge(colors, animated, index)`：置于 H2 标题右侧，短色块 + 自适应延伸细线 + 右侧紧凑动效徽章（标题需 `flex-shrink: 0`）。
   - `renderSectionRail(colors, animated, index)`：置于 H2 标题下方，贯穿左右的流动轨道线与节点圆点。

4. **空白 / 无效图片占位装饰（`renderImagePlaceholder`）**
   - 用途：当图片地址为空、为占位关键字（`placeholder`、`待补充`、`example.com`、相对文件名等）或实际加载失败（`error` 回退）时，渲染居中主题插画 + `VISUAL SLOT / 16:9` + 提示文案。

5. **底部收束装饰（`renderTail`）**
   - 用途：文章末尾 `END · 继续阅读` 对称收束模块。
   - 结构：左中右平级布局（左侧动效图形 — 居中收尾文案 — 右侧动效图形）+ 底部贯穿流动脊线。

---

### 扩展轻装饰槽位（与排版联动）
6. **三级标题微标记（`renderH3Marker`）**：`14×14` 轻量动效图标。当排版层开启**无编号模式（`headingNumbering === 'none'`）**时展示在 H3 左侧；开启**自动编号模式（`numeric`）**时由 `2.1` 小序号替代，避免双重前缀。**H4 不介入动效**，保持主次层级。
7. **引用块角标（`renderBlockquoteDecor`）**：置于 `blockquote` 右上角，提供轻量脉冲/角标。
8. **文末作者名片微装饰（`renderEndingDecor`）**：置于 `renderEnding` 卡片右上角，与 `renderTail` 形成过渡呼应。
9. **代码块状态点（`renderCodeBadge`）**：置于代码块 Mac 顶栏右侧，呈现微弱状态指示灯。

---

## 3. 配色与密度规范
- **调色盘联动**：所有动效严格通过 `resolveMotionColors(colors)` 消费 `PaletteColors` 的 5 个语义色（`headingDecor` 主轨、`strong` 强调点、`divider` 辅助刻度、`heading` 深色墨线、`bg` 挖空底色），不硬编码色值。
- **视觉密度阶梯**：Banner / Tail（重度收束） → TOC / H2 / 占位图（中度节奏） → H3 / 引用 / 代码 / 名片（极轻点缀） → H4（无动效）。
- **双态支持**：`animated === false` 时必须输出纯静态 SVG（不包含 `<animate>` / `<animateTransform>`）。
