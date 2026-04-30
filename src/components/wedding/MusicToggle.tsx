import { Music, VolumeX } from "lucide-react";
import { motion } from "framer-motion";

interface MusicToggleProps {
  playing: boolean;
  toggle: () => void;
}

export function MusicToggle({ playing, toggle }: MusicToggleProps) {
  return (
    <motion.button
      onClick={toggle}
      whileTap={{ scale: 0.92 }}
      animate={playing ? { rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] } : { rotate: 0, scale: 1 }}
      transition={playing ? {
        rotate: { duration: 2, repeat: Infinity, ease: "linear" },
        scale: { duration: 2, repeat: Infinity }
      } : {}}
      aria-label={playing ? "Mute music" : "Play music"}
      className="fixed bottom-5 right-5 z-40 glass rounded-full w-12 h-12 flex items-center justify-center text-rose-700 hover:text-rose-900 transition-colors"
      style={{ boxShadow: "var(--shadow-glow)" }}
    >
      {playing ? (
        <Music className="w-5 h-5" />
      ) : (
        <VolumeX className="w-5 h-5 opacity-60" />
      )}

      {playing && (
        <motion.span
          initial={{ scale: 0.8, opacity: 0.5 }}
          animate={{ scale: 1.5, opacity: 0 }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="absolute inset-0 rounded-full bg-rose-200 -z-10"
        />
      )}
    </motion.button>
  );
}