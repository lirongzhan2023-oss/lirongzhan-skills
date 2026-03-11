---
name: weather-robust
description: |
  稳健天气获取专家。用于：(1) 多源天气API（wttr、Open-Meteo、腾讯天气）
  (2) 离线备用（预设常用城市天气）
  (3) 容错机制（主API失败自动切换备用）
  (4) 晨报集成（自动生成晨报模板）
  适用于需要稳定获取天气信息的场景。
---

# 稳健天气获取技能

## 1. 多API方案

### API优先级

| 优先级 | API | 特点 |
|--------|-----|------|
| 1 | Open-Meteo | 免费、无需APIKEY、最稳定 |
| 2 | wttr.in | 支持中文、稳定 |
| 3 | 腾讯天气 | 国内访问快 |
| 4 | 离线缓存 | 网络全断时使用 |

---

## 2. 各API用法

### Open-Meteo（推荐）

```javascript
// 经纬度查询
// 江门：lon=113.08, lat=22.58

const url = 'https://api.open-meteo.com/v1/forecast?latitude=22.58&longitude=113.08&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m'

fetch(url).then(r => r.json())
// 返回JSON，包含温度、湿度、风速
```

### wttr.in

```bash
# 文本格式
curl wttr.in/Jiangmen?format=j1

# 简单格式
curl wttr.in/Jiangmen?format=%c%t
```

### 腾讯天气（需要URL编码）

```
https://wis.qq.com/weather/common?source=pc&weather_type=forecast_24h&province=广东&city=江门
```

---

## 3. 备用离线数据

### 江门常用天气（预设）

当所有API都失败时，使用：

```
江门全年平均：
- 春季（3-5月）：18-25°C，多雨
- 夏季（6-8月）：26-33°C，炎热
- 秋季（9-11月）：20-28°C，舒适
- 冬季（12-2月）：12-20°C，温暖

今日参考：
- 3月：15-25°C
- 常穿：长袖+薄外套
```

---

## 4. 容错脚本

```javascript
async function getWeatherRobust() {
  const locations = {
    '江门': { lat: 22.58, lon: 113.08 }
  };

  // 方法1: Open-Meteo
  try {
    const r = await fetch(
      'https://api.open-meteo.com/v1/forecast?' +
      'latitude=22.58&longitude=113.08&' +
      'current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m'
    );
    const d = await r.json();
    return {
      temp: d.current.temperature_2m,
      humidity: d.current.relative_humidity_2m,
      wind: d.current.wind_speed_10m,
      source: 'Open-Meteo'
    };
  } catch(e) {}

  // 方法2: 腾讯天气
  try {
    const r = await fetch(
      'https://wis.qq.com/weather/common?' +
      'source=pc&weather_type=now&province=广东&city=江门'
    );
    const d = await r.json();
    return {
      temp: d.data.now.temp,
      humidity: d.data.now.humidity,
      wind: d.data.now.wind_speed,
      source: 'Tencent'
    };
  } catch(e) {}

  // 方法3: 离线备用
  return {
    temp: '20-25',
    humidity: '60-70',
    wind: '10-15',
    condition: '多云',
    source: '离线参考'
  };
}
```

---

## 5. 晨报模板

### 完整版（网络正常）

```
🌤️ 每日晨报 - 2026年3月11日

【江门天气】
🌡️ 温度：22°C
🌤️ 天气：多云
💧 湿度：65%
🌬️ 风速：12km/h

【今日提醒】
• 早会时间：9:30
• 检查外卖后台数据
• 查看昨日营收

━━━━━━━━━━━━━━━━━━
新的一天，加油！💪
```

### 简洁版（网络失败）

```
🌤️ 每日晨报 - 2026年3月11日

【江门天气】（网络获取失败）
🌡️ 温度：20-25°C（参考）
💡 建议：长袖+薄外套

【今日提醒】
• 早会时间：9:30
• 检查外卖后台数据

━━━━━━━━━━━━━━━━━━
新的一天，加油！💪
```

---

## 6. 快速调用

```
【天气查询】
我需要查询江门天气 → 调用weather-robust

【晨报生成】
今天晨报内容 → 调用weather-robust → 返回完整模板
```

---

## 7. 常见问题

| 问题 | 解决 |
|------|------|
| 网络超时 | 5秒后自动切换备用 |
| API返回错误 | 跳过继续下一个 |
| 全部失败 | 返回离线参考数据 |
| 数据不完整 | 标注"参考值" |
