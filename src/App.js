import React, { useState, useMemo, useEffect } from "react";

import "./styles/App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/customBootstrap.css";
import "./styles/fonts.css";

import { Container, Col, Row } from "react-bootstrap";
import ProfileForm from "./components/MVPcomponents/ProfileForm";
import PlantGrid from "./components/MVPcomponents/PlantGrid";
import PlantModal from "./components/MVPcomponents/PlantModal";

import { collection, getDocs } from "firebase/firestore";
import { db, store } from "./firebase";
import { fetchPlantData, updatePlantMatches } from "./plantData";

import { setTheme } from "./components/ColorTheme";

import Viewport from "./components/Viewport";
import ProfileBuilder from "./components/ProfileBuilder";
import AdaptiveScene from "./components/AdaptiveScene";

function App() {
  const [savedProfile, setSavedProfile] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);

  const handleProfileUpdate = (newProfile, page) => {
    setSavedProfile(newProfile);
    setCurrentPage(page);
  };

  return (
    <div className="app-container">
      <AdaptiveScene profile={savedProfile} currentPage={currentPage} />
      <Viewport profile={savedProfile} />
      <ProfileBuilder onProfileUpdate={handleProfileUpdate} />
    </div>
  );
}

export default App;
