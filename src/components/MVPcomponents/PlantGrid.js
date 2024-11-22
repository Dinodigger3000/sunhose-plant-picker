import React, { useEffect, useState } from "react";
import PlantCard from "./PlantCard";
import PlantModal from "./PlantModal";
import NavigationBar from "./NavigationBar";
import styles from "../../styles/PlantGridStyles/PlantGrid.module.css";

function PlantGrid({ plantScores, changePage, resetProfile }) {
  const handleRestart = () => resetProfile();
  const handleReview = () => {
    changePage(0, 7);
  };
  const handleResults = () => changePage(1);

  const [scores, setPlantScores] = React.useState(plantScores);
  useEffect(() => {
    async function getPlantScores() {
      const plantProfiles = await plantScores;
      setPlantScores(plantProfiles);
    }

    getPlantScores();
  }, [plantScores]);

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
    <div className={styles.mainContainer}>
      <NavigationBar
        onRestart={handleRestart}
        onReview={handleReview}
        onResults={handleResults}
      />
      <div className={styles.gridWrapper}>
        {scores && (
          <div className={styles.gridContainer}>
            {scores.map((plant, index) => (
              <PlantCard
                key={plant.id}
                plant={plant}
                onClick={handleCardClick}
                rank={index + 1}
              />
            ))}
          </div>
        )}
        <PlantModal
          plant={selectedPlant}
          show={showModal}
          onHide={handleCloseModal}
          plantScores={scores}
          currentIndex={
            scores ? scores.findIndex((p) => p.id === selectedPlant?.id) : 0
          }
          onNextPlant={handleNextPlant}
        />
      </div>
    </div>
  );
}

export default PlantGrid;
