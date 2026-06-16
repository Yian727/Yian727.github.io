import { useRef, useState } from 'react';
import { Upload, X, Image } from 'lucide-react';

interface ImageUploaderProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
}

export default function ImageUploader({ value, onChange, label = '图片' }: ImageUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState(value || '');

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // 检查文件大小（限制10MB）
    if (file.size > 10 * 1024 * 1024) {
      alert('图片太大，请压缩至10MB以下');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('image', file);
      const res = await fetch('/api/upload', { method: 'POST', body: formData });
      const data = await res.json();
      if (data.url) {
        setPreview(data.url);
        onChange(data.url);
      }
    } catch (err) {
      console.error('Upload failed, falling back to base64:', err);
      // Fallback: use base64
      const reader = new FileReader();
      reader.onload = (ev) => {
        const base64 = ev.target?.result as string;
        setPreview(base64);
        onChange(base64);
      };
      reader.readAsDataURL(file);
    }
    e.target.value = '';
  };

  const handleClear = () => {
    setPreview('');
    onChange('');
  };

  const handleUrlInput = (url: string) => {
    setPreview(url);
    onChange(url);
  };

  return (
    <div>
      <label className="block text-xs text-[#86868b] mb-1.5">
        {label}
      </label>

      {preview ? (
        <div className="relative">
          <img
            src={preview}
            alt="Preview"
            className="w-full h-48 object-cover rounded-xl bg-[#f5f5f7]"
          />
          <button
            onClick={handleClear}
            className="absolute top-2 right-2 w-7 h-7 bg-black/60 hover:bg-black/80 text-white rounded-full flex items-center justify-center transition-colors"
          >
            <X size={14} />
          </button>
          <p className="text-[11px] text-[#86868b] mt-1.5">
            {preview.startsWith('data:') ? '已上传本地图片 (Base64)' : preview.startsWith('/uploads/') ? '已上传服务器' : '外部图片链接'}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {/* 上传按钮 */}
          <button
            onClick={() => inputRef.current?.click()}
            className="w-full flex flex-col items-center justify-center gap-2 py-8 border-2 border-dashed border-[#d2d2d7] rounded-xl hover:border-[#1d1d1f] hover:bg-[#fafafa] transition-all cursor-pointer"
          >
            <Upload size={24} className="text-[#86868b]" />
            <span className="text-sm text-[#86868b]">点击上传图片</span>
            <span className="text-[11px] text-[#c7c7cc]">支持 JPG、PNG、WebP，最大 10MB</span>
          </button>

          {/* 或者粘贴URL */}
          <div className="flex items-center gap-2">
            <div className="h-px flex-1 bg-[#f5f5f7]" />
            <span className="text-[11px] text-[#c7c7cc]">或粘贴图片链接</span>
            <div className="h-px flex-1 bg-[#f5f5f7]" />
          </div>
          <div className="flex gap-2">
            <Image size={16} className="text-[#c7c7cc] mt-2.5 shrink-0" />
            <input
              type="text"
              placeholder="https://..."
              onChange={e => handleUrlInput(e.target.value)}
              className="admin-input flex-1"
            />
          </div>
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/jpg,image/webp"
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
}
