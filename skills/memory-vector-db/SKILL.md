---
name: memory-vector-db
description: |
  向量数据库与AI记忆系统专家。用于：(1) LanceDB理解（向量数据库概念、安装、使用）
  (2) AI记忆系统（让AI记住长期知识）
  (3) 向量检索（语义搜索、相似度匹配）
  (4) 知识库构建（企业/个人知识管理）
  (5) RAG应用（检索增强生成）
  适用于技术开发者构建AI记忆系统。
---

# 向量数据库与AI记忆技能

## 1. LanceDB 基础

### 什么是向量数据库

```
【简单理解】

传统数据库：存表格（1+1=2）
向量数据库：存"感觉"（"好吃"≈"美味"）

用途：让AI能语义搜索
- 找相似内容
- 找相关知识
- 记忆长期存储
```

### 核心概念

| 概念 | 说明 | 示例 |
|------|------|------|
| Embedding | 把文字转成数字 | "猫"→[0.1, 0.3, ...] |
| Vector | 向量/ embeddings的结果 | 一串数字 |
| Similarity | 相似度 | 0.95表示很相似 |
| Index | 索引 | 加速搜索 |

### 基本操作

```python
# 安装
pip install lancedb

# 导入
import lancedb

# 连接数据库
db = lancedb.connect("./my_db")

# 创建表
table = db.create_table("my_table", schema=...)

# 添加数据
table.add([{"text": "你好", "vector": [...]}])

# 搜索
results = table.search(query_vector).limit(5)
```

---

## 2. AI记忆系统

### 为什么需要向量记忆

```
【问题】

AI每次对话都是全新的
- 不记得之前说过什么
- 每次都要重新介绍

【解决方案】

用向量数据库存储记忆
- 对话摘要 → 向量存储
- 下次对话 → 语义搜索相关记忆
- 把记忆注入上下文
```

### 实现原理

```
用户新消息
    ↓
1. 查询记忆库（向量搜索）
    ↓
2. 找到相关历史
    ↓
3. 注入Prompt
    ↓
4. AI回复（带记忆）
    ↓
5. 保存本次对话到记忆库
```

---

## 3. 应用场景

### 场景1：个人知识管理

```
功能：
- 读过的书→存入向量库
- 问"这本书讲了什么"→语义搜索
- 自动关联相关知识点
```

### 场景2：企业知识库

```
功能：
- 文档→向量存储
- 员工提问→语义搜索相关文档
- 自动生成回答（基于RAG）
```

### 场景3：对话记忆

```
功能：
- 记住用户偏好
- 记住之前聊过的话题
- 跨对话 continuity
```

---

## 4. RAG（检索增强生成）

### RAG是什么

```
【概念】

RAG = 检索 + 生成

传统：AI自己编答案（可能错）
RAG：先查资料，再生成答案（更准）

流程：
用户问题 → 查向量库 → 找到相关资料 → 一起给AI → 生成准确答案
```

### 简单实现

```python
# 1. 准备知识库
documents = ["文档1内容", "文档2内容", ...]

# 2. 转成向量（用embedding模型）
embeddings = embed_model.encode(documents)

# 3. 存到LanceDB
db.add(embeddings, documents)

# 4. 查询时
query = "用户问题"
query_vec = embed_model.encode(query)
results = db.search(query_vec)

# 5. 生成答案
prompt = f"根据以下资料回答：{results}"
answer = llm.generate(prompt)
```

---

## 5. 实战案例

### 案例：让AI记住BOSS的店

```python
# 存储信息
memory = {
    "店铺": "乐客团",
    "品类": "芝士焗饭",
    "门店数": "2家",
    "优势": "毛利40%",
    "问题": "转化率3.5%"
}

# 转向量存库
vector = embed("乐客团的芝士焗饭店...")
db.add("店铺信息", vector)

# 下次对话
# 查询"BOSS的店怎么样"
results = db.search("店铺信息")
# → 返回存储的信息
```

---

## 6. 技术栈

### 常用工具

| 工具 | 用途 |
|------|------|
| LanceDB | 向量数据库 |
| LangChain | RAG框架 |
| OpenAI Embedding | 文字→向量 |
| ChromaDB | 另一个向量DB |

### 安装命令

```bash
# 核心
pip install lancedb

# AI相关
pip install langchain openai

# 向量化
pip install sentence-transformers
```

---

## 输出格式

```
【问题】：XXX

【技术方案】：
1. XXX
2. XXX

【代码示例】：
```python
# XXX
```

【参考资源】：
- XXX
```
