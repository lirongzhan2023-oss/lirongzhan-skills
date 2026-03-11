const { Document, Packer, Paragraph, Table, TableRow, TableCell, WidthType, AlignmentType, HeadingLevel, BorderStyle } = require('docx');
const fs = require('fs');

// 创建文档
const doc = new Document({
  sections: [{
    properties: {},
    children: [
      // 标题
      new Paragraph({
        text: "育德店深度分析报告",
        heading: HeadingLevel.TITLE,
        alignment: AlignmentType.CENTER,
        spacing: { after: 400 }
      }),

      // 1. 财务诊断
      new Paragraph({
        text: "1. 财务诊断",
        heading: HeadingLevel.HEADING_1,
        spacing: { before: 400, after: 200 }
      }),
      new Paragraph({
        text: "指标          数值       行业标准    差距      状态\n营收           10.76万    12万       -1.24万    ⚠️\n物料成本       59.1%      <35%       +24.1%     🔴\n人力成本       21.0%      25-28%     -4%        ✅\n推广费         1.5%       3-5%       -1.5%      🔴\n纯利率         1.4%       10%        -8.6%      🔴",
        spacing: { after: 200 }
      }),

      // 2. 增长瓶颈
      new Paragraph({
        text: "2. 增长瓶颈",
        heading: HeadingLevel.HEADING_1,
        spacing: { before: 400, after: 200 }
      }),
      new Paragraph({
        text: "维度      当前    行业    问题\n曝光量    低       高      推广不够\n转化率    3.5%     8%      主图/价格\n复购率    16.86%   25%     会员运营",
        spacing: { after: 200 }
      }),

      // 3. 问题优先级
      new Paragraph({
        text: "3. 问题优先级",
        heading: HeadingLevel.HEADING_1,
        spacing: { before: 400, after: 200 }
      }),
      new Paragraph({
        text: "问题           MoSCoW    影响          紧急度\n物料成本59%    Must     吃掉利润      P0\n推广太低       Must     没新客        P0\n复购低         Should   流失快        P1\n维修费高       Could    浪费钱        P2",
        spacing: { after: 200 }
      }),

      // 4. 本周迭代
      new Paragraph({
        text: "4. 本周迭代（PDCA）",
        heading: HeadingLevel.HEADING_1,
        spacing: { before: 400, after: 200 }
      }),
      new Paragraph({
        text: "Observe：数据已收集\n- 物料59%，超标\n- 推广1.5%，太低\n- 纯利1.4%\n\nOrient：定位根因\n- 物料高 → 供应商没比价\n- 推广低 → 没投流\n- 复购低 → 没会员体系\n\nDecide：制定方案\n- 动作1：3家供应商比价\n- 动作2：测试投流500元\n- 动作3：建立会员体系\n\nAct：执行验证\n- 周五检查效果",
        spacing: { after: 200 }
      }),

      // 5. 预期收益
      new Paragraph({
        text: "5. 预期收益",
        heading: HeadingLevel.HEADING_1,
        spacing: { before: 400, after: 200 }
      }),
      new Paragraph({
        text: "方案        投入    月收益    ROI\n物料降4%    0       +5700     ∞\n推广+30%    2000    +5000     150%\n总计        2000    +10700    435%",
        spacing: { after: 200 }
      }),

      // 6. 明天行动
      new Paragraph({
        text: "6. 明天行动",
        heading: HeadingLevel.HEADING_1,
        spacing: { before: 400, after: 200 }
      }),
      new Paragraph({
        text: "1. 早上：找3家冻货/包材供应商联系方式\n2. 中午：美团后台设置500元推广测试\n3. 下午：设计会员优惠方案",
        spacing: { after: 200 }
      }),

      // 页脚
      new Paragraph({
        text: "报告生成时间：2026年3月11日",
        alignment: AlignmentType.CENTER,
        spacing: { before: 400 }
      }),
    ],
  }],
});

// 保存
Packer.toBuffer(doc).then(buffer => {
  fs.writeFileSync('C:/Users/Administrator/.openclaw/workspace/育德店深度分析报告.docx', buffer);
  console.log('✅ Word文档已生成');
});
