import { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useContentStore } from '@/contexts/ContentStoreContext';
import { useEditableContent } from '@/hooks/useEditableContent';
import type { Product } from '@/hooks/useContentStore';
import { Factory, HardHat, Settings2, Cpu, Lightbulb, GraduationCap, Headphones, Package, ArrowRight, Flame, Droplets, Gauge, Leaf, Wind, Recycle, Zap, Shield, ChevronLeft, ChevronRight } from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';

/* ═══════════════════════════════════════════
   Full-screen Hero Section (Tesla-style)
   ═══════════════════════════════════════════ */
function HeroSection({ onScrollDown }: { onScrollDown: () => void }) {
  const { i18n } = useTranslation();
  const isZh = i18n.language === 'zh';

  const ec = useEditableContent();
  const heroTitle = ec.heroTitle;
  const heroTitleEn = ec.heroTitleEn;
  const heroSubtitle = ec.heroSubtitle;
  const heroSubtitleEn = ec.heroSubtitleEn;

  return (
    <section className="relative h-screen w-full flex flex-col items-center justify-end pb-28 md:pb-32 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img src={ec.homeHeroImage || '/images/hero-full.jpg'} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/[0.15] via-transparent to-transparent" />
      </div>

      <div className="relative z-10 text-center px-6 max-w-2xl">
        <h2 className="text-[36px] md:text-[48px] lg:text-[56px] font-semibold tracking-[-1px] mb-2 text-white leading-tight">
          {isZh ? heroTitle : heroTitleEn}
        </h2>
        <p className="text-[15px] md:text-[16px] text-white/75 mb-8 leading-relaxed">
          {isZh ? heroSubtitle : heroSubtitleEn}
        </p>
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <Link to="/contact"
            className="min-w-[140px] text-[14px] font-medium px-8 py-2.5 rounded-full bg-white text-[#1d1d1f] hover:bg-white/90 transition-colors">
            {isZh ? '联系我们' : 'Contact Us'}
          </Link>
          <button onClick={onScrollDown}
            className="min-w-[140px] text-[14px] font-medium px-8 py-2.5 rounded-full bg-white/10 text-white backdrop-blur-sm border border-white/30 hover:bg-white/20 transition-colors">
            {isZh ? '了解产品' : 'Our Products'}
          </button>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   Section Label
   ═══════════════════════════════════════════ */
function SectionLabel({ text }: { text: string }) {
  return <p className="text-[11px] font-semibold text-[#86868b] uppercase tracking-[0.2em] mb-4">{text}</p>;
}

/* ═══════════════════════════════════════════
   Section Wrapper
   ═══════════════════════════════════════════ */
function Section({ id, children, className = '' }: { id?: string; children: React.ReactNode; className?: string }) {
  return (
    <section id={id} className={`py-20 md:py-28 ${className}`}>
      <div className="max-w-5xl mx-auto px-6">{children}</div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   Product Carousel (Bilibili-style)
   ═══════════════════════════════════════════ */
function ProductCarousel({ products, productImages }: { products: Product[]; productImages: string[] }) {
  const { i18n } = useTranslation();
  const isZh = i18n.language === 'zh';
  const [currentIndex, setCurrentIndex] = useState(0);

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, duration: 30 },
    [Autoplay({ delay: 4000, stopOnInteraction: false, stopOnMouseEnter: true })]
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCurrentIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    return () => { emblaApi.off('select', onSelect); };
  }, [emblaApi, onSelect]);

  const scrollTo = useCallback((index: number) => {
    emblaApi?.scrollTo(index);
  }, [emblaApi]);

  const scrollPrev = useCallback(() => {
    emblaApi?.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    emblaApi?.scrollNext();
  }, [emblaApi]);

  if (products.length === 0) {
    return (
      <div className="text-center text-[#86868b] py-20 bg-[#fafafa] rounded-2xl">
        {isZh ? '暂无产品，请前往后台管理添加' : 'No products yet. Please add from admin.'}
      </div>
    );
  }

  return (
    <div className="relative group/carousel">
      {/* Main Carousel */}
      <div ref={emblaRef} className="overflow-hidden rounded-2xl">
        <div className="flex">
          {products.map((product, i) => (
            <div key={product.id} className="relative flex-[0_0_100%] min-w-0">
              {/* Image */}
              <div className="relative aspect-[21/9] md:aspect-[21/8] overflow-hidden">
                <img
                  src={productImages[i] || product.image}
                  alt={isZh ? product.name : product.nameEn}
                  className="w-full h-full object-cover"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                {/* Text content on image */}
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 lg:p-14">
                  <h3 className="text-[24px] md:text-[36px] lg:text-[42px] font-semibold text-white tracking-[-1px] mb-2 md:mb-3">
                    {isZh ? product.name : product.nameEn}
                  </h3>
                  <p className="text-[14px] md:text-[16px] text-white/80 leading-relaxed max-w-2xl mb-3 md:mb-5">
                    {isZh ? product.shortDesc : product.shortDescEn}
                  </p>
                  <div className="hidden md:flex flex-wrap gap-3 mb-5">
                    {(isZh ? product.specs : product.specsEn).filter(Boolean).slice(0, 3).map((spec, j) => (
                      <span key={j} className="text-[12px] text-white/90 bg-white/15 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/20">
                        {spec}
                      </span>
                    ))}
                  </div>
                  <Link to={`/products/${product.id}`}
                    className="inline-flex items-center gap-2 text-[13px] md:text-[14px] font-medium text-white bg-white/15 backdrop-blur-sm px-5 py-2 rounded-full border border-white/30 hover:bg-white/25 transition-colors">
                    {isZh ? '了解详情' : 'Learn More'} <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Left/Right Arrows */}
      <button
        onClick={scrollPrev}
        className="absolute left-3 md:left-5 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/40 transition-all opacity-0 group-hover/carousel:opacity-100 z-10"
      >
        <ChevronLeft size={20} />
      </button>
      <button
        onClick={scrollNext}
        className="absolute right-3 md:right-5 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/40 transition-all opacity-0 group-hover/carousel:opacity-100 z-10"
      >
        <ChevronRight size={20} />
      </button>

      {/* Dot Indicators */}
      <div className="absolute bottom-4 md:bottom-6 right-6 md:right-10 flex items-center gap-2 z-10">
        {products.map((_, i) => (
          <button
            key={i}
            onClick={() => scrollTo(i)}
            className={`transition-all duration-300 rounded-full ${
              i === currentIndex
                ? 'w-6 h-2 bg-white'
                : 'w-2 h-2 bg-white/50 hover:bg-white/80'
            }`}
          />
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   Service Icons
   ═══════════════════════════════════════════ */
const serviceIcons = [Factory, HardHat, Settings2, Cpu, Lightbulb, GraduationCap, Package, Headphones];

/* ═══════════════════════════════════════════
   HOME PAGE
   ═══════════════════════════════════════════ */
export default function Home() {
  const { t, i18n } = useTranslation();
  const isZh = i18n.language === 'zh';
  const { data } = useContentStore();
  const ec = useEditableContent();
  const products: Product[] = data.products;
  const teamMembers = data.team;
  const productImages = ['/images/product-fire.jpg', '/images/product-gas.jpg', '/images/product-boiler.jpg', '/images/product-water.jpg'];

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div>
      {/* ═══ HERO (full screen) ═══ */}
      <HeroSection onScrollDown={() => scrollTo('products')} />

      {/* ═══ PRODUCTS ═══ */}
      <Section id="products" className="bg-white">
        <div className="mb-12">
          <SectionLabel text="Products" />
          <h2 className="text-[28px] md:text-[40px] font-semibold text-[#1d1d1f] tracking-[-1px] mb-4">
            {t('products.title')}
          </h2>
          <p className="text-[16px] text-[#86868b] max-w-xl leading-relaxed">
            {t('products.description')}
          </p>
        </div>

        <ProductCarousel products={products} productImages={productImages} />
      </Section>

      {/* ═══ SERVICES ═══ */}
      <Section id="services" className="bg-white">
        <div className="mb-16">
          <SectionLabel text="Services" />
          <h2 className="text-[28px] md:text-[40px] font-semibold text-[#1d1d1f] tracking-[-1px] mb-4">
            {isZh ? ec.servicesTitle : ec.servicesTitleEn}
          </h2>
          <p className="text-[16px] text-[#86868b] max-w-xl leading-relaxed">
            {isZh ? ec.servicesDesc : ec.servicesDescEn}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {ec.servicesItems.map((s, i) => {
            const Icon = serviceIcons[i];
            return (
              <div key={i} className="group bg-white rounded-2xl p-8 ring-1 ring-[#e8e8ed] hover:shadow-xl hover:ring-[#d2d2d7] transition-all duration-300">
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-xl bg-[#fafafa] flex items-center justify-center group-hover:bg-[#1d1d1f] transition-colors duration-300">
                    <Icon size={20} className="text-[#1d1d1f] group-hover:text-white transition-colors duration-300" strokeWidth={1.5} />
                  </div>
                  <span className="text-[40px] font-semibold text-[#f5f5f7] leading-none">{String(i + 1).padStart(2, '0')}</span>
                </div>
                <h3 className="text-[17px] font-semibold text-[#1d1d1f] mb-2 tracking-[-0.3px]">{isZh ? s.name : s.nameEn}</h3>
                <p className="text-[13px] text-[#86868b] leading-relaxed">{isZh ? s.desc : s.descEn}</p>
              </div>
            );
          })}
        </div>
      </Section>

      {/* ═══ SOLUTIONS ═══ */}
      <Section id="solutions" className="bg-[#fafafa]">
        <div className="mb-16">
          <SectionLabel text="Solutions" />
          <h2 className="text-[28px] md:text-[40px] font-semibold text-[#1d1d1f] tracking-[-1px] mb-4">
            {isZh ? ec.solutionsTitle : ec.solutionsTitleEn}
          </h2>
          <p className="text-[16px] text-[#86868b] max-w-xl leading-relaxed">
            {isZh ? ec.solutionsDesc : ec.solutionsDescEn}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
          {ec.solutionsItems.map((sol, i) => {
            const solutionIcons = [Flame, Recycle, Wind, Shield];
            const SolutionIcon = solutionIcons[i] || Cpu;
            return (
              <div key={i} className="group bg-white rounded-2xl p-8 md:p-10 ring-1 ring-[#e8e8ed] hover:shadow-xl hover:ring-[#d2d2d7] transition-all duration-300">
                <div className="flex items-start gap-6">
                  <div className="w-14 h-14 rounded-xl bg-[#fafafa] flex items-center justify-center shrink-0 group-hover:bg-[#1d1d1f] transition-colors duration-300">
                    <SolutionIcon size={24} className="text-[#1d1d1f] group-hover:text-white transition-colors duration-300" strokeWidth={1.5} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-[20px] font-semibold text-[#1d1d1f] mb-3 tracking-[-0.3px]">{isZh ? sol.name : sol.nameEn}</h3>
                    <p className="text-[14px] text-[#86868b] leading-relaxed mb-5">{isZh ? sol.desc : sol.descEn}</p>
                    <div className="flex flex-wrap gap-2">
                      {(isZh ? sol.features : sol.featuresEn).map((f, j) => (
                        <span key={j} className="text-[12px] text-[#1d1d1f] bg-[#fafafa] px-3 py-1.5 rounded-full ring-1 ring-[#e8e8ed] font-medium">{f}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Cases */}
        <div className="border-t border-[#f0f0f0] pt-16">
          <p className="text-[11px] font-semibold text-[#86868b] uppercase tracking-[0.2em] mb-8">Benchmark Projects</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {ec.casesItems.map((c, i) => (
              <div key={i} className="group bg-white rounded-2xl p-8 ring-1 ring-[#e8e8ed] hover:ring-[#d2d2d7] hover:shadow-lg transition-all duration-300">
                <span className="text-[11px] font-medium text-[#1d1d1f] bg-[#fafafa] px-3 py-1 rounded-full ring-1 ring-[#e8e8ed] inline-block mb-4">
                  {isZh ? c.tag : c.tagEn}
                </span>
                <h4 className="text-[17px] font-semibold text-[#1d1d1f] mb-3 tracking-[-0.3px]">{isZh ? c.name : c.nameEn}</h4>
                <p className="text-[14px] text-[#86868b] leading-relaxed">{isZh ? c.desc : c.descEn}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ═══ ABOUT + TEAM ═══ */}
      <Section id="about" className="bg-[#fafafa]">
        <div className="mb-12">
          <SectionLabel text="About" />
          <h2 className="text-[28px] md:text-[40px] font-semibold text-[#1d1d1f] tracking-[-1px] mb-4">
            {isZh ? ec.aboutTitle : ec.aboutTitleEn}
          </h2>
          <p className="text-[16px] text-[#86868b] max-w-2xl leading-relaxed">
            {isZh ? ec.aboutDesc : ec.aboutDescEn}
          </p>
        </div>
      
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {[
            { v: '300+', l: isZh ? '项目落地全球' : 'Global Projects' },
            { v: '50000+', l: isZh ? '㎡制造基地' : '㎡ Factory' },
            { v: '40+', l: isZh ? '运营项目' : 'Operations' },
            { v: '15', l: isZh ? 'AAA 级项目' : 'AAA Rated' },
          ].map((s, i) => (
            <div key={i} className="text-center bg-white rounded-2xl p-6 ring-1 ring-[#e8e8ed]">
              <div className="text-[28px] md:text-[36px] font-semibold tracking-[-1px] text-[#1d1d1f]">{s.v}</div>
              <div className="text-[12px] text-[#86868b] mt-1">{s.l}</div>
            </div>
          ))}
        </div>
      
        {/* Awards */}
        <div className="flex flex-wrap items-center justify-center gap-x-6 md:gap-x-10 gap-y-2 mb-16 text-[13px] text-[#86868b]">
          {(t('about.awards', { returnObjects: true }) as string[]).map((award, i) => (
            <span key={i} className="font-medium">{award}</span>
          ))}
        </div>
      
        {/* Mission & Vision */}
        <div className="border-t border-[#e8e8ed] pt-12 mt-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { label: isZh ? '使命' : 'Mission', text: isZh ? ec.aboutMission : ec.aboutMissionEn },
              { label: isZh ? '愿景' : 'Vision', text: isZh ? ec.aboutVision : ec.aboutVisionEn },
              { label: isZh ? '价值观' : 'Values', text: isZh ? '创新 · 责任 · 共赢' : 'Innovation · Responsibility · Win-Win' },
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 ring-1 ring-[#e8e8ed]">
                <p className="text-[11px] font-semibold text-[#86868b] uppercase tracking-[0.2em] mb-3">{item.label}</p>
                <p className="text-[15px] text-[#1d1d1f] leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      
        {/* Team Members - 新增团队展示 */}
        <div className="mt-20">
          <SectionLabel text="Team" />
          <h2 className="text-[28px] md:text-[40px] font-semibold text-[#1d1d1f] tracking-[-1px] mb-4">
            {isZh ? '管理团队' : 'Management Team'}
          </h2>
          <p className="text-[16px] text-[#86868b] max-w-2xl leading-relaxed mb-12">
            {isZh ? '核心管理团队，丰富的行业经验和专业背景' : 'Core management team with rich industry experience'}
          </p>
        
          {teamMembers.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {/* 调整顺序：许力放在第 2 位 */}
              {(() => {
                const sortedMembers = [...teamMembers];
                const xuliIndex = sortedMembers.findIndex(m => m.name === '许力');
                if (xuliIndex !== -1) {
                  const [xuli] = sortedMembers.splice(xuliIndex, 1);
                  sortedMembers.splice(1, 0, xuli);
                }
                return sortedMembers.map((m, i) => {
                  const photoMap: Record<string, string> = {
                    '王志强': '/images/team/wangzhiqiang.jpg',
                    '吴华栋': '/images/team/wuhuadong.jpg',
                    '李建平': '/images/team/lijianping.jpg',
                    '黄立成': '/images/team/huanglicheng.jpg',
                    '张治华': '/images/team/zhangzhihua.jpg',
                    '左方超': '/images/team/zuofangchao.jpg',
                    '许力': '/images/team/xuli.jpg',
                  };
                  const photo = photoMap[m.name] || m.image;
                  return (
                    <div key={m.id} className="bg-white rounded-2xl p-5 md:p-6 ring-1 ring-[#e8e8ed] text-center">
                      <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden mx-auto mb-5 bg-[#fafafa] shrink-0">
                        {photo ? (
                          <img src={photo} alt={m.name} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-[#1d1d1f] text-[24px] font-semibold">
                            {(isZh ? m.name : m.nameEn).charAt(0)}
                          </div>
                        )}
                      </div>
                      <h3 className="text-[18px] font-semibold text-[#1d1d1f] mb-2">
                        {isZh ? m.name : m.nameEn}
                      </h3>
                      <p className="text-[14px] text-[#86868b]">{isZh ? m.role : m.roleEn}</p>
                    </div>
                  );
                });
              })()}
            </div>
          ) : (
            <div className="text-center text-[#86868b] py-20 bg-[#fafafa] rounded-2xl">
              {isZh ? '暂无团队成员' : 'No team members yet'}
            </div>
          )}
        </div>
      </Section>

      {/* ═══ CTA CONTACT ═══ */}
      <section className="relative h-[70vh] min-h-[500px] flex flex-col items-center justify-end pb-24 overflow-hidden" id="contact">
        <div className="absolute inset-0 z-0">
          <img src={ec.homeHeroImage || '/images/hero-full.jpg'} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <div className="relative z-10 text-center px-6 max-w-2xl">
          <h2 className="text-[36px] md:text-[48px] font-semibold tracking-[-1px] mb-2 text-white">
            {isZh ? ec.ctaTitle : ec.ctaTitleEn}
          </h2>
          <p className="text-[15px] text-white/70 mb-8 max-w-md mx-auto">
            {isZh ? ec.ctaSubtitle : ec.ctaSubtitleEn}
          </p>
          <Link to="/contact"
            className="inline-block min-w-[160px] text-[14px] font-medium px-8 py-2.5 rounded-full bg-white text-[#1d1d1f] hover:bg-white/90 transition-colors">
            {isZh ? '立即咨询' : 'Get in Touch'}
          </Link>
        </div>
      </section>

    </div>
  );
}
