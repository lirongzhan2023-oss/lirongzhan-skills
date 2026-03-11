---
name: agent-tools
description: |
  OpenClaw Agent工具集。用于：(1) 核心工具（read/write/exec/process）
  (2) 会话管理（sessions_list/history/send/spawn）
  (3) 技能系统（skills相关）
  (4) 消息通信（message/feishu/telegram等）
  (5) 系统操作（gateway/cron/browser等）
  适用于掌握OpenClaw所有可用工具，实现各种自动化任务。
---

# OpenClaw Agent 工具技能

## 1. 核心工具（内置）

### 文件操作

| 工具 | 功能 | 示例 |
|------|------|------|
| read | 读取文件内容 | read path/file.txt |
| write | 写入/创建文件 | write content "..." |
| edit | 精准编辑文件 | edit 替换文本 |

### 执行命令

| 工具 | 功能 | 示例 |
|------|------|------|
| exec | 执行shell命令 | exec command "node app.js" |
| process | 管理后台进程 | process action=poll |

---

## 2. 会话管理

### 会话操作

```bash
# 查看所有会话
sessions_list

# 查看会话历史
sessions_history --sessionKey xxx

# 发送消息到其他会话
sessions_send --sessionKey xxx --message "内容"

# 派生子Agent
sessions_spawn --task "任务" --runtime subagent
```

### 会话类型

| 类型 | 说明 |
|------|------|
| main | 主会话（当前） |
| subagent | 子Agent |
| acp | ACP会话 |

---

## 3. 消息通信

### 发送消息

```bash
# 发送文本
message send --channel feishu --target 用户ID --message "内容"

# 发送文件
message send --channel feishu --target xxx --message "说明" --media 文件路径
```

### 支持渠道

| 渠道 | 说明 |
|------|------|
| feishu | 飞书 |
| telegram | 电报 |
| discord | Discord |
| whatsapp | WhatsApp |

---

## 4. 飞书专用

### 飞书工具

```bash
# 文档操作
feishu_doc --action read --file_id xxx

# 云盘操作
feishu_drive --action upload --path file.xlsx

# 知识库
feishu_wiki --action get_node --node_id xxx
```

---

## 5. 定时任务

### Cron操作

```bash
# 创建定时任务
cron add --schedule "0 9 * * *" --task "日报"

# 查看任务
cron list

# 删除任务
cron delete --id xxx
```

---

## 6. 技能系统

### 技能管理

```bash
# 查看技能
skills list

# 查看技能详情
skills info 技能名

# 检查技能状态
skills check
```

---

## 7. 浏览器操作

### Browser工具

```bash
# 打开浏览器
browser open

# 截图
browser screenshot

# 执行JS
browser evaluate "js代码"
```

---

## 8. 系统操作

### Gateway控制

```bash
# 查看状态
gateway status

# 重启
gateway restart

# 查看日志
logs --tail 100
```

### 系统工具

```bash
# 健康检查
health

# 配置
config get/set
```

---

## 9. 常用命令速查

### 文件处理

```bash
# 读取Excel
node -e "const XLSX=require('xlsx');const wb=XLSX.readFile('file.xlsx');..."

# 批量处理
Get-ChildItem *.xlsx | ForEach-Object {...}
```

### 自动化

```bash
# 定时任务
cron add --schedule "0 9 * * *" --script morning-report.js

# 后台执行
exec command "node app.js" --background
```

---

## 10. 实际应用场景

### 场景1：定时发送报表

```
1. cron add 每日9点
2. exec 读取Excel数据
3. message send 到飞书
```

### 场景2：批量处理文件

```
1. exec 列出文件
2. read 读取内容
3. write 处理后保存
4. message send 发给用户
```

### 场景3：多Agent协作

```
1. sessions_spawn 子Agent分析数据
2. sessions_history 获取结果
3. sessions_send 转发给BOSS
```

---

## 11. 输出格式

```
【工具需求】：XXX

【可用工具】：
1. read/write - 文件操作
2. exec - 命令执行
3. message send - 消息发送
4. cron - 定时任务

【实现步骤】：
1. 读取数据
2. 处理
3. 输出
```

---

## 12. 工具能力矩阵

| 能力 | 工具 | 状态 |
|------|------|------|
| 读文件 | read | ✅ |
| 写文件 | write | ✅ |
| 执行命令 | exec | ✅ |
| 发送消息 | message | ✅ |
| 定时任务 | cron | ✅ |
| 浏览器 | browser | ✅ |
| 会话管理 | sessions_* | ✅ |
| 飞书集成 | feishu_* | ✅ |
| 技能系统 | skills | ✅ |

---

## 13. 进阶技巧

### 并行处理

```bash
# 同时执行多个任务
exec command "task1" &
exec command "task2" &
```

### 错误处理

```bash
# 超时设置
exec command "long-task" --timeout 60
```

### 管道

```bash
# 输出作为输入
exec command "cat file.txt" | grep "关键词"
```
