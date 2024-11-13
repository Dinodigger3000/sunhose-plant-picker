import React, { useEffect, useState } from "react";
import styles from "../../styles/ProfileBuilderStyles/Temperature.module.css";
import "../../styles/ProfileBuilderStyles/MainStyles.css";

import { ReactComponent as ThermometerIcon } from "../../assets/thermometer.svg";

import { setTheme } from "../ColorTheme";

const InfoBox = () => (
  <div className={styles.infoBox}>
    <div className="corner-dots">
      <div className="accent-dot" />
      <div className="accent-dot" />
    </div>
    <div className={styles.infoBoxContent}>
      <div className={styles.infoBoxHeader}>
        <div className={styles.iconContainer}>
          <ThermometerIcon className={styles.thermometerIcon} />
        </div>
        <div className={styles.textContainer}>
          <span className="question-number">Question 5</span>
          <h2 className="title">Temp. Range</h2>
        </div>
      </div>
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
      Choose the temperature range your space typically is throughout the year.
      If not sure how what to choose, please consult below.
    </p>
    <button className="learn-more-btn">Learn More about Temp. Range</button>
  </div>
);

const TemperatureSlider = ({ profile, handleChange }) => {
  const [range, setRange] = useState({
    min: profile?.minTemp || 65,
    max: profile?.maxTemp || 80,
  });

  const handleRangeChange = (type) => (e) => {
    const value = parseInt(e.target.value);
    const newRange = { ...range };

    if (type === "min") {
      newRange.min = Math.min(value, range.max - 5);
    } else {
      newRange.max = Math.max(value, range.min + 5);
    }

    setRange(newRange);
    handleChange({
      target: {
        name: type === "min" ? "minTemp" : "maxTemp",
        value: type === "min" ? newRange.min : newRange.max,
      },
    });
  };

  useEffect(() => {
    const minProgress = ((range.min - 30) / 70) * 100;
    const maxProgress = ((range.max - 30) / 70) * 100;
    document.documentElement.style.setProperty(
      "--min-progress",
      `${minProgress}%`
    );
    document.documentElement.style.setProperty(
      "--max-progress",
      `${maxProgress}%`
    );
  }, [range]);

  return (
    <div className={styles.tempSliderBox}>
      <div className={styles.edgeMarkerLeft} />
      <div className={styles.sliderMainContent}>
        <div className={styles.currentTemp}>
          Temperature range between <b>{range.min}°F</b> and{" "}
          <b>{range.max}°F</b>
        </div>
        <div className={styles.sliderContainer}>
          <div className={styles.rangeSliderWrapper}>
            <div className={styles.baseLine} />
            <div className={styles.progressBar} />
            <input
              type="range"
              min="30"
              max="100"
              value={range.min}
              onChange={handleRangeChange("min")}
              className={`${styles.tempSlider} ${styles.minSlider}`}
            />
            <input
              type="range"
              min="30"
              max="100"
              value={range.max}
              onChange={handleRangeChange("max")}
              className={`${styles.tempSlider} ${styles.maxSlider}`}
            />
          </div>
        </div>
        <div className={styles.sliderLabels}>
          <span>30°F</span>
          <span>65°F</span>
          <span>100°F</span>
        </div>
      </div>
      <div className={styles.edgeMarkerRight} />
    </div>
  );
};

const HeaderSection = () => (
  <div className={styles.tempHeader}>
    <InfoBox />
    <DescriptionBox />
  </div>
);

const ContentSection = ({ profile, handleChange }) => (
  <div className={styles.tempContent}>
    <TemperatureSlider profile={profile} handleChange={handleChange} />
  </div>
);

const Temperature = ({ profile, handleChange }) => {
  useEffect(() => {
    const baseColor = { r: 156, g: 89, b: 31 };
    setTheme(baseColor);
  }, []);

  return (
    <>
      <HeaderSection />
      <ContentSection profile={profile} handleChange={handleChange} />
    </>
  );
};

export default Temperature;
