import React, { useEffect, useState } from "react";
import styles from "../../styles/ProfileBuilderStyles/CareLevel.module.css";
import "../../styles/ProfileBuilderStyles/MainStyles.css";
import { ReactComponent as Hearts } from "../../assets/hearts.svg";
import { setTheme } from "../ColorTheme";

const InfoBox = () => (
  <div className={styles.infoBox}>
    <div className="corner-dots">
      <div className="accent-dot" />
      <div className="accent-dot" />
    </div>
    <div className={styles.infoBoxContent}>
      <span className="question-number">Question 2</span>
      <h2 className="title">Care Level</h2>
    </div>
  </div>
);

const DescriptionBox = () => (
  <div className={styles.descriptionBox}>
    <div className="corner-dots">
      <div className="accent-dot" />
      <div className="accent-dot" />
    </div>
    <p className={styles.descriptionText}>
      Choose how much time and effort you're willing to dedicate to plant care.
      If not sure how what to choose, please conslut below.
    </p>
    <button className="learn-more-btn">Learn More about Care Levels</button>
  </div>
);

const CareSlider = ({ profile, handleChange }) => {
  const [selectedLevel, setSelectedLevel] = useState(profile?.careLevel || 1);

  const handleSliderChange = (e) => {
    const value = parseInt(e.target.value);
    setSelectedLevel(value);
    handleChange({
      target: {
        name: "careLevel",
        value: value,
      },
    });
  };

  return (
    <div className={styles.careSliderBox}>
      <div className={styles.innerBox}>
        <div className={styles.sliderContainer}>
          <input
            type="range"
            min="0"
            max="2"
            value={selectedLevel}
            onChange={handleSliderChange}
            className={styles.careSlider}
          />
          <div className={styles.sliderTicks}>
            {["Low", "Medium", "High"].map((_, index) => (
              <div key={index} className={styles.tick} />
            ))}
          </div>
          <div className={styles.sliderLabels}>
            {["Low", "Medium", "High"].map((level) => (
              <span key={level} className={styles.sliderLabel}>
                {level}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const HeartsBadge = () => (
  <div className={styles.heartsBadge}>
    <div className="corner-dots">
      <div className="accent-dot" />
      <div className="accent-dot" />
    </div>
    <Hearts className={styles.heartsIcon} />
  </div>
);

const HeaderSection = () => (
  <div className={styles.careLevelHeader}>
    <InfoBox />
    <DescriptionBox />
  </div>
);

const ContentSection = ({ profile, handleChange }) => (
  <div className={styles.careLevelContent}>
    <CareSlider profile={profile} handleChange={handleChange} />
    <HeartsBadge />
  </div>
);

const CareLevel = ({ profile, handleChange }) => {
  useEffect(() => {
    const baseColor = { r: 144, g: 44, b: 44 };
    setTheme(baseColor);
  }, []);

  return (
    <>
      <HeaderSection />
      <ContentSection profile={profile} handleChange={handleChange} />
    </>
  );
};

export default CareLevel;
