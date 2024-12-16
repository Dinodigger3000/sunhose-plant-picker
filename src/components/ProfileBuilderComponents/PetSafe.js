import React, { useEffect, useState } from "react";
import styles from "../../styles/ProfileBuilderStyles/PetSafe.module.css";
import "../../styles/ProfileBuilderStyles/MainStyles.css";
import { ReactComponent as Dog } from "../../assets/icons/dog.svg";
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
      <span role="heading" aria-level="1" className="title">
        Pet Safe
      </span>
    </div>
  </div>
);

const DescriptionBox = () => {
  const [showModal, setShowModal] = useState(false);

  const petSafeModalContent = (
    <>
      <p>
        Our plant picking algorithm considers pet safety with cats and dogs in
        mind. If you own a different pet, we recommend you seek out the&nbsp;
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
      <p>If you do have both plants and pets, it is best practice to:</p>
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
      <p className={"descriptionText"}>
        Some houseplants can be toxic to pets if eaten. Indicate here if you
        have a pet that you are worried about.
      </p>
      <button className="learn-more-btn" onClick={() => setShowModal(true)}>
        Learn More
      </button>
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        title="Pet Safety and Plants"
        subheading="Some common houseplants can be harmful if ingested by pets. Symptoms can range from mild (upset stomach) to severe (organ failure)."
      >
        {petSafeModalContent}
      </Modal>
    </div>
  );
};

const PetSafetyQuestion = ({
  profile,
  handleChange,
  petSafePage,
  setPetSafePage,
}) => {
  const handleClick = (value) => {
    handleChange({
      target: {
        name: "petSafe",
        value: value,
      },
    });
    setPetSafePage(1);
  };

  return (
    <div className={styles.petSafetyBox}>
      <div className={styles.innerBox}>
        <h3 className={styles.question}>Are you concerned about pet safety?</h3>
        <div className={styles.buttonContainer}>
          <button
            className={`${styles.choiceButton} ${
              petSafePage === 0
                ? ""
                : profile?.petSafe === true
                ? styles.selected
                : ""
            }`}
            onClick={() => handleClick(true)}
          >
            Yes
          </button>
          <button
            className={`${styles.choiceButton} ${
              petSafePage === 0
                ? ""
                : profile?.petSafe === false && profile?.petSafe !== undefined
                ? styles.selected
                : ""
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

const ContentSection = ({
  profile,
  handleChange,
  petSafePage,
  setPetSafePage,
}) => (
  <div className={styles.petSafeContent}>
    <PetSafetyQuestion
      profile={profile}
      handleChange={handleChange}
      petSafePage={petSafePage}
      setPetSafePage={setPetSafePage}
    />
    <DogBadge />
  </div>
);

const PetSafe = ({ profile, handleChange, petSafePage, setPetSafePage }) => {
  useEffect(() => {
    const baseColor = { r: 143, g: 88, b: 5 };
    setTheme(baseColor);
  }, []);

  return (
    <>
      <HeaderSection />
      <ContentSection
        profile={profile}
        handleChange={handleChange}
        petSafePage={petSafePage}
        setPetSafePage={setPetSafePage}
      />
    </>
  );
};

export default PetSafe;
