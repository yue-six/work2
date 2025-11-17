# 🛍️ 电商商城

一个现代化的电商网站，使用 Supabase（后端数据库）和 Netlify（前端部署）构建。

## ✨ 功能特性

### 核心功能
- **用户认证系统** - 完整的注册/登录/登出功能
- **商品管理** - 产品展示、搜索、筛选、排序
- **购物车系统** - 添加商品、数量管理、订单结算
- **心愿单功能** - 商品收藏、收藏管理
- **个人中心** - 用户信息管理

### 高级功能
- **搜索历史** - 自动记录和智能搜索建议
- **商品排序** - 按价格、名称、评分等多种方式排序
- **图片懒加载** - 性能优化，提升页面加载速度
- **错误边界** - 完善的错误处理和用户友好的错误页面
- **响应式设计** - 完美适配移动端和桌面端

### 用户体验优化
- **加载动画** - 美观的加载状态指示器
- **本地存储** - 购物车、收藏夹、搜索历史本地存储
- **性能优化** - 代码分割、懒加载、缓存策略
- **无障碍访问** - 支持键盘导航和屏幕阅读器

## 🏗️ 技术栈

### 前端
- **React** - 用户界面框架
- **Vite** - 构建工具
- **React Router** - 路由管理
- **CSS3** - 样式设计

### 后端
- **Supabase** - 后端即服务（BaaS）
  - 用户认证
  - 数据库存储
  - API接口

### 部署
- **Netlify** - 前端部署平台

## 📁 项目结构

```
src/
├── components/          # 可复用组件
│   ├── Navbar.jsx      # 导航栏组件
│   ├── ErrorBoundary.jsx # 错误边界组件
│   ├── LoadingSpinner.jsx # 加载动画组件
│   ├── LazyImage.jsx   # 图片懒加载组件
│   ├── FavoriteButton.jsx # 收藏按钮组件
│   ├── SortFilter.jsx  # 排序筛选组件
│   └── SearchHistory.jsx # 搜索历史组件
├── pages/              # 页面组件
│   ├── Home.jsx        # 首页
│   ├── Products.jsx    # 商品列表页
│   ├── ProductDetail.jsx # 商品详情页
│   ├── Cart.jsx        # 购物车页
│   ├── Wishlist.jsx    # 心愿单页面
│   ├── Login.jsx       # 登录/注册页
│   └── Profile.jsx     # 个人中心页
├── context/            # React上下文
│   └── SupabaseContext.jsx # Supabase集成
├── hooks/              # 自定义Hooks
│   └── useLocalStorage.js # 本地存储管理
├── data/              # 数据文件
│   └── mockData.js     # 模拟数据
├── App.jsx            # 主应用组件
├── main.jsx           # 应用入口
└── App.css            # 全局样式
```

## 🚀 快速开始

### 1. 克隆项目

```bash
git clone <repository-url>
cd work2
```

### 2. 安装依赖

```bash
npm install
```

### 3. 配置环境变量

创建 `.env` 文件并配置 Supabase：

```env
VITE_SUPABASE_URL=your-supabase-project-url
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
```

### 4. 本地开发

```bash
npm run dev
```

访问 http://localhost:3000

### 5. 构建生产版本

```bash
npm run build
```

## 🗄️ 数据库设计

### 数据表结构

#### 1. 产品表 (products)
```sql
id (UUID, primary key)
name (text)
description (text)
price (numeric)
category (text)
stock_quantity (integer)
image_url (text)
is_active (boolean)
created_at (timestamp)
```

#### 2. 用户表 (profiles)
```sql
id (UUID, primary key, references auth.users)
email (text)
created_at (timestamp)
```

#### 3. 订单表 (orders)
```sql
id (UUID, primary key)
user_id (UUID, references profiles)
total_amount (numeric)
status (text) -- pending, completed, cancelled
created_at (timestamp)
```

## 🌐 部署到 Netlify

### 方法一：GitHub集成
1. 将代码推送到 GitHub 仓库
2. 在 Netlify 中连接 GitHub 仓库
3. 配置构建设置：
   - Build Command: `npm run build`
   - Publish Directory: `dist`
4. 添加环境变量

### 方法二：手动部署
```bash
npm run build
# 将 dist 文件夹上传到 Netlify
```

## 📱 页面功能

### 首页 (/)
- 热门商品展示
- 智能搜索功能（支持搜索历史）
- 高级筛选和排序
- 商品分类浏览

### 商品浏览 (/products)
- 完整商品列表
- 多维度排序（价格、名称、评分）
- 高级筛选（分类、价格区间）
- 搜索功能集成

### 商品详情 (/product/:id)
- 商品详细信息展示
- 添加到购物车和心愿单
- 库存状态实时显示
- 相关商品推荐

### 购物车 (/cart)
- 购物车商品管理
- 数量动态调整
- 订单结算功能
- 本地存储持久化

### 心愿单 (/wishlist)
- 收藏商品展示
- 快速添加到购物车
- 收藏状态管理

### 用户登录 (/login)
- 用户注册/登录
- 表单验证和错误处理
- 安全的认证流程

### 个人中心 (/profile)
- 用户信息管理
- 订单历史查看
- 个人设置

## 🎨 设计特色

### 视觉设计
- **现代化UI设计** - 采用卡片式布局，美观大方
- **渐变色彩搭配** - 和谐的配色方案，提升视觉体验
- **图标系统** - 统一风格的图标设计

### 交互设计
- **流畅动画效果** - 悬停、点击、加载等平滑过渡
- **直观操作流程** - 清晰的用户引导和操作反馈
- **无障碍设计** - 支持键盘导航和屏幕阅读器

### 响应式设计
- **移动端优化** - 完美适配各种移动设备
- **平板端适配** - 中等屏幕尺寸的优化布局
- **桌面端体验** - 充分利用大屏幕空间

### 性能优化
- **图片懒加载** - 提升页面加载速度
- **代码分割** - 按需加载，减少首屏资源
- **缓存策略** - 智能缓存机制提升性能

## 🔧 开发说明

### 技术架构
- **前端框架**：React 18 + Vite
- **状态管理**：React Context + 本地存储
- **路由管理**：React Router v6
- **样式方案**：CSS-in-JS + 现代CSS特性
- **数据层**：Supabase + 模拟数据系统

### 代码规范
- **组件化开发** - 高内聚、低耦合的组件设计
- **TypeScript支持** - 类型安全的开发体验
- **ES6+语法** - 现代JavaScript特性
- **响应式设计优先** - 移动优先的开发理念

### 性能优化
- **图片优化** - WebP格式支持，懒加载技术
- **代码分割** - 路由级别的代码分割
- **缓存策略** - 智能缓存和本地存储
- **错误处理** - 完善的错误边界和异常处理

### 开发工具
- **热重载** - Vite提供的快速开发体验
- **ESLint配置** - 代码质量检查和规范
- **构建优化** - 生产环境构建优化

### 模拟数据系统
项目包含完整的模拟数据系统，可以在以下场景使用：
- 开发环境测试
- 没有真实Supabase配置的情况
- 功能演示和原型展示

## 🚀 部署指南

### 本地开发
```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 预览生产版本
npm run preview
```

### 环境配置
创建 `.env` 文件配置环境变量：
```env
VITE_SUPABASE_URL=your-supabase-project-url
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
```

### 部署到生产环境
项目支持多种部署方式：
- **Netlify** - 静态网站托管
- **Vercel** - 支持React应用的部署
- **GitHub Pages** - 免费的静态网站托管
- **Supabase Edge Functions** - 后端服务部署

## 📞 联系信息

如有问题或建议，请联系开发团队。

---

**注意**：这是一个演示项目，实际部署时请配置真实的 Supabase 服务。