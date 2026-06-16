import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CheckCircle, MapPin, Phone, Mail, Clock } from 'lucide-react';
import { useContentStore } from '@/contexts/ContentStoreContext';
import { useEditableContent } from '@/hooks/useEditableContent';

export default function Contact() {
  const { t, i18n } = useTranslation();
  const isZh = i18n.language === 'zh';
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', company: '', email: '', phone: '', requirement: '', message: '' });
  const { data } = useContentStore();
  const ec = useEditableContent();
  const settings = data.settings;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const reqOptions = t('contact.selectOptions.options', { returnObjects: true }) as string[];

  return (
    <div className="pt-[52px]">
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[400px] flex flex-col items-center justify-end pb-16 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={ec.contactHeroImage || '/images/product-gas.jpg'} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/30" />
        </div>
        <div className="relative z-10 text-center px-6">
          <h1 className="text-[36px] md:text-[48px] font-semibold tracking-[-1px] mb-2 text-white">
            {t('contact.title')}
          </h1>
          <p className="text-[15px] text-white/70 max-w-md mx-auto">
            {t('contact.description')}
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-16">
            {/* Form */}
            <div className="lg:col-span-7">
              {submitted ? (
                <div className="text-center py-16">
                  <div className="w-14 h-14 rounded-full bg-[#fafafa] flex items-center justify-center mx-auto mb-4 ring-1 ring-[#e8e8ed]">
                    <CheckCircle size={28} className="text-[#1d1d1f]" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-xl font-semibold text-[#1d1d1f] mb-2">{t('contact.success.title')}</h3>
                  <p className="text-[15px] text-[#86868b]">{t('contact.success.desc')}</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {[
                      { key: 'name', type: 'text', required: true },
                      { key: 'company', type: 'text', required: false },
                      { key: 'email', type: 'email', required: true },
                      { key: 'phone', type: 'tel', required: false },
                    ].map(({ key, type, required }) => (
                      <div key={key}>
                        <label className="block text-[12px] font-medium text-[#1d1d1f] mb-1.5">
                          {t(`contact.fields.${key}`)}{required && <span className="text-[#ff3b30]"> *</span>}
                        </label>
                        <input type={type} required={required}
                          placeholder={t(`contact.placeholders.${key}`)}
                          value={form[key as keyof typeof form]}
                          onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                          className="w-full bg-[#fafafa] border border-[#e8e8ed] rounded-xl px-4 py-3 text-[14px] text-[#1d1d1f] placeholder-[#c7c7cc] focus:outline-none focus:border-[#1d1d1f] focus:bg-white transition-all"
                        />
                      </div>
                    ))}
                  </div>

                  <div>
                    <label className="block text-[12px] font-medium text-[#1d1d1f] mb-1.5">
                      {t('contact.fields.requirement')}<span className="text-[#ff3b30]"> *</span>
                    </label>
                    <select required value={form.requirement}
                      onChange={(e) => setForm({ ...form, requirement: e.target.value })}
                      className="w-full bg-[#fafafa] border border-[#e8e8ed] rounded-xl px-4 py-3 text-[14px] text-[#1d1d1f] focus:outline-none focus:border-[#1d1d1f] focus:bg-white transition-all appearance-none"
                    >
                      <option value="">{t('contact.selectOptions.placeholder')}</option>
                      {reqOptions.map((opt: string) => <option key={opt} value={opt}>{opt}</option>)}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[12px] font-medium text-[#1d1d1f] mb-1.5">{t('contact.fields.message')}</label>
                    <textarea rows={5} placeholder={t('contact.placeholders.message')}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full bg-[#fafafa] border border-[#e8e8ed] rounded-xl px-4 py-3 text-[14px] text-[#1d1d1f] placeholder-[#c7c7cc] focus:outline-none focus:border-[#1d1d1f] focus:bg-white transition-all resize-none"
                    />
                  </div>

                  <button type="submit"
                    className="inline-flex items-center gap-2 bg-[#1d1d1f] text-white font-medium py-3.5 px-8 rounded-full hover:bg-black transition-colors text-[14px]">
                    {t('contact.submit')}
                  </button>
                </form>
              )}
            </div>

            {/* Contact Info */}
            <div className="lg:col-span-5">
              <div className="bg-[#fafafa] rounded-2xl p-6 md:p-8 space-y-6">
                <h3 className="text-[16px] font-semibold text-[#1d1d1f]">{isZh ? '联系方式' : 'Contact Information'}</h3>
                <div className="space-y-5">
                  {[
                    { icon: MapPin, label: isZh ? '地址' : 'Address', value: isZh ? settings.address : (settings.addressEn || settings.address) },
                    { icon: Phone, label: isZh ? '电话' : 'Phone', value: settings.phone },
                    { icon: Mail, label: isZh ? '邮箱' : 'Email', value: settings.email },
                    { icon: Clock, label: isZh ? '工作时间' : 'Business Hours', value: t('contact.info.hours') },
                  ].map(({ icon: Icon, label, value }) => (
                    <div key={label} className="flex items-start gap-4">
                      <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center shrink-0 ring-1 ring-[#e8e8ed]">
                        <Icon size={16} className="text-[#86868b]" />
                      </div>
                      <div>
                        <p className="text-[11px] font-medium text-[#86868b] uppercase tracking-wider mb-0.5">{label}</p>
                        <p className="text-[14px] text-[#1d1d1f]">{value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
