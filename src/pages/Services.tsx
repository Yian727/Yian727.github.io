import { useTranslation } from 'react-i18next';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { Factory, HardHat, Settings2, Cpu, Lightbulb, GraduationCap, Headphones, Package } from 'lucide-react';
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

const serviceIcons = [Factory, HardHat, Settings2, Cpu, Lightbulb, GraduationCap, Package, Headphones];

export default function Services() {
  const { t, i18n } = useTranslation();
  const isZh = i18n.language === 'zh';
  const ec = useEditableContent();
  const services = ec.servicesItems;

  const details = isZh ? [
    '自主研发焚烧炉、余热锅炉、烟气净化等核心设备，拥有完整知识产权，年产120套制造能力。',
    '设计、采购、施工、安装、调试全流程总承包服务，96项标准化管理制度保障工程质量。',
    '40+项目运营经验，15个AAA级项目，总运营规模超5万吨/日，专业团队驻场管理。',
    '节能增效、环保提标、新工艺技术升级全生命周期服务，如皋项目NOx下降50%+。',
    '24小时免费技术咨询，专属项目档案管理，终身免费远程诊断服务。',
    '标准化管理制度96项，专业人才梯队建设，帮助客户建立自主运营能力。',
    '集采平台保障，质量优、价格低、到货快，确保设备长期稳定运行。',
    'DCS实时监控，大数据分析，专家系统，AI智能焚烧控制，提升运营效率。',
  ] : [
    'Self-developed incinerators, waste heat boilers, flue gas systems with full IP, 120 sets/year.',
    'Full turnkey from design to commissioning, 96 standardized management protocols.',
    '40+ projects, 15 AAA-rated, 50,000+ t/d total operation scale.',
    'Energy efficiency upgrades, emission improvements, Rugao project NOx -50%+.',
    '24/7 free consulting, dedicated project archives, lifetime remote diagnosis.',
    '96 standardized protocols, professional talent development programs.',
    'Centralized procurement, quality guaranteed, low price, fast delivery.',
    'DCS monitoring, big data analytics, AI-powered smart combustion control.',
  ];

  return (
    <div className="pt-[52px]">
      {/* Hero Full-screen */}
      <section className="relative h-[70vh] min-h-[500px] flex flex-col items-center justify-end pb-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={ec.servicesHeroImage || '/images/product-boiler.jpg'} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/30" />
        </div>
        <div className="relative z-10 text-center px-6">
          <h1 className="text-[36px] md:text-[48px] font-semibold tracking-[-1px] mb-2 text-white">
            {isZh ? ec.servicesTitle : ec.servicesTitleEn}
          </h1>
          <p className="text-[15px] text-white/70 max-w-md mx-auto mb-8">
            {isZh ? ec.servicesDesc : ec.servicesDescEn}
          </p>
          <Link to="/contact"
            className="inline-block min-w-[140px] text-[14px] font-medium px-8 py-2.5 rounded-full bg-white text-[#1d1d1f] hover:bg-white/90 transition-colors">
            {isZh ? '联系我们' : 'Contact Us'}
          </Link>
        </div>
      </section>

      {/* Service Grid */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map((s, i) => {
              const Icon = serviceIcons[i];
              return (
                <Reveal key={i} delay={i * 60}>
                  <div className="bg-[#fafafa] rounded-2xl p-6 md:p-8 h-full">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shrink-0 ring-1 ring-[#e8e8ed]">
                        <Icon size={18} className="text-[#1d1d1f]" strokeWidth={1.5} />
                      </div>
                      <div>
                        <h3 className="text-[16px] font-semibold text-[#1d1d1f] mb-2">{isZh ? s.name : s.nameEn}</h3>
                        <p className="text-[13px] text-[#86868b] leading-relaxed">{isZh ? s.desc : s.descEn}</p>
                      </div>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
