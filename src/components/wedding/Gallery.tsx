import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import img1 from "@/assets/couple-1.jpg";
import img2 from "@/assets/couple-2.jpg";
import img3 from "@/assets/couple-3.jpg";
import img4 from "@/assets/couple-4.jpg";

const slides = [
  { src: img1, caption: "The Beginning" },
  { src: img2, caption: "Our Journey" },
  { src: img3, caption: "Hearts Entwined" },
  { src: img4, caption: "Forever Starts Here" },
];

export function Gallery() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((p) => (p + 1) % slides.length), 4500);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="relative aspect-[4/5] sm:aspect-[16/10] rounded-3xl overflow-hidden glass p-2">
        <AnimatePresence mode="wait">
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-2 rounded-2xl overflow-hidden"
          >
            <img
              src={slides[i].src}
              alt={slides[i].caption}
              loading="lazy"
              width={1024}
              height={1280}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-0 right-0 text-center">
              <p className="font-script text-3xl sm:text-5xl text-white text-shadow-soft">{slides[i].caption}</p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex justify-center gap-2 mt-5">
        {slides.map((_, idx) => (
          <button
            key={idx}
            aria-label={`Slide ${idx + 1}`}
            onClick={() => setI(idx)}
            className={`h-1.5 rounded-full transition-all ${idx === i ? "w-10 bg-gradient-to-r from-rose-400 to-amber-400" : "w-3 bg-rose-300/50"}`}
          />
        ))}
      </div>

      {/* Floating thumbnail cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-5 mt-8">
        {slides.map((s, idx) => (
          <motion.button
            key={idx}
            onClick={() => setI(idx)}
            whileHover={{ y: -6, rotate: idx % 2 === 0 ? -2 : 2, scale: 1.04 }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1, duration: 0.6 }}
            className="aspect-square rounded-2xl overflow-hidden glass p-1.5 cursor-pointer"
            style={{ boxShadow: "var(--shadow-petal)" }}
          >
            <img src={s.src} alt={s.caption} loading="lazy" width={400} height={400} className="w-full h-full object-cover rounded-xl" />
          </motion.button>
        ))}
      </div>
    </div>
  );
}
