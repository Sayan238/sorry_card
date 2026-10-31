import React, { useEffect, useState } from "react";
import { Sparkles, Send, X } from "lucide-react";
import { launchHearts } from "../utils/confetti";
import { playChime } from "../utils/audio";
import { openWhatsAppDirectly } from "../utils/whatsapp";

export default function CelebrationModal({ isOpen, onClose }) {
  const [countdown, setCountdown] = useState(2);

  useEffect(() => {
    if (!isOpen) return;

    launchHearts(50);
    playChime();

    // Auto-launch WhatsApp directly into the app
    const timer = setTimeout(() => {
      openWhatsAppDirectly();
    }, 1500);

    const interval = setInterval(() => {
      setCountdown((c) => Math.max(0, c - 1));
    }, 800);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="celebration-overlay">
      <div className="celebration-modal">
        <button className="celebration-close" onClick={onClose} title="Close & keep exploring">
          <X size={18} />
        </button>

        <div className="celebration-badge">
          <Sparkles size={14} /> FORGIVENESS ACCEPTED <Sparkles size={14} />
        </div>

        <h2 className="celebration-title">YAAAY! BEST MOMENT EVER! 🥹🎉</h2>
        <p className="celebration-subtitle">
          Admin&apos;s heartbeat is officially back to normal! You made Sayan the happiest guy today! 💗
        </p>

        {/* Cute Animated Celebration Scene */}
        <div className="cute-celebration-character">
          <div className="cute-avatar-pair">
            <div className="cute-avatar">
              <div className="avatar-face">👑</div>
              <span className="avatar-label">BK</span>
            </div>
            <div className="avatar-love-bridge">
              <span className="floating-love-heart">💖</span>
              <span className="love-sparks">✨</span>
            </div>
            <div className="cute-avatar sayan-avatar">
              <div className="avatar-face">🥹</div>
              <span className="avatar-label">SAYAN</span>
            </div>
          </div>

          <div className="celebration-pill-row">
            <span className="celebration-pill">🌸 100% Forgiven</span>
            <span className="celebration-pill">🍕 Treat Unlocked</span>
            <span className="celebration-pill">🫂 Virtual Hugs</span>
          </div>
        </div>

        {/* Action Button & Direct WhatsApp Trigger */}
        <div className="celebration-actions">
          <button
            className="whatsapp-direct-btn"
            onClick={() => openWhatsAppDirectly()}
          >
            <span>Open WhatsApp Directly</span>
            <Send size={16} />
          </button>

          <p className="redirect-countdown">
            {countdown > 0 ? (
              <>
                Opening WhatsApp directly in <b>{countdown}s</b>... 🚀
              </>
            ) : (
              "WhatsApp app opened! 💬"
            )}
          </p>

          <button className="stay-btn" onClick={onClose}>
            Or stay here to claim peace bribes & read treaty 🌸
          </button>
        </div>
      </div>
    </div>
  );
}
