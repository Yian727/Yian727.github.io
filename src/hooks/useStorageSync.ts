import { useEffect } from 'react';

const STORAGE_KEY = 'kh_env_content';

/**
 * 监听 localStorage 变化，实现跨标签页同步
 */
export function useStorageSync(callback: () => void) {
  useEffect(() => {
    // 监听 storage 事件（其他标签页修改时触发）
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) {
        callback();
      }
    };

    window.addEventListener('storage', handleStorageChange);

    // 使用轮询检测同一标签页内的变化
    let lastData = localStorage.getItem(STORAGE_KEY);
    const interval = setInterval(() => {
      const currentData = localStorage.getItem(STORAGE_KEY);
      if (currentData !== lastData) {
        lastData = currentData;
        callback();
      }
    }, 500); // 每 500ms 检查一次

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, [callback]);
}
