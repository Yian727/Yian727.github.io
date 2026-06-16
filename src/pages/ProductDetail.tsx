import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { fetchProduct } from '@/lib/api';

interface Product {
  id: string;
  name: string;
  nameEn: string;
  shortDesc: string;
  shortDescEn: string;
  specs: string[];
  specsEn: string[];
  image: string;
  detail: string;
  detailEn: string;
}

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const { i18n } = useTranslation();
  const isZh = i18n.language === 'zh';
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    fetchProduct(id)
      .then(data => { setProduct(data); setLoading(false); })
      .catch(() => { setError('产品不存在'); setLoading(false); });
  }, [id]);

  if (loading) {
    return (
      <div className="pt-[52px] min-h-screen flex items-center justify-center">
        <div className="text-[#86868b]">加载中...</div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="pt-[52px] min-h-screen flex flex-col items-center justify-center gap-4">
        <div className="text-[#86868b] text-lg">{error || '产品不存在'}</div>
        <Link to="/" className="text-[14px] font-medium text-[#1d1d1f] hover:text-[#86868b] flex items-center gap-2">
          <ArrowLeft size={16} /> {isZh ? '返回首页' : 'Back Home'}
        </Link>
      </div>
    );
  }

  const detailHtml = isZh ? product.detail : product.detailEn;

  return (
    <div className="pt-[52px]">
      {/* Hero Banner */}
      <section className="relative h-[50vh] min-h-[400px] flex flex-col items-center justify-end pb-16 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={product.image} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        </div>
        <div className="relative z-10 text-center px-6 max-w-3xl">
          <h1 className="text-[36px] md:text-[48px] font-semibold tracking-[-1px] mb-3 text-white">
            {isZh ? product.name : product.nameEn}
          </h1>
          <p className="text-[15px] md:text-[16px] text-white/80 max-w-xl mx-auto">
            {isZh ? product.shortDesc : product.shortDescEn}
          </p>
        </div>
      </section>

      {/* Specs */}
      <section className="py-12 md:py-16 bg-[#fafafa]">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex flex-wrap justify-center gap-4 md:gap-6">
            {(isZh ? product.specs : product.specsEn).filter(Boolean).map((spec, i) => (
              <div key={i} className="bg-white rounded-xl px-5 py-3 ring-1 ring-[#e8e8ed] text-[14px] text-[#1d1d1f]">
                {spec}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Detail Content */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          {detailHtml ? (
            <div
              className="prose prose-lg max-w-none [&_img]:rounded-xl [&_img]:shadow-lg [&_img]:my-8 [&_h1]:text-[28px] [&_h1]:font-semibold [&_h2]:text-[22px] [&_h2]:font-semibold [&_p]:text-[16px] [&_p]:leading-relaxed [&_p]:text-[#333]"
              dangerouslySetInnerHTML={{ __html: detailHtml }}
            />
          ) : (
            <div className="text-center py-16">
              <p className="text-[#86868b] text-[16px] mb-6">
                {isZh ? '暂无详细介绍，请在后台管理中编辑产品详情' : 'No detailed content yet. Please edit in admin panel.'}
              </p>
              <Link to="/admin" className="text-[14px] font-medium text-[#1d1d1f] underline">
                {isZh ? '前往编辑' : 'Edit Now'}
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[#fafafa] border-t border-[#e8e8ed]">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-[24px] md:text-[32px] font-semibold text-[#1d1d1f] mb-4 tracking-[-0.5px]">
            {isZh ? '对该产品感兴趣？' : 'Interested in this product?'}
          </h2>
          <p className="text-[15px] text-[#86868b] mb-8 max-w-md mx-auto">
            {isZh ? '我们的专家团队随时为您提供咨询和定制化解决方案' : 'Our experts are ready to provide consultation'}
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Link to="/contact"
              className="min-w-[140px] text-[14px] font-medium px-8 py-2.5 rounded-full bg-[#1d1d1f] text-white hover:bg-black transition-colors">
              {isZh ? '联系我们' : 'Contact Us'}
            </Link>
            <Link to="/"
              className="min-w-[140px] text-[14px] font-medium px-8 py-2.5 rounded-full bg-white text-[#1d1d1f] ring-1 ring-[#e8e8ed] hover:bg-[#fafafa] transition-colors flex items-center justify-center gap-2">
              <ArrowLeft size={14} /> {isZh ? '查看更多产品' : 'More Products'}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
