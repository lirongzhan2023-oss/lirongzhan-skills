---
name: find-skill
description: |
  技能查找与推荐专家。用于：(1) 根据需求找技能（描述需求，推荐合适技能）
  (2) 技能搜索（搜索现有技能库）
  (3) 技能对比（多个技能对比功能）
  (4) 缺失技能识别（需要新技能时创建）
  (5) 技能学习路径（推荐先学什么）
  适用于快速找到解决问题所需技能。
---

# 技能查找技能

## 1. 按需求找技能

### 问题 → 技能映射

| 问题类型 | 推荐技能 |
|----------|----------|
| 分析数据 | excel-reader, data-visualization |
| 降低成本 | cost-accounting, supply-chain |
| 写文案 | content-writing, social-media |
| 学新东西 | self-improvement, critical-thinking |
| 管员工 | team-management, customer-service |
| 做活动 | event-planning, promotion-ads |
| 搞流量 | takeout-growth, promotion-ads |
| 财务管理 | restaurant-finance, investment-finance |
| 自动化 | automation, batch-data-process |
| 爬数据 | browser, web-research |

---

## 2. 搜索现有技能

### 命令

```bash
# 列出所有技能
skills list

# 查看技能详情
skills info 技能名

# 检查技能状态
skills check
```

### 当前技能库（45个）

```
餐饮类：3个
  - restaurant-ops
  - restaurant-finance
  - customer-service

数据类：6个
  - excel-reader
  - excel-data
  - excel-optimize
  - batch-data-process
  - data-visualization
  - auto-analysis

外卖类：3个
  - takeout-growth
  - sales-marketing
  - promotion-ads

推广类：3个
  - promotion-ads
  - social-media
  - event-planning

思维类：3个
  - critical-thinking
  - strategic-thinking
  - psychology

工具类：5个
  - file-manager
  - system-tools
  - clipboard-screenshot
  - file-transfer
  - agent-tools

其他：20+
```

---

## 3. 缺失技能识别

### 识别流程

```
1. BOSS提出需求
2. 检查现有技能
3. 如无匹配 → 创建新技能
4. 评估复杂度
5. 实施
```

### 创建新技能情况

| 情况 | 动作 |
|------|------|
| 现有技能够用 | 直接使用 |
| 现有技能部分满足 | 扩展现有 |
| 完全没有 | 创建新技能 |

---

## 4. 快速查找模板

### 场景1：数据处理

```
【需求】：分析Excel数据
→ excel-reader（读取）
→ excel-data（处理）
→ data-visualization（可视化）

【需求】：批量处理文件
→ batch-data-process
→ file-manager
```

### 场景2：内容创作

```
【需求】：写推广文案
→ content-writing
→ promotion-ads

【需求】：做短视频
→ social-media
→ image-generate
```

### 场景3：运营管理

```
【需求】：分析门店数据
→ restaurant-finance
→ auto-analysis

【需求】：做活动
→ event-planning
→ promotion-ads
```

---

## 5. 技能对比

### 类似技能对比

| 技能 | 擅长 | 场景 |
|------|------|------|
| excel-reader | 读取分析 | 静态数据 |
| auto-analysis | 自动诊断 | 快速分析 |
| data-visualization | 可视化 | 图表展示 |
| batch-data-process | 批量处理 | 大数据 |

---

## 6. 输出格式

```
【需求】：XXX

【推荐技能】：
1. 技能A - 用途
2. 技能B - 用途

【学习顺序】：
1. 先学XXX
2. 再学XXX

【如无匹配】：建议创建新技能
```

---

## 7. 常用技能组合

| 目标 | 技能组合 |
|------|----------|
| 每日数据汇总 | cron + excel-reader + message send |
| 自动分析 | auto-analysis + data-visualization |
| 批量处理 | batch-data-process + file-manager |
| 营销活动 | event-planning + promotion-ads + content-writing |
| 成本控制 | cost-accounting + supply-chain |
| 客户管理 | customer-service + customer-voice |
