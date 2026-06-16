import { useState } from 'react';
import { useContentStore } from '@/hooks/useContentStore';
import { fetchContent, updateContent } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Save, RotateCcw, Check } from 'lucide-react';

export default function SettingsManager() {
  const { data, updateSettings } = useContentStore();
  const [form, setForm] = useState({
    ...data.settings,
  });
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    updateSettings(form);
    // Sync Hero fields to content API as well
    fetchContent().then((ec) => {
      updateContent({
        ...ec,
        heroTitle: form.heroTitle || ec.heroTitle,
        heroTitleEn: form.heroTitleEn || ec.heroTitleEn,
        heroSubtitle: form.heroSubtitle || ec.heroSubtitle,
        heroSubtitleEn: form.heroSubtitleEn || ec.heroSubtitleEn,
      });
    }).catch(() => {});
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleReset = () => {
    setForm(data.settings);
  };

  const update = (key: string, value: string) => {
    setForm(prev => ({ ...prev, [key]: value }));
  };

  const fields = [
    { section: '公司信息', items: [
      { key: 'companyName', label: '公司名称（中文）', placeholder: '上海康恒环境科技有限公司' },
      { key: 'companyNameEn', label: '公司名称（英文）', placeholder: 'Shanghai Kangheng Environmental Technology Co., Ltd.' },
      { key: 'address', label: '地址（中文）', placeholder: '上海市青浦区华新镇华隆路1788号' },
      { key: 'addressEn', label: '地址（英文）', placeholder: 'No. 1788 Hualong Rd, Qingpu, Shanghai' },
      { key: 'phone', label: '电话', placeholder: '+86 21 6921 xxxx' },
      { key: 'email', label: '邮箱', placeholder: 'info@shkhenv.com' },
    ]},
    { section: '首页标题', items: [
      { key: 'heroTitle', label: '主标题（中文）', placeholder: '固废处理全产业链服务商' },
      { key: 'heroTitleEn', label: '主标题（英文）', placeholder: 'Full-Chain Solid Waste Solutions' },
      { key: 'heroSubtitle', label: '副标题（中文）', placeholder: '核心设备研发制造 · EPC工程建设...' },
      { key: 'heroSubtitleEn', label: '副标题（英文）', placeholder: 'Equipment R&D · EPC · Operation...' },
    ]},
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">网站设置</h2>
        <div className="flex items-center gap-3">
          {saved && (
            <span className="text-sm text-emerald-600 flex items-center gap-1">
              <Check size={16} /> 已保存
            </span>
          )}
          <Button variant="outline" onClick={handleReset}>
            <RotateCcw size={16} className="mr-1" /> 重置
          </Button>
          <Button onClick={handleSave}>
            <Save size={16} className="mr-1" /> 保存设置
          </Button>
        </div>
      </div>

      {fields.map((group) => (
        <Card key={group.section}>
          <CardHeader>
            <CardTitle className="text-lg">{group.section}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {group.items.map((field, i) => (
              <div key={field.key}>
                {i > 0 && <Separator className="mb-4" />}
                <Label htmlFor={field.key} className="text-sm font-medium mb-2 block">
                  {field.label}
                </Label>
                <Input
                  id={field.key}
                  value={form[field.key as keyof typeof form] || ''}
                  onChange={(e) => update(field.key, e.target.value)}
                  placeholder={field.placeholder}
                  className="max-w-xl"
                />
              </div>
            ))}
          </CardContent>
        </Card>
      ))}

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">当前数据预览</CardTitle>
        </CardHeader>
        <CardContent>
          <pre className="bg-gray-50 rounded-lg p-4 text-xs overflow-auto max-h-60">
            {JSON.stringify(form, null, 2)}
          </pre>
        </CardContent>
      </Card>
    </div>
  );
}
