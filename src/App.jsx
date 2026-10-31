import React, { useState } from "react";
import AmbientBackground from "./components/AmbientBackground";
import Navbar from "./components/Navbar";
import LetterPage from "./components/LetterPage";
import OfferingsPage from "./components/OfferingsPage";
import ScrapbookPage from "./components/ScrapbookPage";
import TreatyPage from "./components/TreatyPage";
import { Heart, Sparkles } from "lucide-react";
import { playChime } from "./utils/audio";
import { launchHearts } from "./utils/confetti";

export default function App() {
  const [activeTab, setActiveTab] = useState("letter");
  const [accepted, setAccepted] = useState(false);

  const handleNextFromLetter = () => {
    setActiveTab("offerings");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNextFromOfferings = () => {
    setActiveTab("scrapbook");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNextFromScrapbook = () => {
    setActiveTab("treaty");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleHeartClick = () => {
    playChime();
    launchHearts(15);
  };

  return (
    <main className="page">
      <AmbientBackground />

      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} accepted={accepted} />

      <div className="tab-content-area" key={activeTab}>
        {activeTab === "letter" && (
          <LetterPage
            accepted={accepted}
            setAccepted={setAccepted}
            onNavigateNext={handleNextFromLetter}
          />
        )}
        {activeTab === "offerings" && (
          <OfferingsPage onNavigateNext={handleNextFromOfferings} />
        )}
        {activeTab === "scrapbook" && (
          <ScrapbookPage onNavigateNext={handleNextFromScrapbook} />
        )}
        {activeTab === "treaty" && (
          <TreatyPage accepted={accepted} setAccepted={setAccepted} />
        )}
      </div>

      <footer className="footer" onClick={handleHeartClick}>
        <span>Made with</span>
        <Heart size={13} fill="currentColor" className="footer-heart-pulse" />
        <span>and a very repentant heart by Sayan for BK</span>
        <span className="footer-star">✦</span>
      </footer>
    </main>
  );
}