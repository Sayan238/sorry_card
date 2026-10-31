import React, { useState } from "react";
import { CheckCircle2, Sparkles, Compass, Pizza, Headphones, Coffee, Film, MessageCircle, Send } from "lucide-react";
import { playStamp, playChime } from "../utils/audio";
import { launchHearts } from "../utils/confetti";
import { openWhatsAppDirectly } from "../utils/whatsapp";

const COUPONS = [
  {
    id: "bike-ride",
    title: "One-Day Bike Ride with Sayan 🏍️",
    desc: "Full-day ride, scenic stops and snacks.",
    code: "BK-RIDE-01",
    tag: "Adventure Voucher",
    icon: Compass,
    emoji: "🏍️",
  },
  {
    id: "food-treat",
    title: "Your Favourite Food Treat 🍕",
    desc: "Biryani, momos, puchka, pizza or dessert.",
    code: "BK-TREAT-02",
    tag: "Feast Pass",
    icon: Pizza,
    emoji: "🍕",
  },
  {
    id: "rant-pass",
    title: "One-Hour Rant & Vent Pass 🎧",
    desc: "I'll listen, no unwanted gyaan.",
    code: "BK-LISTEN-03",
    tag: "Patience Voucher",
    icon: Headphones,
    emoji: "🎧",
  },
  {
    id: "coffee-date",
    title: "Coffee / Boba Date ☕",
    desc: "Your favourite drink, my treat.",
    code: "BK-BOBA-04",
    tag: "Hangout Pass",
    icon: Coffee,
    emoji: "☕",
  },
  {
    id: "pick-plan",
    title: "You Pick the Plan 🎬",
    desc: "Movie, music, place or activity.",
    code: "BK-CUSTOM-05",
    tag: "Free Choice",
    icon: Film,
    emoji: "🎬",
  },
];

export default function OfferingsPage({ onNavigateNext }) {
  const [redeemed, setRedeemed] = useState({});

  const handleRedeem = (id) => {
    if (redeemed[id]) return;
    playStamp();
    launchHearts(25);
    setRedeemed((prev) => ({ ...prev, [id]: true }));
  };

  const count = Object.keys(redeemed).length;

  const sendSingleCouponToWhatsApp = (coupon) => {
    playChime();
    const msg = `Hey Sayan! 💌 I just claimed: ${coupon.title}!\nRemember your promise! 😋💗`;
    openWhatsAppDirectly("919395639289", msg);
  };

  const sendAllClaimedToWhatsApp = () => {
    playChime();
    const claimedList = Object.keys(redeemed)
      .map((id) => COUPONS.find((c) => c.id === id))
      .filter(Boolean);

    if (claimedList.length === 0) return;

    const items = claimedList.map((c, i) => `${i + 1}. ${c.title}`).join("\n");
    const msg = `Hey Sayan! 💌 I just redeemed these peace bribes from Sayan's Diary:\n\n${items}\n\nYou have to fulfill them, promise! 🥺💗`;

    openWhatsAppDirectly("919395639289", msg);
  };

  return (
    <section className="offerings-page">
      <div className="eyebrow">
        <span className="eyebrow-dot" /> PEACE OFFERINGS · BRIBERY CORNER <span className="eyebrow-dot" />
      </div>

      <div className="page-header">
        <h2>Official Peace Bribes 🎁</h2>
        <p className="page-subtitle">
          Words are good, but tangible peace offerings are better! Click to claim these coupons. Admin is legally bound by friendship rules to honor them. 🤝
        </p>
      </div>

      {/* Progress tracker */}
      <div className="bribe-progress-card">
        <div className="bribe-progress-info">
          <span>
            <b>Coupons Claimed:</b> {count} of {COUPONS.length}
          </span>
          <span className="bribe-tag">{count === 5 ? "All Bribes Accepted! 🎉" : "Tap coupons to claim"}</span>
        </div>
        <div className="progress-bar-track">
          <div className="progress-bar-fill" style={{ width: `${(count / COUPONS.length) * 100}%` }} />
        </div>
      </div>

      {/* Coupon Grid */}
      <div className="coupons-grid">
        {COUPONS.map((coupon) => {
          const isClaimed = !!redeemed[coupon.id];
          const IconComponent = coupon.icon;

          return (
            <div key={coupon.id} className={`coupon-card ${isClaimed ? "claimed" : ""}`}>
              <div className="coupon-left">
                <span className="coupon-tag">{coupon.tag}</span>
                <h3>{coupon.title}</h3>
                <p>{coupon.desc}</p>
                <div className="coupon-footer">
                  <span className="coupon-code">VOUCHER: {coupon.code}</span>
                </div>
              </div>

              <div className="coupon-divider">
                <div className="notch notch-top" />
                <div className="notch notch-bottom" />
              </div>

              <div className="coupon-right">
                <div className="coupon-icon-wrap" style={{ fontSize: "24px" }}>
                  <span>{coupon.emoji}</span>
                </div>
                {isClaimed ? (
                  <div className="claimed-actions-col">
                    <div className="claimed-stamp">
                      <CheckCircle2 size={14} /> CLAIMED
                    </div>
                    <button
                      className="send-single-wa-btn"
                      onClick={() => sendSingleCouponToWhatsApp(coupon)}
                      title="Send this bribe to Sayan"
                    >
                      <MessageCircle size={12} /> Send on WhatsApp
                    </button>
                  </div>
                ) : (
                  <button className="claim-btn" onClick={() => handleRedeem(coupon.id)}>
                    Claim <Sparkles size={13} />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {count > 0 && (
        <div className="bribe-action-bottom">
          {/* Big WhatsApp Claim Send Box */}
          <div className="whatsapp-bribes-box">
            <div className="wa-bribe-summary">
              <div className="wa-bribe-icon">
                <MessageCircle size={24} />
              </div>
              <div className="wa-bribe-text">
                <b>Send Claimed Bribes to Sayan ({count}) 💌</b>
                <p>Click below to notify Sayan directly on WhatsApp with your selected list!</p>
              </div>
            </div>
            <button className="whatsapp-bribes-btn" onClick={sendAllClaimedToWhatsApp}>
              <span>Send My {count} Bribe{count > 1 ? "s" : ""} to Sayan</span>
              <Send size={15} />
            </button>
          </div>

          <p className="bribe-cheer">
            {count === 5
              ? "All 5 bribes claimed! You definitely know how to negotiate with the admin! 🥳"
              : `Awesome! ${count} bribe${count > 1 ? "s" : ""} secured in your pocket! 💌`}
          </p>

          <button className="next-page-cta" onClick={onNavigateNext}>
            See BK Appreciation Scrapbook 📸
          </button>
        </div>
      )}
    </section>
  );
}
