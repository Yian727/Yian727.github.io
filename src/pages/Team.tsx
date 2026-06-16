import { useTranslation } from 'react-i18next';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { useEditableContent } from '@/hooks/useEditableContent';
import { useContentStore } from '@/contexts/ContentStoreContext';
import { Link } from 'react-router-dom';

function Reveal({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const { ref, revealed } = useScrollReveal<HTMLDivElement>();
  return (
    <div ref={ref} className={className} style={{
      opacity: revealed ? 1 : 0, transform: revealed ? 'translateY(0)' : 'translateY(30px)',
      transition: `opacity 0.8s ease ${delay}ms, transform 0.8s ease ${delay}ms`,
    }}>{children}</div>
  );
}

export default function Team() {
  const { t, i18n } = useTranslation();
  const isZh = i18n.language === 'zh';
  const ec = useEditableContent();
  const { data } = useContentStore();
  const teamMembers = data.team;

  // 调试：查看团队数据
  console.log('Team members loaded:', teamMembers.length, teamMembers);

  return (
    <div className="pt-[52px]">
      {/* Hero */}
      <section className="relative h-[70vh] min-h-[500px] flex flex-col items-center justify-end pb-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={ec.teamHeroImage || '/images/product-boiler.jpg'} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/30" />
        </div>
        <div className="relative z-10 text-center px-6">
          <h1 className="text-[36px] md:text-[48px] font-semibold tracking-[-1px] mb-2 text-white">
            {isZh ? '管理团队' : 'Management Team'}
          </h1>
          <p className="text-[15px] text-white/70 max-w-lg mx-auto">
            {isZh ? '汇聚了环保行业顶尖人才，核心团队平均20年以上行业经验' : 'Top talents in the environmental industry'}
          </p>
        </div>
      </section>

      {/* Team Grid */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {teamMembers.map((m, i) => {
              const photo = m.image || '';
              return (
                <Reveal key={m.id} delay={i * 60}>
                  <Link to={`/team/${m.id}`} className="group block">
                    <div className="bg-[#fafafa] rounded-2xl p-6 md:p-8 h-full hover:ring-1 hover:ring-[#0066cc]/30 hover:shadow-lg transition-all cursor-pointer">
                      {photo ? (
                        <div className="w-20 h-20 rounded-full overflow-hidden mb-4 bg-white ring-1 ring-[#e8e8ed] group-hover:scale-105 transition-transform">
                          <img src={photo} alt={m.name} className="w-full h-full object-cover" />
                        </div>
                      ) : (
                        <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center mb-4 ring-1 ring-[#e8e8ed] text-[#1d1d1f] text-[24px] font-semibold group-hover:scale-105 transition-transform">
                          {(isZh ? m.name : m.nameEn).charAt(0)}
                        </div>
                      )}
                      <h3 className="text-[16px] font-semibold text-[#1d1d1f] mb-0.5 group-hover:text-[#0066cc] transition-colors">
                        {isZh ? m.name : m.nameEn}
                      </h3>
                      <p className="text-[12px] text-[#0066cc] mb-3">
                        {isZh ? m.role : m.roleEn}
                      </p>
                      <p className="text-[13px] text-[#86868b] leading-relaxed">
                        {isZh ? m.bio : m.bioEn}
                      </p>
                    </div>
                  </Link>
                </Reveal>
              );
            })}
          </div>

          <Reveal delay={200}>
            <div className="mt-16 text-center">
              <Link to="/contact"
                className="inline-block min-w-[140px] text-[14px] font-medium px-8 py-2.5 rounded-full bg-[#1d1d1f] text-white hover:bg-black transition-colors">
                {isZh ? '加入我们' : 'Join Us'}
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
