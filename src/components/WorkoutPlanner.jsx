import { useMemo } from "react";
import { Dumbbell, Flame } from "lucide-react";

export default function WorkoutPlanner({ workouts, setWorkouts }) {
  const totalBurned = useMemo(
    () => workouts.reduce((sum, w) => sum + (w.calories || 0), 0),
    [workouts]
  );

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-slate-800/60 border border-white/10 rounded-2xl p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 text-white font-semibold">
            <Dumbbell size={18} /> Allenamenti
          </div>
          <div className="text-sm text-emerald-300 flex items-center gap-2">
            <Flame size={16} /> Calorie bruciate: <span className="font-semibold">{totalBurned}</span>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {workouts.map((w, idx) => (
            <div key={idx} className="bg-slate-900/60 border border-white/10 rounded-xl p-4">
              <div className="text-white font-semibold">{w.name}</div>
              <div className="text-sm text-slate-400">{w.duration} min</div>
              <div className="mt-2 text-emerald-300 text-sm">{w.calories} kcal</div>
            </div>
          ))}
          {workouts.length === 0 && (
            <div className="text-slate-400">Aggiungi esercizi dalla barra di ricerca qui sopra.</div>
          )}
        </div>
      </div>
    </section>
  );
}
