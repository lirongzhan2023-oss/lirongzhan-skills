---
name: speech-to-text-local
description: |
  本地语音识别专家。完全离线、不需要API、不花钱。用于：(1) Whisper本地部署
  (2) 离线语音转文字
  (3) 多种语言支持
  (4) 实时语音识别（本地）
  适用于隐私敏感或不想用云服务的场景。
---

# 本地语音识别技能

## 1. 最佳方案：Whisper本地版

### 为什么选Whisper

```
✓ 完全免费
✓ 不需要联网
✓ 支持90+语言
✓ 准确率高（接近人类）
✓ 可选模型大小
```

### 模型选择

| 模型 | 大小 | 速度 | 准确度 | 推荐场景 |
|------|------|------|--------|----------|
| tiny | 39MB | 最快 | 一般 | 测试用 |
| base | 74MB | 快 | 够用 | 日常用 ✅ |
| small | 244MB | 中 | 较好 | 精度要求高 |
| medium | 769MB | 慢 | 很好 | 精度优先 |
| large | 1550MB | 最慢 | 最好 | 不差时间 |

**推荐**：**base** 或 **small**

---

## 2. 安装部署

### Windows安装

```powershell
# 1. 安装Python（如果没有）
# 下载：https://www.python.org/

# 2. 安装whisper
pip install openai-whisper

# 3. 安装ffmpeg（必须！）
# 方法A：chocolatey
choco install ffmpeg

# 方法B：手动下载
# https://ffmpeg.org/download.html
```

### 第一次运行

```powershell
# 首次运行会自动下载模型（约74MB）
# 之后就不用再下了
```

---

## 3. 快速使用

### 命令行用法

```powershell
# 基本转写
whisper audio.mp3 --model base --language Chinese

# 指定输出格式
whisper audio.mp3 --model base --output_format txt

# 翻译成英文
whisper audio.mp3 --model base --task translate

# 指定设备（CPU/GPU）
whisper audio.mp3 --model base --device cpu
```

### Python代码

```python
import whisper
import ffmpeg

# 加载模型（首次下载）
model = whisper.load_model("base")

# 转写
result = model.transcribe(
    "audio.mp3",
    language="Chinese",
    fp16=False  # CPU设为False
)

# 输出文字
print(result["text"])

# 还可以获取：
# result["segments"] - 分段信息
# result["language"] - 检测到的语言
```

---

## 4. 微信语音转文字

### 步骤

```
1. 导出微信语音
   - 手机文件管理器
   - 微信聊天记录文件夹
   - 找到.ogg文件

2. 转换格式（如果需要）
   ffmpeg -i voice.ogg -ar 16000 output.wav

3. 运行Whisper
   whisper output.wav --model base --language Chinese
```

### 批量处理

```python
import whisper
import os

model = whisper.load_model("base")

for file in os.listdir("voices"):
    if file.endswith(".ogg"):
        result = model.transcribe(f"voices/{file}")
        print(f"{file}: {result['text']}")
```

---

## 5. 实时语音识别

### 方案1：Whisper + 麦克风

```python
import whisper
import pyaudio
import numpy as np

model = whisper.load_model("base")

# 麦克风设置
CHUNK = 1024
FORMAT = pyaudio.paInt16
CHANNELS = 1
RATE = 16000

p = pyaudio.PyAudio()
stream = p.open(format=FORMAT, channels=CHANNELS, 
                rate=RATE, input=True,
                frames_per_buffer=CHUNK)

print("开始录音... (按Ctrl+C停止)")

while True:
    data = stream.read(CHUNK)
    audio = np.frombuffer(data, np.int16).astype(np.float32) / 32768.0
    
    # 转写（需要积累一定音频）
    result = model.transcribe(audio)
    if result["text"].strip():
        print(result["text"])
```

### 方案2：更快实时（用Faster Whisper）

```bash
# 安装
pip install faster-whisper

# 用法（更快）
python -c "
from faster_whisper import WhisperModel
model = WhisperModel('base', device='cpu')
segments, info = model.transcribe('audio.wav')
for segment in segments:
    print(segment.text)
"
```

---

## 6. 常见问题

### Q: 第一次运行很慢？
```
正常！首次使用会下载模型：
- tiny: 39MB
- base: 74MB
- small: 244MB

下载一次就行，之后都很快
```

### Q: 内存不够？
```
用更小的模型：
- base: 需要~1GB内存
- tiny: 需要~500MB内存
```

### Q: 中文识别不准？
```
尝试：
1. 指定语言：--language Chinese
2. 用更大模型：--model small
3. 音频要清晰
```

### Q: 速度太慢？
```
优化：
1. 用base模型（不是large）
2. 用faster-whisper（快2-4倍）
3. 如果有GPU，用GPU加速
```

---

## 7. 完整工作流

### 微信语音→文字

```powershell
# 1. 准备环境（只需一次）
pip install openai-whisper ffmpeg

# 2. 转写
whisper "语音文件.ogg" --model base --language Chinese

# 3. 输出结果到文件
whisper "语音文件.ogg" --model base --language Chinese --output_file result
```

---

## 8. 对比其他方案

| 方案 | 费用 | 联网 | 准确度 | 速度 |
|------|------|------|--------|------|
| Whisper本地 | 免费 | 不用 | 高 | 快 |
| Whisper API | 便宜 | 要 | 最高 | 最快 |
| 微信自带 | 免费 | 要 | 一般 | 快 |
| 讯飞收费 | 收费 | 要 | 高 | 快 |

---

## 输出格式

```
【音频文件】：XXX.mp3/ogg/wav

【转写结果】：
（文字内容）

【处理信息】：
- 模型：base
- 语言：中文
- 耗时：X秒
```
