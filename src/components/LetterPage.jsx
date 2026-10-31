import React, { useState } from "react";
import { Heart, Sparkles, Flower2, Smile, MessageCircle } from "lucide-react";
import RunawayButton from "./RunawayButton";
import CelebrationModal from "./CelebrationModal";
import { launchHearts } from "../utils/confetti";
import { playChime } from "../utils/audio";
import { trackActivity } from "../utils/tracker";

export default function LetterPage({ accepted, setAccepted, onNavigateNext }) {
  const [opened, setOpened] = useState(false);
  const [evades, setEvades] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);

  const handleForgive = () => {
    trackActivity("Apology Accepted! 💗", `BK clicked 'Okay, maaf kiya' (after ${evades} evasions)`);
    setAccepted(true);
    setOpened(true);
    playChime();
    launchHearts(45);
    setShowCelebration(true);
  };

  return (
    <section className="hero" id="top">
      <div className="eyebrow">
        <span className="eyebrow-dot" /> A MESSAGE FOR BK <span className="eyebrow-dot" />
      </div>

      <div className="hero-title-wrap">
        <span className="scribble scribble-left">♡</span>
        <h1>
          Hey, <em>BK.</em>
        </h1>
        <span className="scribble scribble-right">✦</span>
      </div>

      <p className="intro">
        Sooo… the admin has something to say. And yes, he is a little gandu. 😭
      </p>

      {/* The Apology Letter Card */}
      <div className={`letter-card ${opened || accepted ? "letter-open" : ""}`}>
        <div className="tape tape-left" />
        <div className="tape tape-right" />
        <div className="letter-top">
          <span>FROM THE ADMIN DESK</span>
          <span>№ 001 · SORRY EDITION</span>
        </div>

        <div className="letter-gif-wrap">
          <img
            src={accepted ? "/gifs/peach-hug.gif" : "/gifs/erm-fingers.gif"}
            alt="Guilty cat"
            className="letter-mood-gif"
          />
        </div>

        <h2>{accepted ? "You made the admin smile!" : "I'm really sorry."}</h2>

        <p className="letter-copy">
          {accepted ? (
            <>
              Thank you so much, BK! 💖 You seriously have the kindest heart. Admin promises to never let
              stupid mood swings or silly advice mess things up again. Check out the peace bribes on the next tab! 🍕
            </>
          ) : (
            <>
              Aree BK, sorry na yaar. Ami jani, amar emonta kora uchit hoyni.
              Sedin ektu rag er mathay kore felechilam. Pore bujhechi je bhul korechi.
              Please rag kore thakis na. 💗
            </>
          )}
        </p>

        <div className="divider">
          <span>✿</span>
        </div>

        <div className="signature">
          — Sayan <span>♡</span>
        </div>

        <div className={`letter-stamp ${accepted ? "stamp-forgiven" : ""}`}>
          <Heart size={18} fill="currentColor" />
          <small>{accepted ? "FORGIVEN\n100% OK" : "MY\nBAD"}</small>
        </div>
      </div>

      {/* Reasons breakdown */}
      <div className="reason-row">
        <div className="reason">
          <span className="reason-icon">🤦🏻‍♂️</span>
          <div>
            <b>Reason</b>
            <small>Rag er mathay</small>
          </div>
        </div>
        <div className="reason">
          <span className="reason-icon">🫠</span>
          <div>
            <b>Root cause</b>
            <small>Roommate influence</small>
          </div>
        </div>
        <div className="reason">
          <span className="reason-icon">💗</span>
          <div>
            <b>Realisation</b>
            <small>Biggest mistake ever</small>
          </div>
        </div>
      </div>

      {/* Interactive Action Area */}
      <div className="action-area">
        {!accepted ? (
          <>
            <p className="question">Can this gandu admin get a little forgiveness? 🥹</p>
            <div className="buttons-container">
              <button
                className={`yes-btn ${evades > 2 ? "yes-btn-pulse" : ""}`}
                onClick={handleForgive}
                style={{
                  transform: evades > 0 ? `scale(${Math.min(1.22, 1 + evades * 0.04)})` : undefined,
                }}
              >
                Okay, maaf kiya <Heart size={17} fill="currentColor" />
              </button>

              <RunawayButton
                onEvade={(c) => {
                  setEvades(c);
                  trackActivity("Still Angry Button Evaded 🏃‍♂️", `Dodged mouse/touch (${c} time${c > 1 ? "s" : ""})`);
                }}
              />
            </div>

            {evades > 0 && (
              <p className="hint-text">
                Psst... that &quot;Still angry?&quot; button seems to be running away! Maybe it&apos;s a sign? 😉
              </p>
            )}
          </>
        ) : (
          <div className="accepted-banner">
            <div className="accepted">
              <span>💗</span>
              <div>
                <b>Yay… thank you, BK!</b>
                <small>Admin promises to use his brain next time. 😭</small>
              </div>
            </div>

            <div className="accepted-action-row">
              <button className="whatsapp-reopen-btn" onClick={() => setShowCelebration(true)}>
                <MessageCircle size={15} /> Message Sayan on WhatsApp
              </button>
              <button className="next-page-cta" onClick={onNavigateNext}>
                Claim Your Peace Bribes 🎁
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Mini Cards */}
      <section className="bottom-note">
        <div className="mini-card cat-card">
          <span className="cat-face">🐱</span>
          <div>
            <b>One last thing…</b>
            <p>You&apos;re not just a member of Sayan&apos;s Diary. You&apos;re a special part of it. 🤍</p>
          </div>
        </div>
        <div className="mini-card promise-card">
          <Flower2 size={25} />
          <div>
            <b>Admin&apos;s promise</b>
            <p>No more impulsive unfollows. Thoda dimaag use korbo. 😭</p>
          </div>
        </div>
      </section>

      {/* Celebration & WhatsApp Modal */}
      <CelebrationModal isOpen={showCelebration} onClose={() => setShowCelebration(false)} />
    </section>
  );
}
