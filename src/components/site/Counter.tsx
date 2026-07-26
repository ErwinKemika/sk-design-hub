import { useEffect, useRef, useState } from "react";

export function Counter({ end, suffix = "+", label }: { end: number; suffix?: string; label: string }) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !started.current) {
            started.current = true;
            const duration = 1600;
            const start = performance.now();
            const tick = (now: number) => {
              const p = Math.min((now - start) / duration, 1);
              setVal(Math.floor(p * end));
              if (p < 1) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
          }
        });
      },
      { threshold: 0.3 }
    );
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, [end]);

  return (
    <div ref={ref} className="text-center">
      <div className="font-serif text-5xl font-bold text-gradient-gold md:text-6xl">
        {val}
        {suffix}
      </div>
      <div className="eyebrow mt-3">{label}</div>
    </div>
  );
}
