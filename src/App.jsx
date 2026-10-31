import React, { useState, useEffect } from "react";
import AmbientBackground from "./components/AmbientBackground";
import Navbar from "./components/Navbar";
import LetterPage from "./components/LetterPage";
import OfferingsPage from "./components/OfferingsPage";
import ScrapbookPage from "./components/ScrapbookPage";
import TreatyPage from "./components/TreatyPage";
import { Heart, Sparkles } from "lucide-react";
import { playChime } from "./utils/audio";
import { launchHearts } from "./utils/confetti";
import { trackActivity } from "./utils/tracker";

export default function App() {
  const [activeTab, setActiveTab] = useState("letter");
  const [accepted, setAccepted] = useState(false);

  useEffect(() => {
    trackActivity("Visited Website", "BK opened Sayan's Diary");
  }, []);

  const handleNextFromLetter = () => {
    trackActivity("Navigated to Peace Bribes", "From Letter page");
    setActiveTab("offerings");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNextFromOfferings = () => {
    trackActivity("Navigated to BK Scrapbook", "From Peace Bribes page");
    setActiveTab("scrapbook");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNextFromScrapbook = () => {
    trackActivity("Navigated to Peace Treaty", "From Scrapbook page");
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