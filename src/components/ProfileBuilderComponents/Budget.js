import React, { useEffect, useState } from "react";
import styles from "../../styles/ProfileBuilderStyles/Budget.module.css";
import "../../styles/ProfileBuilderStyles/MainStyles.css";

import { setTheme } from "../ColorTheme";

const InfoBox = () => (
  <div className={styles.infoBox}>
    <div className="corner-dots">
      <div className="accent-dot" />
      <div className="accent-dot" />
    </div>
    <div className={styles.infoBoxContent}>
      <span className="question-number">Question 3</span>
      <h2 className="title">Budget Range</h2>
      <p className={styles.descriptionText}>
        Provide an estimate for the amount of money you are willing to spend on
        a houseplant.
      </p>
    </div>
  </div>
);

const PriceBadge = () => (
  <div className={styles.priceBadge}>
    <h2 className={styles.priceSymbol}>
      $ <br /> $
    </h2>
  </div>
);

const HeaderSection = () => (
  <div className={styles.budgetHeader}>
    <InfoBox />
    <PriceBadge />
  </div>
);

const BudgetSlider = ({ profile, handleChange }) => {
  const [selectedValue, setSelectedValue] = useState(profile?.budget || 50);

  useEffect(() => {
    if (profile?.budget !== undefined) {
      setSelectedValue(parseInt(profile.budget));
    }
  }, [profile?.budget]);

  const handleSliderChange = (e) => {
    const value = parseInt(e.target.value);
    setSelectedValue(value);
    handleChange({
      target: {
        name: "budget",
        value: value,
      },
    });
  };

  const formatBudgetRange = (value) => {
    return `Any price between <b>$0</b> and <b>$${value}</b>.`;
  };

  useEffect(() => {
    const progressWidth = `${Math.max(
      2,
      (selectedValue / 100) * 100 + (selectedValue < 20 ? 2 : 0)
    )}%`;
    document.documentElement.style.setProperty(
      "--progress-width",
      progressWidth
    );
  }, [selectedValue]);

  return (
    <div className={styles.budgetSliderBox}>
      <div className={styles.edgeMarkerLeft} />
      <div className={styles.sliderMainContent}>
        <div
          className={styles.currentBudget}
          dangerouslySetInnerHTML={{ __html: formatBudgetRange(selectedValue) }}
        />
        <div className={styles.sliderContainer}>
          <input
            type="range"
            min="0"
            max="100"
            value={selectedValue}
            onChange={handleSliderChange}
            className={styles.budgetSlider}
          />
        </div>
        <div className={styles.sliderLabels}>
          <span>$0</span>
          <span>$50</span>
          <span>$100</span>
        </div>
      </div>
      <div className={styles.edgeMarkerRight} />
    </div>
  );
};

const ContentSection = ({ profile, handleChange }) => (
  <div className={styles.budgetContent}>
    <BudgetSlider profile={profile} handleChange={handleChange} />
  </div>
);

const Budget = ({ profile, handleChange }) => {
  useEffect(() => {
    const baseColor = { r: 76, g: 97, b: 56 }; // Green theme
    setTheme(baseColor);
  }, []);

  return (
    <>
      <HeaderSection />
      <ContentSection profile={profile} handleChange={handleChange} />
    </>
  );
};

export default Budget;
