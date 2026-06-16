import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const isHome = location.pathname === '/';
  const isDark = isHome && !scrolled && !mobileOpen;

  const toggleLang = () => {
    i18n.changeLanguage(i18n.language === 'zh' ? 'en' : 'zh');
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const scrollToSection = (sectionId: string) => {
    setMobileOpen(false);
    if (isHome) {
      setTimeout(() => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
      }, 50);
    } else {
      navigate('/');
      setTimeout(() => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
      }, 300);
    }
  };

  const navItems = [
    { key: 'products', label: t('nav.products'), action: () => scrollToSection('products') },
    { key: 'services', label: t('nav.services'), action: () => scrollToSection('services') },
    { key: 'solutions', label: t('nav.solutions'), action: () => scrollToSection('solutions') },
    { key: 'about', label: t('nav.about'), action: () => scrollToSection('about') },
  ];

  return (
    <>
      {/* ─── Main Navbar: Logo left, Nav right ─── */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isDark
            ? 'bg-transparent'
            : 'bg-white/90 backdrop-blur-md border-b border-[#f0f0f0]'
        }`}
      >
        <div className="h-[52px] flex items-center justify-between px-5 md:px-8">
          {/* Left: Logo — white on dark bg, original on light bg */}
          <Link to="/" className="flex items-center shrink-0">
            <img
              src={isDark ? '/images/logo-white.png' : '/images/logo.png'}
              alt="SUS Environment"
              className="h-[28px] md:h-[32px] w-auto object-contain transition-opacity duration-500"
            />
          </Link>

          {/* Center/Right: Desktop nav links */}
          <div className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.key}
                onClick={item.action}
                className={`text-[13px] transition-colors bg-transparent border-0 cursor-pointer p-0 tracking-wide ${
                  isDark
                    ? 'text-white/80 hover:text-white'
                    : 'text-[#86868b] hover:text-[#1d1d1f]'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Right: Lang + Contact + Mobile menu */}
          <div className="flex items-center gap-4">
            <button
              onClick={toggleLang}
              className={`hidden md:block text-[12px] font-medium transition-colors bg-transparent border-0 cursor-pointer ${
                isDark ? 'text-white/80 hover:text-white' : 'text-[#86868b] hover:text-[#1d1d1f]'
              }`}
            >
              {i18n.language === 'zh' ? 'EN' : '中'}
            </button>
            <Link
              to="/contact"
              className={`text-[13px] font-medium px-5 py-1.5 rounded-full transition-colors ${
                isDark
                  ? 'bg-white/10 text-white backdrop-blur-sm border border-white/30 hover:bg-white/20'
                  : 'bg-[#1d1d1f] text-white hover:bg-black'
              }`}
            >
              {t('nav.contact')}
            </Link>
            <button
              className={`lg:hidden text-[13px] font-medium transition-colors bg-transparent border-0 cursor-pointer ${isDark ? 'text-white' : 'text-[#1d1d1f]'}`}
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </nav>

      {/* ─── Mobile Menu Overlay ─── */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[60] bg-white flex flex-col">
          <div className="h-[52px] flex items-center justify-between px-5">
            <Link to="/" onClick={() => setMobileOpen(false)}>
              <img src="/images/logo.png" alt="" className="h-[28px] w-auto object-contain" />
            </Link>
            <button className="text-[#1d1d1f]" onClick={() => setMobileOpen(false)}>
              <X size={20} />
            </button>
          </div>
          <div className="flex-1 flex flex-col px-8 pt-8 gap-2">
            {navItems.map((item) => (
              <button
                key={item.key}
                onClick={item.action}
                className="text-left text-[28px] font-medium text-[#1d1d1f] py-3 border-b border-[#f0f0f0] hover:text-[#86868b] transition-colors bg-transparent"
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => { navigate('/contact'); setMobileOpen(false); }}
              className="text-left text-[28px] font-medium text-[#1d1d1f] py-3 hover:text-[#86868b] transition-colors bg-transparent"
            >
              {t('nav.contact')}
            </button>
            <div className="mt-auto pb-8">
              <button
                onClick={() => { toggleLang(); setMobileOpen(false); }}
                className="text-[14px] text-[#86868b] font-medium px-4 py-2 rounded-full bg-[#fafafa] border-0"
              >
                {i18n.language === 'zh' ? 'Switch to English' : '切换到中文'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
