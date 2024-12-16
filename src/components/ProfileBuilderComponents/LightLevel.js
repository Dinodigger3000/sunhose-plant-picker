import React, { useEffect, useState } from "react";
import styles from "../../styles/ProfileBuilderStyles/LightLevel.module.css";
import "../../styles/ProfileBuilderStyles/MainStyles.css";
import { ReactComponent as Sunrise } from "../../assets/icons/sunrise.svg";
import { setTheme } from "../ColorTheme";
import Modal from "./Modal";

const InfoCard = () => {
  const [showModal, setShowModal] = useState(false);

  const lightLevelModalContent = (
    <>
      <p>
        <strong>Low Light:</strong> The amount of daylight in this area is not
        enough to read by. This could mean a basement or a window that is
        blocked and very shady.
      </p>
      <p>
        <strong>Medium Light:</strong> There is a readable amount of daylight in
        the area, but it does not recieve any direct sunlight. North and South
        facing windows are usually in this category.
      </p>
      <p>
        <strong>High Light:</strong> This describes areas that recieve sun from
        one direction, but directly and unblocked. East and West facing windows
        typically are within this category.
      </p>
      <p>
        <strong>Very High Light:</strong> This usually describes areas such as
        corners with windows on multiple sides or sunrooms, as it is hard to get
        this much sun from one direction only.
      </p>
      <p>
        <i>Note:</i> Some plants require an exact match for light, while others
        do not. Our matching algorithm requires an exact match, so if you get a
        plant you really like that you have a light mismatch on, we recommend
        clicking the link at the bottom of the plant's description and checking
        if it actually works for you.{" "}
      </p>
    </>
  );

  return (
    <div className={styles.lightCard}>
      <div className="corner-dots">
        <div className="accent-dot" />
        <div className="accent-dot" />
      </div>
      <div className={styles.lightInfoContent}>
        <div className={styles.lightInfoLeftColumn}>
          <span className="question-number">Question 1</span>
          <span role="heading" aria-level="1" className="title">
            Light Level
          </span>
        </div>
        <div className={styles.lightInfoRightColumn}>
          <p className={"descriptionText"}>
            Choose, on average, how much direct sunlight your space recieves.
          </p>
          <button className="learn-more-btn" onClick={() => setShowModal(true)}>
            Learn More
          </button>
        </div>
      </div>

      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        title="Choosing a Light Level for Your Space"
        subheading="If hours of light per day is not enough to pick your light level, these descriptions may help:"
      >
        {lightLevelModalContent}
      </Modal>
    </div>
  );
};

const SunriseBadge = () => (
  <div className={styles.lightSunriseBadge}>
    <div className={styles.lightSunriseInner}>
      <Sunrise className={styles.lightSunriseIcon} />
    </div>
  </div>
);

const HeaderSection = () => (
  <div className={styles.lightHeaderSection}>
    <InfoCard />
    <SunriseBadge />
  </div>
);

const ContentSection = ({ profile, handleChange }) => (
  <div className={styles.lightContentSection}>
    <LightLevelSlider profile={profile} handleChange={handleChange} />
  </div>
);

const LightLevelSlider = ({ profile, handleChange }) => {
  const [selectedLevel, setSelectedLevel] = useState(profile?.lightLevel || 0);
  const levels = [
    "Low (0hrs)",
    "Medium (1-2hrs) ",
    "High (2-6hrs)",
    "Very High (6+hrs)",
  ];

  const handleSliderChange = (e) => {
    const value = parseInt(e.target.value);
    setSelectedLevel(value);
    handleChange({
      target: {
        name: "lightLevel",
        value: value,
      },
    });
  };

  return (
    <div className={styles.lightSliderBox}>
      <div className={styles.lightSliderContainer}>
        <input
          type="range"
          min="1"
          max="4"
          value={selectedLevel}
          onChange={handleSliderChange}
          className={styles.lightSlider}
        />
        <div className={styles.lightSliderTicks}>
          {levels.map((_, index) => (
            <div key={index} className={styles.lightTick} />
          ))}
        </div>
        <div className={styles.lightSliderLabels}>
          {levels.map((level, index) => (
            <span key={level} className={styles.lightSliderLabel}>
              {level}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

const LightLevel = ({ profile, handleChange }) => {
  useEffect(() => {
    const baseColor = { r: 41, g: 64, b: 124 };
    setTheme(baseColor);
  }, []);

  return (
    <>
      <div>
        <HeaderSection />
        <ContentSection profile={profile} handleChange={handleChange} />
      </div>
    </>
  );
};

export default LightLevel;
