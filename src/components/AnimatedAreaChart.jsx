import { useEffect, useMemo } from "react";
import { motion, useAnimation } from "framer-motion";

/**
 * AnimatedAreaChart
 * - Lightweight WOW area chart using framer-motion (no extra deps)
 * - Expects values for 7 days. Smooth cubic path + gradient fill + glow.
 */
export default function AnimatedAreaChart({ values = [], height = 180 }) {
  const controls = useAnimation();

  const data = useMemo(() => {
    const v = values.length ? values : [320, 450, 380, 520, 610, 540, 680];
    const max = Math.max(...v) * 1.15;
    const points = v.map((val, i) => ({
      x: (i / (v.length - 1)) * 100,
      y: 100 - (val / max) * 100,
    }));
    return { v, max, points };
  }, [values]);

  const d = useMemo(() => {
    const { points } = data;
    const to = (p) => `${p.x},${p.y}`;
    if (points.length === 0) return "";

    let path = `M ${to(points[0])}`;
    for (let i = 1; i < points.length; i++) {
      const p0 = points[i - 1];
      const p1 = points[i];
      const cx = (p0.x + p1.x) / 2;
      path += ` C ${cx},${p0.y} ${cx},${p1.y} ${to(p1)}`;
    }
    // area path for fill
    const area = `${path} L 100,100 L 0,100 Z`;
    return { line: path, area };
  }, [data]);

  useEffect(() => {
    controls.start({ pathLength: 1, transition: { duration: 1.6, ease: "easeInOut" } });
  }, [controls, d]);

  return (
    <div className="w-full">
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full" style={{ height }}>
        <defs>
          <linearGradient id="gradLine" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#34d399" />
            <stop offset="100%" stopColor="#22d3ee" />
          </linearGradient>
          <linearGradient id="gradFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#34d399" stopOpacity="0.35" />
            <stop offset="80%" stopColor="#22d3ee" stopOpacity="0.05" />
            <stop offset="100%" stopColor="#22d3ee" stopOpacity="0" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="1.8" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <motion.path
          d={d.area}
          fill="url(#gradFill)"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9 }}
        />

        <motion.path
          d={d.line}
          fill="none"
          stroke="url(#gradLine)"
          strokeWidth="1.6"
          filter="url(#glow)"
          initial={{ pathLength: 0 }}
          animate={controls}
        />

        {data.points.map((p, i) => (
          <motion.circle
            key={i}
            cx={p.x}
            cy={p.y}
            r={0.9}
            fill="#34d399"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 + i * 0.06, type: "spring", stiffness: 200, damping: 15 }}
          />
        ))}
      </svg>
      <div className="grid grid-cols-7 gap-2 mt-2 text-[10px] text-slate-400">
        {"L M M G V S D".split(" ").map((d, i) => (
          <div key={i} className="text-center">{d}</div>
        ))}
      </div>
    </div>
  );
}
