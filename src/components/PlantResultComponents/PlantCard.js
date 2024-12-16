import React from "react";
import styles from "../../styles/PlantGridStyles/PlantCard.module.css";
import { ReactComponent as Pot } from "../../assets/icons/pot.svg";

function PlantCard({ plant, onClick, rank }) {
  return (
    <div
      className={styles.card}
      onClick={() => onClick(plant)}
      data-plant-id={plant.id}
    >
      <div className={styles.imageContainer}>
        <img
          src={plant.data.imageUrl}
          alt={plant.data.title}
          className={styles.plantImage}
        />
        <Pot className={styles.potIcon} />
      </div>
      <div className={styles.contentContainer}>
        <div className={styles.rankBadge}>{rank}</div>
        <div className={styles.bottomContent}>
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
      </div>
    </div>
  );
}

export default PlantCard;
