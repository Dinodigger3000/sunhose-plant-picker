import React from "react";
import styles from "../../styles/ResultsStyles/PlantModal.module.css";

function PlantModal({
  plant,
  show,
  onHide,
  plantScores,
  currentIndex,
  onNextPlant,
}) {
  if (!plant || !show) return null;

  const handleNext = () => {
    if (currentIndex < plantScores.length - 1) {
      const nextPlant = plantScores[currentIndex + 1];
      onNextPlant(nextPlant);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      const prevPlant = plantScores[currentIndex - 1];
      onNextPlant(prevPlant);
    }
  };

  return (
    <div
      className={styles.modalOverlay}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onHide();
        }
      }}
    >
      <div className={styles.modalContent}>
        <div className={styles.leftContainer}>
          <div className={styles.imageWrapper}>
            <img
              src={plant.data.imageUrl}
              alt={plant.data.title}
              className={styles.plantImage}
            />
          </div>
        </div>

        <div className={styles.rightContainer}>
          <div className={styles.header}>
            <div className={styles.headerLeft}>
              <div
                className={styles.rankBadge}
                style={{
                  fontSize: currentIndex + 1 >= 10 ? "4rem" : "5rem",
                  paddingLeft: currentIndex + 1 >= 10 ? "0.25rem" : "0.5rem",
                }}
              >
                {currentIndex + 1}
              </div>
            </div>
            <div className={styles.headerRight}>
              <span
                role="heading"
                aria-level="1"
                className={styles.plantTitle}
                style={{
                  fontSize: plant.data.title.length > 10 ? "4rem" : "5rem",
                  marginBottom:
                    plant.data.title.length > 10 ? "-0.5rem" : "-1.25rem",
                }}
              >
                {plant.data.title}
              </span>
              <div className={styles.matchContainer}>
                <div className={styles.matchBar}>
                  <div
                    className={styles.matchFill}
                    style={{ width: `${plant.matchPercentage}%` }}
                  />
                </div>
                <span className={styles.matchLabel}>
                  {plant.matchPercentage}%
                </span>
              </div>
            </div>
          </div>

          <div className={styles.body}>
            <div className={styles.scientificName}>
              <p className={styles.description}>{plant.data.description}</p>
            </div>

            <div className={styles.careInstructions}>
              <strong>Care Instructions: </strong>
              {plant.data.instructions}
            </div>

            <div className={styles.funFact}>
              <strong>Fun Fact: </strong>
              {plant.data.fun_fact}
            </div>

            <div className={styles.matchesContainer}>
              <div className={styles.matchColumn}>
                <h3 className={styles.matchColumnHeader}>Matches</h3>
                <ul className={styles.matchList}>
                  {plant.data.match_text.map((match, index) => (
                    <li key={index} className={styles.matchItem}>
                      <div className={styles.emojiCircle}>
                        {match.split(" ")[0]}
                      </div>
                      <span className={styles.matchItemText}>
                        {match.split(" ").slice(1).join(" ")}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className={styles.mismatchColumn}>
                <h3 className={styles.mismatchColumnHeader}>Mismatches</h3>
                <ul className={styles.matchList}>
                  {plant.data.mismatch_text.map((mismatch, index) => (
                    <li key={index} className={styles.matchItem}>
                      <div className={styles.emojiCircle}>
                        {mismatch.split(" ")[0]}
                      </div>
                      <span className={styles.matchItemText}>
                        {mismatch.split(" ").slice(1).join(" ")}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <p className={styles.source}>
              Source:{" "}
              <a href={plant.data.link} target="_blank" rel="noreferrer">
                The Spruce
              </a>
            </p>
          </div>

          <div className={styles.footer}>
            <button
              className={styles.navButton}
              onClick={handlePrev}
              disabled={currentIndex === 0}
            >
              ← Prev. Plant
            </button>
            <button className={styles.navButton} onClick={onHide}>
              <strong>Close Plant Information </strong>
            </button>
            <button
              className={styles.navButton}
              onClick={handleNext}
              disabled={currentIndex === plantScores.length - 1}
            >
              Next Plant →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlantModal;
