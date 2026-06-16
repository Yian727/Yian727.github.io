import { useState, useEffect, useCallback } from 'react';
import { fetchProducts, fetchTeam, fetchSettings, bulkUpdateProducts, bulkUpdateTeam, updateSettings as apiUpdateSettings } from '@/lib/api';

export interface Product {
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

export interface NewsItem {
  id: string;
  category: string;
  categoryEn: string;
  title: string;
  titleEn: string;
  summary: string;
  summaryEn: string;
  image: string;
  date: string;
}

export interface TeamMember {
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

export interface SiteSettings {
  companyName: string;
  companyNameEn: string;
  address: string;
  addressEn: string;
  phone: string;
  email: string;
  heroTitle: string;
  heroTitleEn: string;
  heroSubtitle: string;
  heroSubtitleEn: string;
}

export interface ContentData {
  products: Product[];
  news: NewsItem[];
  team: TeamMember[];
  settings: SiteSettings;
}

// Default data for fallback
const defaultData: ContentData = {
  products: [
    {
      id: '1', name: '焚烧炉系统', nameEn: 'Incinerator System',
      shortDesc: '研发国产系列标准炉排，国内市场占有率排名第一', shortDescEn: 'We have developed a series of domestic standard grate products, ranking first in the domestic market share.',
      specs: ['日处理量: 50~1000t/d', '蒸发量波动率：＜5%', '智慧焚烧：ACC+AI'],
      specsEn: ['Capacity: 50~1000 tons/day', 'Evaporation fluctuation rate: < 5%', 'Smart Incineration: ACC+AI'],
      image: '/images/products/burn-in-system.jpg', detail: '', detailEn: ''
    },
    {
      id: '2', name: '余热锅炉系统', nameEn: 'Waste Heat Boiler System',
      shortDesc: '垃圾焚烧余热发电', shortDescEn: 'Waste incineration waste heat power generation',
      specs: ['参数全覆盖 4.0MPa，400℃/450℃', '全厂热效率最高可提升至 33%', '具备热力计算、腐蚀曲线、壁温计算能力'],
      specsEn: ['Full coverage: 4.0MPa, 400℃/450℃', 'Max thermal efficiency up to 33%', 'Thermal calc capabilities'],
      image: '/images/products/auto-test-platform.jpg', detail: '', detailEn: ''
    },
    {
      id: '3', name: '烟气净化系统', nameEn: 'Flue Gas Purification System',
      shortDesc: '满足国标、欧盟、超低排放等不同排放标准要求', shortDescEn: 'Meet national, EU, and ultra-low emission standards',
      specs: ['采用 CFD 模拟 + 三维设计', '工艺可自由组合', '覆盖 EGR+SNCR+半干法+干法+活性炭+袋式除尘器+SCR+湿法'],
      specsEn: ['CFD simulation + 3D design', 'Freely combinable processes', 'Full purification coverage'],
      image: '/images/products/test-handler.jpg', detail: '', detailEn: ''
    },
    {
      id: '4', name: '水处理系统', nameEn: 'Water Treatment System',
      shortDesc: '实现园区/厂区零排放', shortDescEn: 'Achieve zero emissions in park/factory area',
      specs: ['清水产率约 80%', '吨水电耗低于行业平均 3-5%', '生化(UASB+AO)+膜(UF+NF+RO)+浓水减量化'],
      specsEn: ['Clear water rate ~80%', 'Power per ton 3-5% below avg', 'Biochemical+Membrane+Reduction'],
      image: '/images/products/test-fixture.jpg', detail: '', detailEn: ''
    },
  ],
  news: [],
  team: [
    { id: '1', name: '王志强', nameEn: 'Wang Zhiqiang', role: '科技公司总经理', roleEn: 'General Manager, Tech Company', bio: '科技公司总经理', bioEn: 'General Manager of Technology Company', image: '/images/team/wangzhiqiang.jpg' },
    { id: '2', name: '吴华栋', nameEn: 'Wu Huadong', role: '科技公司常务副总经理', roleEn: 'Executive Deputy GM, Tech Company', bio: '科技公司常务副总经理', bioEn: 'Executive Deputy General Manager of Technology Company', image: '/images/team/wuhuadong.jpg' },
    { id: '3', name: '李建平', nameEn: 'Li Jianping', role: '科技公司技术总监', roleEn: 'Technical Director, Tech Company', bio: '科技公司技术总监', bioEn: 'Technical Director of Technology Company', image: '/images/team/lijianping.jpg' },
    { id: '4', name: '黄立成', nameEn: 'Huang Licheng', role: '科技公司技术中心总经理', roleEn: 'GM, Technical Center, Tech Company', bio: '科技公司技术中心总经理', bioEn: 'General Manager of Technical Center, Technology Company', image: '/images/team/huanglicheng.jpg' },
    { id: '5', name: '张治华', nameEn: 'Zhang Zhihua', role: '科技公司项目管理中心总经理', roleEn: 'GM, Project Management Center, Tech Company', bio: '科技公司项目管理中心总经理', bioEn: 'General Manager of Project Management Center, Technology Company', image: '/images/team/zhangzhihua.jpg' },
    { id: '6', name: '左方超', nameEn: 'Zuo Fangchao', role: '费用控制部中心总监', roleEn: 'Director, Cost Control Center', bio: '费用控制部中心总监', bioEn: 'Director of Cost Control Center', image: '/images/team/zuofangchao.jpg' },
    { id: '7', name: '许力', nameEn: 'Xu Li', role: '科技公司总经理助理、营销中心总经理', roleEn: 'Assistant GM & Marketing Center GM, Tech Company', bio: '科技公司总经理助理、营销中心总经理', bioEn: 'Assistant General Manager & Marketing Center General Manager, Technology Company', image: '/images/team/xuli.jpg' }
  ],
  settings: {
    companyName: '上海康恒环境科技有限公司',
    companyNameEn: 'Shanghai Kangheng Environmental Technology Co., Ltd.',
    address: '上海市青浦区华新镇华隆路1788号',
    addressEn: 'No. 1788 Hualong Rd, Huaxin Town, Qingpu, Shanghai',
    phone: '+86 21 6921 xxxx',
    email: 'info@shkhenv.com',
    heroTitle: '智启绿色未来',
    heroTitleEn: 'Smart Green Future',
    heroSubtitle: '环保设备研发 · 固废处理系统 · 清洁能源解决方案',
    heroSubtitleEn: 'Environmental Equipment · Waste Treatment · Clean Energy'
  }
};

export function useContentStore() {
  const [data, setData] = useState<ContentData>({ ...defaultData });
  const [loading, setLoading] = useState(true);

  // Fetch data from API on mount
  useEffect(() => {
    Promise.all([
      fetchProducts().catch(() => defaultData.products),
      fetchTeam().catch(() => defaultData.team),
      fetchSettings().catch(() => defaultData.settings),
    ]).then(([products, team, settings]) => {
      setData({ ...defaultData, products, team, settings });
      setLoading(false);
    }).catch(() => {
      setLoading(false);
    });
  }, []);

  const updateProducts = useCallback((products: Product[]) => {
    bulkUpdateProducts(products).then(() => {
      setData(prev => ({ ...prev, products }));
      window.dispatchEvent(new CustomEvent('content-data-change'));
    }).catch(() => {
      setData(prev => ({ ...prev, products }));
    });
  }, []);

  const updateNews = useCallback((_news: NewsItem[]) => {
    // News not yet supported by backend
  }, []);

  const updateTeam = useCallback((team: TeamMember[]) => {
    bulkUpdateTeam(team).then(() => {
      setData(prev => ({ ...prev, team }));
      window.dispatchEvent(new CustomEvent('content-data-change'));
    }).catch(() => {
      setData(prev => ({ ...prev, team }));
    });
  }, []);

  const updateSettings = useCallback((settings: SiteSettings) => {
    apiUpdateSettings(settings).then(() => {
      setData(prev => ({ ...prev, settings }));
      window.dispatchEvent(new CustomEvent('content-data-change'));
    }).catch(() => {
      setData(prev => ({ ...prev, settings }));
    });
  }, []);

  const exportJSON = useCallback(() => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `kh_env_backup_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }, [data]);

  const importJSON = useCallback((jsonString: string) => {
    try {
      const parsed = JSON.parse(jsonString);
      if (parsed.products) {
        setData(prev => ({ ...prev, ...parsed }));
        bulkUpdateProducts(parsed.products).catch(() => {});
        if (parsed.team) bulkUpdateTeam(parsed.team).catch(() => {});
        if (parsed.settings) apiUpdateSettings(parsed.settings).catch(() => {});
        return true;
      }
      return false;
    } catch {
      return false;
    }
  }, []);

  const resetToDefault = useCallback(() => {
    bulkUpdateProducts(defaultData.products).catch(() => {});
    bulkUpdateTeam(defaultData.team).catch(() => {});
    setData({ ...defaultData });
  }, []);

  return {
    data,
    loading,
    updateProducts,
    updateNews,
    updateTeam,
    updateSettings,
    exportJSON,
    importJSON,
    resetToDefault
  };
}
