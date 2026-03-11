---
name: voice-recognition
description: |
  语音识别专家。用于：(1) Whisper本地离线识别
  (2) 在线语音API（讯飞/阿里/腾讯）
  (3) 各种格式支持（ogg/mp3/wav）
  (4) 实时语音流识别
  (5) 批量语音转文字
  适用于解决BOSS发语音我听不懂的问题。
---

# 语音识别技能

## 1. 当前问题

| 问题 | 状态 |
|------|------|
| 收到.ogg文件 | ✅ 能接收 |
| 播放/识别 | ❌ 不能 |

---

## 2. 解决方案

### 方案A：Whisper本地（推荐）

**优点**：免费、离线、准确率高

**安装**：
```bash
# 安装Whisper
pip install whisper

# 安装依赖
pip install torch

# 识别命令
whisper audio.ogg --language Chinese
```

**模型选择**：
| 模型 | 大小 | 速度 | 准确率 |
|------|------|------|--------|
| tiny | 75M | 最快 | 一般 |
| base | 140M | 快 | 中等 |
| small | 490M | 中等 | 较高 |
| medium | 1.5G | 慢 | 高 |
| large | 3G | 最慢 | 最高 |

**推荐**：small（准确率高，速度可接受）

---

### 方案B：在线API

| 服务商 | 特点 | 价格 |
|--------|------|------|
| 讯飞语音 | 中文好 | 免费 |
| 阿里语音 | 准确 | 付费 |
| 腾讯语音 | 稳定 | 付费 |
| OpenAI Whisper API | 准确 | 付费 |

**讯飞方案（推荐）**：
1. 注册讯飞开放平台
2. 创建应用 → 获取AppID
3. 下载SDK
4. 调用API

---

## 3. 实施步骤

### 快速实施（Windows）

**步骤1：安装Python**
- 下载Python 3.10+
- 勾选Add to PATH

**步骤2：安装Whisper**
```bash
pip install whisper
pip install torch
```

**步骤3：测试识别**
```bash
# 在OpenClaw中
exec command "whisper C:/Users/Administrator/.openclaw/media/inbound/xxx.ogg"
```

---

## 4. OpenClaw集成

### 配置自动识别

```
收到.ogg文件时：
1. 检测到语音文件
2. 自动调用识别
3. 输出文字内容
```

### 代码示例

```python
import whisper

# 加载模型
model = whisper.load_model("small")

# 识别
result = model.transcribe("audio.ogg", language="Chinese")

# 输出
print(result["text"])
```

---

## 5. 支持格式

| 格式 | 支持 |
|------|------|
| ogg | ✅ |
| mp3 | ✅ |
| wav | ✅ |
| m4a | ✅ |
| flac | ✅ |

---

## 6. 识别流程

```
BOSS发语音
    ↓
收到.ogg文件
    ↓
检测到语音
    ↓
调用Whisper识别
    ↓
返回文字
    ↓
理解并回复
```

---

## 7. 输出格式

```
【语音识别结果】：
- 文件：xxx.ogg
- 识别内容：XXX
- 置信度：XX%
```

---

## 8. 快速测试

```bash
# 测试安装
python -c "import whisper; print('OK')"

# 测试识别
whisper --model small --language Chinese test.ogg
```

---

## 9. 常见问题

| 问题 | 解决 |
|------|------|
| 内存不够 | 用tiny模型 |
| 识别慢 | 用base/small |
| 准确率低 | 用large模型 |
| 没声音 | 检查音频文件 |

---

## 10. 实施方案

### 立即可用（在线）

```
1. 安装whisper
2. 测试识别
3. 配置自动流程
```

### 需要BOSS帮忙

- 安装Python（如果没装）
- 提供测试语音

---

## 11. 输出格式

```
【语音识别需求】：处理.ogg文件

【处理流程】：
1. 收到语音文件
2. Whisper识别
3. 返回文字

【我来执行】：
1. 检查环境
2. 安装whisper
3. 识别测试
```
