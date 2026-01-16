# Sudoku 数独在线游戏

一个免费、响应式的在线数独游戏，支持撤销、重置、新题目等功能。

## 功能特性

- **在线数独** - 每日生成新的数独题目
- **撤销功能** - 支持撤销填写的数字
- **3x3数字面板** - 右侧数字候选面板，点击即可填写
- **响应式设计** - 完美支持桌面和移动设备
- **检查答案** - 一键验证答案正确性
- **SEO优化** - 完整的元标签、结构化数据、社交分享预览

## 在线预览

访问: http://localhost:5173/ (开发环境)

## 快速开始

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

### 构建生产版本

```bash
npm run build
```

### 运行 linting

```bash
npm run lint
```

## 项目结构

```
sudoku/
├── public/
│   ├── og-image.svg      # 社交分享预览图
│   ├── robots.txt        # 搜索引擎爬虫规则
│   └── sitemap.xml       # 网站地图
├── src/
│   ├── components/
│   │   ├── Grid.jsx      # 数独网格组件
│   │   ├── Controls.jsx  # 控制按钮组件
│   │   └── NumberPad.jsx # 数字候选面板组件
│   ├── App.jsx           # 主应用组件
│   ├── App.css           # 样式文件
│   ├── fetch-puzzle.js   # 数独题目获取
│   └── main.jsx          # 应用入口
├── index.html            # HTML模板(SEO优化)
├── package.json
└── vite.config.js
```

## 技术栈

- **React 18** - UI框架
- **Vite** - 构建工具
- **ESLint** - 代码检查
- **CSS Grid/Flexbox** - 布局

## SEO特性

本项目包含完整的SEO优化：

- 语义化HTML标签 (`<main>`, `<header>`, `<h1>`)
- 完整的Meta标签 (标题、描述、关键词)
- Open Graph协议 (Facebook/LinkedIn分享)
- Twitter Card (Twitter分享)
- Schema.org结构化数据 (JSON-LD)
- robots.txt 和 sitemap.xml
- 社交分享预览图 (og-image.svg)

## 许可证

MIT License
