import React, { useEffect, useState } from "react";
import styles from "../../styles/ProfileBuilderStyles/PetSafe.module.css";
import "../../styles/ProfileBuilderStyles/MainStyles.css";
import { ReactComponent as Dog } from "../../assets/dog.svg";
import { setTheme } from "../ColorTheme";

const InfoBox = () => (
  <div className={styles.infoBox}>
    <div className="corner-dots">
      <div className="accent-dot" />
      <div className="accent-dot" />
    </div>
    <div className={styles.infoBoxContent}>
      <span className="question-number">Question 4</span>
      <h2 className="title">Pet Safe</h2>
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
      Some houseplants can be toxic to pets if eaten. Consult below to learn
      more about pet safe plants, and for more pet specific information.
    </p>
    <button className="learn-more-btn">Learn More about Pet Safety</button>
  </div>
);

const PetSafetyQuestion = ({ profile, handleChange }) => {
  const handleClick = (value) => {
    handleChange({
      target: {
        name: "petSafe",
        value: value,
      },
    });
  };

  return (
    <div className={styles.petSafetyBox}>
      <div className={styles.innerBox}>
        <h3 className={styles.question}>Are you concerned about pet safety?</h3>
        <div className={styles.buttonContainer}>
          <button
            className={`${styles.choiceButton} ${
              profile?.petSafe === true ? styles.selected : ""
            }`}
            onClick={() => handleClick(true)}
          >
            Yes
          </button>
          <button
            className={`${styles.choiceButton} ${
              profile?.petSafe === false ? styles.selected : ""
            }`}
            onClick={() => handleClick(false)}
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};

const DogBadge = () => (
  <div className={styles.dogBadge}>
    <div className={styles.dogBadgeInner}>
      <Dog className={styles.dogIcon} />
    </div>
  </div>
);

const HeaderSection = () => (
  <div className={styles.petSafeHeader}>
    <InfoBox />
    <DescriptionBox />
  </div>
);

const ContentSection = ({ profile, handleChange }) => (
  <div className={styles.petSafeContent}>
    <PetSafetyQuestion profile={profile} handleChange={handleChange} />
    <DogBadge />
  </div>
);

const PetSafe = ({ profile, handleChange }) => {
  useEffect(() => {
    const baseColor = { r: 155, g: 122, b: 63 };
    setTheme(baseColor);
  }, []);

  return (
    <>
      <HeaderSection />
      <ContentSection profile={profile} handleChange={handleChange} />
    </>
  );
};

export default PetSafe;
