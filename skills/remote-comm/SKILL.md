---
name: remote-comm
description: |
  远程Agent通信专家。用于：(1) 跨机器会话（不同设备上的Agent通信）
  (2) Session管理（查看、发送、接收消息）
  (3) 远程协作（跨网络任务分发）
  (4) 知识共享（跨Agent记忆同步）
  (5) 群组协作（多个Agent协同工作）
  适用于多设备/多Agent协作场景。
---

# 远程Agent通信技能

## 1. 当前架构

### 单机模式
```
用户 → 本地Agent → 响应
```

### 跨机模式
```
用户A → 本地Agent → 远程Agent → 响应
          ↓
     sessions_send → 远程机器
```

---

## 2. 核心命令

### 查看所有Session

```bash
# 查看当前机器的所有session
openclaw sessions_list

# 输出格式：
# Key | 类型 | 模型 | 最后活跃
```

### 发送消息到远程Session

```bash
# 如果知道远程session key
openclaw sessions_send --sessionKey <key> --message "任务内容"
```

### 查看远程Session历史

```bash
# 获取另一个session的历史
openclaw sessions_history --sessionKey <key> --limit 10
```

---

## 3. 配置远程通信

### 前提条件

| 条件 | 说明 |
|------|------|
| 网络连通 | 两台机器能互相访问 |
| Gateway端口 | 知道对方Gateway地址 |
| Token | 可能需要认证 |

### Gateway远程连接

```bash
# 远程Gateway地址格式
ws://192.168.1.x:端口  # 局域网
wss://域名:端口         # 公网
```

### 配置示例

```yaml
# config.yaml
gateway:
  remote:
    url: "ws://其他机器IP:端口"
    token: "可选token"
```

---

## 4. 实际应用场景

### 场景1：多门店管理

```
总店Agent ←→ 门店A Agent
         ←→ 门店B Agent

- 总店汇总所有门店数据
- 分析对比
- 统一制定策略
```

### 场景2：专业分工

```
数据分析Agent ←→ 方案制定Agent
             ←→ 财务审核Agent

- 一个分析，一个出方案，一个审核
- 更专业的分工
```

### 场景3：备份/容灾

```
主Agent ←→ 备用Agent

- 主Agent处理
- 备用Agent同步状态
- 主Agent故障时切换
```

---

## 5. 实现方式

### 方式1：直接IP/端口

```
假设：
- 机器A：192.168.1.100:8080
- 机器B：192.168.1.101:8080

在机器A上配置机器B的Gateway地址
```

### 方式2：公网域名

```
买一个域名或使用内网穿透：
- ngrok
- frp
- 花生壳

让两台机器通过公网地址通信
```

### 方式3：共享存储

```
所有Agent读取同一个知识库：
- 共享MEMORY.md
- 共享文件目录
- 共享数据库

通过读写共享内容协作
```

---

## 6. 简化协作方案

### 不需要远程通信时

**共享知识库**：
```
1. 所有Agent读取同一个MEMORY.md
2. 写重要的结论到MEMORY.md
3. 其他Agent读取并参考
```

**工作流程**：
```
Agent A：分析数据 → 写结论到MEMORY.md
Agent B：读取MEMORY.md → 参考A的结论 → 继续分析
```

---

## 7. 当前限制与解决方案

| 限制 | 解决方案 |
|------|----------|
| 不知道远程IP | 让BOSS告诉我 |
| 没有远程权限 | 配置网络访问 |
| 不想复杂配置 | 用共享知识库 |

---

## 8. 操作清单

### 如果要跨机器讨论

```
1. 告诉我远程机器的IP/域名
2. 确认Gateway端口是否开放
3. 确认是否需要认证
4. 我配置sessions_send
5. 测试通信
```

---

## 9. 输出格式

```
【需求】：和XX机器的Agent讨论

【信息】：
- 远程IP/域名：
- Gateway端口：
- 认证方式：

【我来配置】：
1. 测试连接
2. 获取session key
3. 发送消息测试
```
