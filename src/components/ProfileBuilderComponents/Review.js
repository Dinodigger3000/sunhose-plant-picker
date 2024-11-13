import React, { useEffect } from "react";
import styles from "../../styles/ProfileBuilderStyles/Review.module.css";
import "../../styles/ProfileBuilderStyles/MainStyles.css";
import { setTheme } from "../ColorTheme";

const InfoBox = () => (
  <div className={styles.infoBox}>
    <h2 className={styles.customTitle}>Profile Review</h2>
  </div>
);

const ProfileSummary = ({ profile }) => {
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

  return (
    <div className={styles.summaryBox}>
      <div className={styles.summaryColumns}>
        <div className={styles.leftColumn}>
          <div className={styles.profileItem}>
            <span className={styles.itemTitle}>1. Light Level:</span>
            <span className={styles.itemValue}>
              {getLightLevelText(profile.lightLevel)}
            </span>
          </div>

          <div className={styles.profileItem}>
            <span className={styles.itemTitle}>2. Care Level:</span>
            <span className={styles.itemValue}>
              {getCareLevelText(profile.careLevel)}
            </span>
          </div>

          <div className={styles.profileItem}>
            <span className={styles.itemTitle}>3. Budget:</span>
            <span className={styles.itemValue}>${profile.budget}</span>
          </div>

          <div className={styles.profileItem}>
            <span className={styles.itemTitle}>4. Pet Safe Required:</span>
            <span className={styles.itemValue}>
              {profile.petSafe ? "Yes" : "No"}
            </span>
          </div>
        </div>

        <div className={styles.rightColumn}>
          <div className={styles.profileItem}>
            <span className={styles.itemTitle}>5. Temperature Range:</span>
            <span className={styles.itemValue}>
              {profile.minTemp}°F - {profile.maxTemp}°F
            </span>
          </div>

          <div className={styles.profileItem}>
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
    </div>
  );
};

const DiscoverButton = () => (
  <button className={styles.discoverButton}>
    <span className={styles.discoverText}>Discover Your Plants!</span>
  </button>
);

const Review = ({ profile }) => {
  useEffect(() => {
    const baseColor = { r: 39, g: 94, b: 56 };
    setTheme(baseColor);
  }, []);

  return (
    <>
      <div className={styles.reviewHeader}>
        <InfoBox />
      </div>
      <div className={styles.reviewContent}>
        <ProfileSummary profile={profile} />
        <DiscoverButton />
      </div>
    </>
  );
};

export default Review;
