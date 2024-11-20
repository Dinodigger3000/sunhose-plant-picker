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

const ProfileBuilder = ({ onProfileUpdate: saveProfile }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [profile, setProfile] = useState({
    lightLevel: 3,
    petSafe: false,
    careLevel: 1,
    budget: 0,
    maxTemp: 80,
    minTemp: 65,
    priorities: ["light", "care", "budget", "pets", "temp"],
  });

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
      </div></div>
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

  return getCurrentPage();
};

export default ProfileBuilder;
