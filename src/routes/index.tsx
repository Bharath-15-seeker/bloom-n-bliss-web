import { createFileRoute } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Calendar, Heart } from "lucide-react";
import { Envelope } from "@/components/wedding/Envelope";
import { FloatingHearts } from "@/components/wedding/FloatingHearts";
import { Countdown } from "@/components/wedding/Countdown";
import { ScratchCard } from "@/components/wedding/ScratchCard";
import { Gallery } from "@/components/wedding/Gallery";
import { MusicToggle } from "@/components/wedding/MusicToggle";
import { ScrollProgress } from "@/components/wedding/ScrollProgress";
import { Section } from "@/components/wedding/Section";
import hero from "@/assets/couple-1.jpg";
import ornament from "@/assets/ornament.png";
import { useState, useRef, useEffect } from "react";
import anishaSong from "@/assets/anisatheme.mp3";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Thamu & Snekha — Wedding Invitation" },
      { name: "description", content: "Together with love, we invite you to celebrate the wedding of V. Thamu & M. Snekha on 29 May 2026 at Sri Mahal, Kovilpatti." },
      { property: "og:title", content: "Thamu & Snekha — Wedding Invitation" },
      { property: "og:description", content: "Join us on 29 May 2026 at Sri Mahal, Kovilpatti." },
      { property: "og:type", content: "website" },
    ],
  }),
});

const ENGAGEMENT = new Date("2026-05-28T19:00:00+05:30");
const WEDDING = new Date("2026-05-29T09:30:00+05:30");
const VENUE_URL = "https://maps.app.goo.gl/soSLsRyeNnXZ2tVU7";
const MAP_EMBED = "https://www.google.com/maps?q=Sri+Mahal+Kovilpatti&output=embed";

function saveToCalendar() {
  const ics = `BEGIN:VCALENDAR\nVERSION:2.0\nBEGIN:VEVENT\nSUMMARY:Thamu & Snekha Wedding\nDTSTART:20260529T040000Z\nDTEND:20260529T070000Z\nLOCATION:Sri Mahal, Kovilpatti\nDESCRIPTION:Wedding ceremony of V. Thamu & M. Snekha\nEND:VEVENT\nEND:VCALENDAR`;
  const blob = new Blob([ics], { type: "text/calendar" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "Thamu-Snekha-Wedding.ics";
  a.click();
  URL.revokeObjectURL(url);
}

let globalAudio: HTMLAudioElement | null = null;

function Index() {
  
  const [opened, setOpened] = useState(false);
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

 useEffect(() => {
  if (!globalAudio) {
    globalAudio = new Audio(anishaSong);
    globalAudio.loop = true;
    globalAudio.volume = 0.35;
  }
  audioRef.current = globalAudio;

  // ← Remove the cleanup entirely, or leave it empty
  return () => {};
}, []);
  const handleOpen = () => {
    setOpened(true);
    // Start music immediately when opened
    audioRef.current?.play()
      .then(() => setPlaying(true))
      .catch((err) => console.log("Playback delayed until interaction:", err));
  };
  const toggleMusic = () => {
  if (!audioRef.current) return;
  if (audioRef.current.paused) {
    audioRef.current.play();
    setPlaying(true);
  } else {
    audioRef.current.pause();
    setPlaying(false);
  }
};
  return (
    <div className="relative min-h-screen overflow-x-hidden">
     <AnimatePresence>
    {!opened && (
      <div className="w-full min-h-screen flex items-center justify-center">
        <Envelope onOpen={handleOpen} />
      </div>
    )}
  </AnimatePresence>
      {opened && (
        <>
          <ScrollProgress />
          <MusicToggle playing={playing} toggle={toggleMusic} />
          <FloatingHearts count={10} type="heart" />
          <FloatingHearts count={8} type="petal" />

          {/* HERO */}
          <section className="relative min-h-[100svh] flex items-center justify-center px-5 overflow-hidden">
            <div className="absolute inset-0 z-0">
              <img
                src={hero}
                alt="Thamu and Snekha"
                width={1024}
                height={1280}
                className="w-full h-full object-cover animate-ken-burns"
              />
              <div className="absolute inset-0 backdrop-blur-md" style={{ background: "linear-gradient(180deg, oklch(1 0 0 / 0.3), oklch(0.95 0.05 30 / 0.5) 60%, oklch(1 0 0 / 0.4))" }} />
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="relative z-10 text-center max-w-3xl"
            >
              <div className="glass rounded-3xl p-8 sm:p-12">
                <img src={ornament} alt="" width={64} height={64} className="mx-auto opacity-90 mb-4" />
                <p className="text-xs sm:text-sm uppercase tracking-[0.4em] text-rose-800/80 mb-3">Wedding Invitation</p>
                <h1 className="font-script font-normal text-6xl sm:text-8xl text-gradient-gold">Thamu</h1>
                <p className="font-script text-2xl text-rose-500">
  &amp;
</p>
                <h1 className="font-script font-normal text-6xl sm:text-8xl text-gradient-gold">Snekha</h1>
                <div className="gold-divider w-48 mx-auto my-6" />
                <p className="text-sm sm:text-base text-rose-900/80 italic font-serif">
                  "Together with love, we invite you to celebrate our special moments…"
                </p>
                <p className="mt-4 font-serif text-lg sm:text-xl text-rose-900">
                  29 · 05 · 2026
                </p>
              </div>
            </motion.div>
          </section>

          {/* GALLERY */}
          <Section id="gallery" eyebrow="Our Story" title="Cherished Moments">
            <Gallery />
          </Section>

          {/* COUPLE DETAILS */}
          <Section id="couple" eyebrow="With the blessings of our parents" title="The Couple">
            <div className="grid sm:grid-cols-2 gap-6 sm:gap-8">
              {[
                { role: "The Groom", name: "V. Thamu", parents: "Son of M. Vaithilingam & V. Uma", icon: "🤵" },
                { role: "The Bride", name: "M. Snekha", parents: "Daughter of T. Marichammy & M. Santhi", icon: "👰" },
              ].map((p, i) => (
                <motion.div
                  key={p.name}
                  initial={{ opacity: 0, x: i === 0 ? -40 : 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7 }}
                  className="glass rounded-3xl p-8 text-center"
                >
                  <div className="text-5xl mb-3">{p.icon}</div>
                  <p className="text-xs uppercase tracking-[0.3em] text-rose-700/70">{p.role}</p>
                  <h3 className="font-script text-5xl sm:text-6xl text-gradient-gold my-3">{p.name}</h3>
                  <div className="gold-divider w-32 mx-auto mb-3" />
                  <p className="font-serif italic text-base sm:text-lg text-rose-900/80">{p.parents}</p>
                </motion.div>
              ))}
            </div>
          </Section>

          {/* EVENTS */}
          <Section id="events" eyebrow="Save the dates" title="Our Celebrations">
            <div className="grid sm:grid-cols-2 gap-6 sm:gap-8">
              {[
                { icon: "💍", title: "Engagement", date: "28 May 2026", time: "7:00 PM" },
                { icon: "💒", title: "Wedding", date: "29 May 2026", time: "9:30 AM" },
              ].map((e, i) => (
                <motion.div
                  key={e.title}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.15 }}
                  className="glass rounded-3xl p-8 text-center hover:scale-[1.02] transition-transform"
                >
                  <div className="text-6xl mb-3">{e.icon}</div>
                  <h3 className="font-script text-4xl text-gradient-gold mb-2">{e.title}</h3>
                  <div className="gold-divider w-24 mx-auto mb-3" />
                  <p className="font-serif text-xl text-rose-900">{e.date}</p>
                  <p className="text-sm text-rose-800/70 mt-1">{e.time}</p>
                </motion.div>
              ))}
            </div>
          </Section>

          {/* COUNTDOWN */}
          <Section id="countdown" eyebrow="Counting every moment" title="Until We Say I Do">
            <div className="grid sm:grid-cols-2 gap-6 sm:gap-8">
              <Countdown target={ENGAGEMENT} title="Engagement" icon="💍" />
              <Countdown target={WEDDING} title="Wedding" icon="💒" />
            </div>
          </Section>

          {/* SCRATCH */}
          <Section id="reveal" eyebrow="A little surprise" title="Scratch & Reveal">
            <p className="text-center text-rose-800/70 mb-8 font-serif italic">Use your finger or cursor to uncover the date ✨</p>
            <ScratchCard />
          </Section>

          {/* VENUE */}
          <Section id="venue" eyebrow="Where love unites" title="The Venue">
            <div className="glass rounded-3xl overflow-hidden">
              <div className="p-6 sm:p-8 text-center">
                <MapPin className="w-7 h-7 mx-auto text-rose-600 mb-2" />
                <h3 className="font-script text-4xl text-gradient-gold">Sri Mahal</h3>
                <p className="font-serif text-lg text-rose-900/80">Kovilpatti, Tamil Nadu</p>
              </div>
              <div className="aspect-[16/10] sm:aspect-[16/8] w-full">
                <iframe
                  title="Venue map"
                  src={MAP_EMBED}
                  loading="lazy"
                  className="w-full h-full border-0"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
              <div className="p-6 flex flex-col sm:flex-row gap-3 justify-center">
                <a
                  href={VENUE_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-white font-medium transition-transform hover:scale-105"
                  style={{ background: "var(--gradient-gold)", boxShadow: "var(--shadow-glow)" }}
                >
                  <MapPin className="w-4 h-4" /> Open in Maps
                </a>
                <button
                  onClick={saveToCalendar}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-medium glass text-rose-900 hover:scale-105 transition-transform"
                >
                  <Calendar className="w-4 h-4" /> Save the Date
                </button>
              </div>
            </div>
          </Section>

          {/* FOOTER */}
          <footer className="relative py-16 px-5 text-center">
            <img src={ornament} alt="" width={56} height={56} className="mx-auto opacity-80 mb-4" />
            <p className="font-script text-4xl text-gradient-gold">Thamu &amp; Snekha</p>
            <div className="gold-divider w-40 mx-auto my-4" />
            <p className="font-serif italic text-rose-900/70 max-w-md mx-auto">
              Your presence is the greatest gift we could ask for. With love and gratitude — see you on our special day.
            </p>
            <p className="mt-6 text-xs uppercase tracking-[0.3em] text-rose-700/60 flex items-center justify-center gap-2">
              Made with <Heart className="w-3 h-3 fill-rose-500 text-rose-500" /> for our loved ones
            </p>
          </footer>
        </>
      )}
    </div>
  );
}
