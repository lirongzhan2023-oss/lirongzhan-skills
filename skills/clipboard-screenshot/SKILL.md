---
name: clipboard-screenshot
description: |
  剪贴板与截图专家。用于：(1) 读取剪贴板（文本、图片）
  (2) 写入剪贴板（复制内容）
  (3) 屏幕截图（全屏、区域、窗口）
  (4) 图片保存（保存截图到文件）
  (5) OCR识别（截图文字提取）
  适用于快速获取屏幕内容或复制粘贴场景。
---

# 剪贴板与截图技能

## 1. 剪贴板操作

### 读取剪贴板

```powershell
# 读取文本
Get-Clipboard

# 读取文本（保留格式）
Get-Clipboard -Format Text
```

### 写入剪贴板

```powershell
# 复制文本
Set-Clipboard -Value "要复制的内容"

# 复制文件列表
Set-Clipboard -Path "C:\file.txt"
```

---

## 2. 屏幕截图

### 基础截图

```powershell
# 全屏截图（保存到文件）
Add-Type -AssemblyName System.Windows.Forms
$screen = [System.Windows.Forms.Screen]::PrimaryScreen
$bitmap = New-Object System.Drawing.Bitmap($screen.Bounds.Width, $screen.Bounds.Height)
$graphics = [System.Drawing.Graphics]::FromImage($bitmap)
$graphics.CopyFromScreen($screen.Bounds.Location, [System.Drawing.Point]::Empty, $screen.Bounds.Size)
$bitmap.Save("C:\screenshot.png")
```

### 区域截图

```powershell
# 指定区域截图
$x = 0; $y = 0; $w = 800; $h = 600
$bitmap = New-Object System.Drawing.Bitmap($w, $h)
$graphics = [System.Drawing.Graphics]::FromImage($bitmap)
$graphics.CopyFromScreen($x, $y, 0, 0, (New-Object System.Drawing.Size($w, $h)))
$bitmap.Save("C:\area.png")
```

---

## 3. 截图工具

### 快捷键方案

| 功能 | 快捷键 |
|------|--------|
| 全屏 | Win+Shift+S (系统自带) |
| 区域 | Win+Shift+S |
| 窗口 | Alt+PrintScreen |

### 脚本封装

```powershell
# 快速截图脚本
function Take-Screenshot {
  param([string]$path = "C:\screenshot.png")
  Add-Type -AssemblyName System.Windows.Forms
  $screen = [System.Windows.Forms.Screen]::PrimaryScreen
  $bitmap = New-Object System.Drawing.Bitmap($screen.Bounds.Width, $screen.Bounds.Height)
  $graphics = [System.Drawing.Graphics]::FromImage($bitmap)
  $graphics.CopyFromScreen($screen.Bounds.Location, [System.Drawing.Point]::Empty, $screen.Bounds.Size)
  $bitmap.Save($path)
  $bitmap.Dispose()
}
```

---

## 4. OCR文字识别

### 方案

```powershell
# 使用Windows自带OCR（Win10+）
Add-Type -AssemblyName System.Runtime.WindowsRuntime
# 需要AsyncOperation... 较复杂

# 替代：截图后让BOSS自己看
# 或使用在线OCR服务
```

---

## 5. 实际应用场景

| 场景 | 操作 |
|------|------|
| BOSS发截图我看 | 读取inbound目录图片 |
| 复制结果给BOSS | Set-Clipboard |
| 需要截当前状态 | 调用截图脚本 |
| 保存重要内容 | 截图保存到workspace |

---

## 6. 输出格式

```
【需求】：截图/剪贴板

【操作】：
1. 获取屏幕内容
2. 处理（如OCR）
3. 保存/复制
```
