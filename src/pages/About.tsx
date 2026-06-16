import { useTranslation } from 'react-i18next';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { useContentStore } from '@/contexts/ContentStoreContext';
import { useEditableContent } from '@/hooks/useEditableContent';
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

export default function About() {
  const { t, i18n } = useTranslation();
  const isZh = i18n.language === 'zh';
  const { data } = useContentStore();
  const ec = useEditableContent();
  const teamMembers = data.team;

  const about = t('about', { returnObjects: true }) as any;
  const awards: string[] = about.awards || [];

  return (
    <div className="pt-[52px]">
      {/* Hero */}
      <section className="relative h-[70vh] min-h-[500px] flex flex-col items-center justify-end pb-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={ec.aboutHeroImage || '/images/hero-full.jpg'} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/30" />
        </div>
        <div className="relative z-10 text-center px-6">
          <h1 className="text-[36px] md:text-[48px] font-semibold tracking-[-1px] mb-2 text-white">
            {isZh ? ec.aboutTitle : ec.aboutTitleEn}
          </h1>
          <p className="text-[15px] text-white/70 max-w-lg mx-auto">
            {isZh ? '聚焦固废处理全产业链，致力于成为全球领先的环保能源综合服务商' : 'Full-chain solid waste treatment, global leading service provider'}
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {[
              { label: isZh ? '使命' : 'Mission', text: isZh ? ec.aboutMission : ec.aboutMissionEn },
              { label: isZh ? '愿景' : 'Vision', text: isZh ? ec.aboutVision : ec.aboutVisionEn },
              { label: isZh ? '价值观' : 'Values', text: isZh ? '创新 · 责任 · 共赢' : 'Innovation · Responsibility · Win-Win' },
            ].map((item, i) => (
              <Reveal key={i} delay={i * 80}>
                <div className="bg-[#fafafa] rounded-2xl p-6 md:p-8 h-full">
                  <p className="text-[11px] font-semibold text-[#86868b] uppercase tracking-[0.2em] mb-3">{item.label}</p>
                  <p className="text-[15px] text-[#1d1d1f] leading-relaxed">{item.text}</p>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Company description */}
          <Reveal>
            <p className="text-[16px] md:text-[17px] text-[#1d1d1f] leading-[1.8] max-w-3xl mb-16">
              {isZh ? ec.aboutDesc : ec.aboutDescEn}
            </p>
          </Reveal>

          {/* Timeline */}
          <Reveal>
            <div className="mb-8">
              <p className="text-[11px] font-semibold text-[#86868b] uppercase tracking-[0.2em] mb-8">Milestones</p>
            </div>
          </Reveal>

          <div className="max-w-2xl space-y-0">
            {(about.timeline || []).map((item: any, i: number) => (
              <Reveal key={i} delay={i * 60}>
                <div className="flex gap-6 group">
                  <div className="flex flex-col items-center shrink-0">
                    <div className="w-2 h-2 rounded-full bg-[#1d1d1f]" />
                    {i < (about.timeline?.length || 0) - 1 && <div className="w-px flex-1 bg-[#e8e8ed] mt-1 min-h-[40px]" />}
                  </div>
                  <div className="pb-8">
                    <span className="text-[12px] font-semibold text-[#86868b] mb-0.5 block">{item.year}</span>
                    <h3 className="text-[15px] font-semibold text-[#1d1d1f] mb-1">{item.title}</h3>
                    <p className="text-[13px] text-[#86868b] leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* SUS Technology */}
      <section className="py-20 md:py-28 bg-[#fafafa]">
        <div className="max-w-5xl mx-auto px-6">
          <Reveal>
            <div className="text-center mb-12">
              <p className="text-[11px] font-semibold text-[#86868b] uppercase tracking-[0.2em] mb-4">Technology</p>
              <h2 className="text-[28px] md:text-[36px] font-semibold text-[#1d1d1f] tracking-[-1px] mb-3">
                {about.sus?.title || 'SUS Technology'}
              </h2>
              <p className="text-[15px] text-[#86868b] max-w-lg mx-auto">{about.sus?.subtitle || ''}</p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {(about.sus?.generations || []).map((gen: any, i: number) => (
              <Reveal key={i} delay={i * 80}>
                <div className="bg-white rounded-2xl p-6 h-full ring-1 ring-[#e8e8ed]">
                  <span className="text-[20px] font-bold text-[#1d1d1f] block mb-0.5">{gen.version}</span>
                  <span className="text-[11px] text-[#86868b] mb-3 block">{gen.period}</span>
                  <h3 className="text-[14px] font-semibold text-[#1d1d1f] mb-2">{gen.title}</h3>
                  <span className="text-[10px] text-[#86868b] bg-[#fafafa] px-2 py-0.5 rounded-full inline-block mb-3 ring-1 ring-[#e8e8ed]">{gen.efficiency}</span>
                  <div className="flex flex-wrap gap-1">
                    {(gen.features || []).map((f: string, j: number) => (
                      <span key={j} className="text-[10px] text-[#86868b] bg-[#fafafa] px-2 py-0.5 rounded-full ring-1 ring-[#e8e8ed]">{f}</span>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Awards */}
      <section className="py-16 bg-white border-t border-[#f0f0f0]">
        <div className="max-w-5xl mx-auto px-6">
          <Reveal>
            <div className="flex flex-wrap justify-center items-center gap-x-8 md:gap-x-14 gap-y-3">
              {awards.map((award: string, i: number) => (
                <span key={i} className="text-[13px] md:text-[14px] font-medium text-[#86868b] tracking-wide">{award}</span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 md:py-28 bg-[#fafafa]">
        <div className="max-w-5xl mx-auto px-6">
          <Reveal>
            <div className="mb-12">
              <p className="text-[11px] font-semibold text-[#86868b] uppercase tracking-[0.2em] mb-4">Team</p>
              <h2 className="text-[28px] md:text-[36px] font-semibold text-[#1d1d1f] tracking-[-1px] mb-4">
                {isZh ? '管理团队' : 'Management Team'}
              </h2>
              <p className="text-[15px] text-[#86868b] max-w-xl">
                {isZh ? '核心管理团队，丰富的行业经验和专业背景' : 'Core management team with rich industry experience'}
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {teamMembers.map((m, i) => {
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
                <Link key={m.id} to={`/team/${m.id}`} className="group block">
                  <div className="bg-white rounded-2xl p-5 md:p-6 ring-1 ring-[#e8e8ed] text-center hover:ring-[#0066cc]/30 hover:shadow-lg transition-all cursor-pointer" style={{ animationDelay: `${i * 60}ms` }}>
                    <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden mx-auto mb-5 bg-[#fafafa] shrink-0 group-hover:scale-105 transition-transform">
                      {photo ? (
                        <img src={photo} alt={m.name} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-[#1d1d1f] text-[24px] font-semibold">
                          {(isZh ? m.name : m.nameEn).charAt(0)}
                        </div>
                      )}
                    </div>
                    <h3 className="text-[18px] font-semibold text-[#1d1d1f] mb-2 group-hover:text-[#0066cc] transition-colors">
                      {isZh ? m.name : m.nameEn}
                    </h3>
                    <p className="text-[14px] text-[#86868b]">{isZh ? m.role : m.roleEn}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
