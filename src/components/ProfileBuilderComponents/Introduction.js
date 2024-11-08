import React, { useEffect } from "react";
import "../../styles/ProfileBuilderStyles/Introduction.css";
import { ReactComponent as Clover } from "../../assets/clover.svg";
import { ReactComponent as Arrow } from "../../assets/arrow.svg";
import { setTheme, getCurrentTheme } from "../ColorTheme";

// top right logo section
const LogoSection = () => (
  <div className="logo-inner">
    <span className="logo-text">SUNHOSE</span>
    <div className="dot-row">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="dot" />
      ))}
    </div>
  </div>
);

// top right clover oval
const CloverBadge = () => (
  <div className="badge">
    <div className="badge-inner">
      <Clover className="badge-icon" />
    </div>
  </div>
);

// top row
const HeaderSection = () => (
  <div className="header-section">
    <div className="card logo-card">
      <LogoSection />
    </div>
    <CloverBadge />
  </div>
);

// welcome
const WelcomeCard = () => (
  <div className="card welcome-card">
    <div className="dot-container">
      {[...Array(2)].map((_, i) => (
        <div key={i} className="accent-dot" />
      ))}
    </div>
    <div className="welcome-content">
      <span className="welcome-message">
        <strong>Welcome to SUNHOSE</strong>, the all-in-one plant picking tool,
        perfect for everyone from experts to beginners.
      </span>
    </div>
  </div>
);

// continue button
const ContinueCard = ({ onContinue }) => (
  <div
    className="card continue-card"
    onClick={onContinue}
    style={{ cursor: "pointer" }}
  >
    <div className="dot-container">
      {[...Array(2)].map((_, i) => (
        <div key={i} className="accent-dot" />
      ))}
    </div>
    <div className="continue-content">
      <Arrow className="continue-icon" />
      <span className="continue-text">CONTINUE</span>
    </div>
    <div className="dot-container">
      {[...Array(2)].map((_, i) => (
        <div key={i} className="accent-dot" />
      ))}
    </div>
  </div>
);

// bottom row
const ContentSection = ({ onContinue }) => (
  <div className="content-section">
    <WelcomeCard />
    <ContinueCard onContinue={onContinue} />
  </div>
);

// color theme tester buttons

const colorThemes = {
  green: { r: 39, g: 94, b: 56 },
  blue: { r: 41, g: 64, b: 124 },
  red: { r: 144, g: 44, b: 44 },
  yellow: { r: 168, g: 123, b: 31 },
};

const ColorButtons = () => (
  <div className="theme-buttons">
    {Object.entries(colorThemes).map(([name, color]) => (
      <button
        key={name}
        className="theme-button"
        style={{
          backgroundColor: `rgb(${color.r}, ${color.g}, ${color.b})`,
        }}
        onClick={() => setTheme(color)}
      >
        {name}
      </button>
    ))}
  </div>
);

// main component
const Introduction = ({ onContinue }) => {
  useEffect(() => {
    const baseColor = { r: 39, g: 94, b: 56 };
    setTheme(baseColor);
  }, []);

  return (
    <>
      <div className="intro-layout">
        <HeaderSection />
        <ContentSection onContinue={onContinue} />
      </div>
      <div className="theme-controls">
        <ColorButtons />
      </div>
    </>
  );
};

export default Introduction;
