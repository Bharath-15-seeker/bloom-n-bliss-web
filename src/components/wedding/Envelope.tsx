import { motion } from "framer-motion";
import { Heart } from "lucide-react";

export function Envelope({ onOpen }: { onOpen: () => void }) {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center px-6"
      style={{ background: "var(--gradient-romance)" }}
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.8 } }}
    >
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 30 }).map((_, i) => (
          <span
            key={i}
            className="absolute text-rose-300"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              fontSize: `${10 + Math.random() * 10}px`,
              animation: `sparkle ${2 + Math.random() * 3}s ease-in-out ${Math.random() * 3}s infinite`,
            }}
          >
            ✦
          </span>
        ))}
      </div>

      <motion.div
        initial={{ scale: 0.8, opacity: 0, y: 30 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        className="relative flex flex-col items-center text-center"
      >
        <p className="font-script text-3xl text-rose-700/80 mb-6">A special invitation</p>

        <motion.button
          onClick={onOpen}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          className="relative cursor-pointer"
          aria-label="Open invitation"
        >
          <div
            className="relative w-[280px] h-[200px] sm:w-[360px] sm:h-[260px] rounded-md animate-pulse-glow"
            style={{ perspective: "1000px" }}
          >
            {/* Envelope body */}
            <div
              className="absolute inset-0 rounded-md overflow-hidden"
              style={{ background: "var(--gradient-envelope)", boxShadow: "var(--shadow-petal)" }}
            >
              {/* Bottom triangles */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(45deg, transparent 49%, oklch(0.82 0.09 35 / 0.6) 50%, transparent 51%), linear-gradient(-45deg, transparent 49%, oklch(0.82 0.09 35 / 0.6) 50%, transparent 51%)",
                }}
              />
              {/* Wax seal */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center text-white shadow-lg"
                  style={{
                    background: "radial-gradient(circle at 30% 30%, oklch(0.7 0.2 20), oklch(0.5 0.22 18))",
                    boxShadow: "0 6px 20px oklch(0.4 0.2 20 / 0.5), inset 0 -4px 8px oklch(0.3 0.15 20 / 0.4)",
                  }}
                >
                  <Heart className="w-7 h-7 fill-current" />
                </div>
              </div>
            </div>

            {/* Top flap (animated open on hover) */}
            <motion.div
              className="absolute top-0 left-0 right-0 origin-top"
              style={{
                height: "55%",
                background: "linear-gradient(160deg, oklch(0.88 0.08 30), oklch(0.82 0.09 40))",
                clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                transformStyle: "preserve-3d",
                boxShadow: "0 4px 12px oklch(0.6 0.1 30 / 0.3)",
              }}
              whileHover={{ rotateX: -180 }}
              transition={{ duration: 0.7, ease: "easeInOut" }}
            />
          </div>
        </motion.button>

        <motion.p
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="mt-8 text-sm tracking-[0.3em] uppercase text-rose-800/70"
        >
          Tap to open
        </motion.p>
        <p className="font-script text-2xl mt-3 text-gradient-gold">Thamu &amp; Snekha</p>
      </motion.div>
    </motion.div>
  );
}
