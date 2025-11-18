import { motion } from "framer-motion";

export default function Sparkline({ data = [], height = 40, color = "#34d399" }) {
  const values = data.length ? data : [3, 5, 4, 6, 7, 5, 8];
  const max = Math.max(...values) || 1;
  const pts = values.map((v, i) => ({ x: (i / (values.length - 1)) * 100, y: 100 - (v / max) * 100 }));
  const d = pts.reduce((acc, p, i) => (i === 0 ? `M ${p.x},${p.y}` : acc + ` L ${p.x},${p.y}`), "");

  return (
    <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full" style={{ height }}>
      <motion.path d={d} fill="none" stroke={color} strokeWidth="2"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.8 }} />
      {pts.map((p, i) => (
        <motion.circle key={i} cx={p.x} cy={p.y} r={1.2} fill={color}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 + i * 0.04, type: "spring", stiffness: 220, damping: 16 }} />
      ))}
    </svg>
  );
}
