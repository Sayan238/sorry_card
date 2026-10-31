import React, { useState, useRef } from "react";
import { playBoing } from "../utils/audio";

const FUNNY_TEXTS = [
  "Still angry? 😤",
  "Nope! You can't click me! 🏃‍♂️💨",
  "Aree ekbar to haso! 🥺",
  "Pakka treat debo, promise! 🍕",
  "Rag kore labh nei! 😝",
  "Admin already guilty! 😭",
  "Look at that big pink button 👉",
  "Button has left the chat! 🚀",
  "Dhur! Maaf kore de na yaar! 🌸",
  "Catch me if you can! 🐰",
];

export default function RunawayButton({ onEvade }) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [textIndex, setTextIndex] = useState(0);
  const [evadeCount, setEvadeCount] = useState(0);
  const [isMoved, setIsMoved] = useState(false);
  const btnRef = useRef(null);

  const dodge = (e) => {
    if (e && e.preventDefault) {
      e.preventDefault();
    }
    playBoing();

    // Calculate a random offset that avoids the current position
    // Safe bounds within reasonable viewport limits
    const maxOffset = 140;
    const minOffset = 50;

    const angle = Math.random() * Math.PI * 2;
    const distance = minOffset + Math.random() * (maxOffset - minOffset);

    let newX = Math.cos(angle) * distance;
    let newY = Math.sin(angle) * (distance * 0.7);

    // Keep within reasonable box so it doesn't leave the screen
    newX = Math.max(-160, Math.min(160, newX));
    newY = Math.max(-90, Math.min(90, newY));

    setPosition({ x: newX, y: newY });
    setIsMoved(true);
    setTextIndex((prev) => (prev + 1) % FUNNY_TEXTS.length);
    setEvadeCount((c) => c + 1);

    if (onEvade) onEvade(evadeCount + 1);
  };

  return (
    <div className="runaway-container" style={{ position: "relative", display: "inline-block" }}>
      {isMoved && (
        <span className="runaway-bubble" key={evadeCount}>
          {FUNNY_TEXTS[textIndex]}
        </span>
      )}
      <button
        ref={btnRef}
        className="soft-btn runaway-btn"
        onMouseEnter={dodge}
        onTouchStart={dodge}
        onClick={dodge}
        style={{
          transform: `translate(${position.x}px, ${position.y}px)`,
          transition: "transform 0.22s cubic-bezier(0.34, 1.56, 0.64, 1)",
          willChange: "transform",
        }}
      >
        <span>{FUNNY_TEXTS[textIndex]}</span>
      </button>
    </div>
  );
}
