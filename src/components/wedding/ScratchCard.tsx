import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export function ScratchCard() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [revealed, setRevealed] = useState(false);
  const drawing = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const grad = ctx.createLinearGradient(0, 0, rect.width, rect.height);
    grad.addColorStop(0, "#d4af37");
    grad.addColorStop(0.5, "#f5d97a");
    grad.addColorStop(1, "#b8860b");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, rect.width, rect.height);

    ctx.fillStyle = "rgba(255,255,255,0.9)";
    ctx.font = "600 18px 'Inter', sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("✦  Scratch to reveal the date  ✦", rect.width / 2, rect.height / 2);
  }, []);

  const scratch = (x: number, y: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(x - rect.left, y - rect.top, 28, 0, Math.PI * 2);
    ctx.fill();
    checkReveal();
  };

  const checkReveal = () => {
    const canvas = canvasRef.current;
    if (!canvas || revealed) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
    let cleared = 0;
    for (let i = 3; i < data.length; i += 4 * 50) if (data[i] === 0) cleared++;
    if (cleared / (data.length / (4 * 50)) > 0.45) setRevealed(true);
  };

  return (
    <div className="relative w-full max-w-md mx-auto aspect-[16/9] rounded-3xl overflow-hidden glass">
      {/* Hidden content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
        <Sparkles className="w-6 h-6 text-gold mb-2" />
        <p className="text-xs uppercase tracking-[0.3em] text-rose-800/70">The Big Day</p>
        <h3 className="font-script text-4xl sm:text-5xl text-gradient-gold mt-1">29 May 2026</h3>
        <p className="text-sm mt-1 text-rose-900/70">9:30 AM • Sri Mahal, Kovilpatti</p>
      </div>

      {revealed && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(circle, oklch(0.9 0.15 80 / 0.6), transparent 70%)",
          }}
        />
      )}

      <canvas
        ref={canvasRef}
        className={`absolute inset-0 w-full h-full cursor-crosshair touch-none transition-opacity duration-700 ${revealed ? "opacity-0 pointer-events-none" : "opacity-100"}`}
        onPointerDown={(e) => {
          drawing.current = true;
          scratch(e.clientX, e.clientY);
        }}
        onPointerMove={(e) => drawing.current && scratch(e.clientX, e.clientY)}
        onPointerUp={() => (drawing.current = false)}
        onPointerLeave={() => (drawing.current = false)}
      />
    </div>
  );
}
