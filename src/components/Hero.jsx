export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
              La tua dashboard per nutrizione e allenamenti
            </h1>
            <p className="mt-4 text-slate-300 text-lg">
              Cerca alimenti, costruisci il diario, pianifica gli allenamenti e tieni d'occhio i progressi con grafici animati.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <a href="#start" className="px-5 py-3 rounded-xl bg-emerald-500 text-white font-semibold shadow hover:bg-emerald-600 transition-colors">
                Inizia ora
              </a>
              <a href="#how" className="px-5 py-3 rounded-xl bg-slate-800/70 text-white font-semibold border border-white/10 hover:bg-slate-700/70 transition-colors">
                Scopri funzioni
              </a>
            </div>
          </div>
          <div className="bg-slate-800/60 border border-white/10 rounded-2xl p-6">
            <div className="text-slate-300 text-sm">Anteprima dashboard settimanale</div>
            <div className="h-40 mt-4 grid grid-cols-7 gap-2">
              {[...Array(7)].map((_, i) => (
                <div key={i} className="flex flex-col justify-end gap-2">
                  <div className="h-24 bg-gradient-to-t from-emerald-500/30 to-emerald-400/70 rounded-md" style={{ height: `${30 + Math.random() * 70}%` }} />
                  <div className="h-2 bg-emerald-400/30 rounded" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
