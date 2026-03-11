---
name: tencent-lbs
description: |
  腾讯位置服务专家。用于：(1) 逆地址解析（经纬度→地址）
  (2) 距离计算（两点间距离）
  (3) 门店热度分析（区域人流）
  (4) 关键词搜索（附近POI）
  适用于餐饮门店位置分析和客户距离计算。
---

# 腾讯位置服务技能

## 1. API配置

### Key配置
```
Key: F5BBZ-6UJN4-4ACUU-KOJNV-5PR5O-CMBZG
```

### 请求地址
```
https://apis.map.qq.com/ws/
```

---

## 2. 核心功能

### 2.1 逆地址解析（经纬度→地址）

**用途**：知道经纬度，获取具体地址

**API**：
```
GET https://apis.map.qq.com/ws/geocoder/v1/?location=纬度,经度&key=YOUR_KEY
```

**示例**：
```
https://apis.map.qq.com/ws/geocoder/v1/?location=22.58,113.08&key=F5BBZ-6UJN4-4ACUU-KOJNV-5PR5O-CMBZG
```

**返回**：
```json
{
  "status": 0,
  "result": {
    "address": "广东省江门市蓬江区育德街...",
    "ad_info": {
      "province": "广东省",
      "city": "江门市",
      "district": "蓬江区"
    }
  }
}
```

---

### 2.2 距离计算

**用途**：计算两个地点之间的距离

**API**：
```
GET https://apis.map.qq.com/ws/distance/v1/?mode=driving&from=纬度1,经度1&to=纬度2,经度2&key=YOUR_KEY
```

**示例**：
```
https://apis.map.qq.com/ws/distance/v1/?mode=walking&from=22.58,113.08&to=22.57,113.09&key=YOUR_KEY
```

**返回**：
```json
{
  "status": 0,
  "result": {
    "elements": [
      {
        "distance": 1500,
        "duration": 1200
      }
    ]
  }
}
```

**距离单位**：米
**时间单位**：秒

---

### 2.3 关键词搜索

**用途**：搜索附近的餐厅、银行、商场等

**API**：
```
GET https://apis.map.qq.com/ws/place/v1/search?keyword=餐厅&boundary=nearby(纬度,经度,1000)&page_size=20&key=YOUR_KEY
```

**参数**：
| 参数 | 说明 |
|------|------|
| keyword | 搜索关键词 |
| boundary | 搜索范围：nearby(纬度,经度,半径米) |
| page_size | 返回数量 |

---

### 2.4 门店热度分析

**用途**：分析某区域的人流热度

**方法**：
1. 获取区域内的POI数量
2. 统计各类别数量
3. 评估热度

---

## 3. 餐饮应用场景

### 场景1：计算客户到店距离

```
输入：客户地址或经纬度
输出：距离门店多少米
```

### 场景2：门店选址分析

```
1. 输入候选地址
2. 搜索附近竞品数量
3. 搜索附近人流密集区
4. 给出建议
```

### 场景3：外卖配送范围

```
1. 设置门店位置
2. 计算3km/5km范围
3. 分析覆盖区域
```

---

## 4. 调用示例

### 计算距离

```javascript
// 计算门店到客户距离
const key = 'F5BBZ-6UJN4-4ACUU-KOJNV-5PR5O-CMBZG';
const lat1 = 22.58;  // 门店纬度
const lon1 = 113.08; // 门店经度
const lat2 = 22.57;  // 客户纬度
const lon2 = 113.09; // 客户经度

const url = \`https://apis.map.qq.com/ws/distance/v1/?mode=driving&from=\${lat1},\${lon1}&to=\${lat2},\${lon2}&key=\${key}\`;

// 返回 distance: 1500 (米)
```

### 搜索附近餐厅

```javascript
const key = 'YOUR_KEY';
const lat = 22.58;
const lon = 113.08;
const radius = 3000; // 3公里

const url = \`https://apis.map.qq.com/ws/place/v1/search?keyword=餐饮&boundary=nearby(\${lat},\${lon},\${radius})&page_size=10&key=\${key}\`;
```

---

## 5. 输出格式

```
【位置服务需求】：XXX

【输入】：
- 门店位置：XXX
- 客户位置：XXX

【处理】：
1. 调用腾讯地图API
2. 计算距离/搜索周边

【结果】：
- 距离：XXX米
- 周边设施：XXX
```

---

## 6. 注意事项

| 注意点 | 说明 |
|--------|------|
| 配额 | 免费版有调用次数限制 |
| 缓存 | 相同请求可缓存结果 |
| 精度 | GPS定位可能有偏差 |
