import { motion } from "framer-motion";

export default function AnimatedCounters({ items, onItemClick }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
      {items.map((it, i) => (
        <motion.button
          type="button"
          key={i}
          className="bg-slate-800/60 border border-white/10 rounded-2xl p-4 text-left"
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.45, delay: 0.1 + i * 0.06 }}
          whileHover={{ y: -2, scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onItemClick && onItemClick(i)}
       >
          <div className="text-slate-400 text-sm">{it.label}</div>
          <div className={`mt-1 text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-cyan-300`}>{it.value}</div>
          {it.extra}
        </motion.button>
      ))}
    </div>
  );
}
