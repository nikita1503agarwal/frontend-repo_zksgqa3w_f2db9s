import { useMemo, useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import SearchFood from "./components/SearchFood";
import WorkoutPlanner from "./components/WorkoutPlanner";
import { Flame } from "lucide-react";

function Stat({ label, value, accent = "emerald" }) {
  return (
    <div className="bg-slate-800/60 border border-white/10 rounded-2xl p-4">
      <div className="text-slate-400 text-sm">{label}</div>
      <div className={`mt-1 text-2xl font-bold text-${accent}-300`}>{value}</div>
    </div>
  );
}

function App() {
  const [active, setActive] = useState("dashboard");
  const [diary, setDiary] = useState([]);
  const [workouts, setWorkouts] = useState([]);

  const totals = useMemo(() => {
    const cals = diary.reduce((s, i) => s + (i.calories || 0), 0);
    const p = diary.reduce((s, i) => s + (i.protein_g || 0), 0);
    const carbs = diary.reduce((s, i) => s + (i.carbohydrates_total_g || 0), 0);
    const f = diary.reduce((s, i) => s + (i.fat_total_g || 0), 0);
    return { calories: Math.round(cals), protein: Math.round(p), carbs: Math.round(carbs), fat: Math.round(f) };
  }, [diary]);

  const backend = import.meta.env.VITE_BACKEND_URL || "";

  const addFood = async (item) => {
    setDiary((prev) => [...prev, item]);
    try {
      const res = await fetch(`${backend}/api/diary/food`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...item }),
      });
      if (!res.ok) throw new Error("Errore salvataggio");
    } catch (e) {
      // silently ignore in demo
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <Navbar active={active} setActive={setActive} />

      <Hero />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <Stat label="Calorie di oggi" value={`${totals.calories} kcal`} />
          <Stat label="Proteine" value={`${totals.protein} g`} />
          <Stat label="Carboidrati" value={`${totals.carbs} g`} />
          <Stat label="Grassi" value={`${totals.fat} g`} />
        </div>
      </section>

      <SearchFood onAdd={addFood} />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-slate-800/60 border border-white/10 rounded-2xl p-5">
          <div className="flex items-center gap-2 text-white font-semibold mb-4">
            <Flame size={18} /> Diario di oggi
          </div>
          {diary.length === 0 ? (
            <div className="text-slate-400">Nessun alimento aggiunto. Cerca e aggiungi dalla sezione sopra.</div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {diary.map((i, idx) => (
                <div key={idx} className="bg-slate-900/60 border border-white/10 rounded-xl p-4">
                  <div className="text-white font-semibold">{i.food_name}</div>
                  <div className="text-sm text-slate-400">{Math.round(i.calories)} kcal</div>
                  <div className="mt-2 text-xs text-slate-400">P {i.protein_g}g • C {i.carbohydrates_total_g}g • G {i.fat_total_g}g</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <WorkoutPlanner workouts={workouts} setWorkouts={setWorkouts} />

      <footer className="py-10 text-center text-slate-500 text-sm">
        Progetto FitTrack — dimostrazione interattiva
      </footer>
    </div>
  );
}

export default App;
