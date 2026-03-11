---
name: api-integration
description: |
  第三方API集成专家。用于：(1) 外卖平台API（美团、饿了么、抖音）
  (2) 支付API（微信、支付宝）
  (3) 短信API（通知、验证码）
  (4) 天气API（获取天气数据）
  (5) 数据API（企查查、天眼查）
  适用于餐饮业务自动化对接外部服务。
---

# 第三方API集成技能

## 1. 外卖平台API

### 美团

| API | 用途 |
|-----|------|
| 订单查询 | 获取订单状态 |
| 菜品同步 | 上下架菜品 |
| 数据统计 | 营收/流量数据 |

### 饿了么

| API | 用途 |
|-----|------|
| 订单推送 | 实时接收订单 |
| 营销活动 | 设置优惠 |
| 店铺管理 | 店铺信息 |

### 抖音团购

| API | 用途 |
|-----|------|
| 核销 | 验券 |
| 门店管理 | 上下架 |

---

## 2. 支付API

### 微信支付

```javascript
// 扫码支付
POST /pay/unifiedorder
{
  body: {
    appid: 'xxx',
    mch_id: 'xxx',
    nonce_str: 'xxx',
    sign: 'xxx',
    out_trade_no: 'xxx',
    total_fee: 1, // 分
    spbill_create_ip: 'xxx',
    notify_url: 'xxx',
    trade_type: 'NATIVE'
  }
}
```

### 支付宝

```javascript
// 电脑网站支付
POST /api/alipay/trade/page/pay
{
  out_trade_no: 'xxx',
  total_amount: 0.01,
  subject: 'xxx'
}
```

---

## 3. 短信API

### 常用场景

| 场景 | 模板 |
|------|------|
| 订单通知 | "您的订单已接单，预计XX送达" |
| 会员生日 | "祝您生日快乐，到店享8折" |
| 营销活动 | "新品上市，全场8折，点击XXX" |

### 服务商

| 服务商 | 特点 |
|--------|------|
| 阿里云短信 | 稳定、贵 |
| 腾讯云短信 | 稳定、略贵 |
| 容联云通讯 | 性价比高 |
| 创蓝253 | 便宜 |

---

## 4. 天气API

### Open-Meteo（免费）

```javascript
// 江门
GET https://api.open-meteo.com/v1/forecast
  ?latitude=22.58
  &longitude=113.08
  &current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m
```

### 腾讯天气（免费）

```
GET https://wis.qq.com/weather/common
  ?source=pc
  &weather_type=now
  &province=广东
  &city=江门
```

---

## 5. 企业数据API

### 企查查/天眼查

| API | 用途 |
|-----|------|
| 企业信息 | 查询竞品/供应商资质 |
| 工商变更 | 监控供应商风险 |
| 联系方式 | 获取老板电话 |

### 用法示例

```javascript
// 查询企业信息
GET https://api.tianyancha.com/v4/company/xx
Headers:
  Authorization: xxx
```

---

## 6. 对接流程

### 一般步骤

```
1. 注册开发者账号
2. 申请API密钥
3. 阅读API文档
4. 开发测试
5. 正式上线
```

### 常见问题

| 问题 | 解决 |
|------|------|
| 需要资质 | 营业执照等 |
| 调用限制 | 付费升级 |
| 签名复杂 | 用官方SDK |

---

## 7. 餐饮常用集成

| 场景 | API |
|------|-----|
| 自动接单 | 美团/饿了么推送 |
| 会员通知 | 短信/微信 |
| 查供应商 | 企查查 |
| 看天气 | Open-Meteo |

---

## 8. 输出格式

```
【需求】：对接XXX API

【信息】：
- 平台：
- 用途：
- 需要资质：

【步骤】：
1. 注册账号
2. 申请API Key
3. 对接开发
4. 测试上线
```
