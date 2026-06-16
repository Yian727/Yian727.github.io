import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-white py-5 px-6 border-t border-[#f0f0f0]">
      <div className="max-w-5xl mx-auto flex flex-wrap items-center justify-center gap-x-5 gap-y-1 text-[11px] text-[#86868b]">
        <span className="text-[#1d1d1f] font-medium">SUS © 2025</span>
        <Link to="/" className="hover:text-[#1d1d1f] transition-colors">{t('nav.products')}</Link>
        <Link to="/services" className="hover:text-[#1d1d1f] transition-colors">{t('nav.services')}</Link>
        <Link to="/solutions" className="hover:text-[#1d1d1f] transition-colors">{t('nav.solutions')}</Link>
        <Link to="/about" className="hover:text-[#1d1d1f] transition-colors">{t('nav.about')}</Link>
        <Link to="/contact" className="hover:text-[#1d1d1f] transition-colors">{t('nav.contact')}</Link>
        {/* Admin link intentionally hidden from public footer */}
      </div>
    </footer>
  );
}
