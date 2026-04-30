import { useMemo } from "react";

type Item = { id: number; left: number; delay: number; duration: number; size: number; type: "heart" | "petal" | "sparkle" };

const EMOJIS = { heart: "❤", petal: "🌸", sparkle: "✦" };

export function FloatingHearts({ count = 14, type = "heart" }: { count?: number; type?: "heart" | "petal" | "sparkle" }) {
  const items = useMemo<Item[]>(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 10,
        duration: 12 + Math.random() * 10,
        size: 14 + Math.random() * 18,
        type,
      })),
    [count, type]
  );

  const animation = type === "petal" ? "petal-fall" : "float-up";

  return (
    <div className="pointer-events-none fixed inset-0 z-10 overflow-hidden">
      {items.map((it) => (
        <span
          key={it.id}
          className="absolute"
          style={{
            left: `${it.left}%`,
            fontSize: `${it.size}px`,
            animation: `${animation} ${it.duration}s linear ${it.delay}s infinite`,
            color: type === "sparkle" ? "oklch(0.85 0.13 80)" : type === "petal" ? "oklch(0.85 0.1 15)" : "oklch(0.7 0.18 18)",
            filter: "drop-shadow(0 0 6px oklch(1 0 0 / 0.6))",
          }}
        >
          {EMOJIS[it.type]}
        </span>
      ))}
    </div>
  );
}
