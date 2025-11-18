import { useMemo } from "react";
import { motion } from "framer-motion";

function formatDate(d) {
  return d.toISOString().slice(0, 10);
}

function getWeek(startFromDate) {
  const start = new Date(startFromDate);
  // move to Monday
  const day = start.getDay();
  const diff = (day === 0 ? -6 : 1) - day; // Monday as first day
  start.setDate(start.getDate() + diff);
  const days = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    days.push(d);
  }
  return days;
}

export default function Calendar({ selectedDate, onSelect, statsByDate = {} }) {
  const today = new Date();
  const week = useMemo(() => getWeek(today), []);
  const weekday = ["Lun", "Mar", "Mer", "Gio", "Ven", "Sab", "Dom"];

  return (
    <div className="bg-slate-800/60 border border-white/10 rounded-2xl p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="text-white font-semibold">Settimana</div>
        <div className="text-slate-400 text-sm">Seleziona un giorno</div>
      </div>
      <div className="grid grid-cols-7 gap-2">
        {week.map((d, i) => {
          const key = formatDate(d);
          const active = selectedDate === key;
          const cals = statsByDate[key]?.calories || 0;
          return (
            <motion.button
              key={key}
              whileHover={{ y: -2, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSelect(key)}
              className={`relative rounded-xl px-2 py-2 text-left border transition-colors ${
                active ? "bg-slate-700/70 border-emerald-400/40" : "bg-slate-900/60 border-white/10 hover:border-white/20"
              }`}
            >
              <div className="text-[10px] text-slate-400">{weekday[i]}</div>
              <div className="text-white text-sm">{d.getDate()}</div>
              <div className="mt-1 text-[10px] text-emerald-300">{cals ? `${cals} kcal` : "-"}</div>
              {active && (
                <motion.div layoutId="calendarActive" className="absolute inset-0 rounded-xl ring-2 ring-emerald-400/40 pointer-events-none" />
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
