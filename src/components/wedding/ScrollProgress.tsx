import { motion, useScroll, useSpring } from "framer-motion";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 20 });
  return (
    <motion.div
      style={{ scaleX, transformOrigin: "0%" }}
      className="fixed top-0 left-0 right-0 h-1 z-50"
    >
      <div className="h-full w-full bg-gradient-to-r from-rose-400 via-amber-400 to-rose-400" />
    </motion.div>
  );
}
