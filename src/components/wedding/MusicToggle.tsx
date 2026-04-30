import { useEffect, useRef, useState } from "react";
import { Music, VolumeX } from "lucide-react";
import { motion } from "framer-motion";

export function MusicToggle() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const audio = new Audio("https://cdn.pixabay.com/audio/2022/10/25/audio_946bc6c8b6.mp3");
    audio.loop = true;
    audio.volume = 0.35;
    audioRef.current = audio;
    return () => {
      audio.pause();
    };
  }, []);

  const toggle = () => {
    const a = audioRef.current;
    if (!a) return;
    if (playing) {
      a.pause();
      setPlaying(false);
    } else {
      a.play().then(() => setPlaying(true)).catch(() => {});
    }
  };

  return (
    <motion.button
      onClick={toggle}
      whileTap={{ scale: 0.92 }}
      animate={playing ? { rotate: [0, 10, -10, 0] } : {}}
      transition={{ duration: 2, repeat: playing ? Infinity : 0 }}
      aria-label={playing ? "Mute music" : "Play music"}
      className="fixed bottom-5 right-5 z-40 glass rounded-full w-12 h-12 flex items-center justify-center text-rose-700 hover:text-rose-900 transition-colors"
      style={{ boxShadow: "var(--shadow-glow)" }}
    >
      {playing ? <Music className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
    </motion.button>
  );
}
