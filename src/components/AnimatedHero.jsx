import { motion } from "framer-motion";
import AnimatedAreaChart from "./AnimatedAreaChart";
import WowBackground from "./WowBackground";

export default function AnimatedHero() {
  return (
    <section className="relative">
      <WowBackground />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 pb-8">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white"
            >
              Trasforma i tuoi progressi in un WOW visivo
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mt-4 text-slate-300 text-lg"
            >
              Grafici fluidi, micro-animazioni e una UI moderna per motivarti ogni giorno.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-6 flex items-center gap-3"
            >
              <a href="#start" className="px-5 py-3 rounded-xl bg-emerald-500 text-white font-semibold shadow hover:bg-emerald-600 transition-colors">
                Inizia ora
              </a>
              <a href="#how" className="px-5 py-3 rounded-xl bg-slate-800/70 text-white font-semibold border border-white/10 hover:bg-slate-700/70 transition-colors">
                Scopri funzioni
              </a>
            </motion.div>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="bg-slate-800/60 border border-white/10 rounded-2xl p-6 backdrop-blur"
          >
            <div className="text-slate-300 text-sm">Andamento calorico settimanale</div>
            <div className="mt-3">
              <AnimatedAreaChart />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
