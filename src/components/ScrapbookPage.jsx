import React, { useState } from "react";
import { Sparkles, Heart, Star, Camera, Cat, Smile, Award } from "lucide-react";
import { playChime } from "../utils/audio";
import { launchHearts } from "../utils/confetti";
import { trackActivity } from "../utils/tracker";

const POLAROIDS = [
  {
    id: 1,
    rotation: "-3deg",
    emoji: "👑",
    title: "The Heart of the Diary",
    subtitle: "Always the main character",
    note: "Sayan's Diary without BK is like tea without sugar — completely flat and missing all its flavor.",
    date: "Day 01 to Forever",
  },
  {
    id: 2,
    rotation: "2.5deg",
    emoji: "🐱",
    title: "100% Cat Energy",
    subtitle: "Cute but can scratch",
    note: "Super sweet, mildly dangerous when angry, and commands 100% respect from this clumsy admin.",
    date: "Mood Spectrum",
  },
  {
    id: 3,
    rotation: "-2deg",
    emoji: "🧠",
    title: "The Reality Checker",
    subtitle: "The brain cell provider",
    note: "Clearly admin needs BK around because otherwise who will remind him to think before doing things?",
    date: "Vital Service",
  },
  {
    id: 4,
    rotation: "3.5deg",
    emoji: "🌸",
    title: "Rare & Irreplaceable",
    subtitle: "One in a million",
    note: "Genuine connections are hard to find. Hurting that over silly ego? Sayan knows that was pure stupidity.",
    date: "Friendship Truth",
  },
];

const STICKER_PALETTE = ["🌸", "💖", "🧋", "🐱", "🎀", "🍦", "✨", "💌", "🌷"];

export default function ScrapbookPage({ onNavigateNext }) {
  const [stickers, setStickers] = useState([
    { id: "s1", symbol: "🌸", x: 12, y: 15, rot: 10 },
    { id: "s2", symbol: "✨", x: 82, y: 22, rot: -15 },
    { id: "s3", symbol: "💖", x: 88, y: 75, rot: 8 },
  ]);

  const addSticker = (symbol) => {
    trackActivity("Stuck Scrapbook Doodle ✨", `Added doodle sticker: ${symbol}`);
    playChime();
    launchHearts(10);
    const newSticker = {
      id: Date.now() + Math.random(),
      symbol,
      x: 10 + Math.random() * 75,
      y: 10 + Math.random() * 75,
      rot: Math.floor(Math.random() * 40 - 20),
    };
    setStickers((prev) => [...prev, newSticker]);
  };

  return (
    <section className="scrapbook-page">
      <div className="eyebrow">
        <span className="eyebrow-dot" /> MEMORIES & REASONS · SCRAPBOOK <span className="eyebrow-dot" />
      </div>

      <div className="page-header">
        <h2>Why BK is Irreplaceable ✨</h2>
        <p className="page-subtitle">
          Just in case you ever doubted it, here are certified facts on why admin value your presence so much!
        </p>
      </div>

      {/* Interactive Sticker Palette */}
      <div className="sticker-bar">
        <span className="sticker-bar-label">
          <Sparkles size={14} /> Tap to stick doodles:
        </span>
        <div className="sticker-chips">
          {STICKER_PALETTE.map((stk, i) => (
            <button key={i} className="sticker-chip" onClick={() => addSticker(stk)}>
              {stk}
            </button>
          ))}
        </div>
      </div>

      {/* Polaroid Grid with Board Canvas */}
      <div className="scrapbook-board">
        {/* Render interactive placed stickers */}
        {stickers.map((stk) => (
          <span
            key={stk.id}
            className="placed-sticker"
            style={{
              left: `${stk.x}%`,
              top: `${stk.y}%`,
              transform: `translate(-50%, -50%) rotate(${stk.rot}deg)`,
            }}
          >
            {stk.symbol}
          </span>
        ))}

        <div className="polaroid-grid">
          {POLAROIDS.map((p) => (
            <div
              key={p.id}
              className="polaroid-card"
              style={{ transform: `rotate(${p.rotation})` }}
            >
              <div className="tape polaroid-tape" />
              <div className="polaroid-photo">
                <span className="polaroid-big-emoji">{p.emoji}</span>
                <span className="polaroid-badge">{p.subtitle}</span>
              </div>
              <div className="polaroid-caption">
                <h3>{p.title}</h3>
                <p>{p.note}</p>
                <div className="polaroid-meta">
                  <span>{p.date}</span>
                  <Heart size={14} fill="#e591a5" color="#e591a5" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="scrapbook-footer-cta">
        <p>Ready to make it official? Sayan drafted a formal peace agreement just for you. 📜</p>
        <button className="next-page-cta" onClick={onNavigateNext}>
          Sign the Friendship Peace Treaty 🕊️
        </button>
      </div>
    </section>
  );
}
