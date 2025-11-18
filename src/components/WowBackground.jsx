import { motion } from "framer-motion";

export default function WowBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div
        className="absolute -top-40 -left-40 w-96 h-96 rounded-full"
        style={{ background: "radial-gradient( circle at 30% 30%, rgba(52,211,153,0.35), rgba(52,211,153,0.0) 60%)" }}
        animate={{ x: [0, 20, -10, 0], y: [0, -10, 10, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -bottom-40 -right-40 w-[28rem] h-[28rem] rounded-full"
        style={{ background: "radial-gradient( circle at 70% 70%, rgba(34,211,238,0.35), rgba(34,211,238,0.0) 60%)" }}
        animate={{ x: [0, -15, 10, 0], y: [0, 10, -10, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}
