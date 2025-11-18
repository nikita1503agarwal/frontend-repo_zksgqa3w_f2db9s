import { motion } from "framer-motion";

// Lightweight radar chart without external deps (approximate)
export default function RadarMacros({ protein = 100, carbs = 200, fat = 70, max = 250 }) {
  const angles = [ -90, 30, 150 ]; // 3 axes
  const vals = [protein, carbs, fat].map(v => Math.max(0, Math.min(v, max)) / max);
  const center = { x: 100, y: 100 };
  const r = 80;
  const pts = vals.map((v, i) => {
    const rad = (angles[i] * Math.PI) / 180;
    return {
      x: center.x + Math.cos(rad) * r * v,
      y: center.y + Math.sin(rad) * r * v,
    };
  });
  const d = `M ${pts[0].x},${pts[0].y} L ${pts[1].x},${pts[1].y} L ${pts[2].x},${pts[2].y} Z`;

  return (
    <div className="w-full">
      <svg viewBox="0 0 200 200" className="w-full" style={{ height: 220 }}>
        <defs>
          <linearGradient id="rg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#34d399" />
            <stop offset="100%" stopColor="#22d3ee" />
          </linearGradient>
        </defs>
        {/* Axes */}
        {angles.map((a, i) => {
          const rad = (a * Math.PI) / 180;
          const x = center.x + Math.cos(rad) * r;
          const y = center.y + Math.sin(rad) * r;
          return <line key={i} x1={center.x} y1={center.y} x2={x} y2={y} stroke="#334155" strokeWidth="1" />
        })}
        {/* Grid */}
        {[0.25, 0.5, 0.75, 1].map((t, i) => (
          <polygon key={i}
            points={angles.map(a => {
              const rad = (a * Math.PI) / 180;
              const x = center.x + Math.cos(rad) * r * t;
              const y = center.y + Math.sin(rad) * r * t;
              return `${x},${y}`;
            }).join(" ")}
            fill="none"
            stroke="#1f2937"
            strokeWidth="1"
          />
        ))}

        {/* Area */}
        <motion.path d={d} fill="url(#rg)" fillOpacity={0.25} stroke="url(#rg)" strokeWidth={2}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.2 }}
        />
      </svg>
      <div className="grid grid-cols-3 gap-2 text-xs text-slate-300">
        <div>Proteine: <span className="text-emerald-300 font-semibold">{protein}g</span></div>
        <div>Carbo: <span className="text-cyan-300 font-semibold">{carbs}g</span></div>
        <div>Grassi: <span className="text-teal-300 font-semibold">{fat}g</span></div>
      </div>
    </div>
  )
}
