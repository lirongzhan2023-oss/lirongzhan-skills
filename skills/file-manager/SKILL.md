---
name: file-manager
description: |
  文件管理专家。用于：(1) 文件/文件夹操作（复制、移动、重命名、删除）
  (2) 批量处理（批量重命名、批量移动）
  (3) 文件搜索（按名称、按内容）
  (4) 文件对比（差异比较）
  (5) 压缩解压（zip、rar等）
  适用于日常文件管理工作。
---

# 文件管理技能

## 1. 文件操作

### 常用命令

| 操作 | Windows命令 | 示例 |
|------|-------------|------|
| 复制 | copy | copy a.txt b.txt |
| 移动 | move | move a.txt folder/ |
| 重命名 | ren | ren a.txt b.txt |
| 删除 | del | del a.txt |
| 新建文件夹 | mkdir | mkdir newfolder |

### 批量操作

```bash
# 复制所有txt文件
copy *.txt folder/

# 移动所有jpg
move *.jpg images/

# 批量重命名
ren *.txt *.bak
```

---

## 2. 搜索文件

### 按名称

```powershell
# 找文件
Get-ChildItem -Recurse -Filter "*.xlsx"

# 找包含内容的文件
Select-String -Path "*.txt" -Pattern "关键词"
```

### 查找大文件

```powershell
# 找最大的10个文件
Get-ChildItem -Recurse | Sort-Object Length -Descending | Select-Object -First 10
```

---

## 3. 文件对比

### 比较两个文件

```powershell
# 文本对比
Compare-Object (Get-Content a.txt) (Get-Content b.txt)
```

### 文件夹同步

```powershell
# 复制新增/修改的文件
robocopy src dst /mir
```

---

## 4. 压缩解压

### 压缩

```powershell
# 压缩文件夹
Compress-Archive -Path folder -DestinationPath file.zip

# 压缩多个文件
Compress-Archive -Path a.txt,b.txt -DestinationPath files.zip
```

### 解压

```powershell
Expand-Archive -Path file.zip -DestinationPath folder
```

---

## 5. 批量处理场景

### 批量重命名

```powershell
# 加前缀
Get-ChildItem *.xlsx | ForEach-Object { ren $_.Name "2026-$($_.Name)" }

# 改扩展名
ren *.xls *.xlsx
```

### 批量移动

```powershell
# 按类型分文件夹
Get-ChildItem -Filter "*.xlsx" | Move-Item -Destination Excel/
Get-ChildItem -Filter "*.txt" | Move-Item -Destination Text/
```

---

## 6. 输出格式

```
【文件需求】：XXX

【操作】：
- 源路径：XXX
- 目标路径：XXX
- 批量条件：XXX

【我来执行】：
1. 检查文件
2. 执行操作
3. 确认结果
```
