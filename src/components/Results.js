import React, { useState } from "react";
import styles from "../styles/ResultsStyles/Results.module.css";
import PlantModal from "./MVPcomponents/PlantModal";

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

const Results = ({ plantScores, changePage }) => {
  const topThreePlants = plantScores ? plantScores.slice(0, 3) : [];
  const [selectedPlant, setSelectedPlant] = useState(null);
  const [showModal, setShowModal] = useState(false);

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
    <div className={styles.resultsContainer}>
      <div className={styles.cardsContainer}>
        {topThreePlants.map((plant, index) => (
          <ResultCard key={plant.id} plant={plant} onClick={handleCardClick} />
        ))}
      </div>
      <div className={styles.buttonContainer}>
        <button className={styles.gridViewButton} onClick={() => changePage(2)}>
          See All Plants: Grid View
        </button>
        <button
          className={styles.gridViewButton}
          onClick={() => changePage(0, 7)}
        >
          Edit Profile
        </button>
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
