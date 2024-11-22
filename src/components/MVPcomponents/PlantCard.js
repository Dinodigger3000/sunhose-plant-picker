import React from "react";
import styles from "../../styles/PlantGridStyles/PlantCard.module.css";
import { ReactComponent as Pot } from "../../assets/pot.svg";

function PlantCard({ plant, onClick, rank }) {
  const [imageUrl, setImageUrl] = React.useState("");

  React.useEffect(() => {
    plant.data.imageUrl.then((url) => setImageUrl(url));
  }, [plant.data.imageUrl]);

  return (
    <div
      className={styles.card}
      onClick={() => onClick(plant)}
      data-plant-id={plant.id}
    >
      <img
        src={imageUrl}
        alt={plant.data.title}
        className={styles.plantImage}
      />
      <div className={styles.imageContainer}>
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
