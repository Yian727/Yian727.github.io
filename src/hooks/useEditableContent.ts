import { useState, useEffect, useCallback } from 'react';
import { fetchContent } from '@/lib/api';
import { loadEditableContent as loadLocalEditableContent, type EditableContent } from '@/components/admin/ContentManager';

const STORAGE_KEY = 'kh_editable_content';

/**
 * 前台页面使用的 hook：读取可编辑内容，优先从后端 API 读取
 */
export function useEditableContent(): EditableContent {
  const [content, setContent] = useState<EditableContent>(loadLocalEditableContent());
  const [apiLoaded, setApiLoaded] = useState(false);

  // 首次从 API 加载
  useEffect(() => {
    fetchContent()
      .then((data) => {
        setContent((prev) => ({ ...loadLocalEditableContent(), ...data }));
        setApiLoaded(true);
      })
      .catch(() => {
        setApiLoaded(true);
      });
  }, []);

  const refresh = useCallback(() => {
    fetchContent()
      .then((data) => {
        setContent((prev) => ({ ...prev, ...data }));
      })
      .catch(() => {
        setContent(loadLocalEditableContent());
      });
  }, []);

  useEffect(() => {
    // 监听跨标签页 storage 事件
    const handleStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) {
        refresh();
      }
    };
    window.addEventListener('storage', handleStorage);

    // 监听同标签页自定义事件
    const handleCustom = () => refresh();
    window.addEventListener('editable-content-change', handleCustom);

    // 轮询兜底（500ms）
    let lastData = localStorage.getItem(STORAGE_KEY);
    const interval = setInterval(() => {
      if (!apiLoaded) return;
      const currentData = localStorage.getItem(STORAGE_KEY);
      if (currentData !== lastData) {
        lastData = currentData;
        refresh();
      }
    }, 500);

    return () => {
      window.removeEventListener('storage', handleStorage);
      window.removeEventListener('editable-content-change', handleCustom);
      clearInterval(interval);
    };
  }, [refresh, apiLoaded]);

  return content;
}
