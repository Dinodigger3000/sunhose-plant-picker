import React, { useEffect } from "react";
import styles from "../../styles/ProfileBuilderStyles/Review.module.css";
import "../../styles/ProfileBuilderStyles/MainStyles.css";
import { setTheme } from "../ColorTheme";

const InfoBox = () => (
  <div className={styles.infoBox}>
    <h2 className={styles.customTitle}>Profile Review</h2>
    <h3 className={styles.clickableHeading}>
      Click on the elements below to go back and change them.
    </h3>
  </div>
);

const ProfileSummary = ({ profile, setCurrentPage }) => {
  const getLightLevelText = (level) => {
    const levels = ["Low", "Medium", "High", "Very High"];
    return levels[level - 1] || "Not set";
  };

  const getCareLevelText = (level) => {
    const levels = ["Low", "Medium", "High"];
    return levels[level] || "Not set";
  };

  const formatPriorities = (priorities) => {
    const priorityNames = {
      light: "Light Level",
      care: "Care Level",
      budget: "Budget",
      pets: "Pet Safety",
      temp: "Temperature",
    };
    return priorities.map((p) => priorityNames[p] || p);
  };

  const DiscoverButton = () => (
    <button className={styles.discoverButton}>
      <span className={styles.discoverText}>Discover Your Plants!</span>
    </button>
  );

  const handleItemClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className={styles.summaryBox}>
      <InfoBox />
      <div className={styles.summaryColumns}>
        <div className={styles.leftColumn}>
          <div
            className={`${styles.profileItem} ${styles.clickable}`}
            onClick={() => handleItemClick(1)} // back to light level page
          >
            <span className={styles.itemTitle}>1. Light Level:</span>
            <span className={styles.itemValue}>
              {getLightLevelText(profile.lightLevel)}
            </span>
          </div>

          <div
            className={`${styles.profileItem} ${styles.clickable}`}
            onClick={() => handleItemClick(2)} // back to care level page
          >
            <span className={styles.itemTitle}>2. Care Level:</span>
            <span className={styles.itemValue}>
              {getCareLevelText(profile.careLevel)}
            </span>
          </div>

          <div
            className={`${styles.profileItem} ${styles.clickable}`}
            onClick={() => handleItemClick(3)} // back to budget page
          >
            <span className={styles.itemTitle}>3. Budget:</span>
            <span className={styles.itemValue}>${profile.budget}</span>
          </div>

          <div
            className={`${styles.profileItem} ${styles.clickable}`}
            onClick={() => handleItemClick(4)} // back to pet safe page
          >
            <span className={styles.itemTitle}>4. Pet Safe Required:</span>
            <span className={styles.itemValue}>
              {profile.petSafe ? "Yes" : "No"}
            </span>
          </div>
        </div>

        <div className={styles.rightColumn}>
          <div
            className={`${styles.profileItem} ${styles.clickable}`}
            onClick={() => handleItemClick(5)} // back to temperature page
          >
            <span className={styles.itemTitle}>5. Temperature Range:</span>
            <span className={styles.itemValue}>
              {profile.minTemp}°F - {profile.maxTemp}°F
            </span>
          </div>

          <div
            className={`${styles.profileItem} ${styles.clickable}`}
            onClick={() => handleItemClick(6)} // back to priority ranking page
          >
            <span className={styles.itemTitle}>6. Priority Order:</span>
            <ol className={styles.priorityList}>
              {formatPriorities(profile.priorities).map((priority, index) => (
                <li key={index} className={styles.priorityItem}>
                  {priority}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
      <DiscoverButton />
    </div>
  );
};

const Review = ({ profile, setCurrentPage }) => {
  useEffect(() => {
    const baseColor = { r: 34, g: 97, b: 97 };
    setTheme(baseColor);
  }, []);

  return (
    <div className={styles.reviewContent}>
      <ProfileSummary profile={profile} setCurrentPage={setCurrentPage} />
    </div>
  );
};

export default Review;
