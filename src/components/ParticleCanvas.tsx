import { useEffect, useRef } from 'react';

interface Props {
  density?: number;
  color?: string;
}

export default function ParticleCanvas({ density = 80, color = '255,255,255' }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let w = canvas.offsetWidth;
    let h = canvas.offsetHeight;
    let animId: number;

    const resize = () => {
      w = canvas.width = canvas.offsetWidth || 800;
      h = canvas.height = canvas.offsetHeight || 600;
    };
    resize();
    window.addEventListener('resize', resize, { passive: true });

    // 创建粒子
    interface Dot {
      x: number;
      y: number;
      vx: number;
      vy: number;
      r: number;
    }

    const dots: Dot[] = [];
    for (let i = 0; i < density; i++) {
      dots.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        r: Math.random() * 1.5 + 0.5,
      });
    }

    let mouseX = -1000, mouseY = -1000;
    const onMouse = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };
    canvas.parentElement?.addEventListener('mousemove', onMouse, { passive: true });

    const draw = () => {
      ctx.clearRect(0, 0, w, h);

      for (let i = 0; i < dots.length; i++) {
        const d = dots[i];
        d.x += d.vx;
        d.y += d.vy;
        if (d.x < 0) d.x = w;
        if (d.x > w) d.x = 0;
        if (d.y < 0) d.y = h;
        if (d.y > h) d.y = 0;

        // 鼠标排斥
        const dx = d.x - mouseX;
        const dy = d.y - mouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          const f = (120 - dist) / 120 * 1.5;
          d.x += (dx / dist) * f;
          d.y += (dy / dist) * f;
        }

        // 画点
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${color}, ${0.15 + d.r * 0.1})`;
        ctx.fill();

        // 连线
        for (let j = i + 1; j < dots.length; j++) {
          const d2 = dots[j];
          const dx2 = d.x - d2.x;
          const dy2 = d.y - d2.y;
          const d2ist = Math.sqrt(dx2 * dx2 + dy2 * dy2);
          if (d2ist < 100) {
            ctx.beginPath();
            ctx.moveTo(d.x, d.y);
            ctx.lineTo(d2.x, d2.y);
            ctx.strokeStyle = `rgba(${color}, ${0.06 * (1 - d2ist / 100)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      canvas.parentElement?.removeEventListener('mousemove', onMouse);
    };
  }, [density, color]);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
    />
  );
}
