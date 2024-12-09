import React, { useState } from "react";

import Introduction from "./ProfileBuilderComponents/Introduction";

import LightLevel from "./ProfileBuilderComponents/LightLevel";
import CareLevel from "./ProfileBuilderComponents/CareLevel";
import Budget from "./ProfileBuilderComponents/Budget";
import PetSafe from "./ProfileBuilderComponents/PetSafe";
import Temperature from "./ProfileBuilderComponents/Temperature";

import PriorityRanking from "./ProfileBuilderComponents/PriorityRanking";
import Review from "./ProfileBuilderComponents/Review";

import "../styles/ProfileBuilderStyles/MainStyles.css";
import Viewport from "./Viewport";

const ProfileBuilder = ({
  onProfileUpdate: saveProfile,
  changePage,
  initialPage = 0,
  initialProfile,
  petSafePage,
  setPetSafePage,
  reviewPage,
  setReviewPage,
}) => {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [profile, setProfile] = useState(initialProfile);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newProfile = {
      ...profile,
      [name]: type === "checkbox" ? checked : value,
    };
    setProfile(newProfile);
    saveProfile(newProfile);
  };

  // the array of pages/components
  const pages = [
    {
      component: Introduction,
      props: {
        onContinue: () => setCurrentPage(1),
      },
    },
    {
      component: LightLevel,
      props: {
        onContinue: () => setCurrentPage(2),
        profile: profile,
        handleChange: handleChange,
      },
    },
    {
      component: CareLevel,
      props: {
        onContinue: () => setCurrentPage(3),
        profile: profile,
        handleChange: handleChange,
      },
    },
    {
      component: Budget,
      props: {
        onContinue: () => setCurrentPage(4),
        profile: profile,
        handleChange: handleChange,
      },
    },
    {
      component: PetSafe,
      props: {
        onContinue: () => setCurrentPage(5),
        profile: profile,
        handleChange: handleChange,
        petSafePage: petSafePage,
        setPetSafePage: setPetSafePage,
      },
    },
    {
      component: Temperature,
      props: {
        onContinue: () => setCurrentPage(6),
        profile: profile,
        handleChange: handleChange,
      },
    },
    {
      component: PriorityRanking,
      props: {
        onContinue: () => setCurrentPage(7),
        profile: profile,
        handleChange: handleChange,
      },
    },
    {
      component: Review,
      props: {
        profile: profile,
        setCurrentPage: setCurrentPage,
        changePage: changePage,
        reviewPage: reviewPage,
        setReviewPage: setReviewPage,
      },
    },
  ];

  const getCurrentPage = () => {
    const { component: Component, props } = pages[currentPage];
    return (
      <div className="app-container">
        <Viewport profile={profile} />
        <div className="layout">
          <NavigationButtons
            currentPage={currentPage}
            totalPages={pages.length}
            setCurrentPage={setCurrentPage}
          />
          <Component {...props} />
          <ReturnToReviewButton
            setCurrentPage={setCurrentPage}
            reviewPage={reviewPage}
            currentPage={currentPage}
          />
        </div>
      </div>
    );
  };

  const NavigationButtons = ({ currentPage, totalPages, setCurrentPage }) => {
    if (currentPage === 0 || currentPage === totalPages - 1) return null;

    return (
      <div className="navigation-container">
        <div className="navigation-buttons">
          <button
            className="nav-btn back-btn"
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            Go Back
          </button>
          <button
            className="nav-btn next-btn"
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            Next Page
          </button>
        </div>
      </div>
    );
  };

  const ReturnToReviewButton = ({
    setCurrentPage,
    reviewPage,
    currentPage,
  }) => {
    if (reviewPage === 0 || currentPage === 7) return null;

    return (
      <div className="return-review-container">
        <button className="return-review-btn" onClick={() => setCurrentPage(7)}>
          Return to Profile Review
        </button>
      </div>
    );
  };

  return getCurrentPage();
};

export default ProfileBuilder;
