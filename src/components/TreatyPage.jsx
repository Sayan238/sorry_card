import React, { useState } from "react";
import { Heart, Sparkles, Feather, Copy, Check } from "lucide-react";
import { playStamp, playChime } from "../utils/audio";
import { launchHearts } from "../utils/confetti";
import { trackActivity } from "../utils/tracker";

export default function TreatyPage({ accepted, setAccepted }) {
  const [signed, setSigned] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleSign = () => {
    trackActivity("Signed Friendship Peace Treaty 📜", "BK officially signed & sealed the treaty!");
    setSigned(true);
    setAccepted(true);
    playStamp();
    launchHearts(60);
  };

  const copyTreatyNote = () => {
    trackActivity("Copied Friendship Treaty 📋", "BK copied treaty note to clipboard");
    playChime();
    const text =
      "🕊️ A LITTLE FRIENDSHIP PEACE TREATY 💗\nBK 👑 🤝 Sayan 🥺\nRatified with love · 2026\nPeace has been restored in Sayan's Diary! 💗";
    navigator.clipboard?.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section className="treaty-page">
      <div className="eyebrow">
        <span className="eyebrow-dot" /> OFFICIAL PEACE ACCORD <span className="eyebrow-dot" />
      </div>

      <div className="page-header">
        <h2>A Little Friendship Peace Treaty 💗</h2>
        <p className="page-subtitle">Ratified with love · 2026</p>
      </div>

      {/* Parchment Certificate Card */}
      <div className={`treaty-parchment ${signed ? "treaty-signed" : ""}`}>
        <div className="treaty-border">
          <div className="treaty-header">
            <span className="treaty-emblem">📜</span>
            <h3>A LITTLE FRIENDSHIP PEACE TREATY 💗</h3>
            <span className="treaty-id">RATIFIED WITH LOVE · 2026</span>
          </div>

          <div className="treaty-parties">
            <div className="party">
              <small>THE QUEEN</small>
              <b>BK 👑</b>
            </div>
            <div className="party-divider">🤝</div>
            <div className="party">
              <small>THE REPENTANT ADMIN</small>
              <b>Sayan 🥺</b>
            </div>
          </div>

          <div className="treaty-articles">
            <div className="article">
              <b>ARTICLE 1 — The Admin&apos;s Mistake 😭</b>
              <p>
                Sayan officially admits that he acted impulsively, got influenced by his roommate&apos;s advice, and unfollowed BK without thinking. The admin accepts full responsibility for being a gandu.
              </p>
            </div>

            <div className="article">
              <b>ARTICLE 2 — No More Unnecessary Drama 🥹</b>
              <p>
                No more angry decisions, unnecessary misunderstandings or silly follow-unfollow situations. Let&apos;s keep things simple and peaceful.
              </p>
            </div>

            <div className="article">
              <b>ARTICLE 3 — A Small Apology 💌</b>
              <p>
                The admin sincerely apologises for his behaviour. He owes BK an apology, a treat and unlimited silly conversations.
              </p>
            </div>

            <div className="article">
              <b>ARTICLE 4 — A Special Place ❤️</b>
              <p>
                BK will always be a special part of Sayan&apos;s Diary. No awkwardness, no pressure, just good memories and friendship.
              </p>
            </div>
          </div>

          <div className="signed-with-love-heading">
            <span>✿ SIGNED WITH LOVE ✿</span>
          </div>

          {/* Signature & Seal Area */}
          <div className="treaty-footer">
            <div className="signature-box">
              <span className="sign-line">— Sayan ❤️</span>
              <b>Sayan (The Guilty Admin) ❤️</b>
              <small>The one who messed up.</small>
            </div>

            <div className="seal-area">
              {signed ? (
                <div className="wax-seal">
                  <Heart size={22} fill="#fff" color="#fff" />
                  <span className="seal-text">FORGIVEN & SEALED</span>
                  <small>OFFICIAL 2026</small>
                </div>
              ) : (
                <button className="stamp-action-btn" onClick={handleSign}>
                  <Feather size={16} /> Seal & Forgive 💮
                </button>
              )}
            </div>

            <div className="signature-box">
              <span className="sign-line">{signed ? "BK ✍️" : "Pending BK..."}</span>
              <b>BK 👑</b>
              <small>The one who deserves an apology.</small>
            </div>
          </div>
        </div>
      </div>

      {/* Post-signing celebration info */}
      {signed && (
        <div className="treaty-celebration">
          <div className="treaty-alert">
            <Sparkles size={22} className="alert-star" />
            <div>
              <h4>Friendship Restored to 100%! 🎉</h4>
              <p>The treaty is now official and sealed. Admin Sayan is truly sorry and forever grateful to BK! 🥹💗</p>
            </div>
          </div>

          <button className="copy-btn" onClick={copyTreatyNote}>
            {copied ? <Check size={16} /> : <Copy size={16} />}
            {copied ? "Copied Treaty Note!" : "Copy Friendship Treaty Note"}
          </button>
        </div>
      )}
    </section>
  );
}
