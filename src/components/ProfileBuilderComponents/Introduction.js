import React, { useEffect, useState } from "react";
import styles from "../../styles/ProfileBuilderStyles/Introduction.module.css";
import "../../styles/ProfileBuilderStyles/MainStyles.css";

import { ReactComponent as Clover } from "../../assets/clover.svg";
import { ReactComponent as Arrow } from "../../assets/arrow.svg";
import { setTheme } from "../ColorTheme";
import Modal from "./Modal";

const LogoSection = () => (
  <div className={styles.introLogoInner}>
    <span className={styles.introLogoText}>SUNHOSE</span>
    <div className={styles.introDotRow}>
      {[...Array(4)].map((_, i) => (
        <div key={i} className={styles.introDot} />
      ))}
    </div>
  </div>
);

const CloverBadge = () => (
  <div className={styles.introBadge}>
    <div className={styles.introBadgeInner}>
      <Clover className={styles.introBadgeIcon} />
    </div>
  </div>
);

const HeaderSection = () => (
  <div className={styles.introHeaderSection}>
    <div className={styles.introLogoCard}>
      <LogoSection />
    </div>
    <CloverBadge />
  </div>
);

const WelcomeCard = () => {
  const [showModal, setShowModal] = useState(false);
  const [showAboutModal, setShowAboutModal] = useState(false);

  const welcomeModalContent = (
    <>
      <p>
        <strong>Instructions:</strong>
      </p>
      <ol>
        <li>Select the options that best describe the space where you plan to keep your houseplant.</li>
          <ul><li>Click the "Learn More" button for more information if you're confused.</li></ul>
        <li>Review and finalize your profile.</li>
          <ul><li>If necessary, go back and change anything you missed.</li></ul>
        <li>View your top three plant matches!</li>
        <li>From here, you can view all matches, change your profile, or start over.</li>
      </ol>
      <p>
        <strong>Dependencies:</strong> This website uses React, React Three Fiber, and Firebase. A full list of all packages used can be found in the ReadMe on our&nbsp;
        <a
          href="https://github.com/Dinodigger3000/sunhose-plant-picker"
          target="_blank"
          rel="noreferrer"
        >
          GitHub page.
        </a>
      </p>
    </>
  );

  const aboutUsModalContent = (
    <>
      <p>
        <strong>This project was completed as a part of Software Development, a course taught at Macalester College by Joslenne Peña. SUNHOSE was created by (from left to right):</strong>
      </p>
      <p>
        <strong>Alana Nadolski</strong>
            <br></br>Alana is a Statistics and Computer Science double major who is making this project as a Junior. When she’s not busy with academics, she’s also a captain of the water polo team!
            <br></br><i>Roles:</i> Plant Expert, Project Manager, Resident Mathematician
      </p>
      <p>
        <strong>Nelson Mondale</strong>
            <br></br>Nelson is a current senior with a Media and Cultural Studies major and Studio Art and Computer Science minors. He loves the Mississippi River, veggie hot dogs, and drawing aliens. 
            <br></br><i>Roles:</i> UI Design + Implementation, Graphic Designer, Acronym Expert
      </p>
      <p>
        <strong>Royce Johnson</strong>
            <br></br>Royce is a sophomore Computer Science major. He is nowhere close to being an origami expert, but you can find him folding paper regularly. 
            <br></br><i>Roles:</i> 3D Designer, System Administrator, Conflict Resolution Supervisor
      </p>
    </>
  );

  return (
    <div className={styles.introWelcomeCard}>
      <div className="corner-dots">
        {[...Array(2)].map((_, i) => (
          <div key={i} className="accent-dot" />
        ))}
      </div>
      <div className={styles.introWelcomeContent}>
        <span className={styles.introWelcomeMessage}>
          <strong>Welcome to SUNHOSE</strong>, the all-in-one plant picking
          tool, perfect for everyone from experts to beginners.
        </span>
        <div className={styles.buttonContainer}>
          <button className="learn-more-btn" onClick={() => setShowModal(true)}>
            Learn More
          </button>
          <button
            className="learn-more-btn"
            onClick={() => setShowAboutModal(true)}
          >
            About Us
          </button>
        </div>
      </div>
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        title="Welcome to SUNHOSE"
        subheading="SUNHOSE uses your input to recommend the best houseplant for you - and does it in a beautiful and interactive way.
        We consider more practical things for the plant like light level and temperature, and also your personal preference
        on things like budget and care level. Ultimately, your plant recommendations are fully customized to you, down to
        the importance we place on different categories in our recommendations."
      >
        {welcomeModalContent}
      </Modal>
      <Modal
        show={showAboutModal}
        onClose={() => setShowAboutModal(false)}
        title="About SUNHOSE and it's creators"
        subheading="SUNHOSE is actually an acronym! It stands for: Sassy Unique New Houseplant Organizational System, Eyay!"
      >
        {aboutUsModalContent}
      </Modal>
    </div>
  );
};

const ContinueCard = ({ onContinue }) => (
  <div className={styles.introContinueCard} onClick={onContinue}>
    <div className="corner-dots">
      {[...Array(2)].map((_, i) => (
        <div key={i} className="accent-dot" />
      ))}
    </div>
    <div className={styles.introContinueContent}>
      <Arrow className={styles.introContinueIcon} />
      <span className={styles.introContinueText}>CONTINUE</span>
    </div>
    <div className="corner-dots">
      {[...Array(2)].map((_, i) => (
        <div key={i} className="accent-dot" />
      ))}
    </div>
  </div>
);

const ContentSection = ({ onContinue }) => (
  <div className={styles.introContentSection}>
    <WelcomeCard />
    <ContinueCard onContinue={onContinue} />
  </div>
);

const Introduction = ({ onContinue }) => {
  useEffect(() => {
    const baseColor = { r: 39, g: 94, b: 56 };
    setTheme(baseColor);
  }, []);

  return (
    <>
      <div>
        <HeaderSection />
        <ContentSection onContinue={onContinue} />
      </div>
    </>
  );
};

export default Introduction;
