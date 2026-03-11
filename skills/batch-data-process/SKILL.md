---
name: batch-data-process
description: |
  批量数据处理专家。用于：(1) 大量Excel处理（多个文件合并统计）
  (2) 数据清洗（去重、填充、格式转换）
  (3) 批量统计（求和、平均、汇总）
  (4) 多维度分析（按日/按周/按月/按门店）
  (5) 财务对账（采购、支出、收入核对）
  适用于餐饮成本核算、批量数据统计场景。
---

# 批量数据处理技能

## 1. 批量Excel处理

### 读取多个文件

```javascript
// 读取文件夹下所有Excel
const fs = require('fs');
const XLSX = require('xlsx');

const files = fs.readdirSync('./data/');
const allData = [];

files.forEach(file => {
  if (file.endsWith('.xlsx')) {
    const wb = XLSX.readFile('./data/' + file);
    const data = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]);
    allData.push(...data);
  }
});
```

### 合并数据

```javascript
// 合并多个表格
const merged = [
  ...data1,
  ...data2,
  ...data3
];
```

---

## 2. 数据清洗

### 常用清洗操作

| 操作 | 方法 | 示例 |
|------|------|------|
| 去重 | Set或filter | [...new Set(arr)] |
| 空值填充 | fill或默认值 | val || 0 |
| 类型转换 | Number/Date | new Date() |
| 日期统一 | 统一格式 | YYYY-MM-DD |
| 文本清洗 | trim/replace | str.trim() |

### 清洗代码

```javascript
// 清洗数据
data.forEach(row => {
  // 去空格
  row['日期'] = row['日期']?.trim();
  // 数字转换
  row['金额'] = Number(row['金额']) || 0;
  // 日期转换
  row['日期'] = new Date(row['日期']);
  // 空值填充
  row['备注'] = row['备注'] || '';
});
```

---

## 3. 批量统计

### 按维度汇总

| 维度 | 方法 | 场景 |
|------|------|------|
| 按日 | groupBy + sum | 每日营收 |
| 按周 | groupBy + sum | 周报汇总 |
| 按月 | groupBy + sum | 月报汇总 |
| 按门店 | groupBy + sum | 多店对比 |
| 按品类 | groupBy + sum | 品类销售 |

### 代码示例

```javascript
// 按日期汇总营收
const byDate = {};
data.forEach(row => {
  const date = row['日期'].toISOString().split('T')[0];
  byDate[date] = (byDate[date] || 0) + row['营收'];
});

// 结果：{ '2026-03-11': 10000, '2026-03-12': 12000 }
```

### 统计函数

```javascript
// 求和
const sum = arr.reduce((a, b) => a + b, 0);

// 平均
const avg = sum / arr.length;

// 最大/最小
const max = Math.max(...arr);
const min = Math.min(...arr);

// 计数
const count = arr.length;
```

---

## 4. 多维度分析

### 交叉统计

```javascript
// 按月份和门店
const byMonthStore = {};
data.forEach(row => {
  const month = row['日期'].getMonth() + 1;
  const store = row['门店'];
  const key = `${month}月_${store}`;
  byMonthStore[key] = (byMonthStore[key] || 0) + row['营收'];
});
```

### 常用维度

| 维度 | 说明 |
|------|------|
| 时间 | 日/周/月/季/年 |
| 门店 | 店1/店2/总店 |
| 品类 | 主食/小吃/饮品 |
| 供应商 | 供应商A/B/C |
| 渠道 | 美团/饿了么/堂食 |

---

## 5. 财务对账

### 采购对账

```javascript
// 采购单 vs 实际收货
const 采购对账 = [];
data采购.forEach(p => {
  const 实收 = data实收.find(s => s.单号 === p.单号);
  const 差异 = p.金额 - 实收?.金额;
  采购对账.push({
    单号: p.单号,
    采购金额: p.金额,
    实际金额: 实收?.金额,
    差异
  });
});
```

### 差异检测

```javascript
// 自动标记差异>0的记录
const 异常 = 采购对账.filter(r => Math.abs(r.差异) > 0);
```

---

## 6. 输出模板

### 月度成本表

```
【10月成本汇总】
| 品类 | 金额 | 占比 | 环比 |
|------|------|------|------|
| 物料 | 63592 | 59% | +5% |
| 人事 | 22569 | 21% | 0% |
| 租金 | 3000 | 3% | 0% |
```

### 批量统计输出

```
【数据处理结果】
- 处理记录：1000条
- 清洗后：995条
- 异常：5条

【统计结果】
- 总营收：XXX
- 总成本：XXX
- 净利润：XXX
```

---

## 7. 处理流程

```
1. 收集数据（多个Excel）
   ↓
2. 数据清洗（去重/空值/格式）
   ↓
3. 数据验证（计算校验）
   ↓
4. 按维度统计
   ↓
5. 生成报表
```

---

## 8. 批量处理模板

### 输入：多个Excel文件
### 输出：汇总Excel + 统计报告

```javascript
// 完整处理流程
async function processCostData(filePaths) {
  // 1. 读取所有文件
  const allData = await readAllFiles(filePaths);

  // 2. 数据清洗
  const cleanData = clean(allData);

  // 3. 按品类汇总
  const byCategory = groupBy(cleanData, '品类');

  // 4. 按月汇总
  const byMonth = groupBy(cleanData, '月份');

  // 5. 生成报告
  return {
    总成本: sum(cleanData, '金额'),
    品类分布: byCategory,
    月度趋势: byMonth
  };
}
```
