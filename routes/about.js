const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');

const dataFile = path.join(__dirname, '..', 'data', 'about.json');

const defaultAbout = {
  title: '上海康恒环境科技有限公司',
  titleEn: 'Shanghai Kangheng Environmental Technology Co., Ltd.',
  mission: '以技术创新推动固废资源化利用，为全球客户提供专业、高效的环保解决方案',
  missionEn: 'Drive solid waste resource utilization through technological innovation, providing professional and efficient environmental solutions globally',
  vision: '成为全球领先的环保能源综合服务商',
  visionEn: 'Become a globally leading comprehensive environmental and energy service provider',
  description: '上海康恒环境科技有限公司成立于2022年，是康恒环境股份有限公司的全资子公司，专注于环保技术研发与设备制造。公司拥有多项核心专利技术，产品涵盖固废处理、污水处理、烟气净化等多个领域，已服务国内外超过500家客户。',
  descriptionEn: 'Founded in 2022, Shanghai Kangheng Environmental Technology Co., Ltd. is a wholly-owned subsidiary of Kangheng Environment Co., Ltd., focusing on environmental technology R&D and equipment manufacturing. The company owns multiple core patents, with products covering solid waste treatment, wastewater treatment, flue gas purification, and more, serving over 500 clients domestically and internationally.',
  timeline: [
    { year: '2022', title: '公司成立', desc: '上海康恒环境科技有限公司正式成立，开启环保科技新篇章' },
    { year: '2022', title: '首台设备交付', desc: '成功交付首套固废处理设备，标志着产业化进程正式启动' },
    { year: '2023', title: '技术研发突破', desc: '推出SUS第三代技术，处理效率提升30%，能耗降低20%' },
    { year: '2024', title: '市场拓展', desc: '业务覆盖全国25个省份，海外项目落地东南亚、中东地区' },
    { year: '2025', title: '战略合作', desc: '与多家国际环保机构达成战略合作，共同推进全球环保事业' },
  ],
  sus: {
    title: 'SUS 核心技术',
    subtitle: '自主研发的固废处理核心技术，持续迭代升级',
    generations: [
      {
        version: 'SUS 1.0',
        period: '2022-2023',
        title: '初代技术',
        efficiency: '效率: 标准',
        features: ['基础固废处理', '自动化控制', '达标排放'],
      },
      {
        version: 'SUS 2.0',
        period: '2023',
        title: '升级技术',
        efficiency: '效率: +15%',
        features: ['能效优化', '智能监控', '远程运维'],
      },
      {
        version: 'SUS 3.0',
        period: '2023-2024',
        title: '第三代技术',
        efficiency: '效率: +30%',
        features: ['AI智能控制', '数据可视化', '节能降耗'],
      },
      {
        version: 'SUS 4.0',
        period: '2024+',
        title: '第四代技术',
        efficiency: '效率: +50%',
        features: ['全链路智能', '数字孪生', '碳中和技术'],
      },
    ],
  },
  awards: [
    '国家高新技术企业',
    '上海市专精特新企业',
    'ISO9001质量管理体系认证',
    'ISO14001环境管理体系认证',
    '中国环保产业协会理事单位',
  ],
};

function readAbout() {
  try {
    if (fs.existsSync(dataFile)) {
      return JSON.parse(fs.readFileSync(dataFile, 'utf-8'));
    }
  } catch {}
  return defaultAbout;
}

function writeAbout(data) {
  fs.writeFileSync(dataFile, JSON.stringify(data, null, 2), 'utf-8');
}

// GET about content
router.get('/', (req, res) => {
  res.json(readAbout());
});

// PUT update about content
router.put('/', (req, res) => {
  const current = readAbout();
  const updated = { ...current, ...req.body };
  writeAbout(updated);
  res.json(updated);
});

module.exports = router;
