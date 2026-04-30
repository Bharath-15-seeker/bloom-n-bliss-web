import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

function getDiff(target: Date) {
  const now = new Date().getTime();
  const diff = Math.max(0, target.getTime() - now);
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff / 3600000) % 24),
    minutes: Math.floor((diff / 60000) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

function Cell({ value, label }: { value: number; label: string }) {
  const display = String(value).padStart(2, "0");
  return (
    <div className="flex flex-col items-center">
      <div className="glass rounded-2xl px-3 py-3 sm:px-5 sm:py-4 min-w-[64px] sm:min-w-[88px] text-center relative overflow-hidden">
        <div className="absolute inset-0 animate-shimmer pointer-events-none" />
        <AnimatePresence mode="popLayout">
          <motion.div
            key={display}
            initial={{ y: -20, opacity: 0, rotateX: -90 }}
            animate={{ y: 0, opacity: 1, rotateX: 0 }}
            exit={{ y: 20, opacity: 0, rotateX: 90 }}
            transition={{ duration: 0.4 }}
            className="font-serif text-3xl sm:text-5xl text-gradient-gold font-bold"
          >
            {display}
          </motion.div>
        </AnimatePresence>
      </div>
      <span className="mt-2 text-[10px] sm:text-xs uppercase tracking-[0.2em] text-rose-800/70">{label}</span>
    </div>
  );
}

export function Countdown({ target, title, icon }: { target: Date; title: string; icon: string }) {
  const [t, setT] = useState(getDiff(target));
  useEffect(() => {
    const id = setInterval(() => setT(getDiff(target)), 1000);
    return () => clearInterval(id);
  }, [target]);

  return (
    <div className="glass rounded-3xl p-6 sm:p-8 text-center">
      <div className="text-3xl mb-1">{icon}</div>
      <h3 className="font-script text-2xl sm:text-3xl text-gradient-gold mb-1">{title}</h3>
      <p className="text-xs sm:text-sm text-rose-900/60 mb-5">
        {target.toLocaleString("en-IN", { dateStyle: "long", timeStyle: "short" })}
      </p>
      <div className="flex justify-center gap-2 sm:gap-3">
        <Cell value={t.days} label="Days" />
        <Cell value={t.hours} label="Hours" />
        <Cell value={t.minutes} label="Mins" />
        <Cell value={t.seconds} label="Secs" />
      </div>
    </div>
  );
}
