import { Dumbbell, Salad, Flame, History, Star } from "lucide-react";

export default function Navbar({ active, setActive }) {
  const tabs = [
    { key: "dashboard", label: "Dashboard", icon: Flame },
    { key: "food", label: "Alimenti", icon: Salad },
    { key: "workouts", label: "Allenamenti", icon: Dumbbell },
    { key: "history", label: "Cronologia", icon: History },
    { key: "favorites", label: "Preferiti", icon: Star },
  ];

  return (
    <header className="sticky top-0 z-30 bg-slate-900/70 backdrop-blur border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-emerald-500/20">
              <Flame className="text-white" size={22} />
            </div>
            <div>
              <div className="text-white text-lg font-semibold leading-none">FitTrack</div>
              <div className="text-xs text-emerald-300/80">Fitness & Lifestyle</div>
            </div>
          </div>
          <nav className="flex gap-1 bg-slate-800/60 p-1 rounded-xl border border-white/10">
            {tabs.map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => setActive(key)}
                className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  active === key
                    ? "bg-slate-700/70 text-white"
                    : "text-slate-300 hover:text-white hover:bg-slate-700/40"
                }`}
              >
                <Icon size={18} />
                <span className="hidden sm:inline">{label}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
