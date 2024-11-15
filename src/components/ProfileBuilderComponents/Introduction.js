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
        <strong>some stuff</strong>
      </p>
      <p>what sunhose is/does?</p>
    </>
  );

  const aboutUsModalContent = (
    <>
      <p>
        <strong>some stuff</strong>
      </p>
      <p>about who we are?</p>
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
        subheading=" "
      >
        {welcomeModalContent}
      </Modal>
      <Modal
        show={showAboutModal}
        onClose={() => setShowAboutModal(false)}
        title="About the creators of SUNHOSE"
        subheading=" "
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
