import React from "react";

const FLOATING_BITS = Array.from({ length: 26 }, (_, i) => ({
  id: i,
  left: `${(i * 37 + 7) % 100}%`,
  delay: `${(i % 9) * -1.8}s`,
  duration: `${14 + (i % 8) * 2.2}s`,
  size: 14 + (i % 5) * 5,
  symbol: ["♡", "✦", "♥", "✿", "🌸", "✨", "💕"][i % 7],
}));

export default function AmbientBackground() {
  return (
    <>
      <div className="grain" />
      <div className="glow glow-one" />
      <div className="glow glow-two" />
      <div className="glow glow-three" />
      {FLOATING_BITS.map((bit) => (
        <span
          key={bit.id}
          className="floaty"
          style={{
            left: bit.left,
            animationDelay: bit.delay,
            animationDuration: bit.duration,
            fontSize: `${bit.size}px`,
          }}
        >
          {bit.symbol}
        </span>
      ))}
    </>
  );
}
