import React from "react";
import styles from "../../styles/ProfileBuilderStyles/Modal.module.css";
import "../../styles/ProfileBuilderStyles/MainStyles.css";

const Modal = ({ show, onClose, title, subheading, children }) => {
  if (!show) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>{title}</h2>
          <button className={styles.closeButton} onClick={onClose}>
            Close
          </button>
        </div>
        <div className={styles.modalBody}>
          {subheading && (
            <div className={styles.modalSubheading}>{subheading}</div>
          )}
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
