import { useState } from "react";
import { Search, Plus, Info } from "lucide-react";

export default function SearchFood({ onAdd }) {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [error, setError] = useState("");

  const backend = import.meta.env.VITE_BACKEND_URL || "";

  const search = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${backend}/api/food/search?q=${encodeURIComponent(query)}`);
      if (!res.ok) throw new Error("Errore ricerca");
      const data = await res.json();
      setResults(data.items || []);
    } catch (err) {
      setError("Impossibile cercare ora");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="start" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-slate-800/60 border border-white/10 rounded-2xl p-5">
        <form onSubmit={search} className="flex gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-900/70 border border-white/10 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              placeholder="Cerca alimenti (es. "
            />
          </div>
          <button
            type="submit"
            className="px-4 py-3 rounded-xl bg-emerald-500 text-white font-semibold hover:bg-emerald-600 disabled:opacity-60"
            disabled={loading}
          >
            Cerca
          </button>
        </form>

        {error && <div className="mt-3 text-red-400 text-sm">{error}</div>}

        <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {results.map((item) => (
            <div key={item.id || item.food_name} className="bg-slate-900/60 border border-white/10 rounded-xl p-4 flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-300 font-bold uppercase">
                {item.food_name?.slice(0,1) || "F"}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div className="text-white font-semibold">{item.food_name}</div>
                  <button onClick={() => onAdd(item)} className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300">
                    <Plus size={16} /> Aggiungi
                  </button>
                </div>
                <div className="text-sm text-slate-400">{Math.round(item.calories)} kcal • P {item.protein_g}g • C {item.carbohydrates_total_g}g • G {item.fat_total_g}g</div>
                <button className="mt-2 inline-flex items-center gap-1 text-xs text-slate-400 hover:text-white">
                  <Info size={14} /> Dettagli
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
