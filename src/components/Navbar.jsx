import React, { useState } from "react";
import { Heart, Sparkles, Volume2, VolumeX, Music, Gift, Image, FileText } from "lucide-react";
import { toggleAmbientBgm, playChime } from "../utils/audio";

const TABS = [
  { id: "letter", label: "Letter", icon: Heart },
  { id: "offerings", label: "Peace Bribes", icon: Gift },
  { id: "scrapbook", label: "BK Scrapbook", icon: Image },
  { id: "treaty", label: "Peace Treaty", icon: FileText },
];

export default function Navbar({ activeTab, setActiveTab, accepted }) {
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);

  const handleMusicToggle = () => {
    toggleAmbientBgm((playing) => {
      setIsPlayingMusic(playing);
    });
  };

  const handleTabClick = (tabId) => {
    playChime();
    setActiveTab(tabId);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <header className="navbar-wrapper">
      <nav className="nav">
        <div className="brand" onClick={() => handleTabClick("letter")} style={{ cursor: "pointer" }}>
          <span className="brand-mark">
            <Heart size={15} fill="currentColor" />
          </span>
          <span className="brand-text">Sayan&apos;s Diary</span>
          {accepted && <span className="forgiven-pill">Forgiven ✨</span>}
        </div>

        {/* Music Player Button */}
        <button
          className={`music-btn ${isPlayingMusic ? "music-playing" : ""}`}
          onClick={handleMusicToggle}
          title={isPlayingMusic ? "Mute gentle ambient music" : "Play gentle ambient music"}
        >
          {isPlayingMusic ? (
            <>
              <Volume2 size={15} />
              <span className="music-label">Lofi BGM On</span>
              <span className="music-bars">
                <span className="bar b1" />
                <span className="bar b2" />
                <span className="bar b3" />
              </span>
            </>
          ) : (
            <>
              <Music size={15} />
              <span className="music-label">Play Music 🎵</span>
            </>
          )}
        </button>
      </nav>

      {/* Segmented Tab Bar */}
      <div className="nav-tabs-container">
        <div className="nav-tabs-pills">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                className={`tab-pill ${isActive ? "active" : ""}`}
                onClick={() => handleTabClick(tab.id)}
              >
                <Icon size={14} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
}
