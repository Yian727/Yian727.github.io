import { useState } from 'react';
import { Save, RotateCcw } from 'lucide-react';

const STORAGE_KEY = 'kh_editable_content';

export interface ServiceItem {
  name: string;
  nameEn: string;
  desc: string;
  descEn: string;
}

export interface SolutionItem {
  name: string;
  nameEn: string;
  desc: string;
  descEn: string;
  features: string[];
  featuresEn: string[];
}

export interface CaseItem {
  name: string;
  nameEn: string;
  tag: string;
  tagEn: string;
  desc: string;
  descEn: string;
}

export interface EditableContent {
  // Hero
  heroTitle: string;
  heroTitleEn: string;
  heroSubtitle: string;
  heroSubtitleEn: string;
  // Services
  servicesTitle: string;
  servicesTitleEn: string;
  servicesDesc: string;
  servicesDescEn: string;
  servicesItems: ServiceItem[];
  // Solutions
  solutionsTitle: string;
  solutionsTitleEn: string;
  solutionsDesc: string;
  solutionsDescEn: string;
  solutionsItems: SolutionItem[];
  // Cases
  casesTitle: string;
  casesTitleEn: string;
  casesItems: CaseItem[];
  // About
  aboutTitle: string;
  aboutTitleEn: string;
  aboutDesc: string;
  aboutDescEn: string;
  aboutMission: string;
  aboutMissionEn: string;
  aboutVision: string;
  aboutVisionEn: string;
  // CTA
  ctaTitle: string;
  ctaTitleEn: string;
  ctaSubtitle: string;
  ctaSubtitleEn: string;
  // 页面大图
  homeHeroImage: string;
  aboutHeroImage: string;
  servicesHeroImage: string;
  solutionsHeroImage: string;
  contactHeroImage: string;
  teamHeroImage: string;
}

const defaultServices: ServiceItem[] = [
  { name: '核心设备', nameEn: 'Core Equipment', desc: '焚烧炉、余热锅炉、烟气净化处理系统、余热利用系统、渗滤液处理系统研发制造', descEn: 'Incinerators, waste heat boilers, flue gas purification, waste heat utilization, leachate treatment systems' },
  { name: 'EPC工程', nameEn: 'EPC Engineering', desc: '设计、采购、施工、安装、调试全流程服务', descEn: 'Full turnkey from design to commissioning' },
  { name: '委托运营', nameEn: 'Operation', desc: '40+项目运营经验，15个AAA级项目', descEn: '40+ projects, 15 AAA-rated' },
  { name: '技改', nameEn: 'Retrofit', desc: '节能增效、环保提标、新工艺技术升级', descEn: 'Energy efficiency upgrades, emission improvements' },
  { name: '技术咨询', nameEn: 'Consulting', desc: '24小时免费技术咨询，专属项目档案管理', descEn: '24/7 free consulting, dedicated project archives' },
  { name: '运营培训', nameEn: 'Training', desc: '标准化管理制度，专业人才梯队建设', descEn: 'Standardized management protocols, talent development' },
  { name: '备件供应', nameEn: 'Spare Parts', desc: '集采平台保障，质量优、价格低、到货快', descEn: 'Centralized procurement, quality guaranteed' },
  { name: '数字化管控', nameEn: 'Digital Control', desc: 'DCS实时监控，大数据分析，AI智能控制', descEn: 'DCS monitoring, big data analytics, AI control' },
];

const defaultSolutions: SolutionItem[] = [
  { name: '生活垃圾焚烧发电', nameEn: 'MSW Incineration Power', desc: '提供从300吨/日到3000吨/日全系列生活垃圾焚烧发电解决方案，发电效率行业第一', descEn: 'Full series MSW incineration solutions from 300 to 3000 t/d', features: ['炉排焚烧', '流化床焚烧', '热解气化', '等离子气化'], featuresEn: ['Grate Incineration', 'Fluidized Bed', 'Pyrolysis', 'Plasma'] },
  { name: '工业固废协同处置', nameEn: 'Industrial Waste Disposal', desc: '危废、医废、污泥等工业固废协同处置方案，实现资源最大化利用', descEn: 'Hazardous, medical, and sludge industrial waste co-processing', features: ['危废焚烧', '医废处置', '污泥干化', '资源回收'], featuresEn: ['Haz Waste', 'Medical Waste', 'Sludge Drying', 'Recycling'] },
  { name: '烟气净化处理', nameEn: 'Flue Gas Purification', desc: '满足国标、欧盟、超低排放等不同排放标准的烟气净化系统', descEn: 'Flue gas systems meeting national, EU, and ultra-low emission standards', features: ['脱硝脱酸', '除尘除臭', '二噁英控制', '超低排放'], featuresEn: ['DeNOx DeAcid', 'Dedusting', 'Dioxin Control', 'Ultra-low'] },
  { name: '环保提标改造', nameEn: 'Emission Upgrade', desc: '现有设施环保提标改造，NOx下降50%+，满足最新排放标准', descEn: 'Facility upgrades with NOx reduction 50%+', features: ['超低排放', '节能降耗', '智能控制', '余热利用'], featuresEn: ['Ultra-low', 'Energy Saving', 'Smart Control', 'Waste Heat'] },
];

const defaultCases: CaseItem[] = [
  { name: '上海老港项目', nameEn: 'Shanghai Laogang', tag: '3000吨/日', tagEn: '3000 t/d', desc: '全球最大垃圾焚烧发电项目之一，采用康恒SUS 4.0技术', descEn: "One of the world's largest WtE projects using SUS 4.0 technology" },
  { name: '宁波项目', nameEn: 'Ningbo Project', tag: '2250吨/日', tagEn: '2250 t/d', desc: '浙江省标杆项目，发电效率行业领先', descEn: 'Zhejiang benchmark project with industry-leading efficiency' },
  { name: '青岛项目', nameEn: 'Qingdao Project', tag: '1500吨/日', tagEn: '1500 t/d', desc: '山东地区最大垃圾焚烧发电项目', descEn: "Largest WtE project in Shandong region" },
];

const defaultContent: EditableContent = {
  heroTitle: '固废处理全产业链服务商',
  heroTitleEn: 'Full-Chain Solid Waste Solutions',
  heroSubtitle: '核心设备 · 烟气净化处理系统 · 余热利用系统 · 渗滤液处理系统',
  heroSubtitleEn: 'Core Equipment · Flue Gas · Waste Heat · Leachate',
  homeHeroImage: '/images/hero-full.jpg',
  aboutHeroImage: '/images/hero-full.jpg',
  servicesHeroImage: '/images/product-boiler.jpg',
  solutionsHeroImage: '/images/hero-full.jpg',
  contactHeroImage: '/images/product-gas.jpg',
  teamHeroImage: '/images/product-boiler.jpg',
  servicesTitle: '全周期综合服务',
  servicesTitleEn: 'Full-Cycle Services',
  servicesDesc: '覆盖焚烧炉系统、烟气净化系统、渗滤液处理、EPC工程、委托运营、技改等领域',
  servicesDescEn: 'Covering incineration, flue gas, leachate, EPC, operation, and retrofit',
  servicesItems: defaultServices,
  solutionsTitle: '核心解决方案',
  solutionsTitleEn: 'Core Solutions',
  solutionsDesc: '覆盖生活垃圾焚烧发电、工业固废协同处置、污泥干化焚烧、环保提标改造四大领域',
  solutionsDescEn: 'MSW incineration, industrial waste, sludge treatment, and emission upgrades',
  solutionsItems: defaultSolutions,
  casesTitle: '标杆案例',
  casesTitleEn: 'Benchmark Projects',
  casesItems: defaultCases,
  aboutTitle: '关于康恒科技',
  aboutTitleEn: 'About KH Tech',
  aboutDesc: '集核心设备、烟气净化处理系统、余热利用系统、渗滤液处理系统研发制造，EPC工程建设、委托运营、技改服务于一体，打造"设备+工程+运营+技改"全周期综合解决方案，业务覆盖国内及海外多个国家与地区。',
  aboutDescEn: 'Integrating core equipment, flue gas purification, waste heat utilization, and leachate treatment R&D and manufacturing with EPC engineering, operation services, and retrofit, providing full-cycle solutions across domestic and international markets.',
  aboutMission: '让垃圾变资源，让环境更美好',
  aboutMissionEn: 'Turning waste into resources, making the environment better',
  aboutVision: '成为全球领先的环保能源综合服务商',
  aboutVisionEn: 'To become a global leading environmental energy service provider',
  ctaTitle: '共创绿色未来',
  ctaTitleEn: 'Create Green Future',
  ctaSubtitle: '无论您是市政环卫还是固废处置企业，我们都能提供量身定制的解决方案',
  ctaSubtitleEn: 'Tailored environmental solutions for your needs',
};

export function loadEditableContent(): EditableContent {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return { ...defaultContent, ...JSON.parse(saved) };
  } catch {}
  return { ...defaultContent };
}

export function saveEditableContent(content: Partial<EditableContent>) {
  const current = loadEditableContent();
  const updated = { ...current, ...content };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  // 同步到后端 API
  fetch('/api/content', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updated),
  }).catch(() => {});
  // 通知前台页面刷新
  window.dispatchEvent(new CustomEvent('editable-content-change'));
  return updated;
}

/* ═══════════════════════════════════════════
   Content Manager Component
   ═══════════════════════════════════════════ */
export default function ContentManager() {
  const [form, setForm] = useState<EditableContent>(loadEditableContent());
  const [saved, setSaved] = useState(false);
  const [activeTab, setActiveTab] = useState<'hero' | 'services' | 'solutions' | 'cases' | 'about' | 'cta' | 'images'>('hero');

  const handleSave = () => {
    saveEditableContent(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleReset = () => {
    if (confirm('确定重置所有页面内容为默认值？')) {
      localStorage.removeItem(STORAGE_KEY);
      setForm({ ...defaultContent });
      window.dispatchEvent(new CustomEvent('editable-content-change'));
    }
  };

  const update = (key: keyof EditableContent, value: any) => {
    setForm(prev => ({ ...prev, [key]: value }));
  };

  const updateService = (index: number, field: keyof ServiceItem, value: string) => {
    const items = [...form.servicesItems];
    items[index] = { ...items[index], [field]: value };
    update('servicesItems', items);
  };

  const updateSolution = (index: number, field: keyof SolutionItem, value: any) => {
    const items = [...form.solutionsItems];
    items[index] = { ...items[index], [field]: value };
    update('solutionsItems', items);
  };

  const updateCase = (index: number, field: keyof CaseItem, value: string) => {
    const items = [...form.casesItems];
    items[index] = { ...items[index], [field]: value };
    update('casesItems', items);
  };

  const tabs = [
    { key: 'hero' as const, label: '首页 Hero' },
    { key: 'services' as const, label: '服务' },
    { key: 'solutions' as const, label: '解决方案' },
    { key: 'cases' as const, label: '优质案例' },
    { key: 'about' as const, label: '公司介绍' },
    { key: 'cta' as const, label: '联系 CTA' },
    { key: 'images' as const, label: '页面大图' },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-[#1d1d1f]">页面内容管理</h2>
        <div className="flex items-center gap-3">
          {saved && <span className="text-sm text-emerald-600">已保存</span>}
          <button onClick={handleReset} className="btn-secondary !text-sm !py-2.5">
            <RotateCcw size={14} /> 重置
          </button>
          <button onClick={handleSave} className="btn-primary !text-sm !py-2.5">
            <Save size={14} /> 保存
          </button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex flex-wrap gap-2 mb-6 border-b border-[#e8e8ed] pb-3">
        {tabs.map(t => (
          <button
            key={t.key}
            onClick={() => setActiveTab(t.key)}
            className={`text-[13px] font-medium px-4 py-2 rounded-full transition-colors ${
              activeTab === t.key
                ? 'bg-[#1d1d1f] text-white'
                : 'bg-[#f5f5f7] text-[#86868b] hover:text-[#1d1d1f]'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Hero Tab */}
      {activeTab === 'hero' && (
        <div className="bg-white rounded-xl p-6 border border-[#d2d2d7] space-y-4">
          <h3 className="font-semibold text-[#1d1d1f] mb-4">首页 Hero</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div><label className="block text-xs text-[#86868b] mb-1">主标题（中文）</label><input value={form.heroTitle} onChange={e => update('heroTitle', e.target.value)} className="admin-input w-full" /></div>
            <div><label className="block text-xs text-[#86868b] mb-1">主标题（英文）</label><input value={form.heroTitleEn} onChange={e => update('heroTitleEn', e.target.value)} className="admin-input w-full" /></div>
            <div className="lg:col-span-2"><label className="block text-xs text-[#86868b] mb-1">副标题（中文）</label><input value={form.heroSubtitle} onChange={e => update('heroSubtitle', e.target.value)} className="admin-input w-full" /></div>
            <div className="lg:col-span-2"><label className="block text-xs text-[#86868b] mb-1">副标题（英文）</label><input value={form.heroSubtitleEn} onChange={e => update('heroSubtitleEn', e.target.value)} className="admin-input w-full" /></div>
          </div>
        </div>
      )}

      {/* Services Tab */}
      {activeTab === 'services' && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl p-6 border border-[#d2d2d7]">
            <h3 className="font-semibold text-[#1d1d1f] mb-4">服务区块标题</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div><label className="block text-xs text-[#86868b] mb-1">标题（中文）</label><input value={form.servicesTitle} onChange={e => update('servicesTitle', e.target.value)} className="admin-input w-full" /></div>
              <div><label className="block text-xs text-[#86868b] mb-1">标题（英文）</label><input value={form.servicesTitleEn} onChange={e => update('servicesTitleEn', e.target.value)} className="admin-input w-full" /></div>
              <div className="lg:col-span-2"><label className="block text-xs text-[#86868b] mb-1">描述（中文）</label><textarea value={form.servicesDesc} onChange={e => update('servicesDesc', e.target.value)} rows={2} className="admin-input resize-none w-full" /></div>
              <div className="lg:col-span-2"><label className="block text-xs text-[#86868b] mb-1">描述（英文）</label><textarea value={form.servicesDescEn} onChange={e => update('servicesDescEn', e.target.value)} rows={2} className="admin-input resize-none w-full" /></div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 border border-[#d2d2d7]">
            <h3 className="font-semibold text-[#1d1d1f] mb-4">服务内容（共{form.servicesItems.length}项）</h3>
            <div className="space-y-4">
              {form.servicesItems.map((s, i) => (
                <div key={i} className="border border-[#e8e8ed] rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[13px] font-semibold text-[#1d1d1f]">服务 {i + 1}</span>
                  </div>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                    <div><label className="block text-xs text-[#86868b] mb-1">名称（中文）</label><input value={s.name} onChange={e => updateService(i, 'name', e.target.value)} className="admin-input w-full" /></div>
                    <div><label className="block text-xs text-[#86868b] mb-1">名称（英文）</label><input value={s.nameEn} onChange={e => updateService(i, 'nameEn', e.target.value)} className="admin-input w-full" /></div>
                    <div className="lg:col-span-2"><label className="block text-xs text-[#86868b] mb-1">描述（中文）</label><textarea value={s.desc} onChange={e => updateService(i, 'desc', e.target.value)} rows={2} className="admin-input resize-none w-full" /></div>
                    <div className="lg:col-span-2"><label className="block text-xs text-[#86868b] mb-1">描述（英文）</label><textarea value={s.descEn} onChange={e => updateService(i, 'descEn', e.target.value)} rows={2} className="admin-input resize-none w-full" /></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Solutions Tab */}
      {activeTab === 'solutions' && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl p-6 border border-[#d2d2d7]">
            <h3 className="font-semibold text-[#1d1d1f] mb-4">解决方案区块标题</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div><label className="block text-xs text-[#86868b] mb-1">标题（中文）</label><input value={form.solutionsTitle} onChange={e => update('solutionsTitle', e.target.value)} className="admin-input w-full" /></div>
              <div><label className="block text-xs text-[#86868b] mb-1">标题（英文）</label><input value={form.solutionsTitleEn} onChange={e => update('solutionsTitleEn', e.target.value)} className="admin-input w-full" /></div>
              <div className="lg:col-span-2"><label className="block text-xs text-[#86868b] mb-1">描述（中文）</label><textarea value={form.solutionsDesc} onChange={e => update('solutionsDesc', e.target.value)} rows={2} className="admin-input resize-none w-full" /></div>
              <div className="lg:col-span-2"><label className="block text-xs text-[#86868b] mb-1">描述（英文）</label><textarea value={form.solutionsDescEn} onChange={e => update('solutionsDescEn', e.target.value)} rows={2} className="admin-input resize-none w-full" /></div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 border border-[#d2d2d7]">
            <h3 className="font-semibold text-[#1d1d1f] mb-4">解决方案内容（共{form.solutionsItems.length}项）</h3>
            <div className="space-y-4">
              {form.solutionsItems.map((sol, i) => (
                <div key={i} className="border border-[#e8e8ed] rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[13px] font-semibold text-[#1d1d1f]">方案 {i + 1}</span>
                  </div>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                    <div><label className="block text-xs text-[#86868b] mb-1">名称（中文）</label><input value={sol.name} onChange={e => updateSolution(i, 'name', e.target.value)} className="admin-input w-full" /></div>
                    <div><label className="block text-xs text-[#86868b] mb-1">名称（英文）</label><input value={sol.nameEn} onChange={e => updateSolution(i, 'nameEn', e.target.value)} className="admin-input w-full" /></div>
                    <div className="lg:col-span-2"><label className="block text-xs text-[#86868b] mb-1">描述（中文）</label><textarea value={sol.desc} onChange={e => updateSolution(i, 'desc', e.target.value)} rows={2} className="admin-input resize-none w-full" /></div>
                    <div className="lg:col-span-2"><label className="block text-xs text-[#86868b] mb-1">描述（英文）</label><textarea value={sol.descEn} onChange={e => updateSolution(i, 'descEn', e.target.value)} rows={2} className="admin-input resize-none w-full" /></div>
                    <div className="lg:col-span-2"><label className="block text-xs text-[#86868b] mb-1">特点标签（中文，用逗号分隔）</label><input value={sol.features.join('，')} onChange={e => updateSolution(i, 'features', e.target.value.split(/[,，]/).map(s => s.trim()).filter(Boolean))} className="admin-input w-full" /></div>
                    <div className="lg:col-span-2"><label className="block text-xs text-[#86868b] mb-1">特点标签（英文，用逗号分隔）</label><input value={sol.featuresEn.join(', ')} onChange={e => updateSolution(i, 'featuresEn', e.target.value.split(',').map(s => s.trim()).filter(Boolean))} className="admin-input w-full" /></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Cases Tab */}
      {activeTab === 'cases' && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl p-6 border border-[#d2d2d7]">
            <h3 className="font-semibold text-[#1d1d1f] mb-4">案例区块标题</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div><label className="block text-xs text-[#86868b] mb-1">标题（中文）</label><input value={form.casesTitle} onChange={e => update('casesTitle', e.target.value)} className="admin-input w-full" /></div>
              <div><label className="block text-xs text-[#86868b] mb-1">标题（英文）</label><input value={form.casesTitleEn} onChange={e => update('casesTitleEn', e.target.value)} className="admin-input w-full" /></div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 border border-[#d2d2d7]">
            <h3 className="font-semibold text-[#1d1d1f] mb-4">案例内容（共{form.casesItems.length}项）</h3>
            <div className="space-y-4">
              {form.casesItems.map((c, i) => (
                <div key={i} className="border border-[#e8e8ed] rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[13px] font-semibold text-[#1d1d1f]">案例 {i + 1}</span>
                  </div>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                    <div><label className="block text-xs text-[#86868b] mb-1">名称（中文）</label><input value={c.name} onChange={e => updateCase(i, 'name', e.target.value)} className="admin-input w-full" /></div>
                    <div><label className="block text-xs text-[#86868b] mb-1">名称（英文）</label><input value={c.nameEn} onChange={e => updateCase(i, 'nameEn', e.target.value)} className="admin-input w-full" /></div>
                    <div><label className="block text-xs text-[#86868b] mb-1">标签（中文）</label><input value={c.tag} onChange={e => updateCase(i, 'tag', e.target.value)} className="admin-input w-full" /></div>
                    <div><label className="block text-xs text-[#86868b] mb-1">标签（英文）</label><input value={c.tagEn} onChange={e => updateCase(i, 'tagEn', e.target.value)} className="admin-input w-full" /></div>
                    <div className="lg:col-span-2"><label className="block text-xs text-[#86868b] mb-1">描述（中文）</label><textarea value={c.desc} onChange={e => updateCase(i, 'desc', e.target.value)} rows={2} className="admin-input resize-none w-full" /></div>
                    <div className="lg:col-span-2"><label className="block text-xs text-[#86868b] mb-1">描述（英文）</label><textarea value={c.descEn} onChange={e => updateCase(i, 'descEn', e.target.value)} rows={2} className="admin-input resize-none w-full" /></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* About Tab */}
      {activeTab === 'about' && (
        <div className="bg-white rounded-xl p-6 border border-[#d2d2d7] space-y-4">
          <h3 className="font-semibold text-[#1d1d1f] mb-4">公司介绍</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div><label className="block text-xs text-[#86868b] mb-1">标题（中文）</label><input value={form.aboutTitle} onChange={e => update('aboutTitle', e.target.value)} className="admin-input w-full" /></div>
            <div><label className="block text-xs text-[#86868b] mb-1">标题（英文）</label><input value={form.aboutTitleEn} onChange={e => update('aboutTitleEn', e.target.value)} className="admin-input w-full" /></div>
            <div className="lg:col-span-2"><label className="block text-xs text-[#86868b] mb-1">公司描述（中文）</label><textarea value={form.aboutDesc} onChange={e => update('aboutDesc', e.target.value)} rows={3} className="admin-input resize-none w-full" /></div>
            <div className="lg:col-span-2"><label className="block text-xs text-[#86868b] mb-1">公司描述（英文）</label><textarea value={form.aboutDescEn} onChange={e => update('aboutDescEn', e.target.value)} rows={3} className="admin-input resize-none w-full" /></div>
            <div><label className="block text-xs text-[#86868b] mb-1">使命（中文）</label><input value={form.aboutMission} onChange={e => update('aboutMission', e.target.value)} className="admin-input w-full" /></div>
            <div><label className="block text-xs text-[#86868b] mb-1">使命（英文）</label><input value={form.aboutMissionEn} onChange={e => update('aboutMissionEn', e.target.value)} className="admin-input w-full" /></div>
            <div><label className="block text-xs text-[#86868b] mb-1">愿景（中文）</label><input value={form.aboutVision} onChange={e => update('aboutVision', e.target.value)} className="admin-input w-full" /></div>
            <div><label className="block text-xs text-[#86868b] mb-1">愿景（英文）</label><input value={form.aboutVisionEn} onChange={e => update('aboutVisionEn', e.target.value)} className="admin-input w-full" /></div>
          </div>
        </div>
      )}

      {/* CTA Tab */}
      {activeTab === 'cta' && (
        <div className="bg-white rounded-xl p-6 border border-[#d2d2d7] space-y-4">
          <h3 className="font-semibold text-[#1d1d1f] mb-4">联系 CTA</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div><label className="block text-xs text-[#86868b] mb-1">标题（中文）</label><input value={form.ctaTitle} onChange={e => update('ctaTitle', e.target.value)} className="admin-input w-full" /></div>
            <div><label className="block text-xs text-[#86868b] mb-1">标题（英文）</label><input value={form.ctaTitleEn} onChange={e => update('ctaTitleEn', e.target.value)} className="admin-input w-full" /></div>
            <div className="lg:col-span-2"><label className="block text-xs text-[#86868b] mb-1">副标题（中文）</label><textarea value={form.ctaSubtitle} onChange={e => update('ctaSubtitle', e.target.value)} rows={2} className="admin-input resize-none w-full" /></div>
            <div className="lg:col-span-2"><label className="block text-xs text-[#86868b] mb-1">副标题（英文）</label><textarea value={form.ctaSubtitleEn} onChange={e => update('ctaSubtitleEn', e.target.value)} rows={2} className="admin-input resize-none w-full" /></div>
          </div>
        </div>
      )}

      {/* Images Tab */}
      {activeTab === 'images' && (
        <div className="bg-white rounded-xl p-6 border border-[#d2d2d7] space-y-6">
          <h3 className="font-semibold text-[#1d1d1f] mb-4">页面大图设置</h3>
          <p className="text-xs text-[#86868b]">支持上传图片或输入 URL（本地路径如 /images/xxx.jpg 或在线图片链接）。</p>
          {([
            { key: 'homeHeroImage' as const, label: '首页大图', desc: '首页全屏 Hero 背景图' },
            { key: 'aboutHeroImage' as const, label: '关于我们大图', desc: '关于页面顶部背景图' },
            { key: 'servicesHeroImage' as const, label: '服务页面大图', desc: '服务页面顶部背景图' },
            { key: 'solutionsHeroImage' as const, label: '解决方案大图', desc: '解决方案页面顶部背景图' },
            { key: 'contactHeroImage' as const, label: '联系我们大图', desc: '联系我们页面顶部背景图' },
            { key: 'teamHeroImage' as const, label: '团队页面大图', desc: '团队页面顶部背景图' },
          ] as const).map(({ key, label, desc }) => (
            <div key={key} className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start pb-5 border-b border-[#f0f0f0] last:border-0">
              <div className="lg:col-span-3">
                <p className="text-sm font-medium text-[#1d1d1f]">{label}</p>
                <p className="text-xs text-[#86868b] mt-1">{desc}</p>
              </div>
              <div className="lg:col-span-9">
                <div className="flex items-start gap-3">
                  <div className="flex-1">
                    <input
                      value={form[key]}
                      onChange={e => update(key, e.target.value)}
                      placeholder="/images/xxx.jpg 或 https://..."
                      className="admin-input w-full mb-3"
                    />
                    <div className="flex items-center gap-3">
                      <label className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#1d1d1f] text-white text-sm font-medium cursor-pointer hover:bg-black transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" x2="12" y1="3" y2="15"/></svg>
                        上传图片
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            const file = (e.target as HTMLInputElement).files?.[0];
                            if (file) {
                              const reader = new FileReader();
                              reader.onloadend = () => {
                                update(key, reader.result as string);
                              };
                              reader.readAsDataURL(file);
                            }
                          }}
                        />
                      </label>
                      {form[key] && (
                        <button
                          onClick={() => update(key, '')}
                          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-[#e8e8ed] text-sm font-medium text-[#86868b] hover:text-[#1d1d1f] hover:border-[#1d1d1f] transition-colors"
                        >
                          清除图片
                        </button>
                      )}
                    </div>
                  </div>
                </div>
                {form[key] && (
                  <div className="mt-4 relative aspect-video rounded-lg overflow-hidden ring-1 ring-[#e8e8ed] bg-[#fafafa]">
                    <img
                      src={form[key]}
                      alt={label}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                      }}
                    />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="bg-white rounded-xl p-6 border border-[#d2d2d7] mt-6">
        <h3 className="font-semibold text-[#1d1d1f] mb-4">使用说明</h3>
        <div className="text-sm text-[#86868b] space-y-2">
          <p>1. 上方 Tab 切换不同区块的内容编辑。</p>
          <p>2. 修改后点击右上角「保存」按钮即可生效。</p>
          <p>3. 所有修改保存在浏览器本地，换电脑会丢失，建议导出备份。</p>
          <p>4. 如需恢复默认值，点击右上角「重置」按钮。</p>
          <p>5. 页面大图支持直接上传图片（转为 Base64 存储），也可输入图片 URL。</p>
        </div>
      </div>
    </div>
  );
}
