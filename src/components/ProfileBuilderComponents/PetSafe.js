import React, { useEffect, useState } from "react";
import styles from "../../styles/ProfileBuilderStyles/PetSafe.module.css";
import "../../styles/ProfileBuilderStyles/MainStyles.css";
import { ReactComponent as Dog } from "../../assets/dog.svg";
import { setTheme } from "../ColorTheme";
import Modal from "./Modal";

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

const DescriptionBox = () => {
  const [showModal, setShowModal] = useState(false);

  const petSafeModalContent = (
    <>
      <p>
        <strong>Toxic Plants:</strong> Some common houseplants can be harmful if
        ingested by pets. Symptoms can range from mild (upset stomach) to severe
        (organ failure).
      </p>
      <p>
        Our plant picking algorithm considers pet safety mostly with cats and
        dogs in mind. If you own another pet, we reccomend you seek out the
        &nbsp;
        <a
          href="https://www.aspca.org/pet-care/animal-poison-control/toxic-and-non-toxic-plants"
          target="_blank"
          rel="noreferrer"
        >
          ASPCA's list of pet safe plants
        </a>
        , and compare it to the plants our generation algorithm has selected for
        you.
      </p>

      <ul>
        <li>Keep plants out of reach when possible</li>
        <li>Monitor pet behavior around plants</li>
        <li>Consider hanging planters or high shelves</li>
        <li>Keep the ASPCA poison control number handy for concerns</li>
      </ul>
    </>
  );

  return (
    <div className={styles.descriptionBox}>
      <div className="corner-dots">
        <div className="accent-dot" />
        <div className="accent-dot" />
      </div>
      <p className={styles.descriptionText}>
        Some houseplants can be toxic to pets if eaten. Consult below to learn
        more about pet safe plants, and for more pet specific information.
      </p>
      <button className="learn-more-btn" onClick={() => setShowModal(true)}>
        Learn More
      </button>
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        title="Pet Safety and Plants"
        subheading="When choosing plants for a home with pets, it's important to consider their safety, as some plants can be toxic to pets if eaten."
      >
        {petSafeModalContent}
      </Modal>
    </div>
  );
};

const PetSafetyQuestion = ({ profile, handleChange }) => {
  const [hasSelected, setHasSelected] = useState(false);

  const handleClick = (value) => {
    setHasSelected(true);
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
              hasSelected && profile?.petSafe === true ? styles.selected : ""
            }`}
            onClick={() => handleClick(true)}
          >
            Yes
          </button>
          <button
            className={`${styles.choiceButton} ${
              hasSelected && profile?.petSafe === false ? styles.selected : ""
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
