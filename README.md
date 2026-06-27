# 🚌 BusLens - 巴士机位地图

BusLens 是一个巴士摄影机位分享平台，巴士迷可以在这里分享和发现巴士拍摄位置。

🔗 **网站地址**：[https://buslens.netlify.app](https://buslens.netlify.app)

📦 **GitHub 仓库**：[https://github.com/ponginloi/buslens](https://github.com/ponginloi/buslens)

---

## 📸 项目截图

<!-- 可以添加截图 -->

---

## ✨ 功能特性

### 核心功能
- 🗺️ **地图展示** - 高德地图显示已审核通过的机位，不同颜色代表不同等级
- 📤 **上传机位** - 用户可上传新机位，提交后进入审核队列
- 📸 **多图上传** - 每个机位可上传多张照片（ImgBB 图床存储）
- ⚙️ **审核管理** - 管理员可审核机位，修改等级，填写审核理由
- 👤 **个人中心** - 查看审核进度、个人贡献统计
- 🎖️ **头衔系统** - 6 级高难度头衔，激励用户持续贡献
- 📋 **更新日志** - 管理员可在网站内直接编辑更新日志
- 🔍 **发现页面** - 随机上等机位、热门推荐、今日精选好图
- ⭐ **收藏功能** - 用户可以收藏喜欢的机位

### 安全特性
- 🔐 **密码加密** - 使用 bcrypt 哈希加密存储，密码无法被破解
- 🛡️ **RLS 行级安全策略** - 数据受 Supabase RLS 保护
- 🚫 **XSS 防护** - 所有用户输入使用 escapeHtml 过滤
- 🔑 **API 密钥管理** - 敏感密钥通过 Supabase RPC 安全获取
- 👑 **管理员验证** - 管理员权限通过后端 Edge Function 验证
- 📊 **登录日志** - 记录所有登录尝试

---

## 🛠️ 技术栈

| 技术 | 用途 |
|------|------|
| HTML + CSS + JavaScript | 前端开发 |
| 高德地图 JavaScript API | 地图展示 |
| Supabase (PostgreSQL) | 数据库 + 认证 |
| Supabase Edge Functions | 后端 API |
| ImgBB | 图床（图片存储） |
| Netlify | 网站托管 |
| bcrypt | 密码加密 |

---

## 🎖️ 头衔系统（6 级高难度）

| 等级 | 头衔 | 条件 |
|------|------|------|
| 1 | 🌱 巴士萌新 | 注册账号即可 |
| 2 | 📝 巴士记录者 | 8 个通过机位 + 5 张照片 |
| 3 | 🔍 巴士探索家 | 20 个通过机位 + 3 个上等 + 12 张照片 |
| 4 | 📷 巴士摄影大师 | 40 个通过机位 + 8 个上等 + 25 张照片 |
| 5 | 👑 巴士传奇 | 80 个通过机位 + 18 个上等 + 50 张照片 |
| 6 | ⚡ 巴士之神 | 150 个通过机位 + 35 个上等 + 100 张照片 |

> 全部达标才能升级，缺一项都不行！

---

## 📋 数据库表结构

### spots 表

| 字段 | 类型 | 说明 |
|------|------|------|
| id | BIGSERIAL | 主键 |
| name | TEXT | 机位名称 |
| lng | DECIMAL(10,6) | 经度 |
| lat | DECIMAL(10,6) | 纬度 |
| rank | TEXT | 等级 (high/medium/low) |
| device_type | TEXT | 设备类型 (phone/camera/both) |
| description | TEXT | 描述 |
| example_photo | TEXT | 例图链接 |
| photos | JSONB | 用户照片数组 |
| created_by | TEXT | 上传者 |
| created_at | DATE | 创建日期 |
| status | TEXT | 状态 (pending/approved/rejected) |
| reviewed_by | TEXT | 审核人 |
| reviewed_at | DATE | 审核日期 |
| review_reason | TEXT | 审核理由 |

### users 表

| 字段 | 类型 | 说明 |
|------|------|------|
| id | BIGSERIAL | 主键 |
| username | TEXT | 用户名（唯一） |
| password_hash | TEXT | bcrypt 加密密码 |
| email | TEXT | 邮箱 |
| role | TEXT | 角色 (user/admin) |
| bio | TEXT | 个人简介 |
| is_online | BOOLEAN | 在线状态 |
| last_active | TIMESTAMP | 最后活跃时间 |
| created_at | DATE | 注册日期 |

---

## 🚀 快速开始

### 1. 本地运行

```bash
# 克隆仓库
git clone https://github.com/ponginloi/buslens.git
cd buslens

# 直接打开 index.html 或在本地服务器运行
# 推荐使用 VS Code Live Server 或 Python http.server
