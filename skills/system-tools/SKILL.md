---
name: system-tools
description: |
  Windows系统工具专家。用于：(1) 进程管理（查看、结束进程）
  (2) 服务管理（启动、停止、重启服务）
  (3) 网络工具（ping、端口查看、IP配置）
  (4) 系统信息（硬件、资源使用情况）
  (5) 任务管理器（定时任务、计划任务）
  适用于Windows系统日常管理和故障排查。
---

# Windows系统工具技能

## 1. 进程管理

### 查看进程

```powershell
# 所有进程
Get-Process

# 按名称查找
Get-Process -Name "node"

# 占用最高的进程
Get-Process | Sort-Object CPU -Descending | Select-Object -First 10
```

### 结束进程

```powershell
# 按名称结束
Stop-Process -Name "notepad" -Force

# 按PID结束
Stop-Process -Id 1234 -Force
```

---

## 2. 服务管理

### 查看服务

```powershell
# 所有服务
Get-Service

# 运行中的服务
Get-Service | Where-Object Status -eq Running

# 按名称查找
Get-Service -Name "Spooler"
```

### 控制服务

```powershell
# 启动服务
Start-Service -Name "Spooler"

# 停止服务
Stop-Service -Name "Spooler"

# 重启服务
Restart-Service -Name "Spooler"
```

---

## 3. 网络工具

### 连通性测试

```powershell
# Ping测试
Test-Connection -ComputerName 8.8.8.8

# 端口检测
Test-NetConnection -ComputerName google.com -Port 443
```

### 网络信息

```powershell
# 本机IP
Get-NetIPAddress

# 网络适配器
Get-NetAdapter

# 路由表
Get-NetRoute
```

---

## 4. 系统信息

### 硬件信息

```powershell
# CPU信息
Get-CimInstance Win32_Processor

# 内存信息
Get-CimInstance Win32_OperatingSystem | Select-Object FreePhysicalMemory, TotalVisibleMemorySize

# 磁盘信息
Get-CimInstance Win32_LogicalDisk
```

### 资源使用

```powershell
# CPU和内存
Get-Process | Sort-Object WorkingSet -Descending | Select-Object -First 5
```

---

## 5. 定时任务

### 查看任务

```powershell
# 所有计划任务
Get-ScheduledTask

# 某个任务
Get-ScheduledTask -TaskName "MorningReport"
```

### 创建任务

```powershell
# 创建每日9点执行的任务
$action = New-ScheduledTaskAction -Execute "powershell.exe" -Argument "C:\script.ps1"
$trigger = New-ScheduledTaskTrigger -Daily -At "9:00"
Register-ScheduledTask -Action $action -Trigger $trigger -TaskName "MyTask"
```

---

## 6. 常用操作

| 需求 | 命令 |
|------|------|
| 查看端口占用 | netstat -ano |
| 杀占用进程 | taskkill /PID xxx /F |
| 查看服务状态 | Get-Service |
| 重启服务 | Restart-Service |
| 查看IP | ipconfig |
| 刷新DNS | ipconfig /flushdns |

---

## 7. 输出格式

```
【系统需求】：XXX

【环境】：Windows

【操作】：
1. 检查状态
2. 执行操作
3. 验证结果
```
