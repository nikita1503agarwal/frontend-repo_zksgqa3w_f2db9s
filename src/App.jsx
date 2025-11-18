import { useMemo, useState } from "react";
import Navbar from "./components/Navbar";
import AnimatedHero from "./components/AnimatedHero";
import SearchFood from "./components/SearchFood";
import WorkoutPlanner from "./components/WorkoutPlanner";
import AnimatedCounters from "./components/AnimatedCounters";
import AnimatedListItem from "./components/AnimatedListItem";
import Calendar from "./components/Calendar";
import RadarMacros from "./components/RadarMacros";
import Sparkline from "./components/Sparkline";
import ModalBreakdown from "./components/ModalBreakdown";
import { Flame } from "lucide-react";

function App() {
  const [active, setActive] = useState("dashboard");
  const [diary, setDiary] = useState([]);
  const [workouts, setWorkouts] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().slice(0, 10));
  const [openBreakdown, setOpenBreakdown] = useState(false);

  const totals = useMemo(() => {
    const cals = diary.reduce((s, i) => s + (i.calories || 0), 0);
    const p = diary.reduce((s, i) => s + (i.protein_g || 0), 0);
    const carbs = diary.reduce((s, i) => s + (i.carbohydrates_total_g || 0), 0);
    const f = diary.reduce((s, i) => s + (i.fat_total_g || 0), 0);
    return { calories: Math.round(cals), protein: Math.round(p), carbs: Math.round(carbs), fat: Math.round(f) };
  }, [diary]);

  const weeklyCalories = useMemo(() => {
    // Fake weekly data from diary for sparkline; in real app aggregate by date
    const arr = [320, 450, 380, 520, 610, 540, 680];
    return arr;
  }, [diary]);

  const backend = import.meta.env.VITE_BACKEND_URL || "";

  const addFood = async (item) => {
    const datedItem = { ...item, date: selectedDate };
    setDiary((prev) => [...prev, datedItem]);
    try {
      const res = await fetch(`${backend}/api/diary/food`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...datedItem }),
      });
      if (!res.ok) throw new Error("Errore salvataggio");
    } catch (e) {
      // silently ignore in demo
    }
  };

  // Aggregate stats by date for Calendar
  const statsByDate = useMemo(() => {
    const map = {};
    for (const i of diary) {
      const key = i.date || selectedDate;
      map[key] = map[key] || { calories: 0, protein: 0, carbs: 0, fat: 0 };
      map[key].calories += i.calories || 0;
      map[key].protein += i.protein_g || 0;
      map[key].carbs += i.carbohydrates_total_g || 0;
      map[key].fat += i.fat_total_g || 0;
    }
    Object.keys(map).forEach(k => {
      map[k].calories = Math.round(map[k].calories);
      map[k].protein = Math.round(map[k].protein);
      map[k].carbs = Math.round(map[k].carbs);
      map[k].fat = Math.round(map[k].fat);
    });
    return map;
  }, [diary, selectedDate]);

  const dayTotals = statsByDate[selectedDate] || { calories: 0, protein: 0, carbs: 0, fat: 0 };

  return (
    <div className="min-h-screen bg-slate-950 text-white relative">
      <Navbar active={active} setActive={setActive} />

      <AnimatedHero />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 space-y-6">
        <AnimatedCounters
          items={[
            { label: "Calorie di oggi", value: `${dayTotals.calories} kcal`, extra: <div className=\"mt-2\"><Sparkline data={weeklyCalories} /></div> },
            { label: "Proteine", value: `${dayTotals.protein} g` },
            { label: "Carboidrati", value: `${dayTotals.carbs} g` },
            { label: "Grassi", value: `${dayTotals.fat} g` },
          ]}
          onItemClick={(i) => i === 0 && setOpenBreakdown(true)}
        />

        <div className="grid md:grid-cols-2 gap-6">
          <Calendar selectedDate={selectedDate} onSelect={setSelectedDate} statsByDate={statsByDate} />
          <div className="bg-slate-800/60 border border-white/10 rounded-2xl p-5">
            <div className="text-slate-300 text-sm mb-2">Radar macro del giorno</div>
            <RadarMacros protein={dayTotals.protein} carbs={dayTotals.carbs} fat={dayTotals.fat} />
          </div>
        </div>
      </section>

      <SearchFood onAdd={addFood} />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-slate-800/60 border border-white/10 rounded-2xl p-5">
          <div className="flex items-center gap-2 text-white font-semibold mb-4">
            <Flame size={18} /> Diario del {selectedDate}
          </div>
          {diary.filter(d => (d.date || selectedDate) === selectedDate).length === 0 ? (
            <div className="text-slate-400">Nessun alimento per il giorno selezionato.</div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {diary.filter(d => (d.date || selectedDate) === selectedDate).map((i, idx) => (
                <AnimatedListItem key={idx} delay={idx * 0.04} className="bg-slate-900/60 border border-white/10 rounded-xl p-4">
                  <div className="text-white font-semibold">{i.food_name}</div>
                  <div className="text-sm text-slate-400">{Math.round(i.calories)} kcal</div>
                  <div className="mt-2 text-xs text-slate-400">P {i.protein_g}g • C {i.carbohydrates_total_g}g • G {i.fat_total_g}g</div>
                </AnimatedListItem>
              ))}
            </div>
          )}
        </div>
      </section>

      <WorkoutPlanner workouts={workouts} setWorkouts={setWorkouts} />

      <footer className="py-10 text-center text-slate-500 text-sm">
        Progetto FitTrack — dimostrazione interattiva
      </footer>

      <ModalBreakdown open={openBreakdown} onClose={() => setOpenBreakdown(false)} totals={dayTotals} />
    </div>
  );
}

export default App;
