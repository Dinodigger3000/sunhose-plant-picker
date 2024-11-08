import React, { useState } from "react";

import Introduction from "./ProfileBuilderComponents/Introduction";

import LightLevel from "./ProfileBuilderComponents/LightLevel";
import CareLevel from "./ProfileBuilderComponents/CareLevel";
import Budget from "./ProfileBuilderComponents/Budget";
import PetSafe from "./ProfileBuilderComponents/PetSafe";
import Temperature from "./ProfileBuilderComponents/Temperature";

import PriorityRanking from "./ProfileBuilderComponents/PriorityRanking";

const ProfileBuilder = ({ profile, handleChange, handleSubmit }) => {
  const [currentPage, setCurrentPage] = useState(0);

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
  ];

  const getCurrentPage = () => {
    const { component: Component, props } = pages[currentPage];
    return <Component {...props} />;
  };

  return <div className="profile-builder">{getCurrentPage()}</div>;
};

export default ProfileBuilder;
