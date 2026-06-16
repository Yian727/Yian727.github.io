import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Package, Users, Settings, Download, Upload, RotateCcw,
  ChevronLeft, Plus, Trash2, Edit2, Save, X, Eye, FileText, Info
} from 'lucide-react';
import { useContentStore } from '@/contexts/ContentStoreContext';
import type { Product, TeamMember } from '@/hooks/useContentStore';
import ImageUploader from '@/components/ImageUploader';
import RichTextEditor from '@/components/admin/RichTextEditor';
import SettingsManager from '@/components/admin/SettingsManager';
import ContentManager from '@/components/admin/ContentManager';
import { fetchAbout, updateAbout } from '@/lib/api';

function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

/* ═══════════════════════════════════════════
   Admin Layout
   ═══════════════════════════════════════════ */
export default function Admin() {
  const [tab, setTab] = useState<'products' | 'team' | 'about' | 'content' | 'settings'>('products');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const store = useContentStore();
  const fileRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const tabs = [
    { key: 'products' as const, label: '产品管理', icon: Package },
    { key: 'team' as const, label: '团队管理', icon: Users },
    { key: 'about' as const, label: '关于我们', icon: Info },
    { key: 'content' as const, label: '页面内容', icon: FileText },
    { key: 'settings' as const, label: '网站设置', icon: Settings },
  ];

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const ok = store.importJSON(ev.target?.result as string);
      alert(ok ? '导入成功' : '导入失败，文件格式不正确');
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  return (
    <div className="min-h-screen bg-[#f5f5f7] flex">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'w-64' : 'w-16'} bg-[#1d1d1f] text-white transition-all flex flex-col shrink-0`}>
        <div className="h-14 flex items-center px-4 border-b border-white/10">
          {sidebarOpen && <span className="font-semibold text-sm">管理后台</span>}
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="ml-auto text-white/60 hover:text-white">
            <ChevronLeft size={18} className={`transition-transform ${!sidebarOpen && 'rotate-180'}`} />
          </button>
        </div>

        <nav className="flex-1 py-4">
          {tabs.map(t => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`w-full flex items-center gap-3 px-4 py-3 text-sm transition-colors ${
                tab === t.key ? 'bg-white/10 text-white' : 'text-white/50 hover:text-white hover:bg-white/5'
              }`}
            >
              <t.icon size={18} />
              {sidebarOpen && <span>{t.label}</span>}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-white/10 space-y-2">
          <button onClick={store.exportJSON} className="w-full flex items-center gap-2 px-3 py-2 text-xs text-white/60 hover:text-white hover:bg-white/5 rounded transition-colors">
            <Download size={14} />
            {sidebarOpen && <span>导出备份</span>}
          </button>
          <button onClick={() => fileRef.current?.click()} className="w-full flex items-center gap-2 px-3 py-2 text-xs text-white/60 hover:text-white hover:bg-white/5 rounded transition-colors">
            <Upload size={14} />
            {sidebarOpen && <span>导入恢复</span>}
          </button>
          <input ref={fileRef} type="file" accept=".json" onChange={handleImport} className="hidden" />
          <button onClick={() => { if (confirm('确定重置为默认数据？')) store.resetToDefault(); }} className="w-full flex items-center gap-2 px-3 py-2 text-xs text-white/60 hover:text-white hover:bg-white/5 rounded transition-colors">
            <RotateCcw size={14} />
            {sidebarOpen && <span>重置默认</span>}
          </button>
          <button onClick={() => navigate('/')} className="w-full flex items-center gap-2 px-3 py-2 text-xs text-white/60 hover:text-white hover:bg-white/5 rounded transition-colors mt-4 pt-4 border-t border-white/10">
            <Eye size={14} />
            {sidebarOpen && <span>查看网站</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="p-8">
          {tab === 'products' && <ProductManager products={store.data.products} onUpdate={store.updateProducts} />}
          {tab === 'team' && <TeamManager team={store.data.team} onUpdate={store.updateTeam} />}
          {tab === 'about' && <AboutManager />}
          {tab === 'content' && <ContentManager />}
          {tab === 'settings' && <SettingsManager />}
        </div>
      </main>
    </div>
  );
}

/* ═══════════════════════════════════════════
   Product Manager
   ═══════════════════════════════════════════ */
function ProductManager({ products, onUpdate }: { products: Product[]; onUpdate: (p: Product[]) => void }) {
  const [editing, setEditing] = useState<Product | null>(null);
  const [isAdding, setIsAdding] = useState(false);

  const emptyProduct: Product = {
    id: '', name: '', nameEn: '', shortDesc: '', shortDescEn: '',
    specs: ['', '', ''], specsEn: ['', '', ''], image: '', detail: '', detailEn: ''
  };

  const handleSave = (p: Product) => {
    if (!p.name || !p.image) { alert('请填写产品名称和图片'); return; }
    if (isAdding) {
      onUpdate([...products, { ...p, id: generateId() }]);
      setIsAdding(false);
    } else {
      onUpdate(products.map(x => x.id === p.id ? p : x));
      setEditing(null);
    }
  };

  const handleDelete = (id: string) => {
    if (confirm('确定删除此产品？')) onUpdate(products.filter(p => p.id !== id));
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-[#1d1d1f]">产品管理 <span className="text-sm text-[#86868b] font-normal">({products.length})</span></h2>
        <button onClick={() => { setIsAdding(true); setEditing({ ...emptyProduct, id: generateId() }); }} className="btn-primary !text-sm !py-2.5 !px-5">
          <Plus size={16} /> 添加产品
        </button>
      </div>

      {(editing || isAdding) && (
        <ProductForm product={editing || emptyProduct} onSave={handleSave} onCancel={() => { setEditing(null); setIsAdding(false); }} />
      )}

      <div className="grid gap-4">
        {products.map(p => (
          <div key={p.id} className="bg-white rounded-xl p-5 flex gap-5 items-start">
            <img src={p.image} alt={p.name} className="w-24 h-24 rounded-lg object-cover bg-[#f5f5f7] shrink-0" />
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-[#1d1d1f]">{p.name}</h3>
              <p className="text-sm text-[#86868b] mt-1">{p.shortDesc}</p>
              <div className="flex flex-wrap gap-2 mt-2">
                {p.specs.filter(Boolean).map((s, i) => (
                  <span key={i} className="text-xs bg-[#f5f5f7] px-2 py-1 rounded">{s}</span>
                ))}
              </div>
            </div>
            <div className="flex gap-2 shrink-0">
              <button onClick={() => { setEditing(p); setIsAdding(false); }} className="p-2 text-[#86868b] hover:text-[#1d1d1f] transition-colors"><Edit2 size={16} /></button>
              <button onClick={() => handleDelete(p.id)} className="p-2 text-[#86868b] hover:text-red-500 transition-colors"><Trash2 size={16} /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProductForm({ product, onSave, onCancel }: { product: Product; onSave: (p: Product) => void; onCancel: () => void }) {
  const [form, setForm] = useState<Product>({ ...product });

  const updateSpec = (index: number, value: string, lang: 'zh' | 'en') => {
    if (lang === 'zh') {
      const specs = [...form.specs];
      specs[index] = value;
      setForm({ ...form, specs });
    } else {
      const specsEn = [...form.specsEn];
      specsEn[index] = value;
      setForm({ ...form, specsEn });
    }
  };

  return (
    <div className="bg-white rounded-xl p-6 mb-6 border border-[#d2d2d7]">
      <h3 className="font-semibold mb-4">{form.id ? '编辑产品' : '添加产品'}</h3>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs text-[#86868b] mb-1">产品名称（中文）*</label>
          <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="admin-input" placeholder="如：机械炉排焚烧炉" />
        </div>
        <div>
          <label className="block text-xs text-[#86868b] mb-1">产品名称（英文）</label>
          <input value={form.nameEn} onChange={e => setForm({ ...form, nameEn: e.target.value })} className="admin-input" placeholder="English name" />
        </div>
        <div className="lg:col-span-2">
          <label className="block text-xs text-[#86868b] mb-1">简短描述（中文）</label>
          <input value={form.shortDesc} onChange={e => setForm({ ...form, shortDesc: e.target.value })} className="admin-input" placeholder="一句话描述产品特点" />
        </div>
        <div className="lg:col-span-2">
          <label className="block text-xs text-[#86868b] mb-1">简短描述（英文）</label>
          <input value={form.shortDescEn} onChange={e => setForm({ ...form, shortDescEn: e.target.value })} className="admin-input" placeholder="Short description" />
        </div>
        <div className="lg:col-span-2">
          <ImageUploader
            value={form.image}
            onChange={(url) => setForm({ ...form, image: url })}
            label="产品图片 *"
          />
        </div>

        <div className="lg:col-span-2">
          <label className="block text-xs text-[#86868b] mb-1">技术规格（中文，3条）</label>
          <div className="space-y-2">
            {[0, 1, 2].map(i => (
              <input key={i} value={form.specs[i] || ''} onChange={e => updateSpec(i, e.target.value, 'zh')} className="admin-input" placeholder={`规格 ${i + 1}`} />
            ))}
          </div>
        </div>
        <div className="lg:col-span-2">
          <label className="block text-xs text-[#86868b] mb-1">技术规格（英文，3条）</label>
          <div className="space-y-2">
            {[0, 1, 2].map(i => (
              <input key={i} value={form.specsEn[i] || ''} onChange={e => updateSpec(i, e.target.value, 'en')} className="admin-input" placeholder={`Spec ${i + 1}`} />
            ))}
          </div>
        </div>

        <div className="lg:col-span-2">
          <label className="block text-xs text-[#86868b] mb-1">详细介绍（中文）- 支持富文本和图片</label>
          <RichTextEditor
            content={form.detail}
            onChange={(html) => setForm({ ...form, detail: html })}
            placeholder="产品的详细介绍、应用场景、技术参数等...可插入图片"
          />
        </div>
        <div className="lg:col-span-2">
          <label className="block text-xs text-[#86868b] mb-1">详细介绍（英文）</label>
          <RichTextEditor
            content={form.detailEn}
            onChange={(html) => setForm({ ...form, detailEn: html })}
            placeholder="Detailed product description..."
          />
        </div>
      </div>
      <div className="flex gap-3 mt-5">
        <button onClick={() => onSave(form)} className="btn-primary !text-sm !py-2.5"><Save size={14} /> 保存</button>
        <button onClick={onCancel} className="btn-secondary !text-sm !py-2.5"><X size={14} /> 取消</button>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   Team Manager
   ═══════════════════════════════════════════ */
function TeamManager({ team, onUpdate }: { team: TeamMember[]; onUpdate: (t: TeamMember[]) => void }) {
  const [editing, setEditing] = useState<TeamMember | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const empty: TeamMember = { id: '', name: '', nameEn: '', role: '', roleEn: '', bio: '', bioEn: '', image: '' };

  const handleSave = (m: TeamMember) => {
    if (!m.name || !m.image) { alert('请填写姓名和照片'); return; }
    if (isAdding) { onUpdate([...team, { ...m, id: generateId() }]); setIsAdding(false); }
    else { onUpdate(team.map(x => x.id === m.id ? m : x)); setEditing(null); }
  };
  const handleDelete = (id: string) => { if (confirm('确定删除？')) onUpdate(team.filter(m => m.id !== id)); };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-[#1d1d1f]">团队管理 <span className="text-sm text-[#86868b] font-normal">({team.length})</span></h2>
        <button onClick={() => { setIsAdding(true); setEditing({ ...empty, id: generateId() }); }} className="btn-primary !text-sm !py-2.5 !px-5"><Plus size={16} /> 添加成员</button>
      </div>

      {(editing || isAdding) && (
        <div className="bg-white rounded-xl p-6 mb-6 border border-[#d2d2d7]">
          <h3 className="font-semibold mb-4">{isAdding ? '添加成员' : '编辑成员'}</h3>
          <TeamForm item={editing || empty} onChange={setEditing} />
          <div className="flex gap-3 mt-5">
            <button onClick={() => editing && handleSave(editing)} className="btn-primary !text-sm !py-2.5"><Save size={14} /> 保存</button>
            <button onClick={() => { setEditing(null); setIsAdding(false); }} className="btn-secondary !text-sm !py-2.5"><X size={14} /> 取消</button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {team.map(m => (
          <div key={m.id} className="bg-white rounded-xl p-5 flex gap-4 items-start">
            <img src={m.image} alt={m.name} className="w-16 h-16 rounded-full object-cover bg-[#f5f5f7] shrink-0" />
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-[#1d1d1f]">{m.name}</h3>
              <p className="text-xs text-[#0066cc]">{m.role}</p>
              <p className="text-xs text-[#86868b] mt-1 line-clamp-2">{m.bio}</p>
            </div>
            <div className="flex gap-1 shrink-0">
              <button onClick={() => { setEditing(m); setIsAdding(false); }} className="p-1.5 text-[#86868b] hover:text-[#1d1d1f]"><Edit2 size={14} /></button>
              <button onClick={() => handleDelete(m.id)} className="p-1.5 text-[#86868b] hover:text-red-500"><Trash2 size={14} /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function TeamForm({ item, onChange }: { item: TeamMember; onChange: (m: TeamMember) => void }) {
  const set = (k: keyof TeamMember, v: string) => onChange({ ...item, [k]: v });
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <div><label className="block text-xs text-[#86868b] mb-1">姓名（中文）*</label><input value={item.name} onChange={e => set('name', e.target.value)} className="admin-input" /></div>
      <div><label className="block text-xs text-[#86868b] mb-1">姓名（英文）</label><input value={item.nameEn} onChange={e => set('nameEn', e.target.value)} className="admin-input" /></div>
      <div><label className="block text-xs text-[#86868b] mb-1">职位（中文）</label><input value={item.role} onChange={e => set('role', e.target.value)} className="admin-input" /></div>
      <div><label className="block text-xs text-[#86868b] mb-1">职位（英文）</label><input value={item.roleEn} onChange={e => set('roleEn', e.target.value)} className="admin-input" /></div>
      <div className="lg:col-span-2">
        <ImageUploader
          value={item.image}
          onChange={(url) => set('image', url)}
          label="头像照片 *"
        />
      </div>
      <div className="lg:col-span-2"><label className="block text-xs text-[#86868b] mb-1">简介（中文）</label><textarea value={item.bio} onChange={e => set('bio', e.target.value)} rows={2} className="admin-input resize-none" /></div>
      <div className="lg:col-span-2"><label className="block text-xs text-[#86868b] mb-1">简介（英文）</label><textarea value={item.bioEn} onChange={e => set('bioEn', e.target.value)} rows={2} className="admin-input resize-none" /></div>
      <div className="lg:col-span-2">
        <label className="block text-xs text-[#86868b] mb-1">详细介绍（中文）- 支持富文本和图片</label>
        <RichTextEditor
          content={item.detailedBio || ''}
          onChange={(html) => set('detailedBio', html)}
          placeholder="详细介绍该成员的背景、经历、成就等...可插入图片"
        />
      </div>
      <div className="lg:col-span-2">
        <label className="block text-xs text-[#86868b] mb-1">详细介绍（英文）</label>
        <RichTextEditor
          content={item.detailedBioEn || ''}
          onChange={(html) => set('detailedBioEn', html)}
          placeholder="Detailed introduction of the member..."
        />
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   About Manager
   ═══════════════════════════════════════════ */
function AboutManager() {
  const [about, setAbout] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchAbout().then(data => {
      setAbout(data);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  const handleSave = async () => {
    if (!about) return;
    setSaving(true);
    try {
      await updateAbout(about);
      alert('保存成功');
    } catch {
      alert('保存失败');
    } finally {
      setSaving(false);
    }
  };

  const updateField = (key: string, value: any) => {
    setAbout((prev: any) => ({ ...prev, [key]: value }));
  };

  if (loading) {
    return <div className="text-center py-20 text-[#86868b]">加载中...</div>;
  }

  if (!about) {
    return <div className="text-center py-20 text-[#86868b]">加载失败</div>;
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-[#1d1d1f]">关于我们管理</h2>
        <button onClick={handleSave} disabled={saving} className="btn-primary !text-sm !py-2.5 !px-5 disabled:opacity-50">
          <Save size={14} /> {saving ? '保存中...' : '保存'}
        </button>
      </div>

      <div className="space-y-6">
        {/* Basic Info */}
        <div className="bg-white rounded-xl p-6 border border-[#d2d2d7]">
          <h3 className="font-semibold mb-4">基本信息</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-[#86868b] mb-1">公司标题（中文）</label>
              <input value={about.title} onChange={e => updateField('title', e.target.value)} className="admin-input" />
            </div>
            <div>
              <label className="block text-xs text-[#86868b] mb-1">公司标题（英文）</label>
              <input value={about.titleEn} onChange={e => updateField('titleEn', e.target.value)} className="admin-input" />
            </div>
            <div className="lg:col-span-2">
              <label className="block text-xs text-[#86868b] mb-1">使命（中文）</label>
              <input value={about.mission} onChange={e => updateField('mission', e.target.value)} className="admin-input" />
            </div>
            <div className="lg:col-span-2">
              <label className="block text-xs text-[#86868b] mb-1">使命（英文）</label>
              <input value={about.missionEn} onChange={e => updateField('missionEn', e.target.value)} className="admin-input" />
            </div>
            <div className="lg:col-span-2">
              <label className="block text-xs text-[#86868b] mb-1">愿景（中文）</label>
              <input value={about.vision} onChange={e => updateField('vision', e.target.value)} className="admin-input" />
            </div>
            <div className="lg:col-span-2">
              <label className="block text-xs text-[#86868b] mb-1">愿景（英文）</label>
              <input value={about.visionEn} onChange={e => updateField('visionEn', e.target.value)} className="admin-input" />
            </div>
            <div className="lg:col-span-2">
              <label className="block text-xs text-[#86868b] mb-1">公司简介（中文）- 支持富文本</label>
              <RichTextEditor
                content={about.description}
                onChange={(html) => updateField('description', html)}
                placeholder="公司的详细介绍...可插入图片"
              />
            </div>
            <div className="lg:col-span-2">
              <label className="block text-xs text-[#86868b] mb-1">公司简介（英文）</label>
              <RichTextEditor
                content={about.descriptionEn}
                onChange={(html) => updateField('descriptionEn', html)}
                placeholder="Company description..."
              />
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="bg-white rounded-xl p-6 border border-[#d2d2d7]">
          <h3 className="font-semibold mb-4">发展历程</h3>
          <div className="space-y-4">
            {about.timeline?.map((item: any, index: number) => (
              <div key={index} className="flex gap-4 items-start">
                <div className="w-24 shrink-0">
                  <input value={item.year} onChange={e => {
                    const timeline = [...about.timeline];
                    timeline[index].year = e.target.value;
                    updateField('timeline', timeline);
                  }} className="admin-input" placeholder="年份" />
                </div>
                <div className="flex-1">
                  <input value={item.title} onChange={e => {
                    const timeline = [...about.timeline];
                    timeline[index].title = e.target.value;
                    updateField('timeline', timeline);
                  }} className="admin-input" placeholder="标题" />
                </div>
                <div className="flex-1">
                  <input value={item.desc} onChange={e => {
                    const timeline = [...about.timeline];
                    timeline[index].desc = e.target.value;
                    updateField('timeline', timeline);
                  }} className="admin-input" placeholder="描述" />
                </div>
                <button
                  onClick={() => {
                    const timeline = about.timeline.filter((_: any, i: number) => i !== index);
                    updateField('timeline', timeline);
                  }}
                  className="p-2 text-red-500 hover:text-red-700 shrink-0"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
            <button
              onClick={() => {
                const timeline = [...about.timeline, { year: '', title: '', desc: '' }];
                updateField('timeline', timeline);
              }}
              className="btn-secondary !text-sm !py-2"
            >
              <Plus size={14} /> 添加里程碑
            </button>
          </div>
        </div>

        {/* SUS Technology */}
        <div className="bg-white rounded-xl p-6 border border-[#d2d2d7]">
          <h3 className="font-semibold mb-4">SUS 技术</h3>
          <div className="space-y-4 mb-6">
            <div>
              <label className="block text-xs text-[#86868b] mb-1">技术标题（中文）</label>
              <input value={about.sus?.title} onChange={e => updateField('sus', { ...about.sus, title: e.target.value })} className="admin-input" />
            </div>
            <div>
              <label className="block text-xs text-[#86868b] mb-1">技术副标题</label>
              <input value={about.sus?.subtitle} onChange={e => updateField('sus', { ...about.sus, subtitle: e.target.value })} className="admin-input" />
            </div>
          </div>
        </div>

        {/* Awards */}
        <div className="bg-white rounded-xl p-6 border border-[#d2d2d7]">
          <h3 className="font-semibold mb-4">荣誉奖项</h3>
          <div className="space-y-2">
            {about.awards?.map((award: string, index: number) => (
              <div key={index} className="flex gap-2">
                <input
                  value={award}
                  onChange={e => {
                    const awards = [...about.awards];
                    awards[index] = e.target.value;
                    updateField('awards', awards);
                  }}
                  className="admin-input flex-1"
                />
                <button
                  onClick={() => {
                    const awards = about.awards.filter((_: any, i: number) => i !== index);
                    updateField('awards', awards);
                  }}
                  className="p-2 text-red-500 hover:text-red-700"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
            <button
              onClick={() => updateField('awards', [...about.awards, '新奖项'])}
              className="btn-secondary !text-sm !py-2"
            >
              <Plus size={14} /> 添加奖项
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}


