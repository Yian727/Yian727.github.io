import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, Mail, Phone, MapPin, Building } from 'lucide-react';
import { fetchTeamMember } from '@/lib/api';

interface TeamMember {
  id: string;
  name: string;
  nameEn: string;
  role: string;
  roleEn: string;
  bio: string;
  bioEn: string;
  image: string;
  detailedBio?: string;
  detailedBioEn?: string;
}

export default function TeamDetail() {
  const { id } = useParams<{ id: string }>();
  const { i18n } = useTranslation();
  const isZh = i18n.language === 'zh';
  const [member, setMember] = useState<TeamMember | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchTeamMember(id)
        .then(data => {
          setMember(data);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white pt-[52px] flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#1d1d1f] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-[#86868b] text-sm">加载中...</p>
        </div>
      </div>
    );
  }

  if (!member) {
    return (
      <div className="min-h-screen bg-white pt-[52px] flex items-center justify-center">
        <div className="text-center">
          <p className="text-[#86868b] mb-4">未找到该成员</p>
          <Link to="/team" className="btn-primary !text-sm !py-2.5 !px-6">
            <ArrowLeft size={16} /> 返回团队列表
          </Link>
        </div>
      </div>
    );
  }

  const photoMap: Record<string, string> = {
    '王志强': '/images/team/wangzhiqiang.jpg',
    '吴华栋': '/images/team/wuhuadong.jpg',
    '李建平': '/images/team/lijianping.jpg',
    '黄立成': '/images/team/huanglicheng.jpg',
    '张治华': '/images/team/zhangzhihua.jpg',
    '左方超': '/images/team/zuofangchao.jpg',
    '许力': '/images/team/xuli.jpg',
  };
  const photo = member.image || photoMap[member.name] || '';

  return (
    <div className="pt-[52px]">
      {/* Hero Banner */}
      <section className="relative h-[50vh] min-h-[400px] flex items-end overflow-hidden">
        <div className="absolute inset-0 z-0">
          {photo ? (
            <img src={photo} alt="" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-[#1d1d1f] to-[#333]" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        </div>
        <div className="relative z-10 max-w-5xl mx-auto px-6 pb-16 w-full">
          <Link
            to="/team"
            className="inline-flex items-center gap-2 text-white/70 hover:text-white mb-8 transition-colors text-sm"
          >
            <ArrowLeft size={16} />
            {isZh ? '返回团队列表' : 'Back to Team'}
          </Link>
          <div className="flex items-end gap-8">
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden bg-white/10 backdrop-blur-sm shrink-0 ring-4 ring-white/20">
              {photo ? (
                <img src={photo} alt={member.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-white text-[36px] font-semibold">
                  {(isZh ? member.name : member.nameEn).charAt(0)}
                </div>
              )}
            </div>
            <div className="pb-2">
              <h1 className="text-[36px] md:text-[48px] font-semibold text-white tracking-[-1px] mb-2">
                {isZh ? member.name : member.nameEn}
              </h1>
              <p className="text-[16px] md:text-[18px] text-white/80">
                {isZh ? member.role : member.roleEn}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-3xl mx-auto px-6">
          {/* Brief Bio */}
          <div className="mb-12">
            <p className="text-[11px] font-semibold text-[#86868b] uppercase tracking-[0.2em] mb-4">Profile</p>
            <p className="text-[16px] md:text-[17px] text-[#1d1d1f] leading-[1.8]">
              {isZh ? member.bio : member.bioEn}
            </p>
          </div>

          {/* Detailed Bio */}
          {(member.detailedBio || member.detailedBioEn) && (
            <div className="mb-12">
              <p className="text-[11px] font-semibold text-[#86868b] uppercase tracking-[0.2em] mb-6">Details</p>
              <div
                className="prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{
                  __html: isZh ? member.detailedBio! : member.detailedBioEn!
                }}
              />
            </div>
          )}

          {/* Contact Info Card */}
          <div className="bg-[#fafafa] rounded-2xl p-6 md:p-8 ring-1 ring-[#e8e8ed]">
            <p className="text-[11px] font-semibold text-[#86868b] uppercase tracking-[0.2em] mb-6">Contact</p>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <Building size={20} className="text-[#86868b]" />
                <div>
                  <p className="text-[12px] text-[#86868b]">Company</p>
                  <p className="text-[14px] text-[#1d1d1f]">上海康恒环境科技有限公司</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <MapPin size={20} className="text-[#86868b]" />
                <div>
                  <p className="text-[12px] text-[#86868b]">Location</p>
                  <p className="text-[14px] text-[#1d1d1f]">上海市浦东新区</p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-12 text-center">
            <Link
              to="/contact"
              className="inline-block min-w-[140px] text-[14px] font-medium px-8 py-2.5 rounded-full bg-[#1d1d1f] text-white hover:bg-black transition-colors"
            >
              {isZh ? '联系该成员' : 'Contact'}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
