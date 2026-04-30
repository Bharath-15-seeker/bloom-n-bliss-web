import { motion } from "framer-motion";
import { ReactNode } from "react";
import ornament from "@/assets/ornament.png";

export function Section({ id, eyebrow, title, children }: { id?: string; eyebrow?: string; title?: string; children: ReactNode }) {
  return (
    <section id={id} className="relative py-20 sm:py-28 px-5">
      <div className="max-w-5xl mx-auto">
        {(eyebrow || title) && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7 }}
            className="text-center mb-12"
          >
            <img src={ornament} alt="" width={56} height={56} className="mx-auto opacity-80 mb-3" />
            {eyebrow && <p className="text-xs sm:text-sm uppercase tracking-[0.4em] text-rose-700/70 mb-2">{eyebrow}</p>}
            {title && <h2 className="font-script text-5xl sm:text-7xl text-gradient-gold leading-tight">{title}</h2>}
            <div className="gold-divider w-40 mx-auto mt-4" />
          </motion.div>
        )}
        {children}
      </div>
    </section>
  );
}
