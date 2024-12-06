import React, { useState, useEffect } from "react";
import styles from "../styles/ResultsStyles/Results.module.css";
import PlantModal from "./MVPcomponents/PlantModal";
import { Display } from "./modelComponents/Display";

const ResultCard = ({ plant, onClick }) => {
  return (
    <div className={styles.resultCard}>
      <div className={styles.cardContent}>
        <div className={styles.cardLeftColumn}>
          <h2 className={styles.plantTitle}>{plant.data.title}</h2>
          <div className={styles.matchBar}>
            <div
              className={styles.matchFill}
              style={{ width: `${plant.matchPercentage}%` }}
            />
          </div>
          <div className={styles.matchPercentage}>
            {plant.matchPercentage}% Match
          </div>
        </div>
        <div className={styles.cardRightColumn}>
          <button
            className={styles.learnMoreButton}
            onClick={() => onClick(plant)}
          >
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
};

const Results = ({ plantScores, changePage, resetProfile }) => {
  const topThreePlants = plantScores ? plantScores.slice(0, 3) : [];
  const [selectedPlant, setSelectedPlant] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [slideUp, setSlideUp] = useState(false);

  useEffect(() => {
    const slideTimer = setTimeout(() => {
      setSlideUp(true);
    }, 1000);

    const removeTimer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => {
      clearTimeout(slideTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  const handleCardClick = (plant) => {
    setSelectedPlant(plant);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedPlant(null);
  };

  const handleNextPlant = (nextPlant) => {
    setSelectedPlant(nextPlant);
  };

  return (
    <div className={"app-container"}>
      {loading && (
        <div
          className={`${styles.loadingOverlay} ${
            slideUp ? styles.slideUp : ""
          }`}
        >
          <span className={styles.loadingText}>
            Preparing your <br></br> plant picks....
          </span>
        </div>
      )}
      <Display topThreePlants={topThreePlants} />
      <div className={styles.resultsContainer}>
        <span className={styles.sunhoseTitle} aria-label="SUNHOSE plant picks">
          SUNHOSE PLANT PICKS
        </span>
        <div className={styles.cardsContainer}>
          {topThreePlants.map((plant, index) => (
            <ResultCard
              key={plant.id}
              plant={plant}
              onClick={handleCardClick}
            />
          ))}
        </div>
        <div className={styles.buttonContainer}>
          <button
            className={`${styles.gridViewButton} ${styles.seeAllButton}`}
            onClick={() => changePage(2)}
          >
            See All Your Plant Matches
          </button>
          <button
            className={styles.gridViewButton}
            onClick={() => changePage(0, 7)}
          >
            Edit Profile
          </button>
          <button className={styles.gridViewButton} onClick={resetProfile}>
            Start Over
          </button>
        </div>
      </div>
      <PlantModal
        plant={selectedPlant}
        show={showModal}
        onHide={handleCloseModal}
        plantScores={topThreePlants}
        currentIndex={topThreePlants.findIndex(
          (p) => p.id === selectedPlant?.id
        )}
        onNextPlant={handleNextPlant}
      />
    </div>
  );
};

export default Results;
