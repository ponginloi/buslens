# 🚌 BusLens - 巴士机位地图

BusLens 是一个巴士摄影机位分享平台，巴士迷可以在这里分享和发现巴士拍摄位置。

![BusLens](https://buslens.netlify.app/og-image.png)

---

## ✨ 功能特性

- 🗺️ **地图展示** - 高德地图显示已审核通过的机位，不同颜色代表不同等级
- 📤 **上传机位** - 用户可上传新机位，提交后进入审核队列
- 📸 **多图上传** - 每个机位可上传多张照片（ImgBB 图床存储）
- ⚙️ **审核管理** - 管理员可审核机位，修改等级，填写审核理由
- 👤 **个人中心** - 查看审核进度、个人贡献统计
- 🎖️ **头衔系统** - 6 级高难度头衔，激励用户持续贡献
- 🏷️ **管理员标记** - 管理员在导航栏有专属标识

---

## 🛠️ 技术栈

| 技术 | 用途 |
|------|------|
| 原生 HTML + CSS + JavaScript | 前端开发 |
| 高德地图 JavaScript API | 地图展示 |
| Supabase (PostgreSQL) | 数据库 |
| ImgBB | 图床（图片存储） |
| Netlify | 网站部署 |

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
| password | TEXT | 密码 |
| email | TEXT | 邮箱 |
| role | TEXT | 角色 (user/admin) |
| created_at | DATE | 注册日期 |

---

## 🚀 快速开始

### 1. 部署到 Netlify

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/你的用户名/buslens)

或手动部署：

```bash
git clone https://github.com/你的用户名/buslens.git
cd buslens
# 将所有 HTML 文件上传到 Netlify
