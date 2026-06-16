import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { X, CheckCircle } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactModal({ isOpen, onClose }: Props) {
  const { t } = useTranslation();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', company: '', email: '', phone: '', requirement: '', message: '' });

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setSubmitted(false);
    } else {
      document.body.style.overflow = '';
    }
  }, [isOpen]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const reqOptions = t('contact.selectOptions.options', { returnObjects: true }) as string[];

  return (
    <div 
      style={{ position: 'fixed', inset: 0, zIndex: 99999 }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      {/* Dark backdrop */}
      <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)' }} />
      
      {/* Right panel */}
      <div 
        style={{ 
          position: 'absolute', 
          top: 0, 
          right: 0, 
          width: '100%', 
          maxWidth: '560px', 
          height: '100%', 
          backgroundColor: '#fff',
          boxShadow: '-10px 0 40px rgba(0,0,0,0.2)',
          overflowY: 'auto',
          animation: 'slideIn 0.3s ease forwards',
        }}
      >
        <div style={{ padding: '40px 32px' }}>
          {/* Close button */}
          <button 
            onClick={onClose}
            style={{ position: 'absolute', top: 20, right: 20, width: 40, height: 40, borderRadius: '50%', border: 'none', backgroundColor: '#f5f5f7', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <X size={20} />
          </button>

          <h2 style={{ fontSize: 28, fontWeight: 600, color: '#1d1d1f', marginBottom: 8, marginTop: 8 }}>{t('contact.title')}</h2>
          <p style={{ fontSize: 15, color: '#86868b', marginBottom: 40 }}>{t('contact.description')}</p>

          {submitted ? (
            <div style={{ textAlign: 'center', padding: '60px 0' }}>
              <div style={{ width: 64, height: 64, borderRadius: '50%', backgroundColor: '#ecfdf5', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                <CheckCircle size={32} style={{ color: '#10b981' }} />
              </div>
              <h3 style={{ fontSize: 20, fontWeight: 500, color: '#1d1d1f', marginBottom: 8 }}>{t('contact.success.title')}</h3>
              <p style={{ fontSize: 15, color: '#86868b' }}>{t('contact.success.desc')}</p>
              <button onClick={onClose} style={{ marginTop: 24, padding: '12px 32px', borderRadius: 100, border: '1px solid #d2d2d7', background: 'transparent', fontSize: 14, cursor: 'pointer' }}>
                关闭
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              {[
                { key: 'name', type: 'text', required: true },
                { key: 'company', type: 'text', required: false },
                { key: 'email', type: 'email', required: true },
                { key: 'phone', type: 'tel', required: false },
              ].map(({ key, type, required }) => (
                <div key={key} style={{ marginBottom: 20 }}>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: '#1d1d1f', marginBottom: 6 }}>
                    {t(`contact.fields.${key}`)}{required && <span style={{ color: '#ff3b30' }}> *</span>}
                  </label>
                  <input
                    type={type}
                    required={required}
                    placeholder={t(`contact.placeholders.${key}`)}
                    value={form[key as keyof typeof form]}
                    onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                    style={{ width: '100%', padding: '12px 16px', borderRadius: 12, border: '1px solid #d2d2d7', fontSize: 15, outline: 'none', boxSizing: 'border-box' }}
                  />
                </div>
              ))}

              <div style={{ marginBottom: 20 }}>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: '#1d1d1f', marginBottom: 6 }}>
                  {t('contact.fields.requirement')}<span style={{ color: '#ff3b30' }}> *</span>
                </label>
                <select
                  required
                  value={form.requirement}
                  onChange={(e) => setForm({ ...form, requirement: e.target.value })}
                  style={{ width: '100%', padding: '12px 16px', borderRadius: 12, border: '1px solid #d2d2d7', fontSize: 15, outline: 'none', boxSizing: 'border-box', appearance: 'none', backgroundColor: '#fff' }}
                >
                  <option value="">{t('contact.selectOptions.placeholder')}</option>
                  {reqOptions.map((opt: string) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>

              <div style={{ marginBottom: 20 }}>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: '#1d1d1f', marginBottom: 6 }}>
                  {t('contact.fields.message')}
                </label>
                <textarea
                  rows={4}
                  placeholder={t('contact.placeholders.message')}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  style={{ width: '100%', padding: '12px 16px', borderRadius: 12, border: '1px solid #d2d2d7', fontSize: 15, outline: 'none', boxSizing: 'border-box', resize: 'none' }}
                />
              </div>

              <button 
                type="submit" 
                style={{ width: '100%', padding: '16px', borderRadius: 12, border: 'none', backgroundColor: '#1d1d1f', color: '#fff', fontSize: 15, fontWeight: 500, cursor: 'pointer' }}
              >
                {t('contact.submit')}
              </button>
            </form>
          )}
        </div>
      </div>

      <style>{`@keyframes slideIn { from { transform: translateX(100%); } to { transform: translateX(0); } }`}</style>
    </div>
  );
}
