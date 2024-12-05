import React from "react";
import styles from "../../styles/PlantGridStyles/NavBar.module.css";

function NavigationBar({ onRestart, onReview, onResults }) {
  return (
    <div className={styles.navContainer}>
      <span role="heading" aria-level="1" className={styles.navTitle}>
        PLANT MATCH
      </span>
      <p className={styles.description}>
        All plants in our database, ranked by how well they match your profile.
        Click any plant card to learn more about it.
      </p>
      <div className={styles.buttonContainer}>
        <button className={styles.navButton} onClick={onResults}>
          <div className={styles.buttonTitle}>← Return to Top Three Plants</div>
        </button>
        <button className={styles.navButton} onClick={onReview}>
          <div className={styles.buttonTitle}>✎ Edit Profile</div>
          <div className={styles.buttonDescription}>
            Return to the Profile Review page, and edit your current profile.
          </div>
        </button>
        <button className={styles.navButton} onClick={onRestart}>
          <div className={styles.buttonTitle}>↩ Restart</div>
          <div className={styles.buttonDescription}>
            Return to the beginning of SUNHOSE, and remake your profile from
            scratch.
          </div>
        </button>
      </div>
    </div>
  );
}

export default NavigationBar;
