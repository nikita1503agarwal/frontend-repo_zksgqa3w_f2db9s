import { motion, AnimatePresence } from "framer-motion";

function Ring({ value = 0, size = 120, stroke = 10, color = "#34d399" }) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const dash = Math.max(0, Math.min(value, 100)) / 100 * c;
  return (
    <svg width={size} height={size} className="block">
      <circle cx={size/2} cy={size/2} r={r} stroke="#1f2937" strokeWidth={stroke} fill="none" />
      <motion.circle cx={size/2} cy={size/2} r={r} stroke={color} strokeWidth={stroke} fill="none"
        strokeLinecap="round"
        strokeDasharray={`${dash} ${c}`}
        initial={{ strokeDashoffset: c }}
        animate={{ strokeDashoffset: 0 }}
        transition={{ duration: 1.2 }}
      />
    </svg>
  );
}

export default function ModalBreakdown({ open, onClose, totals }) {
  const items = [
    { label: "Calorie", value: totals?.calories || 0, color: "#f59e0b" },
    { label: "Proteine", value: totals?.protein || 0, color: "#34d399" },
    { label: "Carbo", value: totals?.carbs || 0, color: "#22d3ee" },
    { label: "Grassi", value: totals?.fat || 0, color: "#06b6d4" },
  ];

  return (
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 z-40 flex items-center justify-center"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <div className="absolute inset-0 bg-black/60" onClick={onClose} />
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            transition={{ type: "spring", stiffness: 180, damping: 20 }}
            className="relative z-10 max-w-3xl w-full mx-4 bg-slate-900 border border-white/10 rounded-2xl p-6"
          >
            <div className="text-white font-semibold text-lg mb-4">Breakdown nutrizionale</div>
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="grid grid-cols-2 gap-4">
                {items.map((it, i) => (
                  <div key={i} className="bg-slate-800/60 rounded-xl p-4 border border-white/10">
                    <div className="text-slate-300 text-sm">{it.label}</div>
                    <div className="text-white text-2xl font-bold">{it.value}</div>
                    <div className="mt-3"><Ring value={Math.min(100, (it.value / 300) * 100)} color={it.color} /></div>
                  </div>
                ))}
              </div>
              <div>
                <div className="text-slate-300 text-sm mb-2">Suggerimenti</div>
                <ul className="space-y-2 text-slate-400 text-sm">
                  <li>Aumenta leggermente l'apporto proteico per sostenere l'allenamento.</li>
                  <li>Distribuisci i carboidrati intorno alle sessioni per performance.</li>
                  <li>Preferisci grassi "buoni" (olio EVO, frutta secca) entro i limiti.</li>
                </ul>
              </div>
            </div>
            <div className="mt-6 text-right">
              <button onClick={onClose} className="px-4 py-2 rounded-xl bg-slate-800 text-white border border-white/10 hover:bg-slate-700">Chiudi</button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
