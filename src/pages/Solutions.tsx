import { useTranslation } from 'react-i18next';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { Flame, Factory, Droplets, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useEditableContent } from '@/hooks/useEditableContent';

function Reveal({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const { ref, revealed } = useScrollReveal<HTMLDivElement>();
  return (
    <div ref={ref} className={className} style={{
      opacity: revealed ? 1 : 0, transform: revealed ? 'translateY(0)' : 'translateY(30px)',
      transition: `opacity 0.8s ease ${delay}ms, transform 0.8s ease ${delay}ms`,
    }}>{children}</div>
  );
}

const solutionIcons = [Flame, Factory, Droplets, Zap];
const solutionImages = ['/images/product-fire.jpg', '/images/product-gas.jpg', '/images/product-water.jpg', '/images/product-boiler.jpg'];

export default function Solutions() {
  const { t, i18n } = useTranslation();
  const isZh = i18n.language === 'zh';
  const ec = useEditableContent();
  const categories = ec.solutionsItems;
  const cases = ec.casesItems;

  return (
    <div className="pt-[52px]">
      {/* Hero */}
      <section className="relative h-[70vh] min-h-[500px] flex flex-col items-center justify-end pb-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={ec.solutionsHeroImage || '/images/hero-full.jpg'} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/30" />
        </div>
        <div className="relative z-10 text-center px-6">
          <h1 className="text-[36px] md:text-[48px] font-semibold tracking-[-1px] mb-2 text-white">
            {isZh ? ec.solutionsTitle : ec.solutionsTitleEn}
          </h1>
          <p className="text-[15px] text-white/70 max-w-lg mx-auto mb-8">
            {isZh ? ec.solutionsDesc : ec.solutionsDescEn}
          </p>
          <Link to="/contact"
            className="inline-block min-w-[140px] text-[14px] font-medium px-8 py-2.5 rounded-full bg-white text-[#1d1d1f] hover:bg-white/90 transition-colors">
            {isZh ? '联系我们' : 'Contact Us'}
          </Link>
        </div>
      </section>

      {/* Solutions with images */}
      <section className="bg-white">
        {categories.map((sol, i) => {
          const Icon = solutionIcons[i];
          const isEven = i % 2 === 0;
          return (
            <div key={i} className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} min-h-[50vh]`}>
              <div className="lg:w-1/2 h-[300px] lg:h-auto relative">
                <img src={solutionImages[i]} alt="" className="w-full h-full object-cover" />
              </div>
              <div className="lg:w-1/2 flex items-center justify-center p-8 md:p-16 bg-white">
                <Reveal delay={i * 60}>
                  <div className="max-w-md">
                    <div className="w-10 h-10 rounded-xl bg-[#fafafa] flex items-center justify-center mb-4 ring-1 ring-[#e8e8ed]">
                      <Icon size={18} className="text-[#1d1d1f]" strokeWidth={1.5} />
                    </div>
                    <h3 className="text-[22px] md:text-[28px] font-semibold text-[#1d1d1f] tracking-[-0.5px] mb-3">
                      {isZh ? sol.name : sol.nameEn}
                    </h3>
                    <p className="text-[14px] text-[#86868b] leading-relaxed mb-5">{isZh ? sol.desc : sol.descEn}</p>
                    <div className="flex flex-wrap gap-2">
                      {(isZh ? sol.features : sol.featuresEn).map((f, j) => (
                        <span key={j} className="text-[11px] text-[#86868b] bg-[#fafafa] px-2.5 py-1 rounded-full ring-1 ring-[#e8e8ed]">{f}</span>
                      ))}
                    </div>
                  </div>
                </Reveal>
              </div>
            </div>
          );
        })}
      </section>

      {/* Cases */}
      <section className="py-20 md:py-28 bg-[#fafafa]">
        <div className="max-w-5xl mx-auto px-6">
          <Reveal>
            <div className="text-center mb-12">
              <p className="text-[11px] font-semibold text-[#86868b] uppercase tracking-[0.2em] mb-4">Projects</p>
              <h2 className="text-[28px] md:text-[36px] font-semibold text-[#1d1d1f] tracking-[-1px]">
                {isZh ? ec.casesTitle : ec.casesTitleEn}
              </h2>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {cases.map((c, i) => (
              <Reveal key={i} delay={i * 60}>
                <div className="bg-white rounded-2xl p-6 ring-1 ring-[#e8e8ed] h-full">
                  <span className="text-[11px] text-[#86868b] bg-[#fafafa] px-2 py-0.5 rounded-full ring-1 ring-[#e8e8ed] inline-block mb-3">
                    {isZh ? c.tag : c.tagEn}
                  </span>
                  <h3 className="text-[15px] font-semibold text-[#1d1d1f] mb-2">{isZh ? c.name : c.nameEn}</h3>
                  <p className="text-[12px] text-[#86868b] leading-relaxed">{isZh ? c.desc : c.descEn}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
