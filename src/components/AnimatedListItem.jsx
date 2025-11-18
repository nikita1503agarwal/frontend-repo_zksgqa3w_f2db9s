import { motion } from "framer-motion";

export default function AnimatedListItem({ delay = 0, children, className = "" }) {
  return (
    <motion.div
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.45, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
